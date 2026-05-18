<?php

namespace App\Services;

use App\Models\ShareRequest;
use Exception;

class ShareService
{
    public function __construct(
        private readonly LoggerService $logger = new LoggerService
    ) {}

    /**
     * Create share request (not copy yet - just request)
     *
     * @param array $entityIds
     * @param string $entityType
     * @param array $userIds
     *
     * @return array
     */
    public function createShareRequest(array $entityIds, string $entityType, array $userIds): array
    {
        $senderId = auth()->id();
        $requestsCreated = 0;

        foreach ($userIds as $receiverId) {
            ShareRequest::create([
                'sender_id' => $senderId,
                'receiver_id' => $receiverId,
                'entity_type' => $entityType,
                'entity_ids' => $entityIds,
                'status' => 'pending',
            ]);
            $requestsCreated++;
        }

        return [
            'message' => "Created {$requestsCreated} share requests",
        ];
    }

    /**
     * Get received pending share requests
     *
     * @return array
     */
    public function getReceivedRequests(): array
    {
        return ShareRequest::forReceiver(auth()->id())
            ->pending()
            ->with('sender:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get()
            ->toArray();
    }

    /**
     * Get sent share requests
     *
     * @return array
     */
    public function getSentRequests(): array
    {
        return ShareRequest::forSender(auth()->id())
            ->with('receiver:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get()
            ->toArray();
    }

    /**
     * Get pending requests count
     *
     * @return int
     */
    public function getPendingCount(): int
    {
        return ShareRequest::forReceiver(auth()->id())->pending()->count();
    }

    /**
     * Accept share request - this calls the existing shareEntities logic
     *
     * @param int $requestId
     *
     * @return array
     */
    public function acceptRequest(int $requestId): array
    {
        $request = ShareRequest::forReceiver(auth()->id())->pending()->find($requestId);

        if (!$request) {
            throw new Exception('Share request not found');
        }

        // Use existing shareEntities logic - copy entities to receiver
        $result = $this->shareEntitiesToUser(
            $request->entity_ids,
            $request->entity_type,
            auth()->id()
        );

        $request->update(['status' => 'accepted']);

        return $result;
    }

    /**
     * Reject share request
     *
     * @param int $requestId
     *
     * @return array
     */
    public function rejectRequest(int $requestId): array
    {
        $request = ShareRequest::forReceiver(auth()->id())->pending()->find($requestId);

        if (!$request) {
            throw new Exception('Share request not found');
        }

        $request->update(['status' => 'rejected']);

        return ['message' => 'Share request rejected'];
    }

    /**
     * Cancel sent share request
     *
     * @param int $requestId
     *
     * @return array
     */
    public function cancelRequest(int $requestId): array
    {
        $request = ShareRequest::forSender(auth()->id())->pending()->find($requestId);

        if (!$request) {
            throw new Exception('Share request not found');
        }

        $request->delete();

        return ['message' => 'Share request cancelled'];
    }

    /**
     * Share entities to specific user - copy entities to user's database
     *
     * @param array $entityIds
     * @param string $entityType
     * @param int $targetUserId
     *
     * @return array
     */
    private function shareEntitiesToUser(array $entityIds, string $entityType, int $targetUserId): array
    {
        $modelClass = $this->getEntityClass($entityType);
        $copiedCount = 0;

        foreach ($entityIds as $entityId) {
            $originalEntity = $modelClass::find($entityId);

            if (!$originalEntity) {
                continue;
            }

            $this->copyEntityToUser($originalEntity, $targetUserId);
            $copiedCount++;
        }

        $this->logger->log(
            auth()->user()->name,
            "{$copiedCount} entities",
            $entityType,
            'received via share'
        );

        return [
            'message' => "Received {$copiedCount} entities",
            'copied_count' => $copiedCount,
        ];
    }

    /**
     * Copy entity to user's database
     *
     * @param Model $originalEntity
     * @param int $targetUserId
     *
     * @return Model
     */
    private function copyEntityToUser($originalEntity, int $targetUserId)
    {
        $attributes = $originalEntity->getAttributes();
        unset($attributes['id']);
        unset($attributes['created_at']);
        unset($attributes['updated_at']);

        $attributes['user_id'] = $targetUserId;

        $modelClass = get_class($originalEntity);

        return $modelClass::create($attributes);
    }

    /**
     * Get entity class name from entity type
     *
     * @param string $entityType
     *
     * @return string
     */
    private function getEntityClass(string $entityType): string
    {
        $entityMap = [
            'article' => \App\Models\Article::class,
            'contact' => \App\Models\Contact::class,
            'money' => \App\Models\Money::class,
            'file' => \App\Models\File::class,
            'documentation' => \App\Models\Documentation::class,
            'question' => \App\Models\Question::class,
            'technology' => \App\Models\Technology::class,
        ];

        return $entityMap[$entityType] ?? throw new Exception("Unknown entity type: {$entityType}");
    }
}

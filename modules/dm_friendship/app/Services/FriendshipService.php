<?php

namespace App\Services;

use App\Models\User;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Database\Eloquent\Collection;

class FriendshipService
{
    use UserSetterTrait;

    public function __construct(
        private readonly LoggerService $logger = new LoggerService
    ) {}

    /**
     * @return Collection
     *
     * @throws LoggerException
     * @throws Exception
     */
    public function index(): Collection
    {
        $friends = auth()->user()->getAllFriendships();

        return $friends;
    }

    /**
     * @param User $recipient
     *
     * @return array
     */
    public function sendRequest(User $recipient): array
    {
        auth()->user()->befriend($recipient);

        return ['message' => 'Friend request sent successfully'];
    }

    /**
     * @param User $sender
     *
     * @return array
     */
    public function acceptRequest(User $sender): array
    {
        auth()->user()->acceptFriendRequest($sender);

        return ['message' => 'Friend request accepted successfully'];
    }

    /**
     * @param User $sender
     *
     * @return array
     */
    public function denyRequest(User $sender): array
    {
        auth()->user()->denyFriendRequest($sender);

        return ['message' => 'Friend request denied successfully'];
    }

    /**
     * @param User $friend
     *
     * @return array
     */
    public function removeFriend(User $friend): array
    {
        auth()->user()->unfriend($friend);

        return ['message' => 'Friend removed successfully'];
    }

    /**
     * @param User $friend
     *
     * @return array
     */
    public function blockFriend(User $friend): array
    {
        auth()->user()->blockFriend($friend);

        return ['message' => 'Friend blocked successfully'];
    }

    /**
     * @param User $friend
     *
     * @return array
     */
    public function unblockFriend(User $friend): array
    {
        auth()->user()->unblockFriend($friend);

        return ['message' => 'Friend unblocked successfully'];
    }
}

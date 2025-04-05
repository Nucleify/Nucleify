<?php

namespace App\Services;

class FriendshipService
{
    public function sendRequest($recipient): array
    {
        auth()->user()->befriend($recipient);

        return ['message' => 'Friend request sent successfully'];
    }

    public function acceptRequest($sender): array
    {
        auth()->user()->acceptFriendRequest($sender);

        return ['message' => 'Friend request accepted successfully'];
    }

    public function denyRequest($sender): array
    {
        auth()->user()->denyFriendRequest($sender);

        return ['message' => 'Friend request denied successfully'];
    }

    public function removeFriend($friend): array
    {
        auth()->user()->unfriend($friend);

        return ['message' => 'Friend removed successfully'];
    }

    public function blockFriend($friend): array
    {
        auth()->user()->blockFriend($friend);

        return ['message' => 'Friend blocked successfully'];
    }

    public function unblockFriend($friend): array
    {
        auth()->user()->unblockFriend($friend);

        return ['message' => 'Friend unblocked successfully'];
    }
}

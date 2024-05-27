<?php

namespace App\Services;

class FriendService
{
    public function sendRequest($recipient)
    {
        auth()->user()->befriend($recipient);
        return ['message' => 'Friend request sent successfully'];
    }

    public function acceptRequest($sender)
    {
        auth()->user()->acceptFriendRequest($sender);
        return ['message' => 'Friend request accepted successfully'];
    }

    public function denyRequest($sender)
    {
        auth()->user()->denyFriendRequest($sender);
        return ['message' => 'Friend request denied successfully'];
    }

    public function removeFriend($friend)
    {
        auth()->user()->unfriend($friend);
        return ['message' => 'Friend removed successfully'];
    }

    public function blockFriend($friend)
    {
        auth()->user()->blockFriend($friend);
        return ['message' => 'Friend blocked successfully'];
    }

    public function unblockFriend($friend)
    {
        auth()->user()->unblockFriend($friend);
        return ['message' => 'Friend unblocked successfully'];
    }
}

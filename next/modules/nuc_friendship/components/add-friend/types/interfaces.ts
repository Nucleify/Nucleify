import type {
  NucFriendshipRequestsInterface,
  NucUserRequestsInterface,
} from 'nucleify'

export interface UseAddFriendInterface {
  searchEmail: string
  friendship: NucFriendshipRequestsInterface
  users: NucUserRequestsInterface
}

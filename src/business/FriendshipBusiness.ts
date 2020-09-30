import { FriendshipDatabase } from '../data/FriendshipDatabase'
import { FriendshipInputDTO, FriendshipOutputDTO} from '../model/Friendship'

export class FriendshipBusiness {
    public async makeFriendship(input: FriendshipInputDTO): Promise<void> {
        if (!input.idUserA || !input.idUserB) {
            throw new Error('Enter all necessary information for registration')
        }

        if (input.idUserA === input.idUserB) {
            throw new Error("You can't be friends with yourself")
        }

        const friendshipDataBase: FriendshipDatabase = new FriendshipDatabase()
        const friendshipExists: FriendshipOutputDTO[] = await friendshipDataBase.getFriendship(input.idUserA, input.idUserB)

        if (friendshipExists.length) {
            throw new Error('You are already his friend')
        } else {
            await friendshipDataBase.makeFriendship(input.idUserA, input.idUserB)
        }
    }

    public async undoFriendship(input: FriendshipInputDTO): Promise<void> {
        if (!input.idUserA || !input.idUserB) {
            throw new Error('Enter all necessary information for registration')
        }

        if (input.idUserA === input.idUserB) {
            throw new Error('You cannot break up a friendship with yourself')
        }

        const friendshipDataBase: FriendshipDatabase = new FriendshipDatabase()
        const friendshipExists: FriendshipOutputDTO[] = await friendshipDataBase.getFriendship(input.idUserA, input.idUserB)

        if (!friendshipExists.length) {
            throw new Error('You cannot undo a friendship that does not exist.')
        } else {
            await friendshipDataBase.undoFriendship(input.idUserA, input.idUserB)
        }
    }
}
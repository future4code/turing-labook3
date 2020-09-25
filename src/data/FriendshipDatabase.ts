import { BaseDatabase } from './BaseDatabase'
import { FriendshipOutputDTO } from '../model/Friendship'

export class FriendshipDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'Friendship_Labook'

    public async makeFriendship(idUserA: string, idUserB: string): Promise<void> {
        try {
            await this.getConnection()
                .insert([
                    {userA_id: idUserA, userB_id: idUserB}, 
                    {userA_id: idUserB, userB_id: idUserA}
                ])
                .into(FriendshipDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async undoFriendship(idUserA: string, idUserB: string): Promise<void> {
        try {
            await this.getConnection().raw(`
                DELETE FROM ${FriendshipDatabase.TABLE_NAME}
                WHERE (userA_id = "${idUserA}" AND userB_id = "${idUserB}") OR
                (userA_id = "${idUserB}" AND userB_id = "${idUserA}");
            `)                
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getFriendship(idUserA: string, idUserB: string): Promise<FriendshipOutputDTO[]> {
        try {
            const result = await this.getConnection().raw(`
                SELECT * FROM ${FriendshipDatabase.TABLE_NAME}
                WHERE userA_id = "${idUserA}" AND userB_id = "${idUserB}";
            `)

            const friendship: FriendshipOutputDTO[] = [] 
            
            result[0].map((friendships: any) => {
                const newFriendship: FriendshipOutputDTO = {
                    userA_id: friendships.userA_id as string,
                    userB_id: friendships.userB_id as string
                }

                friendship.push(newFriendship)
            })

            return friendship
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
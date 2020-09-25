import { BaseDatabase } from './BaseDatabase'
import { RatingOutputDTO } from '../model/Rating'

export class RatingDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'Rating_Labook'

    public async likePost(idPost: string, userId: string): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    post_id: idPost,
                    user_id: userId
                })
                .into(RatingDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
    
    public async unlikePost(idPost: string, userId: string): Promise<void> {
        try {
            await this.getConnection().raw(`
                DELETE FROM ${RatingDatabase.TABLE_NAME}
                WHERE post_id = "${idPost}" AND user_id = "${userId}"
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getLike(idPost: string, userId: string): Promise<RatingOutputDTO[]> {
        try {
            const result = await this.getConnection().raw(`
                SELECT * FROM ${RatingDatabase.TABLE_NAME}
                WHERE post_id = "${idPost}" AND user_id = "${userId}";
            `)

            const like: RatingOutputDTO[] = []

            result[0].map((liked: any) => {
                const newLike: RatingOutputDTO = {
                    idPost: liked.post_id,
                    user_id: liked.user_id
                }

                like.push(newLike)
            })

            return like
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
import { BaseDatabase } from './BaseDatabase'

export class CommentDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'Comment_Labook'

    public async createComment(id: string, comment: string, postId: string, userId: string): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    comment,
                    post_id: postId,
                    user_id: userId
                }).into(CommentDatabase.TABLE_NAME)
        } catch (error){
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
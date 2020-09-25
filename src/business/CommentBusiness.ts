import { IdGenerator } from '../services/IdGenerator'
import { CommentDatabase } from '../data/CommentDatabase'
import { CommentInputDTO } from '../model/Comment'

export class CommentBusiness {
    public async createComment(input: CommentInputDTO): Promise<void> {
        if(!input.comment || !input.post_id || !input.user_id) {
            throw new Error('Enter all necessary information for registration')
        }

        const idGenerator: IdGenerator = new IdGenerator()
        const id: string = idGenerator.generateId()

        const commentDataBase: CommentDatabase = new CommentDatabase()
        await commentDataBase.createComment(id, input.comment, input.post_id, input.user_id)
    }
}
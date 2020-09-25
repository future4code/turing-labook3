import { RatingDatabase } from '../data/RatingDatabase'
import { RatingOutputDTO } from '../model/Rating'

export class RatingBusiness {
    public async likePost(input: RatingOutputDTO): Promise<void> {
        if(!input.idPost || !input.user_id) {
            throw new Error('Enter all necessary information for registration')
        }

        const ratingDataBase: RatingDatabase = new RatingDatabase()
        const likeExist: RatingOutputDTO[] = await ratingDataBase.getLike(input.idPost, input.user_id)

        if(likeExist.length) {
            throw new Error('You already liked the post')
        } else {
            await ratingDataBase.likePost(input.idPost, input.user_id)
        }
    }

    public async unlikePost(input: RatingOutputDTO): Promise<void> {
        if(!input.idPost || !input.user_id) {
            throw new Error('Enter all necessary information for registration')
        }

        const ratingDataBase: RatingDatabase = new RatingDatabase()
        const likeExist: RatingOutputDTO[] = await ratingDataBase.getLike(input.idPost, input.user_id)

        if(!likeExist.length) {
            throw new Error("You can't dislike a post you don't like") 
        } else {
            await ratingDataBase.unlikePost(input.idPost, input.user_id)
        }
    }
}
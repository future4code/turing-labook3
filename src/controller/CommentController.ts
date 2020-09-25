import { Request, Response } from 'express'
import { Authenticator, AuthenticationData } from '../services/Authenticator'
import { CommentBusiness } from '../business/CommentBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { CommentInputDTO } from '../model/Comment'

export default class CommentController {
    public createComment = async (req: Request, res: Response) => {
        try {
            const authenticator: Authenticator = new Authenticator()
            const data: AuthenticationData = authenticator.verify(req.headers.authorization as string)

            const input: CommentInputDTO = {
                comment: req.body.comment as string,
                post_id: req.body.idPost as string,
                user_id: data.id
            }

            const commentBusiness: CommentBusiness = new CommentBusiness()
            await commentBusiness.createComment(input)

            res.status(200).send({message: "Comment created"})
        } catch (error){
            res.status(400).send({message: error.message})
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}
import { Request, Response } from 'express'
import { Authenticator, AuthenticationData } from '../services/Authenticator'
import { RatingBusiness } from '../business/RatingBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { RatingOutputDTO } from '../model/Rating'

export default class RatingController {
    public likePost = async (req: Request, res: Response) => {
        try {
            const authenticator: Authenticator = new Authenticator()
            const data: AuthenticationData = authenticator.verify(req.headers.authorization as string)

            const input: RatingOutputDTO = {
                idPost: req.body.idPost as string,
                user_id: data.id
            }

            const ratingBusiness: RatingBusiness = new RatingBusiness()
            await ratingBusiness.likePost(input)

            res.status(200).send({message: "Liked"})
        } catch (error) {
            res.status(400).send({message: error.message})
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }

    public unlikePost = async (req: Request, res: Response) => {
        try {
            const authenticator: Authenticator = new Authenticator()
            const data: AuthenticationData = authenticator.verify(req.headers.authorization as string)

            const input: RatingOutputDTO = {
                idPost: req.body.idPost as string,
                user_id: data.id
            }
            
            const ratingBusiness: RatingBusiness = new RatingBusiness()
            await ratingBusiness.unlikePost(input)

            res.status(200).send({message: "Unliked"})
        } catch (error) {
            res.status(400).send({message: error.message})
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}
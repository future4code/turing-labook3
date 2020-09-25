import moment from 'moment'
import { Request, Response } from 'express'
import { FeedBusiness } from '../business/FeedBusiness'
import { Authenticator, AuthenticationData } from '../services/Authenticator'
import { BaseDatabase } from '../data/BaseDatabase'
import { CreatePostInputDTO, PostOutputDTO } from '../model/Post'

moment.locale('pt-br')

export default class FeedController {
    public createPost = async(req: Request, res: Response) => {
        try {
            const authenticator: Authenticator = new Authenticator()
            const data: AuthenticationData = await authenticator.verify(req.headers.authorization as string)

            const input: CreatePostInputDTO = {
                photo: req.body.photo as string,
                description: req.body.description as string,
                createdAt: moment().unix(),
                type: req.body.type as string || "normal",
                user_id: data.id
            }

            const feedBusiness: FeedBusiness = new FeedBusiness()
            await feedBusiness.createPost(input)

            res.status(200).send({
                message: "Post created successfully"
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }

    public getFeed = async(req: Request, res: Response) => {
        try {
            const authenticator: Authenticator = new Authenticator()
            const data: AuthenticationData = await authenticator.verify(req.headers.authorization as string)

            const page = Number(req.query.page) || 1

            const feedBusiness: FeedBusiness = new FeedBusiness()
            const result: PostOutputDTO[] = await feedBusiness.getFeed(data.id, page)

            res.status(200).send({
                message: result
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
    
    public getFeedByType = async(req: Request, res: Response) => {
        try {
            const authenticator: Authenticator = new Authenticator()
            const data: AuthenticationData = await authenticator.verify(req.headers.authorization as string)
            
            const type: string = req.query.type as string
            const page = Number(req.query.page) || 1

            const feedBusiness = new FeedBusiness()
            const result: PostOutputDTO[] = await feedBusiness.getFeedByType(data.id, type, page)

            res.status(200).send({
                message: result
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}
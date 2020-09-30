import { Request, Response } from 'express'
import { Authenticator, AuthenticationData } from '../services/Authenticator'
import { FriendshipBusiness } from '../business/FriendshipBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { FriendshipInputDTO } from '../model/Friendship'

export default class FriendshipController {
    public makeFriendship = async (req: Request, res: Response) => {
        try {
            const authenticator: Authenticator = new Authenticator
            const data: AuthenticationData = await authenticator.verify(req.headers.authorization as string)
    
            const input: FriendshipInputDTO = {
                idUserA: data.id,
                idUserB: req.params.id
            }
    
            const friendshipBusiness: FriendshipBusiness = new FriendshipBusiness()
            await friendshipBusiness.makeFriendship(input)
    
            res.status(200).send({message: "Friendship made"})
        } catch (error) {
            res.status(400).send({message: error.message})
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }

    public undoFriendship = async (req: Request, res: Response) => {
        try {
            const authenticator = new Authenticator
            const data = await authenticator.verify(req.headers.authorization as string)
    
            const input = {
                idUserA: data.id,
                idUserB: req.params.id
            }
    
            const friendshipBusiness = new FriendshipBusiness()
            await friendshipBusiness.undoFriendship(input)
    
            res.status(200).send({message: "Undo friendship"})
        } catch (error){
            res.status(400).send({message: error.message})
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}
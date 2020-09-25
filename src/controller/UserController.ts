import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { SignupInputDTO, LoginInputDTO } from '../model/User'

export default class UserController {
    public signup = async (req: Request, res: Response) => {
        try {
            const input: SignupInputDTO = {
                name: req.body.name as string,
                email: req.body.email as string,
                password: req.body.password as string
            }
    
            const userBusiness: UserBusiness = new UserBusiness()
            const token: string = await userBusiness.signUp(input)
    
            res.status(200).send({
                message: "User created with sucess",
                "acess token": token
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input: LoginInputDTO = {
                email: req.body.email as string,
                password: req.body.password as string
            }
    
            const userBusiness: UserBusiness = new UserBusiness()
            const token: string = await userBusiness.login(input)
    
            res.status(200).send({
                "acess token": token
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
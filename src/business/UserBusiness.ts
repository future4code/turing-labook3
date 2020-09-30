import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { Authenticator } from '../services/Authenticator'
import { UserDatabase } from '../data/UserDatabase'
import { SignupInputDTO, LoginInputDTO, LoginOutputDTO } from '../model/User'

export class UserBusiness {
    public async signUp(input: SignupInputDTO): Promise<string> {
        if (!input.name || !input.email || !input.password) {
            throw new Error('Enter all necessary information for registration')
        }

        if (input.email.indexOf("@") === -1) {
            throw new Error('Email invalid')
        }

        if (input.password.length < 6) {
            throw new Error('The password must contain at least 6 characters')
        }

        const idGenerator: IdGenerator = new IdGenerator()
        const id: string = idGenerator.generateId()

        const hashManager: HashManager = new HashManager()
        const hashPassword: string = await hashManager.hash(input.password)

        const userDataBase: UserDatabase = new UserDatabase()
        await userDataBase.registerUser(
            id,
            input.name,
            input.email,
            hashPassword
        )

        const authenticator: Authenticator = new Authenticator()
        const token: string = authenticator.generateToken({ id })

        return token
    }

    public async login(input: LoginInputDTO): Promise<string> {
            if(!input.email || input.email.indexOf("@") === -1) {
                throw new Error("Invalid email")
            }
    
            const userDataBase: UserDatabase = new UserDatabase()
            const user: LoginOutputDTO = await userDataBase.getUserByEmail(input.email)
    
            const passwordIsCorrect: boolean = await new HashManager().compare(input.password, user.password)
    
            if (!passwordIsCorrect) {
                throw new Error("email or password invalid")
            }
    
            const authenticator: Authenticator = new Authenticator()
            const token: string = await authenticator.generateToken({id: user.id})
    
            return token
    }
}
import { BaseDatabase } from './BaseDatabase'
import { LoginOutputDTO } from '../model/User'

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'User_Labook'

    public async registerUser(id: string, name: string, email: string, password: string): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    name,
                    email,
                    password
                }).into(UserDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getUserByEmail(email: string): Promise<LoginOutputDTO> {
        try {
            const result = await this.getConnection()
                .select('*')
                .from(UserDatabase.TABLE_NAME)
                .where({email})

            const user: LoginOutputDTO = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                password: result[0].password
            }

            return user
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
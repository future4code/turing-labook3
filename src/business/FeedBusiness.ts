import { IdGenerator } from '../services/IdGenerator'
import { FeedDatabase } from '../data/FeedDatabase'
import { CreatePostInputDTO, PostOutputDTO } from '../model/Post'

export class FeedBusiness {
    public async createPost(input: CreatePostInputDTO): Promise<void> {
        if(!input.photo || !input.description || !input.createdAt || !input.type || !input.user_id) {
            throw new Error('Enter all necessary information for registration')
        }

        if(input.type !== "normal" && input.type !== "evento") {
            throw new Error('The type of the post can be event only or normal')
        } 

        const idGenerator: IdGenerator = new IdGenerator()
        const id: string = idGenerator.generateId()

        const feedDatabase: FeedDatabase = new FeedDatabase()
        await feedDatabase.createPost(id, input.photo, input.description, input.createdAt, input.type, input.user_id)
    }

    public async getFeed(id: string, page: number): Promise<PostOutputDTO[]> {
        if(!id || !page) {
            throw new Error('Enter all necessary information for registration')
        }

        const feedDataBase: FeedDatabase = new FeedDatabase()
        const result: PostOutputDTO[] = await feedDataBase.getFeed(id, page)

        if(!result.length){
            throw new Error("Empty feed")
        }

        return result
    }

    public async getFeedByType(id: string, type: string, page: number): Promise<PostOutputDTO[]> {
        if (!id || !type || !page) {
            throw new Error('Enter all necessary information for registration')
        }
        
        if (type !== "normal" && type !== "evento") {
            throw new Error("Valores para \"type\" devem ser \"normal\" ou \"evento\"")
        }

        const feedDataBase = new FeedDatabase()
        const result: PostOutputDTO[] = await feedDataBase.getFeedByType(id, type, page)

        if(!result.length){
            throw new Error("Empty feed")
        }

        return result 
    }
} 
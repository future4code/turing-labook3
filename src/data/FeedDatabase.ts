import { BaseDatabase } from './BaseDatabase'
import { PostOutputDTO } from '../model/Post'

export class FeedDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'Post_Labook'

    public async createPost(
                    id: string, 
                    photo: string, 
                    description: string, 
                    createdAt: Number, 
                    type: string, 
                    user_id: string): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    photo,
                    description,
                    createdAt,
                    type,
                    user_id
                }).into(FeedDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getFeed(id: string, page: number): Promise<PostOutputDTO[]> {
        try {
            const resultsPerPage: number = 5
            const offset: number = resultsPerPage * (page - 1)

            const result = await this.getConnection().raw(`
                SELECT UL.name, PL.id, PL.description, PL.photo, PL.createdAt, PL.type
                FROM Friendship_Labook FL
                JOIN User_Labook UL
                ON FL.userB_id = UL.id
                JOIN Post_Labook PL
                ON FL.userB_id = PL.user_id
                WHERE FL.userA_id = "${id}"
                ORDER BY PL.createdAt DESC
                LIMIT ${resultsPerPage}
                OFFSET ${offset};
            `)

            const feed: PostOutputDTO[] = [] 
            
            result[0].map((post: any) => {
                const newPost: PostOutputDTO = {
                    id: post.id,
                    name: post.name,
                    description: post.description,
                    photo: post.photo,
                    createdAt: post.createdAt,
                    type: post.type,
                }

                feed.push(newPost)
            })

            return feed
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getFeedByType(id: string, type: string, page: number): Promise<PostOutputDTO[]> {
        try {
            const resultsPerPage: number = 5
            const offset: number = resultsPerPage * (page - 1)

            const result = await this.getConnection().raw(`
                SELECT UL.name, PL.id, PL.description, PL.photo, PL.createdAt, PL.type
                FROM Post_Labook PL
                JOIN User_Labook UL
                ON PL.user_Id = UL.id
                WHERE UL.id != "${id}" AND PL.type = "${type}"
                ORDER BY PL.createdAt DESC
                LIMIT ${resultsPerPage}
                OFFSET ${offset};
            `)
            
            const feed: PostOutputDTO[] = [] 
            
            result[0].map((post: any) => {
                const newPost: PostOutputDTO = {
                    id: post.id,
                    name: post.name,
                    description: post.description,
                    photo: post.photo,
                    createdAt: post.createdAt,
                    type: post.type,
                }

                feed.push(newPost)
            })

            return feed
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
export interface CreatePostInputDTO {
    photo: string,
    description: string,
    createdAt: number,
    type: string,
    user_id: string
}

export interface PostOutputDTO {
    id: string,
    name: string,
    description: string,
    photo: string,
    createdAt: number,
    type: string,
}
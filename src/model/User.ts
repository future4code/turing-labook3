export interface SignupInputDTO {
    email: string,
    name: string,
    password: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface LoginOutputDTO {
    id: string,
    name: string,
    email: string,
    password: string
}
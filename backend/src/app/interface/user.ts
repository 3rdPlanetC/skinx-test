export interface UserITF {
    id: number
    username: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export interface checkUserExistingByUsernameITF {
    user_exist: boolean,
    user_data: UserITF | null
}
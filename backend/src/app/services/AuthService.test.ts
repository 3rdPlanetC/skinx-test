import { expect, describe, test } from "@jest/globals"
import { AuthService } from "./AuthService"
import { UserITF } from "../interface/user"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../config"
import jwt from 'jsonwebtoken'

const authService = new AuthService

describe("test : setAuthToken Function", () => {
    test("case : 1 - happy case", () => {
        const user_data: UserITF = {
            id: 1,
            username: "test",
            password: "test",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const { accessToken, refresh_token } = authService.setAuthToken(user_data)
        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err, decoded) => {
            const { username, userId }: any = decoded
            expect(user_data.username).toEqual(username)
            expect(user_data.id).toEqual(userId)
        })
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
            const { username, userId }: any = decoded
            expect(user_data.username).toEqual(username)
            expect(user_data.id).toEqual(userId)
        })
    })

    test("case : 2 - with unnessary field data", () => {
        const user_data = {
            id: 1,
            username: "test",
            password: "",
            createdAt: new Date(),
            updatedAt: new Date()
        } as UserITF
        const { accessToken, refresh_token } = authService.setAuthToken(user_data)
        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err, decoded) => {
            const { username, userId }: any = decoded
            expect(user_data.username).toEqual(username)
            expect(user_data.id).toEqual(userId)
        })
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
            const { username, userId }: any = decoded
            expect(user_data.username).toEqual(username)
            expect(user_data.id).toEqual(userId)
        })
    })
})
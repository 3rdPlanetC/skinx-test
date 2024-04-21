"use client"

import Link from "next/link"
import { UserContext } from "../../contexts/user"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Post from "./Post/Post"

export default function Home() {
    const { userData, setUserData } = useContext(UserContext)
    const [username, setUsername] = useState("")
    useEffect(() => {
        fetchRefreshToken()
    }, [])
    async function fetchRefreshToken() {
        try {
            if (userData.username) {
                setUsername(userData.username)
            } else {
                const res = await axios({
                    url: "/api/auth/refresh",
                    method: "POST"
                })
                setUsername(res.data.user_data.username)
                setUserData(res.data.user_data)
            }
        } catch (error) {
            console.log("error index page : ", error)
        }
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {username ? (
                <div>
                    <Post></Post>
                </div>
            ) : (
                <div>
                    <div>
                        <Link href="/login">Login</Link>
                    </div>
                    <div>
                        <Link href="/register">Register</Link>
                    </div>
                </div>
            )}
        </main>
    )
}

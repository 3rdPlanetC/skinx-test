import type { NextApiRequest, NextApiResponse } from 'next'
import { API_URL, AUTH_PREFIX_PATH } from '@/config'
import axios from 'axios'
import Cookies from 'cookies'

export default async function POST(
    nextReq: NextApiRequest,
    nextRes: NextApiResponse<any>
) {
    try {
        const { username, password } = JSON.parse(nextReq.body)
        const url = `${API_URL}${AUTH_PREFIX_PATH}/login`
        const res = await axios.post(
            url,
            {
                username: username,
                password: password
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }
        )
        const data = res.data
        nextRes.setHeader('Content-Type', 'application/json')
        const cookies = new Cookies(nextReq, nextRes)
        cookies.set('access_token', data.access_token, {
            httpOnly: true,
            // secure: true,
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            domain: 'localhost'
        })
        cookies.set('refresh_token', data.refresh_token, {
            httpOnly: true,
            // secure: true,
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            domain: 'localhost'
        })
        nextRes.status(200).json(data)
    } catch (error: any) {
        console.log("error : ", error)
        if (error.response?.status === 401) {
            nextRes.status(401).send({
                message: 'Unauthorized : ' + error.response.data.message,
                status: 401
            })
        } else {
            nextRes.status(500).send({
                message: 'Internal Server Error',
                status: 500
            })
        }
    }
}

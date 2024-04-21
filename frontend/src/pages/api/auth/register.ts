import type { NextApiRequest, NextApiResponse } from 'next'
import { API_URL, AUTH_PREFIX_PATH } from '@/config'
import axios from 'axios'

export default async function POST(
    nextReq: NextApiRequest,
    nextRes: NextApiResponse<any>
) {
    try {
        const { username, password } = JSON.parse(nextReq.body)
        const url = `${API_URL}${AUTH_PREFIX_PATH}/register`
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
        nextRes.status(200).json(data)
    } catch (error: any) {
        if (error.response.status === 400) {
            nextRes.status(error.response.status).send({
                message: 'Unauthorized : ' + error.response.data.message,
                status: error.response.status
            })
        } else {
            nextRes.status(500).send({
                message: 'Internal Server Error',
                status: 500
            })
        }
    }
}

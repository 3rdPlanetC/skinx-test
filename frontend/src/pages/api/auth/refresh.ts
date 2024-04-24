import type { NextApiRequest, NextApiResponse } from 'next'
import { API_URL, AUTH_PREFIX_PATH } from '@/config'
import axios from 'axios'
import Cookies from 'cookies'

export default async function POST(
    nextReq: NextApiRequest,
    nextRes: NextApiResponse<any>
) {
    try {
        const cookies = new Cookies(nextReq, nextRes)
        const refresh_token = cookies.get('refresh_token')
        const url = `${API_URL}${AUTH_PREFIX_PATH}/refresh`
        const res = await axios({
            url: url,
            method: 'POST',
            headers: {
                Authorization: refresh_token
            }
        })
        const data = res.data
        nextRes.setHeader('Content-Type', 'application/json')
        nextRes.json(data)
    } catch (error: any) {
        if (error.response.status === 401) {
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

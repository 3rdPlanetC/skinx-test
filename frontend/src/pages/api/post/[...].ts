import type { NextApiRequest, NextApiResponse } from 'next'
import { API_URL, API_V1 } from '@/config'
import axios from 'axios'
import Cookies from 'cookies'

export default async function POST(
    nextReq: NextApiRequest,
    nextRes: NextApiResponse<any>
) {
    try {
        const cookies = new Cookies(nextReq, nextRes)
        const access_token = cookies.get('access_token')
        const pathname = nextReq.url?.split('/api/post')[1]
        const url = `${API_URL}${API_V1}/post${pathname}`
        const res = await axios({
            url: url,
            method: 'GET',
            headers: {
                Authorization: access_token
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

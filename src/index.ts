import 'dotenv/config'

import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { webhookHandler } from './webhook'
import { getGroupInfoHandler, getGroupMemberProfile, getUserProfile, sendMsg } from './debug'

const {PORT = 8000} = process.env

function main() {
    const app = express()

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.post('/webhook', webhookHandler)

    // debug
    app.get('/debug/group/:id', getGroupInfoHandler)
    app.get('/debug/user/:id', getUserProfile)
    app.get('/debug/groupmem/:group_id/:user_id', getGroupMemberProfile)
    app.post('/debug/msg', sendMsg)

    app.post('/dialog', (req:Request, res:Response) => {
        console.log(req.body)
        return res.send()
    })

    app.get('/', (_req:Request, res:Response) => {
        return res.send('hello world')
    })

    app.listen(PORT, () => {
        console.log(`Server started at 0.0.0.0:${PORT}`)
    })
}

try {
    main()
} catch (error) {
    console.error('Fatal Error:', error.message)
}
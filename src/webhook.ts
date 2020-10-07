import 'dotenv/config'
import axios from 'axios'
import {Request, Response} from 'express'
import {WebhookRequestBody, Group, WebhookEvent} from '@line/bot-sdk'
import {client} from './line'

const {DIALOGFLOW_WEBHOOK} = process.env

if (!DIALOGFLOW_WEBHOOK) {
    throw new Error('Dialogflow webhook is not present.')
  }

export async function webhookHandler(req:Request, res:Response) {
    try {
        const {events} = req.body as WebhookRequestBody
        events.forEach(async evt => {
            console.log(evt)
            if(evt.type == 'follow') {
                // greeting
                
            } else if(evt.type == 'join') {
                
            } else if(evt.type == 'memberJoined') {

            } else if(evt.type == 'message') {
                if(evt.source.type == 'user') {
                    const userId = evt.source.userId || ''
                    if(evt.message.type == 'sticker') {
                        await client.pushMessage(userId, {
                            type:'text',
                            text:`สติ๊กเกอร์น่ารัก`
                        })
                    } else {
                        const result = await axios.post(DIALOGFLOW_WEBHOOK || '', req.body)
                    }
                } else if(evt.source.type == 'group') {
                    
                }
            }
        })
        return res.send()
    } catch (err) {
        console.log(err)
    }
}
import 'dotenv/config'
import {Request, Response} from 'express'
import {WebhookRequestBody, Group, WebhookEvent} from '@line/bot-sdk'
import {client} from './line'

export async function getGroupInfoHandler(req:Request, res:Response) {
    const group_id = req.params.id
    console.log(group_id)
    try {
        const result = await client.getGroupSummary(group_id)
        console.log(result)
    return res.send(result)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export async function getUserProfile(req:Request, res:Response) {
    const user_id = req.params.id
    console.log(user_id)
    try {
        const result = await client.getProfile(user_id)
        console.log(result)
    return res.send(result)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export async function getGroupMemberProfile(req:Request, res:Response) {
    const {group_id, user_id} = req.params
    try {
        const result = await client.getGroupMemberProfile(group_id, user_id)
        console.log(result)
    return res.send(result)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export async function sendMsg(req:Request, res:Response) {
    const {id,msg} = req.body
    try {
        const result = await client.pushMessage(id,{
            type: 'text',
            text: msg
        })
        console.log(result)
    return res.send(result)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}
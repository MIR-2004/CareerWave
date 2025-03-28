import {Webhook, webhook} from 'svix';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';


//API controller function to manage clerk user with database

export const clerkWebhooks = asyncHandler(async(req, res) => {
    //Create a svix instance with clerk webhook secret

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    //verifying header

    await webhook.verify(JSON.stringify(req.body), {
        "svix-id" : req.headers['svix-id'],
        "svix-timestamp" : req.headers['svix-timestamp'],
        "svix-signature" : req.headers['svix-signature'],
    })

    //getting data from the request body

    const { data, type } = req.body

    //switch case for different event types

    switch (key) {
        case 'user.created':{
            const userData = {
                _id: data._id,
                email: data.email_addresses[0].email_address,
                name: data.first_name + ' ' + data.last_name,
                image: data.image_url,
                resume:''
            }
        }
        case 'user.updated':{

        }
        case 'user.deleted':{

        }
        default:
            break;
    }
})
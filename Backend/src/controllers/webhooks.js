import {Webhook} from 'svix';
import { asyncHandler } from '../utils/asyncHandler.js';


//API controller function to manage clerk user with database

const clerkWebhooks = asyncHandler(async(req, res) => {
    //Create a svix instance with clerk webhook secret

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    if (!webhook) {
        throw new ApiError(
            500,
            "webhook token not found"
        )
    }

    //verifying header

    const verifyWebhook = await webhook.verify(JSON.stringify(req.body), {
        "svix-id" : req.headers['svix-id'],
        "svix-timestamp" : req.headers['svix-timestamp'],
        "svix-signature" : req.headers['svix-signature'],
    })

    if (!verifyWebhook) {
        throw new ApiError(
            500,
            "Webhook not verified"
        )
    }

    //getting data from the request body

    const { data, type } = req.body

    if (!data) {
        throw new ApiError(
           500,
           "Data from body not fetched" 
        )
    }
    
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
            await User.create(userData)
            res.json({})
        }
        case 'user.updated':{
            const userData = {
                email: data.email_addresses[0].email_address,
                name: data.first_name + ' ' + data.last_name,
                image: data.image_url,
            }
            await User.findByIdAndUpdate(data._id, userData)
            res.json({})
            break

        }
        case 'user.deleted':{
            await User.findByIdAndDelete(data._id)
            res.json({})
            break
        }
        default:
            break;
    }
})


export {
    clerkWebhooks
}
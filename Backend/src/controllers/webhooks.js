import {Webhook, webhook} from 'svix';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';


//API controller function to manage clerk user with database

export const clerkWebhooks = asyncHandler(async(req, res) => {
    //Create a svix instance with clerk webhook secret

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    //verifying header

    await webhook
})
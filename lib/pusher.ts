import PusherServer from 'pusher'
import PuserClient from 'pusher-js'

PuserClient.logToConsole = true;


export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: "us2",
})


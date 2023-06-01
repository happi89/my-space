import { authOptions } from './../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { pusherServer } from "@/lib/pusher";
import { NextApiResponse } from "next";
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions)

  const data = await req.json()

  await pusherServer.trigger(data?.chatRoomId, 'message', {
    name: session?.user?.name || data.name,
    content: data.content,
    senderId: data?.senderId,
  })

  await prisma.message.create({
    data: {
      content: data?.content,
      sender: {
        connect: {
          id: data?.senderId,
        },
      },
      chatRoom: {
        connect: {
          id: data?.chatRoomId,
        },
      },
    },
  });

  return NextResponse.json({ message: 'good'})
}
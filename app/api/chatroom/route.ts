import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { NextApiResponse } from 'next';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { senderId, receiverIds } = await req.json();

  if(receiverIds.length < 1 ) {
    return res.status(400)
  }

  const existingRoom = await prisma.chatRoom.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [senderId, ...receiverIds],
          },
        },
        some: {
          id: {
            notIn: receiverIds,
          },
        },
      },
    },
  });

  if (existingRoom) {
    return NextResponse.json(existingRoom);
  }

  const createName = async (id: string) => {
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    })

    return user?.name || 'Unkown User'
  }


  const chatRoom = await prisma.chatRoom.create({
    data: {
      name: receiverIds.length === 1 ? await createName(receiverIds[0]) : 'chat',
      users: {
        connect: [
          { id: senderId }, // Connect the sender
          ...receiverIds.map((id: string) => ({ id })), // Connect the receivers
        ],
      },
    },
    include: {
      users: true, // Include the connected users
    },
  });

  return NextResponse.json(chatRoom);
}

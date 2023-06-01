import SideBar from "../Sidebar";
import Messages from "./Messages";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Room({ params }: any) {
  let users = await prisma.user.findMany();
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email
    }
  })

  users = users.filter((u: any) => u?.id !== user?.id);

  const contacts = await prisma.user
    .findFirst({
      where: {
        id: user?.id as string,
      },
    })
    .chatRooms();

    const messages = await prisma.message.findMany({
      where: {
        chatRoomId: params.room
      }
    })

  return (
    <div className="main flex-1 flex flex-col">
      <div className="hidden lg:block heading flex-2">
        <h1 className="text-3xl text-gray-700 mb-4">Chat</h1>
      </div>

      <div className="flex-1 flex h-full">
        <SideBar users={users} user={user} contacts={contacts} highlighed={params?.room} />
        <Messages roomId={params.room} user={user!} prevMessages={messages} />
      </div>
    </div>
    )
}
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SideBar from "./Sidebar";
import Messages from "./[room]/Messages";

export default async function Chat() {
	let users = await prisma.user.findMany();
	const session = await getServerSession(authOptions)

	if(!session?.user) {
		throw redirect('/api/auth/signin')
	}

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
		.chatRooms({
			include: {
				users: true,
				messages: true
			}
		});

	return (
		<div className="main flex-1 flex flex-col">
			<div className="hidden lg:block heading flex-2">
				<h1 className="text-3xl text-gray-700 mb-4">Chat</h1>
			</div>

			<div className="flex-1 flex h-full">
				<SideBar users={users} user={user} contacts={contacts} highlighed='' />
				<div className="chat-area flex-1 flex flex-col">
					<div className='w-full h-full flex flex-col gap-2 items-center justify-center mb-40'>
						<h2 className='font-bold text-xl'>Your messages</h2>
						<p>Send private messages to a friend or group</p>
						<p>Create new Chats in the sidebar!</p>
					</div>
				</div>
			</div>
		</div>
	)
}
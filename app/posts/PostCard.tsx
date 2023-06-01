import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import PostCardClient from './PostCardClient';

enum TYPE {
	POST,
	COMMENT
}

export default async function PostCard({
	post,
	hover = true,
	borderBottom = false,
	showActions,
	type = TYPE.POST
}: any) {
	const session = await getServerSession(authOptions)!

	const user = await prisma.user.findFirst({
		where: {
			id: post?.authorId,
		},
	});

	return (
		<PostCardClient
			user={user!}
			post={post}
			hover={hover}
			borderBottom={borderBottom}
			showActions={showActions}
			type={type}
			session={session ? true : false}
		/>
	);
}

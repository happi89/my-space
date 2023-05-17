import { prisma } from '@/lib/prisma';
import PostCardClient from './PostCardClient';

export default async function PostCard({
	post,
	hover = true,
	borderBottom = false,
}: any) {
	const user = await prisma.user.findUnique({
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
		/>
	);
}

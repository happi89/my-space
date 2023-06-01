import { prisma } from '@/lib/prisma';
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
	const user = await prisma.user.findFirst({
		where: {
			id: post?.authorId,
		},
	});

	console.log(type, 'TYPE IN POSTCARD')

	return (
		<PostCardClient
			user={user!}
			post={post}
			hover={hover}
			borderBottom={borderBottom}
			showActions={showActions}
			type={type}
		/>
	);
}

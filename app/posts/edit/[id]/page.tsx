import { prisma } from '@/lib/prisma';
import PostForm from '../../PostForm';

interface Props {
	params: {
		id: string;
	};
}

export default async function EditPage({ params }: Props) {
	const postId = params?.id;

	const post = await prisma.post.findFirst({
		where: {
			id: postId,
		},
	});

	const user = await prisma.user.findFirst({
		where: {
			id: post?.authorId,
		},
	});

	return (
		<div className='flex-grow w-full max-w-[600px] mx-auto pt-24'>
			<PostForm
				edit={1 + 1 === 2}
				body={post?.body}
				borderBottom={true}
				user={user!}
				postId={postId}
			/>
		</div>
	);
}

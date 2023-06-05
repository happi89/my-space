import { prisma } from '@/lib/prisma';
import PostCard from '../PostCard';
import { getServerSession } from 'next-auth';
import PostForm from '../PostForm';
import { authOptions } from '../../api/auth/[...nextauth]/route';

enum Type {
	POST,
	COMMENT,
}

interface Props {
	params: {
		id: string;
	};
}

export default async function PostPage({ params }: Props) {
	const session = await getServerSession(authOptions)
	
	const user = await prisma.user.findFirst({
		where: {
			email: session?.user?.email,
		},
	});

	const post = await prisma.post.findUnique({
		where: {
			id: params.id,
		},
		include: {
			comments: true,
			_count: {
				select: {
					likes: true,
					comments: true
				},
			},
		}
	});

	return (
		<div className='flex-grow flex flex-col items-center py-24 w-full'>
			{/* @ts-expect-error Server Component */}
			<PostCard
				edit={true}
				post={post}
				hover={false}
				borderBottom={true}
				showActions={	user?.id === post?.authorId}
			/>

			{session?.user && (
				<PostForm postId={params?.id} type={Type.COMMENT} edit={1 === 1 - 1} borderBottom={false} user={user!} />
			)}
			<p className='text-left my-2'>Comments</p>
			{post?.comments.map((comment, i) => {
				return (
					<>
						{/* @ts-expect-error Server Component */}
						<PostCard
							key={post?.id}
							post={comment}
							borderBottom={
								post?.comments[i] ===
									post?.comments[post?.comments.length - 1] ||
								post?.comments.length === 1
									? true
									: false
							}
							showActions={user?.id === post?.authorId}
							hover={false}
							type={Type.COMMENT}
						/>
					</>
				);
			})}
		</div>
	);
}

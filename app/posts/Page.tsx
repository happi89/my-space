import { prisma } from '@/lib/prisma';
import PostCard from './PostCard';
import PostForm from './PostForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Posts() {
	const posts = await prisma.post.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		take: 10,
	});
	const session = await getServerSession(authOptions);
	const user = await prisma.user.findFirst({
		where: {
			email: session?.user?.email,
		},
	});

	return (
		<div className='flex-grow flex flex-col items-center py-24'>
			{session?.user && <PostForm user={user!} />}
			{posts.map((post, i) => {
				return (
					<>
						{/* @ts-expect-error Server Component */}
						<PostCard
							key={post?.id}
							post={post}
							borderBottom={
								posts[i] === posts[posts.length - 1] || posts.length === 1
									? true
									: false
							}
						/>
					</>
				);
			})}
		</div>
	);
}

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
		take: 20,
		include: {
			_count: {
				select: {
					likes: true,
					comments: true
				},
			},
			likes: true,
		},
	});

	const session = await getServerSession(authOptions);
	const user = await prisma.user.findFirst({
		where: {
			email: session?.user?.email,
		},
	});

	// const fetchMorePosts = async () => {
	// 	const data = await prisma.post
	// 		.findMany({
	// 			orderBy: {
	// 				createdAt: 'desc',
	// 			},
	// 			skip: postCount,
	// 			take: 10,
	// 		})
	// 		.then((posts) => setPosts((prevPosts) => [...prevPosts, ...posts]));

	// 	setPostCount((count) => (count += 10));
	// };

	return (
		<div className='flex-grow flex flex-col items-center py-24'>
			{session?.user && (
				<PostForm edit={1 === 1 - 1} borderBottom={false} user={user!} />
			)}
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
							showActions={user?.id === post?.authorId}
						/>
					</>
				);
			})}
			{/* <button onClick={fetchMorePosts}>Show More</button> */}
		</div>
	);
}

import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import FollowButton from '../FollowButton';

interface Props {
	params: {
		id: string;
	};
}

export default async function UserPage({ params }: Props) {
	const user = await prisma.user.findUnique({
		where: {
			id: params.id,
		},
		include: {
			following: true,
			followers: true,
		},
	});

	const numberOfPosts = await prisma.post.count({
		where: {
			authorId: user?.id,
		},
	});

	console.log(numberOfPosts);

	return (
		<div className='min-w-[48rem] flex-grow justify-center pt-32 flex gap-16 bg-[#f5f5f5] text-black'>
			<Image
				src={user?.image ?? '/../public/mememan.jpeg'}
				alt='User Profiler Image'
				height={160}
				width={180}
				className='max-h-[200px] max-w-[180px]'
				priority={true}
			/>
			<div className='flex flex-col gap-6'>
				<div className='flex gap-8'>
					<h1 className='text-3xl'>{user?.name}</h1>
					{/* @ts-expect-error Server Component */}
					<FollowButton targetUserId={params?.id} />
				</div>
				<div className='flex gap-8 text-neutral'>
					<span>
						{numberOfPosts} Post{numberOfPosts === 1 ? '' : 's'}
					</span>
					<span>
						{user?.following.length} Follower
						{user?.following.length! === 1 ? '' : 's'}
					</span>
					<span>{user?.followers.length} Following</span>
				</div>
				<p className='text-neutral'>Age: {user?.age ?? 'mystery'}</p>
				<p className='max-w-prose'>{user?.bio}</p>
			</div>
		</div>
	);
}

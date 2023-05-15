import { FollowButtonClient } from './FollowButtonClient';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

interface Props {
	targetUserId: string;
}

export default async function FollowButton({ targetUserId }: Props) {
	const session = await getServerSession(authOptions);

	const currentUserId = await prisma.user
		.findUnique({
			where: {
				email: session?.user?.email!,
			},
		})
		.then((user) => user?.id!);

	const isFollowing = await prisma.follows.findFirst({
		where: {
			followerId: currentUserId,
			followingId: targetUserId,
		},
	});

	return (
		<>
			{currentUserId !== targetUserId ? (
				<FollowButtonClient
					targetUserId={targetUserId}
					isFollowing={!!isFollowing}
					currentUserId={currentUserId}
				/>
			) : (
				''
			)}
		</>
	);
}

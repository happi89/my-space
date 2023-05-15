'use client';

import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
	targetUserId: string;
	isFollowing: boolean;
	currentUserId: string;
}

export function FollowButtonClient({
	targetUserId,
	isFollowing,
	currentUserId,
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);
	const isMutating = isFetching || isPending;
	const router = useRouter();

	const follow = async () => {
		setIsFetching(true);

		const res = await fetch('/api/follow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ targetUserId }),
		});

		setIsFetching(false);

		startTransition(() => router.refresh());
	};

	const unfollow = async () => {
		setIsFetching(true);

		const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
			method: 'DELETE',
		});

		setIsFetching(false);

		startTransition(() => router.refresh());
	};

	return (
		<>
			{isFollowing ? (
				<button
					className={`btn btn-primary btn-sm text-white ${
						isMutating ? 'loading' : ''
					}`}
					onClick={unfollow}>
					{isMutating ? 'Loading' : 'Following'}
				</button>
			) : (
				<button
					className={`btn btn-primary btn-sm text-white ${
						isMutating ? 'loading' : ''
					}`}
					onClick={follow}>
					{isMutating ? 'Loading' : 'Follow'}
				</button>
			)}
		</>
	);
}

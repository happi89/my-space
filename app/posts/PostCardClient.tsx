'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Edit } from 'lucide-react';
import { MouseEvent, useState, useTransition } from 'react';
import { User, Post } from '@prisma/client';
import useNotification from '@/hooks/useNotification';
import Alert from '@/components/Alert';
import SuccessSvg from '../../components/SuccessSvg';

interface Props {
	post: Post;
	user: User;
	hover: string;
	borderBottom: string;
}

export default function PostCardClient({
	post,
	user,
	hover,
	borderBottom,
}: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);
	const isMutating = isFetching || isPending;
	const { showNotification, setShowNotification } = useNotification();

	const handleUserClick = (e: MouseEvent) => {
		e.stopPropagation();
		router.push(`/users/${user?.id}`);
	};

	const deletePost = async (e: MouseEvent) => {
		e.stopPropagation();
		setIsFetching(true);

		const res = await fetch(`/api/posts?postId=${post?.id}`, {
			method: 'DELETE',
		});

		await res.json();
		setIsFetching(false);
		startTransition(() => {
			router.refresh();
			setShowNotification(true);
		});
	};

	return (
		<div
			className={`flex gap-4 max-w-[600px] w-full h-fit border px-4 pt-6 hover:cursor-pointer border-gray-200 ${
				hover ? 'hover:bg-[#f7f7f7]' : ''
			} ${!borderBottom && 'border-b-0'} transition-all duration-300`}
			onClick={() => router.push(`/posts/${post?.id}`)}>
			{showNotification && (
				<Alert icon={<SuccessSvg />} text='Post deleted Successfully!' />
			)}

			<div className='max-h-min'>
				<Link onClick={handleUserClick} href={`/users/${user?.id}`} passHref>
					<Image
						src={user?.image ?? '../public/mememan.jpeg'}
						alt='User Image'
						height={40}
						width={40}
						className='h-min rounded-md brightness-100 hover:brightness-75 transition-all duration-300'
					/>
				</Link>
			</div>

			<div className='flex flex-col gap-4 w-full'>
				<div className='flex gap-4 items-center'>
					<Link onClick={handleUserClick} href={`/users/${user?.id}`} passHref>
						<p className='text-lg hover:underline h-min'>{user?.name}</p>
					</Link>
					<p className='text-sm max-h-min text-gray-500'>
						{post?.createdAt.toLocaleString()}
					</p>
				</div>

				<p className='pb-6'>{post?.body}</p>
			</div>

			<div className='ml-auto flex gap-4'>
				<Edit size={20} className='hover:text-blue-700' />
				<Trash2 onClick={deletePost} size={20} className='hover:text-red-600' />
			</div>
		</div>
	);
}

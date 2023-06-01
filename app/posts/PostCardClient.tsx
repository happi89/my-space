'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
	Trash2,
	Edit,
	Heart,
	MessageCircle,
	Link as LinkIcon,
} from 'lucide-react';
import { MouseEvent, useState, useTransition } from 'react';
import { User, Post, Like } from '@prisma/client';
import useNotification from '@/hooks/useNotification';
import Alert from '@/components/Alert';
import SuccessSvg from '../../components/SuccessSvg';

enum Type {
	POST,
	COMMENT,
}

interface PostWithLikes extends Post {
	_count: {
		likes: number;
		comments: number;
	};
	likes: Like[];
}

interface Props {
	post: PostWithLikes;
	user: User;
	hover: string;
	borderBottom: string;
	showActions: boolean;
	type: Type;
}

export default function PostCardClient({
	post,
	user,
	hover,
	borderBottom,
	showActions,
	type,
}: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const { showNotification, setShowNotification } = useNotification();
	const [notificationText, setNotificationText] = useState('');
	const [userLiked, setUserLiked] = useState(
		post?.likes?.some((like) => {
			return like?.userId === user?.id;
		})
	);
	const [likes, setLikes] = useState(post?._count?.likes || 0);
	const [deleted, setDeleted] = useState(false);

	console.log(type, 'TYPE IN POSTCARDCLIENT');

	const handleUserClick = (e: MouseEvent) => {
		e.stopPropagation();
		router.push(`/users/${user?.id}`);
	};

	const handleEditClick = (e: MouseEvent) => {
		e.stopPropagation();
		router.push(`/posts/edit/${post?.id}`);
	};

	const deletePost = async (e: MouseEvent) => {
		e.stopPropagation();
		setDeleted(true);

		const res = await fetch(`/api/posts?postId=${post?.id}`, {
			method: 'DELETE',
		});

		await res.json();
		startTransition(() => {
			router.refresh();
			setNotificationText('Post Deleted Successfully!');
			setShowNotification(true);
		});
	};

	const likePost = async (e: MouseEvent) => {
		e.stopPropagation();
		setUserLiked(!userLiked);
		userLiked
			? setLikes((likes) => (likes -= 1))
			: setLikes((likes) => (likes += 1));
		const res = await fetch('/api/like', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				type: type === Type.POST ? 'post' : 'comment',
				postId: post?.id,
				userId: user?.id,
			}),
		});

		await res.json();
	};

	const copyLink = (e: MouseEvent) => {
		e.stopPropagation();
		navigator.clipboard.writeText(window.location.href + '/' + post?.id);
		setNotificationText('Post Link Copied!');
		setShowNotification(true);
	};

	const bookmarkPost = async (e: MouseEvent) => {
		e.stopPropagation();
	};

	const comment = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const deleteComment = async (e: MouseEvent) => {
		e.stopPropagation();
		setDeleted(true);

		const res = await fetch(`/api/comments?commentId=${post?.id}`, {
			method: 'DELETE',
		});

		await res.json();
		startTransition(() => {
			router.refresh();
			setNotificationText('Comment Deleted Successfully!');
			setShowNotification(true);
		});
	};

	const handleDelete = type === Type.POST ? deletePost : deleteComment;

	return (
		<div
			className={`${
				deleted ? 'hidden' : ''
			} flex gap-4 max-w-[600px] w-full h-fit border px-4 pt-6 hover:cursor-pointer border-gray-200 ${
				hover ? 'hover:bg-[#f7f7f7]' : ''
			} ${!borderBottom && 'border-b-0'} transition-all duration-300`}
			onClick={() => router.push(`/posts/${post?.id}`)}>
			{showNotification && (
				<Alert icon={<SuccessSvg />} text={notificationText} />
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

			<div className='flex flex-col gap-4 w-full max-w-[400px]'>
				<div className='flex gap-4 items-center'>
					<Link onClick={handleUserClick} href={`/users/${user?.id}`} passHref>
						<p className='text-lg hover:underline h-min'>{user?.name}</p>
					</Link>
					<p className='text-sm max-h-min text-gray-500'>
						{post?.createdAt.toLocaleString()}
					</p>
				</div>
				<div className='my-2'>
					<p className='break-words max-w-[40ch]'>{post?.body}</p>
				</div>
				<span className='flex gap-4 w-min rounded-full pb-4'>
					<span
						className={`flex gap-2 items-bottom hover:text-red-600 hover:scale-110 ${
							userLiked ? 'text-red-600' : ''
						}`}
						onClick={likePost}>
						<Heart
							fill={userLiked ? 'red' : 'white'}
							strokeWidth={2.5}
							size={18}
						/>
						<p className='text-sm'>{likes}</p>
					</span>
					{type === Type.POST && (
						<>
							<span className='flex gap-2 items-bottom hover:text-blue-600 hover:scale-110'>
								<MessageCircle onClick={comment} strokeWidth={2.5} size={18} />
								<p className='text-sm'>{post?._count?.comments || 0}</p>
							</span>
							<button
								data-tip='Copy Link To Post'
								className='tooltip flex gap-2 items-bottom hover:text-blue-600 hover:scale-110'>
								<LinkIcon onClick={copyLink} size={20} />
							</button>
						</>
					)}
				</span>
			</div>

			<div className={`ml-auto flex gap-4 ${showActions || 'hidden'}`}>
				{type === Type.POST && (
					<Edit
						onClick={handleEditClick}
						size={20}
						className='hover:text-blue-700 hover:scale-110'
					/>
				)}
				<Trash2
					onClick={handleDelete}
					size={20}
					className='hover:text-red-600 hover:scale-110'
				/>
			</div>
		</div>
		// <a
		// 	href='#'
		// 	className='relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8'>
		// 	<div className='sm:flex sm:justify-between sm:gap-4'>
		// 		<div>
		// 			<Link href={`/users/${user?.id}`}>
		// 				<h3 className='text-lg font-bold text-gray-900 sm:text-xl hover:cursor-pointer hover:underline'>
		// 					{user?.name}
		// 				</h3>
		// 			</Link>

		// 			<p className='mt-1 text-xs font-medium text-gray-600'>
		// 				{post?.createdAt.toLocaleString()}
		// 			</p>
		// 		</div>

		// 		<div className='hidden sm:block sm:shrink-0'>
		// 			<Link href={`/users/${user?.id}`}>
		// 				<Image
		// 					src={user?.image ?? '../public/mememan.jpeg'}
		// 					alt='User Image'
		// 					height={50}
		// 					width={50}
		// 					className='h-min rounded-md brightness-100 hover:brightness-75 transition-all duration-300'
		// 				/>
		// 			</Link>
		// 		</div>
		// 	</div>

		// 	<div className='mt-4'>
		// 		<p className='max-w-[40ch] text-md text-gray-500 break-words'>
		// 			{post?.body}
		// 		</p>
		// 	</div>
		// 	<dl className='mt-6 flex gap-4 sm:gap-6'>
		// 		<div className='flex flex-col-reverse'>
		// 			<dt className='text-sm font-medium text-gray-600'>Published</dt>
		// 			<dd className='text-xs text-gray-500'>31st June, 2021</dd>
		// 		</div>

		// 		<div className='flex flex-col-reverse'>
		// 			<dt className='text-sm font-medium text-gray-600'>Reading time</dt>
		// 			<dd className='text-xs text-gray-500'>3 minute</dd>
		// 		</div>
		// 	</dl>
		// </a>
	);
}

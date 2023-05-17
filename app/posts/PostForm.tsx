'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import Alert from '@/components/Alert';
import SuccessSvg from '../../components/SuccessSvg';
import useNotification from '../../hooks/useNotification';

interface Props {
	user: User;
}

export default function PostForm({ user }: Props) {
	const [text, setText] = useState('');
	const [characterCount, setCharacterCount] = useState(0);
	const [isFetching, setIsFetching] = useState(false);
	const [isPending, startTransition] = useTransition();
	const isMutating = isFetching || isPending;

	const router = useRouter();
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const { showNotification, setShowNotification } = useNotification();

	const handleInputChange = (event: any) => {
		const inputText = event.target.value;
		setText(inputText);
		setCharacterCount(inputText.length);
	};

	useEffect(() => {
		const textarea = textareaRef.current;

		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, [text]);

	const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (characterCount > 280 || characterCount < 1) return;
		setIsFetching(true);

		const body = {
			body: text,
			authorId: user?.id,
		};

		const res = await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		setIsFetching(false);
		startTransition(() => {
			router.refresh();
			setCharacterCount(0);
			setText('');
			return setShowNotification(true);
		});
	};

	return (
		<div className='border border-gray-200 w-full max-w-[600px] p-4 border-b-0 flex flex-col gap-2'>
			{showNotification ? (
				<Alert
					type='success'
					text='Your post was posted successfully!'
					icon={<SuccessSvg />}
				/>
			) : (
				''
			)}
			<div className='flex gap-4'>
				<Image
					src={user?.image ?? '/public/mememan.jpeg'}
					alt='User Image'
					height={36}
					width={36}
					className='h-[36px] w-[36px] rounded-md brightness-100 hover:brightness-75 transition-all duration-300'
				/>
				<p className='text-lg hover:underline'>{user?.name}</p>
			</div>
			<form onSubmit={handlePost} className='flex flex-col gap-2'>
				<textarea
					ref={textareaRef}
					value={text}
					onChange={handleInputChange}
					placeholder='What is happening?!'
					className='w-full max-w-md p-0 mt-1 border-none focus:ring-0 resize-none'
					rows={1}
					name='text'
				/>

				<div className='ml-auto flex gap-4 items-center'>
					<div
						className={`radial-progress text-sm ${
							characterCount >= 260 && characterCount < 280
								? 'text-warning'
								: characterCount >= 280
								? 'text-error'
								: 'text-primary'
						} ${characterCount === 0 ? 'invisible' : ''}`}
						style={{
							/* @ts-expect-error */
							'--value': Math.round((characterCount / 280) * 98.5),
							'--size': '40px',
							'--thickness': '3px',
						}}>
						{characterCount}
					</div>
					<button
						type='submit'
						className={`btn btn-primary btn-sm text-white ${
							isMutating ? 'loading' : ''
						} ${
							characterCount === 0 || characterCount > 280 ? 'btn-disabled' : ''
						}`}>
						Post
					</button>
				</div>
			</form>
		</div>
	);
}

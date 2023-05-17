'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className='w-full min-h-screen text-black flex-grow flex flex-col items-center justify-center'>
			<h1>Not found – 404!</h1>
		</div>
	);
}

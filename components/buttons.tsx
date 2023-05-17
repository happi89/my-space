'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';

export function SignInButton() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <div className='py-1'>...</div>;
	}

	if (status === 'authenticated') {
		return (
			<div className='sm:flex flex-col sm:flex-row items-start sm:items-center gap-6'>
				<Link href='/dashboard'>
					<Image
						src={session.user?.image ?? '../public/mememan.jpeg'}
						height={32}
						width={32}
						alt='user avatar'
						className='rounded-md brightness-100 hover:brightness-75 transition-all duration-300'
					/>
				</Link>
				<SignOutButton />
			</div>
		);
	}

	return (
		<button className={signInButton} onClick={() => signIn('github')}>
			Sign In
		</button>
	);
}

export function SignOutButton() {
	return (
		<button className={signInButton} onClick={() => signOut()}>
			Sign Out
		</button>
	);
}

const signInButton = 'btn btn-sm btn-secondary text-black';

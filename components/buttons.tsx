'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';

export function SignInButton() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <>...</>;
	}

	if (status === 'authenticated') {
		return (
			<>
				<Link href='/dashboard'>
					<Image
						src={session.user?.image ?? '../public/mememan.jpeg'}
						height={24}
						width={24}
						alt='user avatar'
					/>
				</Link>
				<SignOutButton />
			</>
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

const signInButton = 'py-1 px-3 rounded-lg border border-1';

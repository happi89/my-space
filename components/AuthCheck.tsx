'use client';

import { useSession } from 'next-auth/react';

interface Props {
	children: React.ReactNode;
}

export default function AuthCheck({ children }: Props) {
	const { data: session } = useSession();

	console.log(session);

	if (session) {
		return <>{children}</>;
	} else {
		return (
			<>
				<h1 className='text-3xl text-red-600'>ERROR: Not Logged In</h1>
			</>
		);
	}
}

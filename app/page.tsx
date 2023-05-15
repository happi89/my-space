import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
	const session = await getServerSession(authOptions);

	if (!session) {
		<p>You must be signed in...</p>;
		return redirect('/api/auth/signin');
	}

	return (
		<div>
			<h1>Hello World</h1>
		</div>
	);
}

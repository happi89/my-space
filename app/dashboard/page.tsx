import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import UserForm from './UserForm';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		throw redirect('/api/auth/signin')
	}

	const currentUserEmail = session?.user?.email!;

	const currentUser = await prisma.user.findFirst({
		where: {
			email: currentUserEmail,
		},
		include: {
			followers: true,
			following: true,
		},
	});

	if (!session) {
		<p>You must be signed in...</p>;
		return redirect('/api/auth/signin');
	}

	return (
		<div className='pt-8'>
			<UserForm user={currentUser} />
		</div>
	);
}

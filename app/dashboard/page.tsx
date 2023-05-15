import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import UserForm from './UserForm';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	const currentUserEmail = session?.user?.email!;

	const currentUser = await prisma.user.findUnique({
		where: {
			email: currentUserEmail,
		},
	});

	if (!session) {
		<p>You must be signed in...</p>;
		return redirect('/api/auth/signin');
	}

	return (
		<div className=''>
			<UserForm user={currentUser} />
		</div>
	);
}

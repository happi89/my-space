import UserCard from '@/app/users/UserCard';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Users',
	description: 'Page with list of all users',
};

export default async function UsersPage() {
	const users = await prisma.user.findMany();

	return (
		<div className='w-full flex-grow sm:px-4 md:px-20 sm:py-20 py-12 px-2 flex justify-center flex-wrap sm:gap-12 gap-8 bg-[#e5e5e5]'>
			{users.map((user) => {
				return <UserCard key={user?.id} user={user} />;
			})}
		</div>
	);
}

import Image from 'next/image';
import Link from 'next/link';

interface user {
	id: string;
	name: string | null;
	age: number | null;
	bio: string | null;
	image: string | null;
}

interface Props {
	user: user;
}

export default function UserCard({ user }: Props) {
	return (
		<div className='shadow-sm rounded-md card w-60 bg-base-100 text-black hover:bg-[#eaeaea] transition-all duration-300'>
			<Link href={`/users/${user?.id}`}>
				<figure>
					<Image
						src={user?.image ?? '../public/mememan.jpeg'}
						alt='User Profiler Image'
						height={60}
						width={384}
						className='rounded-t-md brightness-100 hover:brightness-90 transition-all duration-300'
					/>
				</figure>
				<div className='card-body'>
					<h2 className='card-title hover:underline'>
						{user?.name ?? 'anonymous'}
					</h2>
					<p className=''>age: {user?.age ?? 'mystery'}</p>
				</div>
			</Link>
		</div>
	);
}

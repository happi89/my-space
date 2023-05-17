import { prisma } from '@/lib/prisma';
import PostCard from '../PostCard';

interface Props {
	params: {
		id: string;
	};
}

export default async function PostPage({ params }: Props) {
	const post = await prisma.post.findUnique({
		where: {
			id: params.id,
		},
	});
	return (
		<div className='flex-grow flex justify-center pt-24 w-full'>
			{/* @ts-expect-error Server Component */}
			<PostCard post={post} hover={false} borderBottom={true} />
		</div>
	);
}

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);

	const user = await prisma.user.findFirst({
		where: {
			email: session?.user?.email!,
		},
	});

	const { postId, userId, type } = await req.json();
	let like = null;

	if (type === 'post') {
		like = await prisma.like.findFirst({
			where: {
				postId,
				userId,
			},
		});
	} else {
		like = await prisma.like.findFirst({
			where: {
				commentId: postId,
				userId,
			},
		});
	}


	if (like) {
		const res = await prisma.like.delete({
			where: {
				id: like?.id,
			},
		});

		return NextResponse.json(res);
	}

	if (type === 'post') {
		const res = await prisma.like.create({
			data: {
				postId,
				userId,
			},
		});
		return NextResponse.json(res);
	} else {
		const res = await prisma.like.create({
			data: {
				commentId: postId,
				userId,
			},
		});
		return NextResponse.json(res);
	}

}

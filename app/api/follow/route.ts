import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);

	const currentUserEmail = session?.user?.email!;
	const { targetUserId } = await req?.json();

	const currentUserId: string = await prisma.user
		.findUnique({
			where: {
				email: currentUserEmail,
			},
		})
		.then((user) => user?.id!);

	const res = await prisma.follows.create({
		data: {
			followerId: currentUserId,
			followingId: targetUserId,
		},
	});

	return NextResponse.json(res);
}

export async function DELETE(req: NextRequest) {
	const session = await getServerSession(authOptions);

	const currentUserEmail = session?.user?.email!;
	const targetUserId = req.nextUrl.searchParams.get('targetUserId')!;

	const currentUserId = await prisma.user
		.findUnique({
			where: {
				email: currentUserEmail,
			},
		})
		.then((user) => user?.id!);

	const res = await prisma.follows.delete({
		where: {
			followerId_followingId: {
				followerId: currentUserId,
				followingId: targetUserId,
			},
		},
	});

	return NextResponse.json(res);
}

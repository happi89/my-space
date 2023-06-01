import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextApiResponse } from 'next';
import { User } from '@prisma/client';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const postId = searchParams.get('postId')!;

	const post = await prisma.post.findFirst({
		where: {
			id: postId,
		},
	});

	return NextResponse.json(post);
}

export async function POST(req: NextRequest) {
	const data = await req.json();

	const res = await prisma.post.create({
		data,
	});

	return NextResponse.json(res);
}

export async function DELETE(req: NextRequest, res: NextApiResponse) {
	const session = await getServerSession(authOptions);

	const user = await prisma.user.findFirst({
		where: {
			email: session?.user?.email,
		},
	});

	const postId = req.nextUrl.searchParams.get('postId')!;

	const authorId = await prisma.post
		.findFirst({
			where: {
				id: postId,
			},
		})
		.then((post) => post?.authorId!);

	if (!postId || !authorId) {
		return res.status(404);
	}

	if (authorId !== user?.id) {
		return res.status(403).end();
	}

	const response = await prisma.post.delete({
		where: {
			id: postId,
		},
	});

	return NextResponse.json(response);
}

export async function PUT(req: NextRequest, res: NextApiResponse) {
	const session = await getServerSession(authOptions);

	const user = await prisma.user.findFirst({
		where: {
			email: session?.user?.email,
		},
	});

	const postId = req.nextUrl.searchParams.get('postId')!;

	const authorId = await prisma.post
		.findFirst({
			where: {
				id: postId,
			},
		})
		.then((post) => post?.authorId!);

	if (!postId || !authorId) {
		return res.status(404);
	}

	if (authorId !== user?.id) {
		return res.status(403).end();
	}

	const data = await req.json();

	const response = await prisma.post.update({
		where: {
			id: postId,
		},
		data,
	});

	return NextResponse.json(response);
}

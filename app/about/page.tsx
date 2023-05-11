import { Metadata } from 'next';

export default function AboutPage() {
	return (
		<main className='flex-grow pt-16 px-20 bg-[#f5f5f5]'>
			<h2 className='font-bold text-2xl'>About</h2>
			<p className='mt-8 max-w-prose leading-8'>{aboutText}</p>
		</main>
	);
}

const aboutText = `
Welcome to MyClone, a social network inspired by the original MySpace.
Express yourself with customizable profiles, and connect with friends.
Join our community of passionate individuals today and start sharing
your unique story with the world.
`;

export const metadata: Metadata = {
	title: 'About Page',
	description: aboutText,
};

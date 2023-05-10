import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
	return (
		<nav className={nav}>
			<h1 className='text-lg'>
				<Link href='/'>MySpace.com</Link>
			</h1>
			{/* <Image
				src='../public/myspace-logo.svg'
				height={24}
				width={72}
				alt='Logo'
			/> */}
			<ul className='flex gap-8'>
				<li className={hoverUnderline}>
					<Link href='/about'>About</Link>
				</li>
				<li className={hoverUnderline}>
					<Link href='/blogs'>Blogs</Link>
				</li>
				<li className={hoverUnderline}>
					<Link href='/users'>Users</Link>
				</li>
			</ul>
		</nav>
	);
}

const nav =
	'w-full px-16 flex justify-between items-center py-4 bg-[#214FC6] text-white';
const hoverUnderline = 'hover:underline';

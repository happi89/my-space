import Link from 'next/link';
import { SignInButton } from './buttons';
import Hamburger from './Hamburger';

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
			<Hamburger />
			<ul className='sm:flex items-center gap-10 hidden'>
				<li className={hover}>
					<Link href='/about'>About</Link>
				</li>
				<li className={hover}>
					<Link href='/posts'>Posts</Link>
				</li>
				<li className={hover}>
					<Link href='/users'>Users</Link>
				</li>
				<li>
					<SignInButton />
				</li>
			</ul>
		</nav>
	);
}

const nav =
	'shadow-md w-full sm:px-8 md:px-20 px-4 flex justify-between items-center sm:py-4 py-2 bg-primary text-white';
const hover =
	'text-sm hover:scale-110 transition duration-300 transform origin-center';

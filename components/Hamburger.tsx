import Link from 'next/link';
import { SignInButton } from './buttons';

export default function Hamburger() {
	return (
		<div className='dropdown dropdown-end'>
			<label tabIndex={0} className='btn btn-ghost sm:hidden'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M4 6h16M4 12h8m-8 6h16'
					/>
				</svg>
			</label>
			<ul
				tabIndex={0}
				className='text-white bg-primary menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52'>
				<li>
					<Link href='/about'>About</Link>
				</li>
				<li>
					<Link href='/blogs'>Blogs</Link>
				</li>
				<li>
					<Link href='/users'>Users</Link>
				</li>
				<li>
					<SignInButton />
				</li>
			</ul>
		</div>
	);
}

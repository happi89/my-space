import Navbar from './Navbar';
import Footer from './Footer';
import './globals.css';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'My Space Clone',
	description: 'This is a My Space Clone using NextJS 13.4',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			{/* <body className={inter.className}>{children}</body> */}
			<body className='flex flex-col min-h-screen'>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}

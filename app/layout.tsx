import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthProvider from '../components/AuthProvider';
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
	subsets: ['latin'],
	weight: '400',
});

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
		<AuthProvider>
			<html lang='en'>
				{/* <body className={inter.className}>{children}</body> */}
				<body
					className={`bg-[#f5f5f5] ${poppins.className} flex flex-col min-h-screen`}>
					<Navbar />
					{children}
					<Footer />
				</body>
			</html>
		</AuthProvider>
	);
}

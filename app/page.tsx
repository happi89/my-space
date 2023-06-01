import { redirect } from "next/navigation";

export default async function Home() {

	throw redirect('/about')

	return (
		<div className='mt-[-8rem] flex-grow w-full min-h-screen flex justify-center items-center'>
			<h1 className='text-3xl font-bold tracking-widest'>MYSPACE</h1>
		</div>
	);
}

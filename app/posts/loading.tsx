import Loader from '@/components/Loader';

export default function loader() {
	// return <Loader />;
	return (
		<div
			className={`pt-24 flex gap-4 max-w-[600px] mx-auto w-full h-fit border px-4 border-gray-200`}>
			<div className='animate-pulse w-full'>
				<div className='w-full flex-col gap-4'>
					<div className='flex gap-4 w-full items-end pl-4'>
						<span className='w-12 h-12 block bg-slate-200 rounded-md dark:bg-slate-500'></span>
						<span className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></span>
					</div>
					<div className='w-full flex flex-col gap-2 pl-4 pt-4'>
						<span className='pl-4 w-60 h-4 bg-slate-200 rounded-md dark:bg-slate-500'></span>
						<div className='divider'></div>
						<span className='ml-auto w-8 h-4 bg-slate-200 rounded-md dark:bg-slate-500'></span>
					</div>
				</div>

				<div className='divider'></div>
				<div className='flex gap-4 w-full items-end pl-4'>
					<span className='w-12 h-12 block bg-slate-200 rounded-md dark:bg-slate-500'></span>
					<span className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></span>
				</div>

				<div className='ml-4 mt-2 w-full pt-4'>
					<ul className='mt-5 space-y-3'>
						<li className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></li>
						<li className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></li>
						<li className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></li>
						<li className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></li>
					</ul>
				</div>
				<div className='divider'></div>
				<div className='flex gap-4 w-full items-end pl-4'>
					<span className='w-12 h-12 block bg-slate-200 rounded-md dark:bg-slate-500'></span>
					<span className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></span>
				</div>

				<div className='ml-4 mt-2 w-full pt-4'>
					<ul className='mt-5 space-y-3'>
						<li className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></li>
						<li className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></li>
						<li className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></li>
						<li className='w-full h-4 bg-slate-200 rounded-md dark:bg-slate-500'></li>
					</ul>
				</div>
			</div>
		</div>
	);
}

'use client';

interface Props {
	error: Error;
	reset: () => void;
}

export default function Error({ error, reset }: Props) {
	return (
		<div className='px-20'>
			<h1>Oops something went wrong ):</h1>
			<button
				onClick={() => reset()}
				className='px-8 py-1 bg-[#214FC6] rounded-md text-white font-bold shadow-sm hover:bg-[#275ce5] focus:bg-white focus:text-[#214FC6] focus:border focus:border-[#214FC6]'>
				Try Again
			</button>
		</div>
	);
}

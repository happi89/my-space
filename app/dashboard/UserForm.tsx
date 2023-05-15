'use client';
import { useRouter } from 'next/navigation';

export default function UserForm({ user }: any) {
	const router = useRouter();

	const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const body = {
			name: formData.get('name') ?? user?.name,
			age: Number(formData.get('age')) ?? user?.age,
			image: formData.get('image') ?? user?.image,
			bio: formData.get('bio') ?? user?.bio,
		};

		const res = await fetch('/api/users', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		await res.json();
		router.refresh();
	};

	return (
		<div className='flex-grow flex justify-center px-4 py-16'>
			<form className='max-w-[600px] justify-center' onSubmit={updateUser}>
				<div className='space-y-12'>
					<div className='border-b border-gray-900/10 pb-12'>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>
							Profile
						</h2>
						<p className='mt-1 text-sm leading-6 text-gray-600'>
							This information will be displayed publicly so be careful what you
							share.
						</p>

						<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
							<div className='col-span-4'>
								<label
									htmlFor='name'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Full Name
								</label>
								<div className='mt-2'>
									<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-md'>
										<input
											defaultValue={user?.name}
											type='text'
											name='name'
											id='name'
											className='block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm leading-6'
											placeholder='John Doe'
										/>
									</div>
								</div>
							</div>

							<div className='col-span-4'>
								<label
									htmlFor='age'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Age
								</label>
								<div className='mt-2'>
									<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-md'>
										<input
											defaultValue={user?.age}
											type='number'
											name='age'
											id='age'
											className='block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm leading-6'
											placeholder='32'
										/>
									</div>
								</div>
							</div>

							<div className='col-span-4'>
								<label
									htmlFor='image'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Image Link
								</label>
								<div className='mt-2'>
									<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-md'>
										<input
											defaultValue={user?.image}
											type='text'
											name='image'
											id='image'
											className='block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm leading-6'
											placeholder='http://example.com'
										/>
									</div>
								</div>
							</div>

							<div className='col-span-4'>
								<label
									htmlFor='bio'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Bio
								</label>
								<p className='mt-3 text-sm leading-6 text-gray-600'>
									Write a few sentences about yourself.
								</p>
								<div className='mt-2'>
									<textarea
										defaultValue={user?.bio}
										id='bio'
										name='bio'
										className='px-2 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6'></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='button'
						className='text-sm font-semibold leading-6 text-gray-900'>
						Cancel
					</button>
					<button type='submit' className='btn btn-sm btn-primary text-white'>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

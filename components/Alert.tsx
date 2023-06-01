interface Props {
	type?: string;
	text: string;
	icon: JSX.Element;
}

export default function Alert({ type = 'success', text, icon }: Props) {
	return (
		<div className='toast toast-end'>
			<div className={`alert alert-success alert-${type} shadow-md`}>
				<div>
					{icon}
					<span>{text}</span>
				</div>
			</div>
		</div>
	);
}

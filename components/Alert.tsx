interface Props {
	type: string;
	text: string;
	icon: React.ReactNode;
}

export default function Alert({ type, text, icon }: Props) {
	return (
		<div className={`alert alert-${type} shadow-lg`}>
			<div>
				{icon}
				<span>{text}</span>
			</div>
		</div>
	);
}

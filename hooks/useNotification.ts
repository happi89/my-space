import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface State {
	showNotification: boolean;
	setShowNotification: Dispatch<SetStateAction<boolean>>;
}

const useNotification = (): State => {
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (showNotification) {
			timeout = setTimeout(() => {
				setShowNotification(false);
				clearTimeout(timeout);
			}, 5000);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [showNotification]);

	return { showNotification, setShowNotification };
};

export default useNotification;

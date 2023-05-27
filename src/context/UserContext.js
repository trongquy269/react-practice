import { createContext, useState, useEffect } from 'react';

export const UserProvider = createContext();

const UserContext = ({ children }) => {
	const [user, setUser] = useState({ email: '', auth: false });

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const email = localStorage.getItem('email');
			loginContext(email, token);
		}
	}, []);

	const loginContext = (email, token) => {
		localStorage.setItem('token', token);
		localStorage.setItem('email', email);
		setUser({ email, auth: true });
	};

	const logoutContext = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		setUser({ email: '', auth: false });
	};

	return (
		<UserProvider.Provider value={{ user, loginContext, logoutContext }}>
			{children}
		</UserProvider.Provider>
	);
};

export default UserContext;

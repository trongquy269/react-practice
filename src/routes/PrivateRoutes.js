import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { UserProvider } from '../context/UserContext';

const PrivateRoutes = (props) => {
	const { user } = useContext(UserProvider);

	if (user && !user.auth) {
		return (
			<Alert
				variant='danger'
				className='mt-3'
			>
				<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
				<p>You don't have permission to access this page.</p>
			</Alert>
		);
	}

	return <>{props.children}</>;
};

export default PrivateRoutes;

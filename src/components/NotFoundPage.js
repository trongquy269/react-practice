import Alert from 'react-bootstrap/Alert';

const NotFoundPage = () => {
	return (
		<Alert
			variant='dark'
			className='mt-3'
		>
			<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
			<p>Not Found 404</p>
		</Alert>
	);
};

export default NotFoundPage;

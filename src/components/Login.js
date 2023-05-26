import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, ToastContainer, Toast } from 'react-bootstrap';
import { login } from '../services/UserService';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [stateShowToast, setStateShowToast] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/');
		}
	}, []);

	const handleSubmit = async () => {
		if (!email || !password) {
			setStateShowToast('wrong');
			return;
		}

		setLoading(true);

		const res = await login(email, password);

		if (res && res.token) {
			setEmail('');
			setPassword('');
			localStorage.setItem('token', res.token);
			navigate('/');
		} else if (res && res.status === 400) {
			setStateShowToast(res.data.error);
		}

		setLoading(false);
	};

	return (
		<div>
			<Form
				className='d-flex flex-column mw-100 ms-auto me-auto mt-5'
				style={{ width: '500px' }}
			>
				<Form.Group className='d-flex flex-row justify-content-between gap-1'>
					<Button
						variant='primary'
						className='w-50 py-2'
					>
						LOGIN
					</Button>
					<Button
						variant='secondary'
						className='w-50 py-2'
					>
						REGISTER
					</Button>
				</Form.Group>
				<Form.Group
					className='mb-3 mt-3'
					controlId='formBasicEmail'
				>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						onInput={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<p className='text-secondary'>
					Sample email: eve.holt@reqres.in
				</p>
				<Form.Group
					className='mb-3'
					controlId='formBasicPassword'
				>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						onInput={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group
					className='mb-3'
					controlId='formBasicCheckbox'
				>
					<Form.Check
						type='checkbox'
						label='Remember me'
					/>
				</Form.Group>
				<Button
					variant='success'
					className='py-2'
					onClick={() => handleSubmit()}
					disabled={loading}
				>
					{loading && <i className='fas fa-spinner fa-spin'></i>}
					&nbsp;Submit
				</Button>
				<div
					className='text-dark ms-auto me-auto mt-3 p-2'
					style={{ cursor: 'pointer' }}
				>
					<i className='fa-solid fa-arrow-left-long'></i> Go back
				</div>
			</Form>

			{/* Toast */}
			<ToastContainer
				position='top-end'
				className='p-3'
			>
				<Toast
					bg='danger'
					delay={3000}
					autohide
					show={stateShowToast !== ''}
					onClose={() => setStateShowToast('')}
				>
					<Toast.Header closeButton={true}>
						<strong className='me-auto'>LOGIN</strong>
						<small className='text-muted'>just now</small>
					</Toast.Header>
					<Toast.Body>
						{stateShowToast === 'wrong'
							? 'Email and Password is required!'
							: stateShowToast}
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</div>
	);
};

export default Login;

import { useState, useContext } from 'react';
import { Button, Modal, Form, ToastContainer, Toast } from 'react-bootstrap';
import { postCreateUser } from '../services/UserService';
import { UserContext } from '../App';

const ModalAddNew = (props) => {
	const [name, setName] = useState('');
	const [job, setJob] = useState('');
	const [isShowToast, setIsShowToast] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const { setUser } = useContext(UserContext);

	const handleSaveUser = async () => {
		const res = await postCreateUser(name, job);

		if (res && res.id) {
			// Success
			setUser({ id: res.id, first_name: res.name });
			setIsSuccess(true);
			setIsShowToast(true);
			props.onHide();
			setName('');
			setJob('');
		} else {
			// error
			setIsSuccess(false);
		}
	};

	return (
		<>
			<Modal
				{...props}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						ADD NEW USER
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group
							className='mb-3'
							controlId='formBasicEmail'
						>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								onInput={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group
							className='mb-3'
							controlId='formBasicPassword'
						>
							<Form.Label>Job</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter job'
								onInput={(e) => setJob(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='primary'
						onClick={() => handleSaveUser()}
					>
						Save
					</Button>
					<Button
						variant='secondary'
						onClick={props.onHide}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>

			<ToastContainer
				position='top-end'
				className='p-3'
			>
				<Toast
					bg={isSuccess ? 'success' : 'danger'}
					delay={3000}
					autohide
					show={isShowToast}
					onClose={() => setIsShowToast(false)}
				>
					<Toast.Header closeButton={true}>
						<strong className='me-auto'>ADD NEW USER</strong>
						<small className='text-muted'>just now</small>
					</Toast.Header>
					<Toast.Body>{isSuccess ? 'Success' : 'Error'}</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default ModalAddNew;

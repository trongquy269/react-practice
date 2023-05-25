import { useState } from 'react';
import { Button, Modal, Form, ToastContainer, Toast } from 'react-bootstrap';
import { putUpdateUser } from '../services/UserService';

const ModalEditUser = (props) => {
	const { show, onHide, dataUserEdit } = props;
	const [name, setName] = useState('');
	const [job, setJob] = useState('');
	const [isShowToast, setIsShowToast] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleEditUser = async () => {
		const res = await putUpdateUser(dataUserEdit.id, name, job);
		if (res && res.updatedAt) {
			// Success
			setIsSuccess(true);
			setIsShowToast(true);
			props.onHide();
			dataUserEdit['new_name'] = name;
			dataUserEdit['new_job'] = job;
		} else {
			// error
			setIsSuccess(false);
			setIsShowToast(true);
			props.onHide();
		}
	};

	return (
		<>
			<Modal
				show={show}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
				onHide={onHide}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						EDIT A USER
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group
							className='mb-3'
							controlId='formBasicEmail'
						>
							<Form.Label>Replace first name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter new first name'
								defaultValue={dataUserEdit.first_name}
								onInput={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group
							className='mb-3'
							controlId='formBasicPassword'
						>
							<Form.Label>Replace job</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter new job'
								defaultValue={dataUserEdit.job || ''}
								onInput={(e) => setJob(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='primary'
						onClick={() => handleEditUser()}
					>
						Confirm
					</Button>
					<Button
						variant='secondary'
						onClick={onHide}
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
						<strong className='me-auto'>EDIT A USER</strong>
						<small className='text-muted'>just now</small>
					</Toast.Header>
					<Toast.Body>{isSuccess ? 'Success' : 'Error'}</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default ModalEditUser;

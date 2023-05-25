import { useState } from 'react';
import { Button, Modal, ToastContainer, Toast } from 'react-bootstrap';
import { deleteUser } from '../services/UserService';

const ModalConfirm = (props) => {
	const { show, onHide, dataUserDelete } = props;
	const [isShowToast, setIsShowToast] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleConfirmDelete = async () => {
		const res = await deleteUser(dataUserDelete.id);
		if (res && (res.updatedAt || +res.statusCode === 204)) {
			dataUserDelete['isDeleted'] = true;
			setIsSuccess(true);
			setIsShowToast(true);
			onHide();
		} else {
			setIsSuccess(false);
			setIsShowToast(true);
			onHide();
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
						DELETE A USER
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<h5>
							This action can't be undone! Do you want to delete
							this user
						</h5>
						<br />
						<h6>email = {dataUserDelete.email}</h6>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='primary'
						onClick={() => handleConfirmDelete()}
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

export default ModalConfirm;

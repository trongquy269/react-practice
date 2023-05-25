import { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import { UserContext } from '../App';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';

const TableUsers = (props) => {
	const [listUsers, setListUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
	const [isShowModalConfirmDelete, setIsShowModalConfirmDelete] =
		useState(false);
	const [dataUserEdit, setDataUserEdit] = useState({});
	const [dataUserDelete, setDataUserDelete] = useState({});

	const { user } = useContext(UserContext);

	useEffect(() => {
		// Call api
		getUsers(1);
	}, []);

	useEffect(() => {
		if (user && user.id) {
			setListUsers((prev) => [...prev, user]);
		}
	}, [user]);

	const getUsers = async (page) => {
		const res = await fetchAllUser(page);

		if (res && res.data) {
			setTotalUsers(res.total);
			setTotalPages(res.total_pages);
			setListUsers(res.data);
		}
	};

	const handlePageClick = (event) => {
		getUsers(+event.selected + 1);
	};

	const onEditUser = (user) => {
		setDataUserEdit(user);
		setIsShowModalEditUser(true);
	};

	// Handle change user first name
	useEffect(() => {
		if (dataUserEdit && dataUserEdit.new_name) {
			const newListUsers = listUsers.map((user) => {
				if (user.id === dataUserEdit.id) {
					return {
						...user,
						first_name: dataUserEdit.new_name,
						job: dataUserEdit.new_job,
					};
				} else {
					return user;
				}
			});
			setListUsers(newListUsers);
		}
	}, [dataUserEdit.new_name]);

	const handleDeleteUser = (user) => {
		setIsShowModalConfirmDelete(true);
		setDataUserDelete(user);
	};

	// Handle delete user
	useEffect(() => {
		if (dataUserDelete && dataUserDelete.isDeleted) {
			const newListUsers = listUsers.filter((user) => {
				if (user.id !== dataUserDelete.id) {
					return user;
				}
			});
			setListUsers(newListUsers);
		}
	}, [dataUserDelete.isDeleted]);

	return (
		<>
			<div>
				<Table
					striped
					bordered
					hover
				>
					<thead>
						<tr>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{listUsers &&
							listUsers.length > 0 &&
							listUsers.map((user, index) => (
								<tr key={`users-${index}`}>
									<td>{user.id}</td>
									<td>{user.first_name}</td>
									<td>{user.last_name}</td>
									<td>{user.email}</td>
									<td className='d-flex'>
										<button
											className='btn btn-warning w-50 me-1'
											onClick={() => onEditUser(user)}
										>
											Edit
										</button>
										<button
											className='btn btn-danger w-50 ms-1'
											onClick={() =>
												handleDeleteUser(user)
											}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>

				<ReactPaginate
					nextLabel='next >'
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					marginPagesDisplayed={2}
					pageCount={totalPages}
					previousLabel='< previous'
					pageClassName='page-item'
					pageLinkClassName='page-link'
					previousClassName='page-item'
					previousLinkClassName='page-link'
					nextClassName='page-item'
					nextLinkClassName='page-link'
					breakLabel='...'
					breakClassName='page-item'
					breakLinkClassName='page-link'
					containerClassName='pagination'
					activeClassName='active'
					renderOnZeroPageCount={null}
				/>
			</div>

			<ModalEditUser
				show={isShowModalEditUser}
				onHide={() => setIsShowModalEditUser(false)}
				dataUserEdit={dataUserEdit}
			/>

			<ModalConfirm
				show={isShowModalConfirmDelete}
				onHide={() => setIsShowModalConfirmDelete(false)}
				dataUserDelete={dataUserDelete}
			/>
		</>
	);
};

export default TableUsers;

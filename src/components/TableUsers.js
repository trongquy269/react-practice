import { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import { ToastContainer, Toast } from 'react-bootstrap';

import { fetchAllUser } from '../services/UserService';
import { UserContext } from '../App';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import ModalAddNew from './ModalAddNew';

const TableUsers = (props) => {
	const [listUsers, setListUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
	const [isShowModalConfirmDelete, setIsShowModalConfirmDelete] =
		useState(false);
	const [dataUserEdit, setDataUserEdit] = useState({});
	const [dataUserDelete, setDataUserDelete] = useState({});
	const [sortBy, setSortBy] = useState({ field: 'id', order: 'asc' });
	const [dataExport, setDataExport] = useState([]);
	const [isShowToast, setIsShowToast] = useState(false);
	const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

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

	// Handle sort
	useEffect(() => {
		const newListUsers = [...listUsers];

		if (sortBy.field === 'id') {
			if (sortBy.order === 'asc') {
				newListUsers.sort((a, b) => a[sortBy.field] - b[sortBy.field]);
			} else if (sortBy.order === 'desc') {
				newListUsers.sort((a, b) => b[sortBy.field] - a[sortBy.field]);
			}
		} else if (sortBy.field === 'first_name') {
			if (sortBy.order === 'asc') {
				newListUsers.sort((a, b) => {
					return a[sortBy.field] > b[sortBy.field] ? 1 : -1;
				});
			} else if (sortBy.order === 'desc') {
				newListUsers.sort((a, b) => {
					return a[sortBy.field] < b[sortBy.field] ? 1 : -1;
				});
			}
		}

		setListUsers(newListUsers);
	}, [sortBy]);

	const handelSearch = (e) => {
		let term = e.target.value;
		term = term.trim();

		if (term) {
			console.log(term);
			const newListUsers = [...listUsers].filter((user) =>
				user.email.includes(term)
			);

			setListUsers(newListUsers);
		} else {
			getUsers(1);
		}
	};

	const getUsersExport = (event, done) => {
		const result = [];
		if (listUsers && listUsers.length > 0) {
			result.push(['ID', 'First Name', 'Last Name', 'Email']);
			listUsers.forEach((user) => {
				result.push([
					user.id,
					user.first_name,
					user.last_name,
					user.email,
				]);
			});
			setDataExport(result);
			done();
		}
	};

	const handelImportCSV = (e) => {
		const file = e.target.files[0];

		if (file && file.size) {
			if (file.type !== 'text/csv') {
				setIsShowToast(true);
				return;
			}

			// Parse local CSV file
			Papa.parse(file, {
				// header: true,
				complete: function (results) {
					const rawCSV = results.data;

					if (rawCSV && rawCSV.length > 0) {
						if (rawCSV[0] && rawCSV[0].length === 3) {
							const result = [];
							rawCSV.forEach((item, index) => {
								if (index > 0 && item.length === 3) {
									const obj = {};
									obj.first_name = item[0];
									obj.last_name = item[1];
									obj.email = item[2];
									result.push(obj);
								}
							});
							setListUsers(result);
						} else {
							alert('Wrong format header CSV file');
						}
					} else {
						alert('Not found data on CSV file');
					}
				},
			});
		}
	};

	return (
		<>
			<div>
				<div className='my-3 add-new d-flex align-items-center justify-content-between'>
					<h4>List user:</h4>
					<button
						className='btn btn-success'
						onClick={() => setIsShowModalAddNew(true)}
					>
						<i className='fa-solid fa-circle-plus me-2'></i>
						Add new user
					</button>
				</div>

				<div className='d-flex align-items-center justify-content-between mb-2'>
					<div className='input-group flex-nowrap w-25'>
						<span
							className='input-group-text'
							id='addon-wrapping'
						>
							@
						</span>
						<input
							type='text'
							className='form-control'
							placeholder='Search user by email...'
							aria-label='search'
							aria-describedby='addon-wrapping'
							onChange={(e) => handelSearch(e)}
						/>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<label
							className='btn btn-danger me-2'
							htmlFor='import-file'
						>
							<i className='fa-solid fa-file-arrow-up me-2'></i>
							Import
						</label>
						<input
							id='import-file'
							type='file'
							hidden
							onChange={(e) => handelImportCSV(e)}
						/>
						<CSVLink
							data={dataExport}
							filename={'users.csv'}
							className='btn btn-primary'
							asyncOnClick={true}
							onClick={getUsersExport}
						>
							<i className='fa-solid fa-file-arrow-down me-2'></i>
							Export
						</CSVLink>
					</div>
				</div>

				<Table
					striped
					bordered
					hover
				>
					<thead>
						<tr>
							<th>
								<div className='d-flex align-items-center justify-content-between'>
									<span>ID</span>
									<span>
										<i
											className='fa-solid fa-arrow-down-long ps-1 pe-1'
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setSortBy({
													field: 'id',
													order: 'desc',
												})
											}
										></i>
										<i
											className='fa-solid fa-arrow-up-long ps-1 pe-1'
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setSortBy({
													field: 'id',
													order: 'asc',
												})
											}
										></i>
									</span>
								</div>
							</th>
							<th>
								<div className='d-flex align-items-center justify-content-between'>
									<span>First Name</span>
									<span>
										<i
											className='fa-solid fa-arrow-down-long ps-1 pe-1'
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setSortBy({
													field: 'first_name',
													order: 'desc',
												})
											}
										></i>
										<i
											className='fa-solid fa-arrow-up-long ps-1 pe-1'
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setSortBy({
													field: 'first_name',
													order: 'asc',
												})
											}
										></i>
									</span>
								</div>
							</th>
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

			<ModalAddNew
				show={isShowModalAddNew}
				onHide={() => setIsShowModalAddNew(false)}
			/>

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

			<ToastContainer
				position='top-end'
				className='p-3'
			>
				<Toast
					bg={'danger'}
					delay={3000}
					autohide
					show={isShowToast}
					onClose={() => setIsShowToast(false)}
				>
					<Toast.Header closeButton={true}>
						<strong className='me-auto'>IMPORT FILE</strong>
						<small className='text-muted'>just now</small>
					</Toast.Header>
					<Toast.Body>{'Only accept csv file...'}</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default TableUsers;

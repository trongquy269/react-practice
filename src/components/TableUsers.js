import { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import { UserContext } from '../App';

const TableUsers = (props) => {
	const [listUsers, setListUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

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

	return (
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
	);
};

export default TableUsers;

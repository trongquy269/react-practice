import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';

const TableUsers = (props) => {
	const [listUsers, setListUsers] = useState([]);

	useEffect(() => {
		// Call api
		getUsers();
	}, []);

	const getUsers = async () => {
		const res = await fetchAllUser();

		if (res && res.data) {
			setListUsers(res.data);
		}
	};

	return (
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
	);
};

export default TableUsers;

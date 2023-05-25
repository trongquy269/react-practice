// import axios from 'axios';
import axios from './customize-axios';

const fetchAllUser = (page) => {
	return axios.get(`api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
	return axios.post('/api/users', { name, job });
};

const putUpdateUser = (id, name, job) => {
	return axios.put(`/api/users/${id}`, { name, job });
};

const deleteUser = (id) => {
	return axios.put(`/api/users/${id}`);
};

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser };

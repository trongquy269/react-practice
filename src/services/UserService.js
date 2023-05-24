// import axios from 'axios';
import axios from './customize-axios';

const fetchAllUser = (page) => {
	return axios.get(`https://reqres.in/api/users?page=${page}`);
};

export { fetchAllUser };

// import axios from 'axios';
import axios from './customize-axios';

const fetchAllUser = () => {
	return axios.get('https://reqres.in/api/users?page=1');
};

export { fetchAllUser };

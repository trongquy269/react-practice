import { useState, createContext } from 'react';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { Container } from 'react-bootstrap';
import ModalAddNew from './components/ModalAddNew';

export const UserContext = createContext();

function App() {
	const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
	const [user, setUser] = useState({});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<div className='app-container'>
				<Header />
				<Container>
					<div className='my-3 add-new d-flex justify-content-between'>
						<h4>List user:</h4>
						<button
							className='btn btn-success'
							onClick={() => setIsShowModalAddNew(true)}
						>
							Add new user
						</button>
					</div>
					<TableUsers />
				</Container>
				<ModalAddNew
					show={isShowModalAddNew}
					onHide={() => setIsShowModalAddNew(false)}
				/>
			</div>
		</UserContext.Provider>
	);
}

export default App;

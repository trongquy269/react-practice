import { useState, createContext } from 'react';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { Container } from 'react-bootstrap';
import ModalAddNew from './components/ModalAddNew';
import Home from './components/Home';
import { Routes, Route, Link } from 'react-router-dom';

export const UserContext = createContext();

function App() {
	const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
	const [user, setUser] = useState({});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<div className='app-container'>
				<Header />
				<Container>
					<Routes>
						<Route
							path='/'
							element={<Home />}
						/>
						<Route
							path='/users'
							element={
								<>
									<div className='my-3 add-new d-flex align-items-center justify-content-between'>
										<h4>List user:</h4>
										<button
											className='btn btn-success'
											onClick={() =>
												setIsShowModalAddNew(true)
											}
										>
											<i className='fa-solid fa-circle-plus me-2'></i>
											Add new user
										</button>
									</div>
									<TableUsers />
									<ModalAddNew
										show={isShowModalAddNew}
										onHide={() =>
											setIsShowModalAddNew(false)
										}
									/>
								</>
							}
						/>
					</Routes>
				</Container>
			</div>
		</UserContext.Provider>
	);
}

export default App;

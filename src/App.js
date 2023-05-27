import { useState, createContext } from 'react';
import './App.scss';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';

export const UserContext = createContext();

function App() {
	const [user, setUser] = useState({});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<div className='app-container'>
				<Header />
				<Container>
					<AppRoutes />
				</Container>
			</div>
		</UserContext.Provider>
	);
}

export default App;

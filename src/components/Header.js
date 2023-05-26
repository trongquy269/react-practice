import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { useLocation, NavLink } from 'react-router-dom';

const Header = (props) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const location = useLocation();

	const handleLogout = () => {
		if (token) {
			localStorage.removeItem('token');
			setToken('');
		}
	};

	return (
		<Navbar
			bg='light'
			expand='lg'
		>
			<Container>
				<Navbar.Brand href='/'>
					<img
						src={logoApp}
						width='30'
						height='30'
						className='d-inline-block align-top'
						alt='React Bootstrap logo'
					/>
					<span> ntQuy's App</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav
						className='me-auto'
						activeKey={location.pathname}
					>
						<NavLink
							className='nav-link'
							to='/'
						>
							Home
						</NavLink>
						<NavLink
							className='nav-link'
							to='/users'
						>
							Manage Users
						</NavLink>
					</Nav>
					<Nav>
						<NavDropdown
							title='Settings'
							id='basic-nav-dropdown'
						>
							<NavDropdown.Item
								href='/login'
								disabled={token}
							>
								Login
							</NavDropdown.Item>
							<NavDropdown.Item
								onClick={() => handleLogout()}
								disabled={!token}
							>
								Logout
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { useLocation, NavLink } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';

const Header = (props) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const location = useLocation();
	const { user, logoutContext } = useContext(UserProvider);

	const handleLogout = () => {
		if (token) {
			logoutContext();
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
						{user && user.auth && (
							<NavLink
								className='nav-link'
								to='/users'
							>
								Manage Users
							</NavLink>
						)}
					</Nav>
					<Nav>
						{user && user.auth && (
							<span className='nav-link'>Hi, {user.email}</span>
						)}
						<NavDropdown
							title='Settings'
							id='basic-nav-dropdown'
						>
							{user && !user.auth && (
								<NavDropdown.Item href='/login'>
									Login
								</NavDropdown.Item>
							)}
							{user && user.auth && (
								<NavDropdown.Item
									onClick={() => handleLogout()}
								>
									Logout
								</NavDropdown.Item>
							)}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

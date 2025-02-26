import {NavLink} from 'react-router';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo.png';

const Navbar = () => {
    return (
        <nav className={styles.header}>
            <div className={styles.container}>
                <NavLink to="/" className={styles.logo}>
                    <img src={Logo} className={styles.logoImg} alt="Logo" />
                    <span className={styles.logoText}>Find The Love</span>
                </NavLink>
                <button data-collapse-toggle="navbar-default" type="button" className={styles.collapsed} aria-controls="navbar-default" aria-expanded="false">
                    <span className={styles.hamburger}>Open main menu</span>
                    <svg className={styles.svg} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className={styles.navbar} id="navbar-default">
                    <ul className={styles.menu}>
                        <li className={styles.menuItem} aria-current="page">
                            <NavLink to="/home" className={styles.menuLink}>Home</NavLink>
                        </li>
                        <li className={styles.menuItem} aria-current="page">
                            <NavLink to="/more" className={styles.menuLink}>More</NavLink>
                        </li>
                        <li className={styles.menuItem} aria-current="page">
                            <NavLink to="/login" className={styles.menuLink}>Login</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
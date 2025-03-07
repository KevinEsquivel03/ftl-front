import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const getLinkClass = ({isActive}: { isActive: boolean }) =>
        `${styles.menuLink} ${isActive ? styles.active : ''}`;

    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <div className={styles.container}>
                {/* Logo */}
                <NavLink
                    to="/"
                    className={styles.brand}
                    onClick={closeMenu}
                    aria-label="Go to homepage"
                >
                    <img
                        src={Logo}
                        className={styles.logo}
                        alt=""
                        aria-hidden="true"
                    />
                    <span className={styles.brandName}>Find The Love</span>
                </NavLink>

                {/* Menú móvil */}
                <button
                    type="button"
                    className={styles.menuToggle}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                    aria-expanded={isMenuOpen}
                    aria-controls="main-menu"
                >
                    <span className={styles.hamburgerBox}>
                        <span className={styles.hamburgerInner}/>
                    </span>
                </button>

                {/* Links de navegación */}
                <div
                    className={`${styles.menuContainer} ${isMenuOpen ? styles.show : ''}`}
                    id="main-menu"
                >
                    <ul className={styles.menuList} role="menubar">
                        <li role="none">
                            <NavLink
                                to="/more"
                                role="menuitem"
                                className={getLinkClass}
                                onClick={closeMenu}
                            >
                                More
                            </NavLink>
                        </li>
                        <li role="none">
                            <NavLink
                                to="/login"
                                role="menuitem"
                                className={getLinkClass}
                                onClick={closeMenu}
                            >
                                Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
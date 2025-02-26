import styles from './Login.module.css';

export const Login = () => {
  return (
    <form className={styles.form}>
        <div className={styles.item}>
            <label htmlFor="email" className={styles.labelForm}>Email</label>
            <input type="email" id="email"
                   className={styles.inputForm}
                   placeholder="name@flowbite.com" required/>
        </div>
        <div className={styles.item}>
            <label htmlFor="password" className={styles.labelForm}>Password</label>
            <input type="password" id="password"
                   className={styles.inputForm}
                   required/>
        </div>
        <div className={styles.remember}>
            <div className={styles.checkbox}>
                <input id="remember" type="checkbox" value=""
                       className={styles.checkboxInput}
                       required/>
            </div>
            <label htmlFor="remember" className={styles.checkboxLabel}>Remember me</label>
        </div>
        <button type="submit"
                className={styles.button}
        >
            Login
        </button>
    </form>
  )
}
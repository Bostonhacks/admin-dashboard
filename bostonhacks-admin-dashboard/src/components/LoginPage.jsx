'use client'

import styles from './styles/LoginPage.module.css';
import Image from 'next/image';
import googleLogo from '../assets/googlelogo.png'; // Replace with the path to your Google logo image file


export default function LoginPage() {

    const handleGoogleSignIn = () => {
        console.log("Sign in with Google clicked");
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>

                <input type="text" id="user" name="user" placeholder="Username" className={styles.inputField} />
                <input type="password" id="pass" name="pass" placeholder="Password" className={styles.inputField} />

                <button className={styles.loginButton}>Login</button>
                <button className={styles.googleSignIn} onClick={handleGoogleSignIn}>
                    <Image className="mr-2" src={googleLogo} alt="Google logo" width={20} height={20} />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
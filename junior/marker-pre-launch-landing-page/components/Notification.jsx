import styles from "@/styles/Notification.module.css";
import { Manrope } from "next/font/google";
import { useState } from "react";

const manrope = Manrope({
    weight: ["500", "800"],
    subsets: ["latin"],
    fallback: ['sans-serif']
});

export default function Notification() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    function handleSubmit(e){
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let shouldError = emailRegex.test(email);
        if (!shouldError) {
            setError("error");
        } else {
            setEmail("");
            setError(null);
        }
    }

    return (
        <section className={styles.notification}>
            <h5 className={styles.notificationTitle}>Get notified when we launch</h5>
            <form className={styles.form} noValidate onSubmit={handleSubmit}>
                <div className={styles.formInputWapper}>
                    <label className={styles.formLabel} htmlFor="email">Email (required)</label>
                    <input className={`${manrope.className} ${styles.formInput} ${error == null ? "" : styles.formInputError}`} type="email" name="email" id="email" placeholder="Email address" autoComplete="email" aria-invalid="true" aria-describedby="email-error" required value={email} onChange={e => setEmail(e.target.value)} />
                    <span className={styles.formError} id="email-error">{error == null ? "" : "Opps! That doesn't look like an email address"}</span>
                </div>
                <input className={`${manrope.className} ${styles.formBtn}`} type="submit" value="Get notifield" disabled={email.length === 0} />
            </form>
        </section>
    );
}
import styles from "@/styles/Notification.module.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
    weight: ["500", "800"],
    subsets: ["latin"],
    fallback: ['sans-serif']
});

export default function Notification() {
    return (
        <section className={styles.notification}>
            <h5 className={styles.notificationTitle}>Get notified when we launch</h5>
            <form className={styles.form}>
                <div className={styles.formInputWapper}>
                    <label className={styles.formLabel} htmlFor="email">Email (required)</label>
                    <input className={`${manrope.className} ${styles.formInput} ${styles.formInputError}`} type="email" name="email" id="email" placeholder="Email address" autoComplete="email" aria-invalid="true" aria-describedby="email-error" required />
                    <span className={styles.formError} id="email-error">Opps! That doesn't look like an email address</span>
                </div>
                <input className={`${manrope.className} ${styles.formBtn}`} type="submit" value="Get notifield" />
            </form>
        </section>
    );
}
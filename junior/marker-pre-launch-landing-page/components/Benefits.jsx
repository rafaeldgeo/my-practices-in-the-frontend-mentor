import styles from "@/styles/Benefits.module.css";
import { benefits } from "@/public/data-benefits";

export default function Benefits(){

    const cardBenefits = benefits.map(benefit => 
        <div className={`${styles.card}  ${benefit.id % 2 == 0 ? styles.cardEven : styles.cardOdd}`} key={benefit.id}>
            <div className={styles.illustration}>
                <div className={styles.illustrationWrapper}>
                    <img className={styles.illustrationImg}src={`/illustration-${benefit.icon}.svg`} alt="" />
                </div>
            </div>
            <div className={styles.cardText}>
                <h2 className={styles.cardTitle}>{benefit.title}</h2>
                <p className={styles.cardDescription}>{benefit.description}</p>
            </div>
        </div>
    );

    return(
        <section className={styles.benefits}>
             {cardBenefits} 
        </section>
    );
}
import styles from "@/styles/Plans.module.css";
import { plans } from "@/public/data-plans";

export default function Plans(){

    const cardPlans = plans?.map(plan => 
        <div className={`${styles.card} ${plan.typePlan == "free" ? styles.cardFree : styles.cardPaid}`} key={plan.id}>
            <img className={styles.cardIcon} src={`icon-${plan.icon}.svg`} alt=""/>
            <div className={styles.cardHead}>
                <h4 className={styles.cardTitle}>{plan.title}</h4>
                <p className={styles.cardDescription}>{plan.description}</p>
            </div>
            <span className={styles.cardPrice}>{plan.price}{plan.typePlan == "paid" ? <span>/ month</span> : ""}</span>
            <ul className={styles.cardList}>
                {plan.resources?.map(resource => <li className={styles.cardItem} key={resource}>{resource}</li>)}
            </ul>
        </div>
    );

    return(
        <section className={styles.plans}>
            <div className={styles.plansText}>
                <h3 className={styles.plansTitle}>
                Our pricing plans</h3>
                <p className={styles.plansDescription}>We only make money when our creators make money. Our plans are always affordable, and it’s completely free to get started.</p>
            </div>
            <div className={styles.plansTypesWrapper}>
                {cardPlans}
            </div>
        </section>
    );
}
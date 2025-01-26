import styles from "@/styles/Benefits.module.css";
import { benefits } from "@/public/data-benefits";

export default function Benefits(){

    const listBenefits = benefits.map(benefit => 
        <div className="card" key={benefit.id}>
            <div className="card__image-wrapper">
                <img src={`/illustration-${benefit.icon}.svg`} alt="" />
            </div>
            <h2 className={styles.teste}>{benefit.title}</h2>
            <p>{benefit.description}</p>
        </div>
    );

    return(
        <section>
             {listBenefits} 
        </section>
    );
}
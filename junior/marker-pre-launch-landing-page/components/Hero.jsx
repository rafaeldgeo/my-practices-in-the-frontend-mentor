import styles from "@/styles/Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <picture className={styles.heroImgLeftTopWrapper}>
               <source srcSet="./illustration-hero-mobile.png" media="(max-width: 575px)" type="image/png" />
               <source srcSet="./illustration-hero-left.svg" media="(min-width: 576px)" type="image/svg+xml" />
               <img className={styles.heroImgLeftTop} src="./illustration-hero-mobile.png" alt="People working" />
            </picture>
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>Get paid for the work you <span className={styles.heroTitleLove}>love</span> to do.</h1>
                    <p className={styles.heroDescription}>The 9-5 grind is so last century. We believe in living life on your own terms. Whether you’re looking to escape the rat race or
                    set up a side hustle, we’ve got you covered.</p>
                    <div className={styles.scrollWrapper}>
                        <img className={styles.iconScroll} src="./icon-scroll.svg" alt="" width={26} height={42}/>
                    </div>
                </div>
            </div>
            <div className={styles.heroImageRightWrapper}>
                <img className={styles.heroImgRight} src="./illustration-hero-right.svg" alt="People working"/>
            </div>
        </section>
    );
}
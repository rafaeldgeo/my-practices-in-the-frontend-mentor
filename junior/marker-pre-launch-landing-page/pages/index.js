import { Manrope } from "next/font/google";
import Benefits from "@/components/Benefits";
import AttributionFooter from "@/components/AttributionFooter";

const manrope = Manrope({
    weight: ["500", "800"],
    subsets: ["latin"],
    fallback: ['sans-serif']
});

export default function Home() {
    return (
        <div className={`${manrope.className} container`}>
            <header className="header">
                <img className="header__logo" src="/logo.svg" alt="logo maker" width={120} height={35}></img>
            </header>
            <main>
                <Benefits />
            </main>
            <footer>
                <AttributionFooter />
            </footer>
        </div>
    );
}

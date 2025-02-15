import { Manrope } from "next/font/google";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Plans from "@/components/Plans";
import Notification from "@/components/Notification";
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
                <div className="headerLogoWapper">
                    <img className="headerLogo" src="/logo.svg" alt="logo maker" width={120} height={35}></img>
                </div>
                <Hero />
            </header>
            <main className="main">
                <Benefits />
                <Plans />
            </main>
            <footer className="footer">
                <Notification />
                <AttributionFooter />
            </footer>
        </div>
    );
}

import { Manrope} from "next/font/google";

const manrope = Manrope({
    weight: ["500", "800"],
    subsets: ["latin"],
    fallback: ['sans-serif']
});

export default function Home() {
    return(
        <div className={`${manrope.className} container`} >
            <header>

            </header>
            <main>teste</main>
            <footer></footer>
        </div>
    );
}

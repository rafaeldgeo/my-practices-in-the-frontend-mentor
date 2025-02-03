import Head from "next/head";
import "@/styles/globals.css";

export default function App({Component, pageProps}) {
    return(
        <>
            <Head>
                <title>Frontend Mentor | Maker pre-launch landing page</title>
                <meta name="description" content="Frontend Mentor Challenge"></meta>
                <link rel="shortcut icon" href="/favicon-32x32.ico" type="image/x-icon" />
            </Head>
            <Component {...pageProps} />
        </>
    ); 
}


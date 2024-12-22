import { Karla } from "next/font/google";
import "./globals.css";
import AttributionFooter from "./components/AttributionFooter";

const karla = Karla({
  weight: ["400", "700"],
  subsets: ["latin"],
  fallback: ['sans-serif']
});

export const metadata = {
  title: "Frontend Mentor | Contact form",
  description: "Frontend Mentor Challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${karla.className}`}>
        <div className="container">
          {children}
          <footer className="footer">
            <AttributionFooter />
          </footer>
        </div>
      </body>
    </html>
  );
}

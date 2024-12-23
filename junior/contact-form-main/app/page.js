import ContactForm from "./components/ContactForm";
import Dialog from "./components/Dialog";
import MessageSent from "./components/Dialog";

export default function Home() {
  return (
    <main className="main">
      <Dialog></Dialog>
      <ContactForm></ContactForm> 
    </main>
  );
}

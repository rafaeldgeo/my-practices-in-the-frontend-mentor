import ContactForm from "@/app/components/contact-form/ContactForm";
import Dialog from "@/app/components/dialog/Dialog";

export default function Home() {
  return (
    <main className="main">
      <Dialog></Dialog>
      <ContactForm></ContactForm> 
    </main>
  );
}

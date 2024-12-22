import { Karla } from "next/font/google";

const karla = Karla({
    weight: ["400", "700"],
    subsets: ["latin"],
    fallback: ['sans-serif']
  });
 
export default function ContactForm(){
    return(
        <div className="form-contact">
            <h1 className="form-contact__title">Contact Us</h1>
            <form className="form" action="#" noValidate>
                <div className="form__inputs">
                    <div className="form__input-name">
                        <div className="form__firstName">
                            <label className="form__label" htmlFor="firstname">First Name <span className="form__required">*</span>
                            </label>
                            <input className="form__input" type="text" name="firstname" id="firstname" required/>
                        </div>
                        <div className="form__lastName">
                            <label className="form__label" htmlFor="lastname">Last Name <span className="form__required">*</span></label>
                            <input className="form__input" type="text" name="lastname" id="lastname" required/>
                        </div>
                    </div>
                    <div className="form__input-email">
                        <label className="form__label" htmlFor="email">Email Address<span className="form__required">*</span></label>
                        <input className="form__input" type="text" name="email" id="email" required/>
                    </div>
                    <div className="form__input-query">
                        <label className="form__label">Query Type<span className="form__required">*</span></label>
                        <div className="form__query-wrapper">
                            <label className="form__label" htmlFor="general">
                                <input type="radio" name="querytype" id="general" value="general" required /> General Enquiry
                            </label>
                            <label className="form__label" htmlFor="suport">
                                <input type="radio" name="querytype" id="suport" value="suporte" required /> Suport Request
                            </label>
                        </div>
                    </div>
                    <div className="form__input-message">
                        <label className="form__label" htmlFor="message">Message<span className="form__required">*</span></label>
                        <textarea className="form__input" name="message" id="message" rows="3" required></textarea>
                    </div>
                </div>
                <div className="form__agree">                    
                    <input className="form__inputCheckbox" type="checkbox" name="checkbox" id="checkbox" required />
                    <label className="form__label" htmlFor="checkbox">I consent to being contacted by the team <span className="form__required">*</span></label>
                </div>
                <input className={`${karla.className} form__btn`} type="submit" value="Submit" />
            </form>
        </div>
    );
}
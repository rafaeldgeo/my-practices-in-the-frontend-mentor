import Image from "next/image";

export default function Dialog(){

    return(
        <dialog className="dialog" open>
            <div className="dialog__head">
                <Image src="/icon-success-check.svg" width={20} height={21} alt=""></Image>
                <span className="dialog__title">Message Sent!</span>
            </div>
            <div className="dialog__body">
                <p className="dialog__message">Thanks for completing the form. We'll be in touch soon!</p>
            </div>
        </dialog>
    );
}
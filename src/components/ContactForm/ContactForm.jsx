import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Loading from "../Loading/Loading";
import "./ContactForm.css";

function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [formSent, setFormSent] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        const scriptURL = process.env.REACT_APP_PORTFOLIO_CONTACT_FORM_SCRIPT_URL;
        const form = formRef.current;

        const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            axios
                .post(scriptURL, new FormData(form))
                .then((response) => {
                    setFormSent(true);
                    setLoading(false);
                    form.reset();
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error!", error.message);
                });
        };

        form.addEventListener("submit", handleSubmit);

        return () => {
            form.removeEventListener("submit", handleSubmit);
        };
    }, [formRef, setFormSent]);

    const handleFormRest = () => {
        setFormSent(false);
    };

    return (
        <>
            {!formSent ? (
                <form
                    className="contact-form"
                    method="post"
                    action=""
                    ref={formRef}
                    name="contact-form"
                >
                    <fieldset className="contact-fieldset">
                        <div className="form-section">
                            <label htmlFor="form-name">Name</label>
                            <br />
                            <input
                                type="name"
                                id="form-name"
                                name="sender-name"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="form-section">
                            <label htmlFor="form-email">Email</label>
                            <br />
                            <input
                                type="email"
                                id="form-email"
                                name="sender-email"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="form-section">
                            <label htmlFor="form-message">Message</label>
                            <br />
                            <textarea
                                id="form-message"
                                name="message"
                                placeholder="Send me a message!"
                                required
                            >
                            </textarea>
                        </div>
                        <input
                            type="submit"
                            name="submit"
                            value="S e n d"
                            className="submit-btn" />
                    </fieldset>
                </form>
            ) : (
                <div className="form-sent-message">
                    <span>Thank you! Your message has been sent.</span>
                    <div>
                        {formSent && (
                            <button
                                className="submit-btn"
                                onClick={handleFormRest}
                            >
                                Send Another
                            </button>
                        )}
                    </div>
                </div>
            )}
            {loading && <Loading />}
        </>
    );
}

export default ContactForm;
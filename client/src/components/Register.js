import React, { useRef, useState } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
// import { PORT } from "../constants";
import api from "../utils/api";
import Survey from "./popups/Survey";
import { useDispatch } from "react-redux";
import { login } from "../reduxSlices/userSlice";
import { Link } from "react-router-dom";

const Register = ({ setShow }) => {
    const firstName_r = useRef();
    const lastName_r = useRef();
    const email_r = useRef();
    const phone_r = useRef();
    const password_r = useRef();
    const confirmPassword_r = useRef();

    const dispatch = useDispatch();

    const [error, setError] = useState();
    const [showSurvey, setShowSurvey] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = firstName_r.current.value;
        const lastName = lastName_r.current.value;
        const email = email_r.current.value;
        const phone = phone_r.current.value;
        const password = password_r.current.value;
        const confirmPassword = confirmPassword_r.current.value;

        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            let data = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone || null,
                email: email,
                password: password,
            };
            let registerResponse = await api.register(data);
            console.log(registerResponse);
            if (
                !registerResponse.message ||
                registerResponse.message !== "Successfully registered user"
            ) {
                throw new Error(registerResponse.response.data.message);
            }
            // setShow("inactive");
            alert("Account created successfully");
            dispatch(login(email, password));
            // const loginData = await api.login({ email, password });

            setShowSurvey(true);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            {!showSurvey && (
                <div
                    className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-3xl font-bold">
                        Create Your Free Account
                    </h2>
                    <form className="w-full flex flex-col gap-3">
                        <div className="flex gap-3">
                            <Input
                                placeholder="Enter First Name"
                                className="w-full rounded-sm py-2"
                                name="firstName"
                                ref={firstName_r}
                            >
                                <FontAwesomeIcon
                                    icon={regular("circle-user")}
                                />
                            </Input>
                            <Input
                                placeholder="Enter Last Name"
                                className="w-full rounded-sm py-2"
                                name="lastName"
                                ref={lastName_r}
                            >
                                <FontAwesomeIcon
                                    icon={regular("circle-user")}
                                />
                            </Input>
                        </div>
                        <Input
                            placeholder="Enter Email"
                            type="email"
                            className="w-full rounded-sm py-2"
                            name="email"
                            ref={email_r}
                        >
                            <FontAwesomeIcon icon={solid("envelope")} />
                        </Input>
                        <Input
                            placeholder="Enter Phone Number"
                            className="w-full rounded-sm py-2"
                            name="number"
                            ref={phone_r}
                        >
                            <FontAwesomeIcon icon={solid("phone")} />
                        </Input>
                        <Input
                            placeholder="Enter Password"
                            type="password"
                            className="w-full rounded-sm py-2"
                            name="password"
                            ref={password_r}
                        >
                            <FontAwesomeIcon icon={solid("key")} />
                        </Input>
                        <Input
                            placeholder="Confirm Password"
                            type="password"
                            className="w-full rounded-sm py-2"
                            name="confirm_password"
                            ref={confirmPassword_r}
                        >
                            <FontAwesomeIcon icon={solid("key")} />
                        </Input>
                    </form>
                    <div className="flex flex-col gap-4">
                        <button className="cta-btn" onClick={handleSubmit}>
                            Create Account
                        </button>
                        <div className="flex gap-4">
                            <button
                                className="cta-btn w-full"
                                onClick={() => setShow("inactive")}
                            >
                                Cancel
                            </button>
                            <button className="cta-btn w-full">
                                Enter As Guest
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div
                        className="text-shamrock-green underline cursor-pointer"
                        onClick={() => {
                            setShow("login");
                        }}
                    >
                        Already Have an Account? Sign In
                    </div>
                    <div onClick={() => {setShow("inactive");}}>
                    <Link to="/faq" className="text-shamrock-green underline">
                        Help
                    </Link>
                    </div>
                </div>
            )}
            <Survey visible={showSurvey} setVisible={setShowSurvey} setShowModal={setShow} />
        </>
    );
};

export default Register;

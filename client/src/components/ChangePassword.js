import React, { useContext, useRef, useState } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { PORT } from "../constants";
import session from "../context/Auth";
import api from "../utils/api";

const ChangePassword = ({ setVisible }) => {
    const oldPassword_r = useRef();
    const confirmPassword_r = useRef();
    const password_r = useRef();
    const [error, setError] = useState("");
    const { user } = useContext(session);

    const ChangePasswordHandler = async (e) => {
        e.preventDefault();
        if (password_r.current.value !== confirmPassword_r.current.value) {
            setError("Passwords do not match");
            return;
        }
        try {
            const data = await api.updatePassword({
                oldPassword: oldPassword_r.current.value,
                newPassword: password_r.current.value,
            });
            console.log(data);
            if (data.response?.status === 400) {
                setError(data.response.data.message);
            } else setVisible(false);
        } catch (e) {
            setError(e.message);
            console.error(e.message);
        }
        // setVisible(false);
    };

    return (
        <div
            className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center font-inter"
            onClick={() => setVisible(false)}
        >
            <div
                className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-bold">Reset Password</h2>
                <form className="w-full flex flex-col gap-3">
                    <div>
                        <div className="w-full text-left">
                            Enter Old Password
                        </div>
                        <Input
                            placeholder="Enter Old Password"
                            type="password"
                            className="w-full rounded-sm py-2"
                            name="password"
                            ref={oldPassword_r}
                        >
                            <FontAwesomeIcon icon={solid("key")} />
                        </Input>
                    </div>
                    <div>
                        <div className="w-full text-left">
                            Enter New Password
                        </div>
                        <Input
                            placeholder="Enter Password"
                            type="password"
                            className="w-full rounded-sm py-2"
                            name="password"
                            ref={password_r}
                        >
                            <FontAwesomeIcon icon={solid("key")} />
                        </Input>
                    </div>
                    <div>
                        <div className="w-full text-left">
                            Confirm New Password
                        </div>
                        <Input
                            placeholder="Confirm Password"
                            type="password"
                            className="w-full rounded-sm py-2"
                            name="password"
                            ref={confirmPassword_r}
                        >
                            <FontAwesomeIcon icon={solid("key")} />
                        </Input>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                </form>
                <button className="cta-btn" onClick={ChangePasswordHandler}>
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default ChangePassword;

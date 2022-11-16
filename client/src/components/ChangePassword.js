import React, { useContext, useRef, useState } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { PORT } from "../constants";
import session from "../context/Auth";

const ChangePassword = ({ setVisible }) => {
  const confirmPassword_r = useRef();
  const password_r = useRef();
  const [error, setError] = useState("");
  const { user } = useContext(session);

    const ChangePasswordHandler = (e) => {
        e.preventDefault();
        if (password_r.current.value !== confirmPassword_r.current.value) {
            setError("Passwords do not match");
            return;
        }
        (async () => {
            try {
                const response = await fetch(
                    `http://localhost:${PORT}/api/user/update/password`,
                    {
                        body: JSON.stringify({
                            newPassword: confirmPassword_r.current.value,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            userId: user.user.id,
                            session: user.token,
                        },
                        method: "POST",
                        credentials: 'include',
                    }
                );
                const data = await response.json();
                console.log(data);
                if (response.status === 200) {
                    setVisible(false);
                } else {
                    setError(data.message);
                }
            } catch (e) {
                console.error(e.message);
            }
        })();
        setVisible(false);
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

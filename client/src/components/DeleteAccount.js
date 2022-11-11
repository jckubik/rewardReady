import React, { useContext, useRef, useState } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { PORT } from "../constants";
import session from "../context/user";

const DeleteAccount = ({ setVisible }) => {
    const { user, setUser } = useContext(session);
    const deleteHandler = (e) => {
        e.preventDefault();
        try {
            fetch(`http://localhost:${PORT}/api/user/delete`, {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.user.email,
                }),
                method: "POST",
                credentials: "include",
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res);
                        setUser(null);
                    } else {
                        return;
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                });
        } catch (e) {
            console.error(e.message);
        }
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
                <h2 className="text-3xl font-bold">Delete Account</h2>
                <h3 className="text-lg">
                    This action is permanent and can't be undone. Do you still
                    want to proceed?
                </h3>
                <form className="w-full flex gap-3">
                    <button
                        className="cta-btn w-full "
                        onClick={() => setVisible(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="cta-btn w-full bg-white text-steel-blue hover:border hover:border-steel-blue"
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccount;

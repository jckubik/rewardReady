import { useState } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(newPassword, confirmPassword);

    };

    // Checks that the current input is a valid password
    const isValidPassword = (password) => {
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      return !passwordRegex.test(password);
    };

    // Checks to make sure that both inputs match
    const passwordsMatch = (event) => {
      if (newPassword && confirmPassword) {

        return newPassword === confirmPassword;
      }
    };


  return (
    <div
    className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
    onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-3xl font-bold">Reset Password</h2>
      <form className="w-full flex flex-col gap-3">
        <div className="relative">
          <input
              placeholder="New Password"
              type="password"
              className="w-full rounded-sm py-2 pl-10"
              name="newPassword"
              icon={<FontAwesomeIcon icon={solid("key")} />}
              onChange={(event) => {
                setNewPassword(event.target.value);
                passwordsMatch(event);
              }}
              />
              <div className="left-3 bottom-2 absolute">{<FontAwesomeIcon icon={solid("key")} />}</div>
        </div>
        <div className="relative">
          <input
            placeholder="Confirm Password"
            type="password"
            className="w-full rounded-sm py-2 pl-10"
            name="confirmPassword"
            icon={<FontAwesomeIcon icon={solid("key")} />}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              passwordsMatch(event);
              }}
          />
              <div className="left-3 bottom-2 absolute">{<FontAwesomeIcon icon={solid("key")} />}</div>
        </div>
      </form>
      <button className="cta-btn" onClick={handleSubmit}>
        Reset Password
      </button>
  </div>
  );
};

export default ResetPassword;
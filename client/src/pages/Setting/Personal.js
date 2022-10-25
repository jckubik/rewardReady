import React, { useContext, useEffect, useRef, useState } from "react";
import SubHeader from "../../components/SubHeader";
import Input from "../../components/utils/Input";
import { PORT } from "../../constants";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import session from "../../context/user";
import ChangePassword from "../../components/ChangePassword";

const Personal = () => {
  const deleteAccount = () => {
    api.deleteUser();
  };

  const { user } = useContext(session);
  let navigate = useNavigate();

  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const firstName_r = useRef();
  const lastName_r = useRef();
  const email_r = useRef();
  const phone_r = useRef();

  console.log(user);

  useEffect(() => {
    if (user) {
      firstName_r.current.value = user.user.firstName;
      lastName_r.current.value = user.user.lastName;
      email_r.current.value = user.user.email;
      phone_r.current.value = user.user.phoneNumber;
    }
  }, [user]);

  const updateInfo = (e) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:${PORT}/api/user/update`, {
        body: JSON.stringify({
          firstName: firstName_r.current.value,
          lastName: lastName_r.current.value,
          phoneNumber: phone_r.current.value,
          email: email_r.current.value,
        }),

        headers: {
          "Content-Type": "application/json",
          userId: user.user.id,
          session: user.token,
        },
        method: "POST",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
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
    <>
      {showChangePassword && (
        <ChangePassword setVisible={setShowChangePassword} />
      )}
      <div>
        <SubHeader active="personal" />
        <form className="flex flex-col border-2 w-2/5 min-w-[400px] mx-auto my-10 gap-4 px-5 py-10 rounded-md font-inter">
          <Input
            className="w-1/2 border-2 rounded-sm p-2"
            disabled={true}
            ref={firstName_r}
          >
            <div className="w-1/2">First Name</div>
          </Input>
          <Input
            className="w-1/2 border-2 rounded-sm p-2"
            disabled={true}
            ref={lastName_r}
          >
            <div className="w-1/2">Last Name</div>
          </Input>
          <Input
            className="w-1/2 border-2 rounded-sm p-2"
            disabled={true}
            ref={email_r}
            type={"email"}
          >
            <div className="w-1/2">Email</div>
          </Input>
          <Input className="w-1/2 border-2 rounded-sm p-2" ref={phone_r}>
            <div className="w-1/2">Mobile No.</div>
          </Input>
          <button
            className=" w-1/3 bg-transparent border-2 border-steel-blue text-steel-blue self-end py-2 px-4 rounded-md mr-3"
            onClick={(e) => {
              e.preventDefault();
              setShowChangePassword(true);
            }}
          >
            Change Password
          </button>
          <div className="w-full flex justify-between mt-5">
            <button
              className="ml-3 underline text-red-500"
              onClick={deleteAccount}
            >
              Delete Account
            </button>
            <button
              className="bg-transparent border-2 border-steel-blue text-white bg-steel-blue self-end py-2 px-4 rounded-md mr-3"
              onClick={updateInfo}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Personal;

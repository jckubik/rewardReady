import React, { useContext, useRef, useState } from "react";
import api from "../../utils/api";

const DeleteAccount = ({ setVisible }) => {
  const { user, setUser } = useContext(session);
  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      let deleteResponse = await api.deleteUser({ email: user.user.email });
      api.logout();
      console.log(deleteResponse);
      dispatch(setUser(null));
      localStorage.clear();
      logout();
    } catch (e) {
      console.error(e.message);
      console.log(e);
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
          This action is permanent and can't be undone. Do you still want to
          proceed?
        </h3>
        <form className="w-full flex gap-3">
          <button className="cta-btn w-full " onClick={() => setVisible(false)}>
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

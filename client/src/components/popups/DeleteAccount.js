import React, { useContext, useRef, usetate } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUser } from "../../reduxSlices/userSlice";

const DeleteAccount = ({ setVisible }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteHandler = async (e) => {
    e.preventDefault();
    dispatch(deleteUser(user.email));
    setVisible(false);
    navigate("/", { replace: true });
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

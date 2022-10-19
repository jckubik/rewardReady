import React from "react";

const Personal = () => {
    return (
        <div>
            <form>
                <label htmlFor="name">Name</label>
                <input name="name" />
                <label htmlFor="email">Email</label>
                <input name="email" type={"email"} />
                <label htmlFor="number">Mobile No.</label>
                <input name="number" type={"number"} />
                <label htmlFor="dob">Date of Birth</label>
                <input name="dob" type={"date"} />
                <button>Change Password</button>
                <div>
                    <button>Delete Account</button>
                    <button>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default Personal;

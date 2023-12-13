import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {

  const [email, setEmail] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    const loadingToast = toast.loading(`Please wait...`);
    try {
      const response = await axios.post('https://api.dreamfurniturebd.com/api/v1/auth/forget-password', {
        email
      })
      console.log(response.data);
      toast.update(loadingToast, {
        render: response.data.data,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
      toast.dismiss(loadingToast)
      toast.error(`Something went wrong. ${error?.response?.data?.message || error?.message}`, {
        toastId: "forget-request-error", // Use a unique toastId for error Toast
        autoClose: 3000,
        delay: 600
      });
    }
  }

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form onSubmit={onSubmit}>
          <CustomInput type="email" label="Email Address" id="email" onChng={(e) => setEmail(e.target.value)} />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 "
            style={{ background: "#ffd333", marginTop: "10px" }}
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;

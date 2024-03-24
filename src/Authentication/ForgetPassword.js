import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const { forgotPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function registerNow() {
    document.querySelector("#forgetBtn").style.disabled = true;
    let email = document.getElementById("email").value;

    setIsSubmitting(true);
    forgotPassword(email)
      .then((res) => {
        window.location.href = "/signin";
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="w-full flex items-center justify-center dark:bg-gray-900 min-h-[90dvh] ">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Forget Password
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@gmail.com"
              defaultValue={"depo@gmail.com"}
              required
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-start">
              <a
                href="/login"
                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Login
              </a>
            </div>
            <a
              href="/signup"
              className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Register
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={forgotPassword}
          >
            Reset your password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;

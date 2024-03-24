import React, { useEffect, useRef, useState } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useMounted from "../hooks/useMounted";
import styled from "styled-components";
import { toast } from "react-toastify";
import Modal from "react-modal";
import CollectExpertDetails from "../forms/CollectExpertDetails";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, onValue } from "firebase/database";
function Register() {
  const notify = (e) => {
    toast.error(e, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { register, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const regmounted = useRef(false);
  const mounted = useMounted();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    regmounted.current = true;
    return () => {
      regmounted.current = false;
    };
  }, []);

  function registerNow() {
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let confirmPass = document.getElementById("confirmRegPass").value;

    document.getElementById("registerBtn").style.disabeld = true;
    if (password !== confirmPass) {
      notify("Password does not match !");
      document.getElementById("registerBtn").style.disabeld = false;
    } else {
      const db = dbref(database);
      let emailName = String(email).toLowerCase().split("@")[0];
      get(child(db, `/admins/${emailName}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            // console.log(fname, lname, email, enroll);
            if (
              String(data.email).toLowerCase() === String(email).toLowerCase()
            ) {
              setEmail(email);
              setPassword(password);
              collectDetails();
            } else {
              notify("Details does not match the records !");
              document.getElementById("registerBtn").style.disabeld = false;
            }
          } else {
            notify("Expert email not found !");
            document.getElementById("registerBtn").style.disabeld = false;
          }
        })
        .catch((error) => {
          notify("Some error occured");
          document.getElementById("registerBtn").style.disabeld = false;
          return;
        });
    }
  }

  // To take details of the Expert

  const [modalIsOpen, setIsOpen] = useState(false);

  function collectDetails() {
    openModal();
    Modal.setAppElement("#formRoot");
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      className="container flex flex-col justify-center items-center min-h-[90dvh] min-w-full"
      id="formRoot"
    >
      {/* New */}
      <div className="w-full flex items-center justify-center dark:bg-gray-900 min-h-[90dvh]  ">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Create New Account
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
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="password"
                id="confirmpassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={registerNow}
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an Account?{" "}
              <a
                href="/login"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <CollectExpertDetails
          btnFunc={closeModal}
          email={email ? email : null}
          password={password ? password : null}
          notify={notify}
        />
      </Modal>
    </div>
  );
}

const Contain = styled.div`
  @media (max-width: 650px) {
    position: absolute;
    background-attachment: fixed;
    height: fit-content;
    width: 110wh;
  }
`;

export default Register;

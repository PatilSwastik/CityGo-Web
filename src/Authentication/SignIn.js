import React from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { storage, database } from "../firebase/init-firebase";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
function SignIn() {
  const { login } = useAuth();
  const { currentUser } = useAuth();
  const notify = () => {
    toast.error("Wrong email or password !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function checkUser() {
    const db = ref(database);

    get(child(db, `/admins/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();

          data = Object.keys(data).map((key) => data[key]);
          console.log(data);
          data.map((ele) => {
            if (currentUser.email == ele.email) {
              localStorage.setItem("isAdmin", true);
              return;
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const signInNow = () => {
    let logemail = document.querySelector("#email").value;
    let logpassword = document.querySelector("#password").value;
    //disable signInBtn
    console.log(logemail, logpassword);
    login(logemail, logpassword)
      .then((res) => {
        //redirect to home page
        toast("Login in successful !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        checkUser();
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.message);
        notify();
      });
  };

  return (
    <div className="container flex flex-col justify-center items-center">
      <p className="text-3xl font-bold text-center mt-2">
        Sign in to your account
      </p>
      <div className="flex flex-col bg-white mt-10 p-5 md:p-10 w-80 md:w-card rounded-xl drop-shadow-xl">
        <p>Email address</p>
        <input
          id="email"
          className=" mt-2 text-lg px-3 h-10  border border-gray-400 outline-1 outline-blue-500 rounded-md"
          type="text"
          placeholder="Email address"
          defaultValue={"admin@gmail.com"}
        />
        <h2 className="mt-2">Password</h2>
        <input
          id="password"
          className="text-lg mt-4 px-3 h-10 border border-gray-400 outline-1 outline-blue-500 rounded-md"
          type="password"
          placeholder="Password"
          defaultValue={"admin123"}
        />
        <div className="flex justify-between items-center mt-3">
          <Link to="/forgetpassword">
            <span className=" text-violet-900   cursor-pointer hover:underline">
              Forgot password ?
            </span>
          </Link>
          <Link to="/signup">
            <span className=" text-violet-900 cursor-pointer hover:underline">
              Create account
            </span>
          </Link>
        </div>
        <button
          id="signInBtn"
          onClick={signInNow}
          className="btn btn-compatible px-3 mt-4 h-10 rounded-lg  
          border-2
          border-[#1f1c2e]
           font-bold text-black text-lg"
        >
          Sign In
        </button>
      </div>
      <Outlet />
      {/* <ToastContainer /> */}
    </div>
  );
}

export default SignIn;

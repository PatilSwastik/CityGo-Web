import React, { useState, useEffect } from "react";
import app from "../firebase/init-firebase";
import { Link, json } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { storage, database } from "../firebase/init-firebase";
import { getDatabase, ref, onValue, get, child } from "firebase/database";

const NavBar = () => {
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const [adminLogin, setAdminLogin] = useState(false);
  const [adminData, setadminData] = useState();

  // useEffect(() => {
  //   checkUser();
  // }, []);

  return (
    <Nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-2xl">
          CityGo
        </Link>
        <div className="md:hidden">
          {/* Mobile menu button (hidden on larger screens) */}
          <button
            className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          {localStorage.getItem("isAdmin") ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>{" "}
              <Link
                to="/dashboard/submittedforms"
                className="text-white hover:text-gray-300 "
              >
                Submitted forms
              </Link>
            </>
          ) : currentUser && currentUser ? (
            <Link to="/userforms" className="text-white hover:text-gray-300 ">
              View forms
            </Link>
          ) : (
            <></>
          )}

          {currentUser && (
            <Link
              to="/signup"
              className="text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              onClick={async (e) => {
                e.preventDefault();
                logout();
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Log out
            </Link>
          )}

          {!currentUser && (
            <>
              <Link to="/signup" className="text-white">
                Sign In
              </Link>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </Nav>
  );
};

export default NavBar;
const Logo = styled.a`
  display: flex;
  width: 300px;
  justify-content: center;
  align-items: center;
`;
const Nav = styled.div`
  // opacity: 0.7;
  background: #3a4f7a;
`;
const UL = styled.ul`
  display: flex;
  height: 50px;
  width: 700px;
  justify-content: center;
  align-items: center;
`;
const UL2 = styled.ul`
  display: flex;
  height: 50px;
  flex: end;
  width: 700px;
  justify-content: end;
  align-items: center;
`;
const LI = styled.a`
  margin-left: 40px;
  list-style: none;
  a {
    color: white;
    text-decoration: none;
  }
`;

import React from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const { currentUser } = useAuth();
  const navigated = useNavigate();
  return (
    <Div className="bg-blue-500 text-white py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to City Go Portal</h1>
      <P text-center>
        Say goodbye to long queues and tedious paperwork. With City Go, booking
        passes becomes as easy as a few clicks. we've streamlined the process to
        ensure maximum convenience. Unlock Your Adventures with Easy Pass
        Booking
      </P>
      <button
        className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-100"
        onClick={() => {
          if (currentUser) {
            navigated("/userforms");
          }
        }}
      >
        Get Your Pass Now
      </button>
    </Div>
  );
};

export default HeroSection;
const Div = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100vh;
  opacity: 0.7;
`;
const P = styled.div`
  width: 705px;
  font-size: 17px;
  text-align: center;
`;

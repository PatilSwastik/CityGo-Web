import React from "react";
import styled from "styled-components";
import prf from "../assets/bg.svg";
const sectionHelp = () => {
  const steps = [
    {
      title: "Step 1: Create an Account",
      description: "Sign up for a Bus Portal account to get started.",
      image: prf, // Placeholder URL for step1 image
    },
    {
      title: "Step 2: Check current pass exist",
      description:
        "Browse available routes and choose your desired destination.",
      image: prf, // Placeholder URL for step1 image
    },
    {
      title: "Step 3:Choose a pass to book",
      description:
        "Select your preferred bus, choose a seat, and complete the booking process.",
      image: prf, // Placeholder URL for step1 image
    },
    {
      title: "Step 4:Check the selected pass details",
      description:
        "Select your preferred bus, choose a seat, and complete the booking process.",
      image: prf, // Placeholder URL for step1 image
    },
    {
      title: "Step 5:Buy the selected pass",
      description:
        "Select your preferred bus, choose a seat, and complete the booking process.",
      image: prf, // Placeholder URL for step1 image
    },
  ];

  return (
    <SECTION className="">
      <h2 className="text-3xl font-bold mb-8">How to Use Bus Portal</h2>
      <Content>
        {steps.map((item, index) => (
          <Wrap key={index}>
            <Img src={item.image} />
            <Div>
              <h1>{item.title}</h1>
              <span>{item.description}</span>
            </Div>
          </Wrap>
        ))}
      </Content>
    </SECTION>
  );
};

export default sectionHelp;
const SECTION = styled.div`
  display: flex;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  // height: 50vh;
`;
const Wrap = styled.div`
  height: 400px;
  width: 300px;
  border: 3px solid #3498db;
  padding: 2px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  height: 300px;
  width: 250px;
`;
const Div = styled.div`
  span {
    font-size: 15px;
  }
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
`;
const IMG = styled.img`
  height: 100px;
`;

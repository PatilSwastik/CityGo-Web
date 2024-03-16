import React from "react";
import styled from "styled-components";

const Analytics = ({ title, value }) => {
  return (
    <Div className="p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-black-700 font-semibold">{value}</p>
    </Div>
  );
};

export default Analytics;
const Div = styled.div`
  background: #90acd8;
`;

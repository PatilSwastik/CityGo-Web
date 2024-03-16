import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SeniorCitizentable = ({ data }) => {
  const navigated = useNavigate();
  const handleViewdetails = (e) => {
    navigated("/viewuploads ");
  };
  return (
    <div className="overflow-x-auto m-8">
      <h1 className="text-4xl py-3">Senior Citizen Details</h1>
      <table className="table-auto  w-full border-1 border border-gray-500 ">
        <thead>
          <tr>
            <th className="border-1 border border-gray-500 px-4 py-2">ID</th>
            <th className="border-1 border border-gray-500 px-4 py-2">Name</th>
            <th className="border-1 border border-gray-500 px-4 py-2"></th>
            <th className="border-1 border border-gray-500 px-4 py-2">
              Actions
            </th>{" "}
            {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <td className="border-1 border border-gray-500 px-4 py-2">
                  {item.id}
                </td>
                <td className="border-1 border border-gray-500 px-4 py-2">
                  {item.name}
                </td>
                <td className="border-1 border border-gray-500 px-4 py-2"></td>
                <td className="border-1 border border-gray-500 px-4 py-2">
                  <Button
                    className=" text-white font-bold py-2 px-4 rounded"
                    onClick={handleViewdetails}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeniorCitizentable;
const Button = styled.button`
  background: #3a4f7a;
`;

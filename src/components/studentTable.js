import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StudentTable = ({ data }) => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate("/viewuploads ");
  };
  return (
    <div className="overflow-x-auto m-8">
      <h1 className="text-4xl py-3">Student Details</h1>
      <table className="table-auto w-full border-1 border border-gray-500">
        <thead>
          <tr>
            <th className="border-1 border border-gray-500 px-4 py-2">ID</th>
            <th className="border-1 border border-gray-500 px-4 py-2">Name</th>
            <th className="border-1 border border-gray-500 px-4 py-2">
              School/College Name
            </th>
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
                <td className="border-1 border border-gray-500 px-4 py-2">
                  {item.college}
                </td>
                <td className="border-1 border border-gray-500 px-4 py-2">
                  <Button
                    className=" text-white font-bold py-2 px-4 rounded"
                    onClick={handleView}
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

export default StudentTable;
const Button = styled.button`
  background: #3a4f7a;
`;

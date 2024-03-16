import React from "react";
import styled from "styled-components";

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Source</th>
            <th className="border px-4 py-2">Destination</th>
            <th className="border px-4 py-2">Purchase Date</th>
            <th classNmae="border px-4 py-2">Expiry Date</th>
            <th className="border px-4 py-2">Actions</th>{" "}
            {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.source}</td>
              <td className="border px-4 py-2">{item.destination}</td>
              <td className="border px-4 py-2">{item.purchasedate}</td>
              <td className="border px-4 py-2">{item.expirydate}</td>
              <td className="border px-4 py-2">
                <Button className=" text-white font-bold py-2 px-4 rounded">
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

export default Table;
const Button = styled.button`
  background: #3a4f7a;
`;

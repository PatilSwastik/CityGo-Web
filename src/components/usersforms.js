import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UserForms = () => {
  const navigate = useNavigate();
  const handleStudentsubmit = (e) => {
    navigate("/studentform");
  };
  const handleStudentsubmit2 = (e) => {
    navigate("/seniorcitizenform");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-96 gap-9 bg-gray-100">
        <H1
          className="h1 text-4xl 
        p-3"
        >
          Application Forms
        </H1>
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Applications of Students
              </div>
              <p className="text-gray-700 text-base">Claim as a students.</p>
            </div>
            <div className="px-6 py-4">
              <button
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleStudentsubmit}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Applications for Senior Citizens
              </div>
              <p className="text-gray-700 text-base">
                Claim as a senior citizens.
              </p>
            </div>
            <div className="px-6 py-4">
              <button
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleStudentsubmit2}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForms;
const H1 = styled.div`
  border-bottom: 2px solid #000;
`;

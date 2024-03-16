import React from "react";
import StudentTable from "./studentTable";
import SeniorCitizentable from "./seniorCitizentable";

const submittedformslist = () => {
  const data = [
    { id: 1, name: "John Doe", college: "PHCET" },
    { id: 2, name: "Jane Smith", college: "PHCET" },
    { id: 3, name: "Alice Johnson", college: "PHCET" },
    { id: 4, name: "Bob Brown", college: "PHCET" },
    { id: 5, name: "Emily Davis", college: "PHCET" },
  ];
  const data2 = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
    { id: 5, name: "Emily Davis" },
  ];
  return (
    <div>
      <StudentTable data={data} />
      <SeniorCitizentable data={data2} />
    </div>
  );
};

export default submittedformslist;

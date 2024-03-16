import React from "react";
import Analytics from "./analytics";
import Table from "./Table"; // Import the Table component
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const { currentUser } = useAuth();

  // Placeholder data for analytics
  const totalBookings = 123;
  const totalRevenue = "$5,000";
  const activeRoutes = 15;

  // Sample data for the table
  const tableData = [
    { id: 1, name: "John Doe", source: "Mumbai", destination: "Pune" },
    { id: 2, name: "Jane Smith", source: "Banglore", destination: "Pune" },
    { id: 3, name: "Alice Johnson", source: "Pune", destination: "Pune" },
    { id: 4, name: "Bob Brown", source: "Hyderabad", destination: "Pune" },
    { id: 5, name: "Emily Davis", source: "Delhi", destination: "Pune" },
  ];

  return (
    <div className="flex h-screen justify-center">
      {
        <div className="w-full md:w-4/5 p-4">
          <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Analytics title="Total Bookings" value={totalBookings} />
            <Analytics title="Total Revenue" value={totalRevenue} />
            <Analytics title="Active Routes" value={activeRoutes} />
            {/* Add more analytics cards as needed */}
          </div>
          {/* Additional analytics or content can be added here */}

          {/* Table */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Existing Users</h2>
          <Table data={tableData} />
        </div>
      }
    </div>
  );
};

export default DashBoard;

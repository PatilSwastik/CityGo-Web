import React, { useEffect, useState } from "react";
import Analytics from "./analytics";
import Table from "./Table"; // Import the Table component
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { get, ref as dbref, child, set } from "firebase/database";
import { database } from "../firebase/init-firebase";

const DashBoard = () => {
  const [usersData, setUsersData] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalBookings, setTotalBookings] = useState(null);

  const { currentUser } = useAuth();

  if (currentUser && currentUser == null) {
    window.location.href = "/";
  }

  // Sample data for the table
  const tableData = [
    { id: 1, name: "John Doe", source: "Mumbai", destination: "Pune" },
    { id: 2, name: "Jane Smith", source: "Banglore", destination: "Pune" },
    { id: 3, name: "Alice Johnson", source: "Pune", destination: "Pune" },
    { id: 4, name: "Bob Brown", source: "Hyderabad", destination: "Pune" },
    { id: 5, name: "Emily Davis", source: "Delhi", destination: "Pune" },
  ];

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Contact",
      accessor: "contact",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Action",
      accessor: "action",
    },
  ];

  useEffect(() => {
    getAllUsersData();
    getAnalytics();
  }, []);

  const getAllUsersData = () => {
    // Fetch all users from the database
    const db = dbref(database);
    get(child(db, `/users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          data = Object.keys(data).map((key) => {
            return { ...data[key], id: key };
          });
          console.log(data);
          setUsersData(data);
          // if (data.passes) {
          //   get(child(db, `/passes/${data.passes.passId}`))
          //     .then((snapshot) => {
          //       if (snapshot.exists()) {
          //         const passData = snapshot.val();
          //         setPassData(passData);
          //       }
          //     })
          //     .catch((error) => {
          //       alert("Some error occured");
          //       return;
          //     });
          // }
        } else {
          alert("User not found");
        }
      })
      .catch((error) => {
        alert("Some error occured");
        return;
      });
  };

  const getAnalytics = () => {
    const db = dbref(database);
    get(child(db, `/totalRevenue`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          setTotalRevenue(data);
        }
      })
      .catch((error) => {
        alert("Some error occured");
      });
    get(child(db, `/totalBookings`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          setTotalBookings(data);
        }
      })
      .catch((error) => {
        alert("Some error occured");
      });
  };

  return (
    <div className="flex min-h-[90dvh]  justify-center dark:bg-gray-900">
      {
        <div className="w-full md:w-4/5 p-4">
          <h2 className="text-3xl text-white font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {totalBookings && (
              <Analytics title="Total Bookings" value={totalBookings} />
            )}
            {totalRevenue && (
              <Analytics title="Total Revenue" value={totalRevenue} />
            )}
            {/* <Analytics title="Active Routes" value={activeRoutes} /> */}
            {/* Add more analytics cards as needed */}
          </div>
          {/* Additional analytics or content can be added here */}

          {/* Table */}
          {usersData && (
            <>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-white">
                Existing Users
              </h2>
              <Table columns={columns} data={usersData} />
            </>
          )}
        </div>
      }
    </div>
  );
};

export default DashBoard;

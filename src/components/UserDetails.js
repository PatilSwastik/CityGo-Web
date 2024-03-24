import React, { useEffect, useState } from "react";
import { ref as dbref, get, child } from "firebase/database";
import { database } from "../firebase/init-firebase";

function UserDetails() {
  const [usersData, setUsersData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Last day");
  const [currentPassData, setCurrentPassData] = useState(null);
  const [currentPassLoading, setCurrentPassLoading] = useState(true);

  useEffect(() => {
    // Retrieve data from sessionStorage
    let data = sessionStorage.getItem("usersData");
    if (data) {
      data = JSON.parse(data);
      setUsersData(data);

      // Check if the user has a pass
      if (data.passes) {
        let passId = data.passes.passId;
        const db = dbref(database);
        get(child(db, `/passes/${passId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const passData = snapshot.val();
              setCurrentPassData(passData);
              setCurrentPassLoading(false);
            }
          })
          .catch((error) => {
            alert("Some error occured");
          });
      }
    }
  }, []);

  // Sample data for the table
  const data = [
    {
      id: 1,
      source: "Mumbai",
      destination: "Pune",
      purchaseDate: "2021-10-10",
      expiryDate: "2021-11-10",
      amount: 1000,
    },
    {
      id: 2,
      source: "Banglore",
      destination: "Pune",
      purchaseDate: "2021-10-10",
      expiryDate: "2021-11-10",
      amount: 1000,
    },
    {
      id: 3,
      source: "Pune",
      destination: "Pune",
      purchaseDate: "2021-10-10",
      expiryDate: "2021-11-10",
      amount: 1000,
    },
    {
      id: 4,
      source: "Hyderabad",
      destination: "Pune",
      purchaseDate: "2021-10-10",
      expiryDate: "2021-11-10",
      amount: 1000,
    },
    {
      id: 5,
      source: "Delhi",
      destination: "Pune",
      purchaseDate: "2021-10-10",
      expiryDate: "2021-11-10",
      amount: 1000,
    },
  ];

  // Columns for the table
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Source",
      accessor: "source",
    },
    {
      Header: "Destination",
      accessor: "destination",
    },
    {
      Header: "Purchase Date",
      accessor: "purchaseDate",
    },
    {
      Header: "Expiry Date",
      accessor: "expiryDate",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
  ];

  // Dropdown filter values
  const dropDownFilterValues = [
    "Last day",
    "Last 7 days",
    "Last month",
    "Last 3 months",
    "Last year",
  ];

  return (
    <div className="min-h-[90dvh] dark:bg-gray-900">
      {usersData ? (
        <>
          <div className="flex items-center justify-center ">
            {/* Display User Details */}
            <div className="w-full px-16">
              <div className="">
                <h1 className="text-3xl font-bold text-white text-start">
                  User Details
                </h1>
              </div>

              <div className="w-full mt-2">
                <div className="w-full md:w-4/5 p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col items-center md:items-start text-start">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Name : {usersData.firstName + " " + usersData.lastName}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Email : {usersData.email}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Phone : {usersData.phoneNumber}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Address : {usersData.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pass Details */}
            {usersData.passes && (
              <div className="w-full px-16">
                <div className=" mt-2">
                  <h1 className="text-3xl font-bold text-white text-start">
                    Current Pass Details
                  </h1>
                </div>
                {currentPassLoading ? (
                  <div className="w-full px-16">
                    <div className="w-full md:w-4/5 p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-3 md:p-4 dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex flex-col items-center md:items-start text-start">
                          <div role="status" class="max-w-sm animate-pulse">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=" mt-2">
                    <div className="w-full md:w-4/5 p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-3 md:p-4 dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex flex-col items-center md:items-start text-start">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            Source : {currentPassData.source}
                          </p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            Destination :{currentPassData.destination}
                          </p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            Purchase Date : {usersData.passes.purchaseDate}
                          </p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            Expiry Date : {usersData.passes.expiryDate}
                          </p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            Amount : {currentPassData.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Past Pass Data in table format */}
          <div className="flex flex-col justify-center items-center mt-2">
            <h1 className="text-3xl font-bold text-white">Past Pass Data</h1>
          </div>
          {/* Table */}
          <div className="px-16 py-6 overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <div className="relative">
                <button
                  id="dropdownRadioButton"
                  data-dropdown-toggle="dropdownRadio"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("dropdownRadio")
                      .classList.toggle("hidden");
                  }}
                >
                  <svg
                    className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                  </svg>
                  {selectedFilter}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownRadio"
                  className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                  data-popper-placement="top"
                  style={{
                    position: "absolute",
                    inset: "auto auto 0px 0px",
                    margin: "0px",
                    transform: "translate3d(0px, 200px, 0px)",
                  }}
                >
                  <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownRadioButton"
                  >
                    {dropDownFilterValues.map((item, index) => (
                      <li key={index}>
                        <div
                          className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => {
                            setSelectedFilter(item);
                            document
                              .getElementById("dropdownRadio")
                              .classList.toggle("hidden");
                          }}
                        >
                          {item}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="font-medium text-gray-900 dark:text-gray-300 px-6 py-3"
                    >
                      {column.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {++index}
                      </th>
                      <td className="px-6 py-4">{item.source}</td>
                      <td className="px-6 py-4">{item.destination}</td>
                      <td className="px-6 py-4">{item.purchaseDate}</td>
                      <td className="px-6 py-4">{item.expiryDate}</td>
                      <td className="px-6 py-4">{item.amount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-3xl font-bold text-white">User not found</h1>
      )}
    </div>
  );
}

export default UserDetails;

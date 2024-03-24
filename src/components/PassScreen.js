import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref as dbref, get, set, child } from "firebase/database";
import { database } from "../firebase/init-firebase";
import { IoRefreshCircleOutline } from "react-icons/io5";

function PassScreen() {
  // Retrieve the user ID and pass ID from the URL
  const { userId, passId } = useParams();
  const [userData, setUserData] = useState(null);
  const [passData, setPassData] = useState(null);
  const [userPassData, setUserPassData] = useState(null);

  useEffect(() => {
    const db = dbref(database);
    get(child(db, `/users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);
          if (data.passes) {
            let pass = data.passes[passId];
            setUserPassData(pass);

            let lastReadOn = pass.lastReadOn;
            let dateArr = lastReadOn.split("/");
            let date = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
            let today = new Date();

            if (date.getDate() < today.getDate() && pass.readCnt > 1) {
              set(dbref(database, `users/${userId}/passes/${passId}`), {
                ...pass,
                readCnt: 0,
              }).catch((error) => {
                alert("Some error occured");
              });
            }

            get(child(db, `/passes/${passId}`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  let passData = snapshot.val();
                  setPassData(passData);
                }
              })
              .catch((error) => {
                alert("Some error occured");
              });
          }
        } else {
          alert("User not found");
        }
      })
      .catch((error) => {
        alert("Some error occured");
        return;
      });
  }, [userId, passId]);

  function markTick(passId) {
    let readCnt = userData.passes[passId].readCnt;
    let lastReadOn = userData.passes[passId].lastReadOn;
    let dateArr = lastReadOn.split("/");
    let date = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
    let today = new Date();

    if (date.getDate() === today.getDate() && readCnt > 1) {
      alert("Already marked as read today");
      return;
    }

    set(dbref(database, `users/${userId}/passes/${passId}`), {
      ...userData.passes[passId],
      readCnt: readCnt + 1,
      lastReadOn: `${today.getDate()}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`,
    })
      .then(() => {
        alert("Marked as read");
      })
      .catch((error) => {
        alert("Some error occured");
      });
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[90dvh] ">
      {userData ? (
        <div className="flex flex-col items-center justify-center max-w-sm bg-white border border-gray-200 p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {userData.profileImage && (
            <div className="relative w-full flex flex-row items-center justify-center">
              <img
                className="w-24 h-24 mb-2 rounded-full shadow-lg"
                srcSet={userData.profileImage}
                alt=""
              />
              <IoRefreshCircleOutline
                onClick={() => {
                  window.location.reload();
                }}
                className="absolute top-0 right-0 w-6 h-6 text-white bg-gray-900 rounded-full cursor-pointer dark:bg-gray-600"
              />
            </div>
          )}
          <div className="p-3 pb-1">
            <div className="font-normal text-gray-700 dark:text-gray-400">
              <div className="my-4 space-y-3">
                <div className="bg-gray-50 dark:bg-gray-600  rounded-lg ">
                  <div className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ms-3 whitespace-nowrap text-left">
                      Name : {userData.firstName} {userData.lastName}
                    </span>
                  </div>
                  <div className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ms-3 whitespace-nowrap text-left">
                      Address : {userData.address}
                    </span>
                  </div>
                  <div className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ms-3 whitespace-nowrap text-left">
                      Contact : {userData.phoneNumber}
                    </span>
                  </div>
                </div>

                {passData ? (
                  <div className="bg-gray-50 dark:bg-gray-600  rounded-lg ">
                    <div className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg  hover:bg-gray-100 group hover:shadow  dark:hover:bg-gray-500 dark:text-white">
                      <span className="flex-1 ms-3 whitespace-nowrap text-left">
                        Source : {passData.source}
                      </span>
                    </div>
                    <div className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg  hover:bg-gray-100 group hover:shadow  dark:hover:bg-gray-500 dark:text-white">
                      <span className="flex-1 ms-3 whitespace-nowrap text-left">
                        Destination : {passData.destination}
                      </span>
                    </div>
                    <div className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg  hover:bg-gray-100 group hover:shadow  dark:hover:bg-gray-500 dark:text-white">
                      <span className="flex-1 ms-3 whitespace-nowrap text-left">
                        Price : {passData.price}
                      </span>
                    </div>
                    <div className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg hover:bg-gray-100 group hover:shadow dark:hover:bg-gray-500 dark:text-white">
                      <span className="flex-1 ms-3 whitespace-nowrap text-left">
                        Purchase Date : {userPassData.purchaseDate}
                      </span>
                    </div>
                    <div className="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                      <span className="flex-1 ms-3 whitespace-nowrap text-left">
                        Expiry Date : {userPassData.expiryDate}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg  bg-white">
                      <span className="flex-1 ms-3 whitespace-nowrap text-red-700">
                        No Pass Data
                      </span>
                    </div>
                  </div>
                )}
                <div>
                  <button
                    onClick={() => markTick(passId)}
                    className="flex items-center w-full p-2 text-base font-bold text-gray-900 rounded-lg bg-green-500 hover:bg-gray-100 group hover:shadow dark:hover:bg-green-800 dark:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                    style={
                      userPassData?.readCnt > 1
                        ? {
                            cursor: "not-allowed",
                            backgroundColor: "#333",
                            color: "#fff",
                          }
                        : { cursor: "pointer" }
                    }
                    disabled={userPassData?.readCnt > 1}
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap text-center">
                      {userPassData?.readCnt > 1
                        ? "Max Limit Reached"
                        : "Mark as Read"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-[#3a4f7a] dark:bg-[#3a4f7a] dark:border-[#3a4f7a]">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PassScreen;

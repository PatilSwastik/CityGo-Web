import React, { useState } from "react";
import { useAuth } from "./../contexts/AuthContext";
import { storage, database } from "../firebase/init-firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { set, ref as dbref, get, child } from "firebase/database";

const SeniorCitizenform = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setaddress] = useState("");
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const { currentUser } = useAuth();

  const handleSubmit = (downloadURLBC, downloadURLID) => {
    const userApplication = {
      name: name,
      email: email,
      age: age,
      downloadURL: downloadURLBC,
      downloadURLID: downloadURLID,
    };
    writeUserData(userApplication);
  };

  function writeUserData(student) {
    const location = currentUser.uid;

    const db = database;
    set(dbref(db, "/applications/" + location), {
      name: student.name,
      uid: location,
      email: student.email,
      birthCerti: student.downloadURL,
      idCard: student.downloadURLID,
      appliedDate: new Date(Date.now()).toString(),
      //internal
      isPending: true,
      isApproved: false,
      isRejected: false,
      //logs
    });
    alert("Submitted");
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      for (let i = 0; i <= e.target.files.length - 1; i++) {
        let fsize = e.target.files.item(i).size;
        let file = Math.round(fsize / 1024);
        // The size of the file.
        if (file >= 250) {
          alert("File too Big, please select a file less than 250kb");
        } else {
          setFiles(e.target.files[0]);
        }
      }
    }
  };

  const handleFileChange2 = (e) => {
    if (e.target.files[0]) {
      for (let i = 0; i <= e.target.files.length - 1; i++) {
        let fsize = e.target.files.item(i).size;
        let file = Math.round(fsize / 1024);
        // The size of the file.
        if (file >= 250) {
          alert("File too Big, please select a file less than 250kb");
        } else {
          setFiles2(e.target.files[0]);
        }
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name || !files || !files2) {
      return;
    } else {
      let typeRef = "ID";
      const pathRef = currentUser.uid;
      let storageRef = ref(storage, `${pathRef}/${typeRef}/${files.name}`);
      let uploadTask = uploadBytesResumable(storageRef, files);
      // console.log("Uploaded");

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          alert("Some error occured ! Please try again");
        }
      );
      typeRef = "COLLEGE_ID";
      storageRef = ref(storage, `${pathRef}/${typeRef}/${files2.name}`);
      console.log(typeRef);
      let uploadTask2 = uploadBytesResumable(storageRef, files2);
      // console.log("Uploaded");
      let URL;
      uploadTask2.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        },
        (error) => {
          // Handle unsuccessful uploads
          alert("Some error occured ! Please try again");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURLBC) => {
            URL = downloadURLBC;
            getDownloadURL(uploadTask2.snapshot.ref).then((downloadURLID) => {
              handleSubmit(URL, downloadURLID);
            });
          });
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Senior Citizen Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Email id"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Age"
              className="block text-gray-700 font-semibold mb-2"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="files"
              className="block text-gray-700 font-semibold mb-2"
            >
              Upload legal identity
            </label>

            <input
              type="file"
              id="files"
              className="bg-gray-600 text-white font-semibold py-2 px-4 rounded "
              onChange={handleFileChange}
              multiple
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="files"
              className="block text-gray-700 font-semibold mb-2"
            >
              Upload Files
            </label>

            <input
              type="file"
              id="files"
              className="bg-gray-600 text-white font-semibold py-2 px-4 rounded "
              onChange={handleFileChange2}
              multiple
            />
          </div>
          <button
            type="submit"
            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded "
            onClick={handleUpload}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeniorCitizenform;

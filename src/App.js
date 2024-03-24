import "./App.css";
import NavBar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Authentication/SignIn";
import Register from "./Authentication/Register";
import ForgetPassword from "./Authentication/ForgetPassword";
import { Home } from "./components/home";
import DashBoard from "./components/dashBoard";
import ProfilePage from "./components/profile";
import AuthContextProvider from "./contexts/AuthContext";
import Submittedformslist from "./components/submittedformslist";
import UserForms from "./components/usersforms";
import SeniorCitizenform from "./forms/seniorCitizenform";
import ViewUploads from "./components/viewUploads";
import StudentDetails from "./forms/studentDetails";
import UserDetails from "./components/UserDetails";
import PassScreen from "./components/PassScreen";

function App() {
  return (
    <div className="App h-dvh dark:bg-gray-900">
      <AuthContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/userforms" element={<UserForms />} />
            <Route path="/seniorcitizenform" element={<SeniorCitizenform />} />
            <Route path="/studentform" element={<StudentDetails />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/viewuploads" element={<ViewUploads />} />
            <Route
              path="/dashboard/submittedforms"
              element={<Submittedformslist />}
            />
            <Route path="/qr_code/:userId/:passId" element={<PassScreen />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;

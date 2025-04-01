import React from "react";
import { Route, Routes } from "react-router-dom";
import { ContactsContextProvider } from "./Context/ContactsContext";
import HomeScreen from "./Screens/HomeScreen";
import SideBar from "./Components/SideBar";
import "./styles/global.css";
import ChatScreen from "./Screens/ChatScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import UserProfileScreen from "./Screens/UserProfileScreen";
import VerifyEmailScreen from "./Screens/VerifyEmailScreen";
import ProtectedRoute from "./Components/ProtectedRoute";
import RewritePasswordScreen from "./Screens/RewritePasswordScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import CheckEmailScreen from "./Screens/CheckEmailScreen";

function App() {
  return (
    <ContactsContextProvider>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LoginScreen />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/verify-email" element={<VerifyEmailScreen />} />
            </Route>

            <Route path="/login" element={<LoginScreen />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/user-profile" element={<UserProfileScreen />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={
                <div className="homeScreen">
                  <SideBar />
                  <HomeScreen />
                </div>
              } />
            </Route>

            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/check-email" element={<CheckEmailScreen />} />
            <Route path="/reset-password" element={<ResetPasswordScreen />} />
            <Route path="/rewrite-password" element={<RewritePasswordScreen />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/contact/:contact_id" element={
                <div className="chatScreen">
                  <ChatScreen />
                </div>
              } />
            </Route>

          </Routes>
        </div>
      </div>
    </ContactsContextProvider>
  );
}

export default App;

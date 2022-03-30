import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "../AdminRoute";
import HomePage from "./Home/HomePage";
import LoginPage from "./Auth/Login/LoginPage";
import RegisterPage from "./Auth/Register/RegisterPage";
import Header from "./DisplayComponents/Header";
const Main = ({ location }) => (
    <>
        <Header />
        <div className="relative">
            <Switch location={location}>
                <Route path="/" exact component={HomePage} />
                <Route path="/auth/login" component={LoginPage} />
                <Route path="/auth/register" component={RegisterPage} />
            </Switch>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default withRouter(Main);

import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "../AdminRoute";
import Header from "./DisplayComponents/Header";
import UserDashboard from "./Dashboard/UserDashboard";
import LoginPage from "./Auth/Login/LoginPage";
import RegisterPage from "./Auth/Register/RegisterPage";
import AdminDashboard from "./Admin/Dashboard/AdminDashboard";
import TaskCreatePage from "./Admin/Tasks/Manage/Create/TaskCreatePage";
import TaskOverviewPage from "./Admin/Tasks/Manage/View/TaskOverviewPage";
import TaskAssignUsersPage from "./Admin/Tasks/Manage/AssignUsers/TaskAssignUsersPage";

const Main = ({ location }) => (
    <>
        <Header />
        <div className="relative">
            <Switch location={location}>
                <Route path="/" exact component={UserDashboard} />
                <Route path="/auth/login" component={LoginPage} />
                <Route path="/auth/register" component={RegisterPage} />
                <AdminRoute
                    path="/admin/tasks/create"
                    component={TaskCreatePage
                    }
                />
                <AdminRoute
                    path="/admin/tasks/:taskId/assign"
                    component={TaskAssignUsersPage
                    }
                />
                <AdminRoute
                    path="/admin/tasks/:taskId"
                    component={TaskOverviewPage
                    }
                />
                <AdminRoute
                    path="/admin"
                    component={AdminDashboard
                    }
                />
            </Switch>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default withRouter(Main);

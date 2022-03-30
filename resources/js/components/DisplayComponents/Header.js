import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { checkUserIsAdmin } from "../../redux/actions/isAdminActions"
import { logout } from "../../redux/actions/authenticationActions";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

const Header = ({ userIsAuthenticated, isAdmin, checkUserIsAdmin, logout }) => {
    const [mobileIsOpen, setMobileIsOpen] = useState(null);
    const location = useLocation();

    useEffect(() => {
        checkUserIsAdmin();
    }, [])

    useEffect(() => {
        setMobileIsOpen(false);
    }, [location]);

    function toggleMobileNavigation() {
        setMobileIsOpen(!mobileIsOpen);
    }

    function handleLogout() {
        confirmAlert({
            title: "Confirm logout",
            message: `Are you sure you want to logout?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        logout();
                        toast.info("Logged out.");
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    return (
        <nav className="bg-primary flex items-center justify-between flex-wrap p-4 shadow-md">
            <div className="flex items-center flex-shrink-0  mr-6">
                <Link to="/">
                    <h1 className="logo-text text-secondary font-bold text-2xl">Schedule App</h1>
                </Link>
            </div>
            <div className="block md:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-white hover:border-white pointer" onClick={toggleMobileNavigation}>
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`${mobileIsOpen ? "block" : "hidden"} w-full flex-grow md:flex md:items-center md:w-auto`}>
                <div className="text-sm md:flex-grow">
                </div>
                <div className="border-t mt-2 md:border-0 md:mt-0">
                    {userIsAuthenticated ? (
                        <>
                            {isAdmin && (
                                <Link
                                    to={`/admin`}
                                    className="bg-primary text-secondary border-secondary hover:opacity-75  text-sm md:px-4 md:py-2 md:leading-none md:border rounded  mt-4 md:mt-0 md:ml-2 inline-flex items-center"
                                >
                                    <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="ml-1">Admin</span>
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-primary text-secondary border-secondary hover:opacity-75  text-sm md:px-4 md:py-2 md:leading-none md:border rounded mt-4 md:mt-0 md:ml-2 inline-flex items-center"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="ml-1">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to={`/auth/login`}
                                className="bg-primary text-secondary border-secondary hover:opacity-75  text-sm md:px-4 md:py-2 md:leading-none md:border rounded  mt-4 md:mt-0 md:ml-2 inline-flex items-center"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="ml-1">Login</span>
                            </Link>
                            <Link
                                to={`/auth/register`}
                                className="bg-primary text-secondary border-secondary hover:opacity-75  text-sm md:px-4 md:py-2 md:leading-none md:border rounded  mt-4 md:mt-0 md:ml-2 inline-flex items-center"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="ml-1">Register</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

Header.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    checkUserIsAdmin: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null,
        isAdmin: state.isAdmin
    };
};

const mapDispatchToProps = {
    checkUserIsAdmin,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

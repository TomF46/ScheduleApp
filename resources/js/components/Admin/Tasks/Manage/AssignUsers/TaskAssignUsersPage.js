import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _, { debounce } from 'lodash';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';
import { assignUser, getTaskById, unassignUser } from "../../../../../api/taskApi";
import { searchUsers, searchUsersWithPage } from "../../../../../api/usersApi";
import UserSearchForm from "../../../../DisplayComponents/UserSearchForm";
import UserAssignmentListWithPagination from "./UserAssignmentListWithPagination";
import history from "../../../../../history";


const TaskAssignUsersPage = ({ taskId }) => {
    const [task, setTask] = useState(null);
    const [usersPaginator, setUsersPaginator] = useState(null);
    const [searchTerms, setSearchTerms] = useState({ firstName: "", lastName: "" });

    useEffect(() => {
        if (!task) {
            getTask();
        }
    }, [taskId, task])

    useEffect(() => {
        if (!usersPaginator) {
            search();
        }
    }, [usersPaginator]);

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [searchTerms]);

    function getTask() {
        getTaskById(taskId).then(taskData => {
            setTask(taskData);
        }).catch(error => {
            toast.error("Error getting task " + error.message, {
                autoClose: false,
            });
        });
    }

    function search() {
        searchUsers(searchTerms).then(usersData => {
            setUsersPaginator(usersData);
        }).catch(error => {
            toast.error("Error getting users " + error.message, {
                autoClose: false,
            });
        });
    }

    function getUsersPage(url) {
        searchUsersWithPage(url, searchTerms).then(usersData => {
            setUsersPaginator(usersData);
        }).catch(error => {
            toast.error("Error getting users " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleSearchTermsChange(event) {
        const { name, value } = event.target;

        setSearchTerms(prevSearchTerms => ({
            ...prevSearchTerms,
            [name]: name == "role" ? Number(value) : value
        }));
    }

    function handleUserAssigned(id) {
        assignUser(task.id, id).then(response => {
            getTask();
            toast.success("User assigned");
        }).catch(err => {
            toast.error("Error assigning user", {
                autoClose: false
            });
        });
    }

    function handleUserUnassigned(id) {
        unassignUser(task.id, id).then(response => {
            getTask();
            toast.success("User Unassigned");
        }).catch(err => {
            toast.error("Error Unassigning user", {
                autoClose: false
            });
        });
    }

    return (
        <>
            <div className="produt-page container mx-auto p-4 lg:p-0">
                {!task ? (
                    <LoadingMessage message={"Loading Task"} />
                ) : (
                    <div>
                        <p>Assign users to {task.title}</p>
                        {!usersPaginator ? (
                            <LoadingMessage message={"Loading users"} />
                        ) : (
                            <>
                                <Link to={`/admin/tasks/${task.id}`} className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mb-2 inline-flex items-center justify-center hover:opacity-75 hover:text-secondary  shadow">
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="ml-1">Back to task</span>
                                </Link>
                                <UserSearchForm searchTerms={searchTerms} onSearchTermsChange={handleSearchTermsChange} />
                                {usersPaginator.total > 0 ? (
                                    <UserAssignmentListWithPagination task={task} paginationData={usersPaginator} onPageChange={getUsersPage} onAssign={handleUserAssigned} onUnassign={handleUserUnassigned} />
                                ) : (
                                    <p className="text-center">There are currently no users added that match your search.</p>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    )
};

TaskAssignUsersPage.propTypes = {
    taskId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        taskId: ownProps.match.params.taskId,
    };
};


export default connect(mapStateToProps)(TaskAssignUsersPage);

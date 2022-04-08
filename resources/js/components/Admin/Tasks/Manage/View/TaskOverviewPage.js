import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';
import { getTaskById, unassignUser } from "../../../../../api/taskApi";
import UserAssignmentList from "../AssignUsers/UserAssignmentList";
import AssignedUsersList from "./AssignedUserList";


const TaskPage = ({ taskId }) => {
    const [task, setTask] = useState(null);

    useEffect(() => {
        if (!task) {
            getTask();
        }
    }, [taskId, task])

    function getTask() {
        getTaskById(taskId).then(taskData => {
            setTask(taskData);
        }).catch(error => {
            toast.error("Error getting task " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleUserUnassigned(id) {
        unassignUser(task.id, id).then(response => {
            toast.success("User Unassigned");
            getTask();
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
                        <p>{task.title} overview</p>
                        {task.assignedUsers.length > 0 ? (
                            <AssignedUsersList users={task.assignedUsers} unassign={handleUserUnassigned} />
                        ) : (
                            <div>
                                <p>No users currently assigned</p>
                                <Link to={`/admin/tasks/${task.id}/assign`} className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mb-2 inline-flex items-center justify-center hover:opacity-75 hover:text-secondary  shadow">
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="ml-1">Assign user</span>
                                </Link>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </>
    )
};

TaskPage.propTypes = {
    taskId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        taskId: ownProps.match.params.taskId,
    };
};


export default connect(mapStateToProps)(TaskPage);

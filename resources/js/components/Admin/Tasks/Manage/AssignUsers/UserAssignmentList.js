import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserAssignmentList = ({ task, users, assign, unassign }) => {

    function getIsAssigned(id) {
        return task.assignedUsers.some(user => user.id == id);
    }

    return (
        <div>
            {users.map((user) => {
                return (
                    <div key={user.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <Link to={`/admin/users/${user.id}`} className="font-medium text-lg items-center pointer">{user.fullName}</Link>
                        </div>
                        <div className="col-span-4">
                            <p className="text-sm text-gray-600">Email:</p>
                            <p>{user.email}</p>
                        </div>
                        <div className="col-span-4">
                            <div className="table vertical-centered">
                                <button
                                    onClick={() => { getIsAssigned(user.id) ? unassign(user.id) : assign(user.id) }}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center"
                                >
                                    <p className="m-auto">{getIsAssigned(user.id) ? 'Unassign' : 'Assign'}</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

UserAssignmentList.propTypes = {
    task: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    assign: PropTypes.func.isRequired,
    unassign: PropTypes.func.isRequired
};

export default UserAssignmentList;

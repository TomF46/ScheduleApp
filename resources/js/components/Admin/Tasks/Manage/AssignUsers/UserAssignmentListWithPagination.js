import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "../../../../DisplayComponents/PaginationControls";
import UserAssignmentList from "./UserAssignmentList";


const UserAssignmentListWithPagination = ({ task, paginationData, onPageChange, onAssign, onUnassign }) => {
    return (
        <div className="users-list-w-pagination">
            <UserAssignmentList task={task} users={paginationData.data} assign={onAssign} unassign={onUnassign} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

UserAssignmentListWithPagination.propTypes = {
    task: PropTypes.object.isRequired,
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onAssign: PropTypes.func.isRequired,
    onUnassign: PropTypes.func.isRequired
};

export default UserAssignmentListWithPagination;

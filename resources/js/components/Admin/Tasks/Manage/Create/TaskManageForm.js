import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../../../FormComponents/TextInput";
import TextAreaInput from "../../../../FormComponents/TextAreaInput";
import DateTimePickerInput from "../../../../FormComponents/DateTimePickerInput";
const TaskManageForm = ({
    task,
    onSave,
    onChange,
    onStartDateTimeChange,
    onEndDateTimeChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form className="" onSubmit={onSave}>
            <div className="my-8">
                <div className="my-2 card shadow-md rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">{task.id ? 'Edit' : 'Add'} Task</p>
                    </div>
                    <div className="p-2">
                        {errors.onSave && (
                            <div className="text-red-500 text-xs p-1" role="alert">
                                {errors.onSave}
                            </div>
                        )}

                        <div className="mb-6">
                            <TextInput
                                name="title"
                                label="Title"
                                value={task.title}
                                onChange={onChange}
                                error={errors.title}
                            />
                        </div>

                        <div className="mb-6">
                            <TextAreaInput
                                name="description"
                                label="Description"
                                value={task.description}
                                onChange={onChange}
                                error={errors.description}
                                required={true}
                            />
                        </div>

                        <div className="mb-6">
                            <DateTimePickerInput
                                name="start_time"
                                label="Start time"
                                value={task.start_time}
                                onChange={onStartDateTimeChange}
                                minDate={new Date()}
                                error={errors.start_time}
                            />
                        </div>

                        <div className="mb-6">
                            <DateTimePickerInput
                                name="end_time"
                                label="End time"
                                value={task.end_time}
                                onChange={onEndDateTimeChange}
                                minDate={task.start_time}
                                error={errors.end_time}
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75"
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

TaskManageForm.propTypes = {
    task: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onStartDateTimeChange: PropTypes.func.isRequired,
    onEndDateTimeChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default TaskManageForm;

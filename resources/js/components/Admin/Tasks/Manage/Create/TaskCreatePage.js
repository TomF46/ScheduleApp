import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import history from "../../../../../history";
import TaskManageForm from "./TaskManageForm";
import { createTask } from "../../../../../api/taskApi"
import moment from "moment";

const TaskCreatePage = () => {

    const [task, setTask] = useState({
        title: "",
        description: "",
        start_time: new Date(),
        end_time: new Date()
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    }

    function handleStartTimeChange(time) {
        setTask(prevTask => ({
            ...prevTask,
            'start_time': time
        }));
    }

    function handleEndTimeChange(time) {
        setTask(prevTask => ({
            ...prevTask,
            'end_time': time
        }));
    }

    function formIsValid() {
        const { title, description, start_time, end_time } = task;
        const errors = {};
        if (!title) errors.title = "Title is required";
        if (!description) errors.description = "Description is required";
        if (!start_time) errors.start_time = "Start time is required";
        if (!end_time) errors.end_time = "End time is required";
        if (end_time.getTime() <= start_time.getTime()) errors.end_time = "End time must be after the start time"

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        let payload = {
            title: task.title,
            description: task.description,
            start_time: moment(task.start_time).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(task.end_time).format('YYYY-MM-DD HH:mm:ss')
        }

        createTask(payload).then(response => {
            toast.success("Task created");
            history.push('/admin');
        })
            .catch(err => {
                setSaving(false);
                toast.error("Error creating task", {
                    autoClose: false
                });
                let tempErrors = { ...errors };
                tempErrors.onSave = err.message;
                setErrors({ ...tempErrors });
            });
    }

    function formatErrorText(error) {
        let errorText = '';

        for (const [key, value] of Object.entries(error.data.errors)) {
            errorText = `${errorText} ${value}`;
        }

        return errorText;
    }

    return (
        <div className="task-create-form">
            <TaskManageForm task={task} errors={errors} onChange={handleChange} onStartDateTimeChange={handleStartTimeChange} onEndDateTimeChange={handleEndTimeChange} onSave={handleSave} saving={saving} />
        </div>
    );
};


export default TaskCreatePage;

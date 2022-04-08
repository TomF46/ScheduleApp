import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

const DateTimePickerInput = ({ name, label, onChange, value, minDate, error }) => {
    return (
        <div className="field">
            {label &&
                <label
                    className="block mb-2 font-bold text-xs text-gray-700"
                    htmlFor={name}
                >
                    {label}
                </label>
            }
            <div className="control">
                <DatePicker
                    selected={value}
                    onChange={onChange}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                    shouldCloseOnSelect={false}
                    minDate={minDate}
                />
            </div>
            {error && (
                <div className="text-red-500 text-xs p-1 mt-2">{error}</div>
            )}
        </div>
    );
};

DateTimePickerInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.isRequired,
    error: PropTypes.string,
    minDate: PropTypes.isRequired
};

export default DateTimePickerInput;

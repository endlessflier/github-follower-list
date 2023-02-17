import PropTypes from "prop-types";
import { useState } from "react";

export default function Textfield({
  type,
  label,
  value,
  icon,
  placeholder,
  className,
  errorText,
  onChange,
  rounded,
  ...rest
}) {
  const [isRequired, setIsRequired] = useState(false);
  const isError = isRequired && errorText;
  return (
    <div className={`${className}`}>
      {label && <label className="mb-1" htmlFor="label">{label}</label>}
      <div
        className={`input-group input-box${rounded ? " rounded-4" : ""}${
          isError ? " error" : ""
        }`}
      >
        {icon && (
          <span className="input-group-append bg-white border-0">
            <span className="input-group-text bg-transparent border-0">
              {icon}
            </span>
          </span>
        )}
        <input
          type={type}
          className={`form-control ${rounded ? "rounded-4" : ""} border-0 ${
            icon ? "ps-0" : ""
          } input-text`}
          id="input"
          placeholder={placeholder}
          required
          {...rest}
          onChange={(e) => {
            onChange(e);
            setIsRequired(true);
          }}
          value={value}
        />
      </div>
      {isError && (
        <div className="col-sm-3">
          <small id="helperText" className="text-danger">
            {errorText}
          </small>
        </div>
      )}
    </div>
  );
}

Textfield.propTypes = {
  type: PropTypes.oneOf(["text", "password"]),
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  rounded: PropTypes.bool,
};

Textfield.defaultProps = {
  type: "text",
  placeholder: "",
  errorText: "",
  rounded: false,
};

import classNames from "classnames";
import React, { useState } from "react";
import "./index.scss";
import { eyeCrossed, eyeIcon } from "../../assets/images";

const TextInput = ({
    label,
    className,
    placeholder,
    onChange,
    type,
    name,
    id,
    required
}) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="position-relative">
            <label htmlFor={id} className="text-input-label">{label}</label>
            <input
                type={showPassword ? "text" : type}
                className={classNames("default-input-wrap", className)}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                id={id}
                required={required}
                pattern={required}
            />
            {
                type === "password" &&
                    <img 
                        src={
                            showPassword ?
                            eyeIcon :
                            eyeCrossed
                        } 
                        alt="" 
                        onClick={()=>setShowPassword(!showPassword)}
                        className="pass-eye-icon"
                    />
            }
        </div>
    )
}

export default TextInput;
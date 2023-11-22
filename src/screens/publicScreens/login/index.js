import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { remedyRoboticsLogo } from "../../../assets/images";
import { saveAuthTokens } from "../../../utils/localStorage";
import { setUserDetails } from "../../../redux/userSlice";
import { urlPaths } from "../../../constants/urlPath";
import TextInput from "../../../components/textInput";
import Button from "../../../components/button";
import "./index.scss"

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()
        saveAuthTokens("somethinh")
        dispatch(setUserDetails({
            isAuthenticated: true,
            name: "Juned Mansuri",
            email:e.target[0].value
        }))
        navigate("/jobs")
        console.log("data",e.target[0].value, urlPaths.jobs)
    }

    return (
        <div className="login-screen-wrap">
            <div className="text-center mb-5">
                <img src={remedyRoboticsLogo} alt="" />
            </div>
            <div className="login-form-wrap">
                <form onSubmit={onSubmit}>
                    <TextInput
                        name="email"
                        id="email"
                        placeholder={"Enter Email Address"}
                        label={"Email Address"}
                        className={"w-100 mb-4"}
                        type="email"
                        required={true}
                    />
                    <TextInput
                        name="password"
                        id="password"
                        placeholder={"Enter Password"}
                        label={"Password"}
                        className={"w-100 mb-4 pe-5"}
                        type="password"
                        required={true}
                    />
                    <div className="forgot-password-wrap mb-4 mt-2">
                        Forgot Password?
                    </div>
                    <Button
                        label={'Login'}
                        className={"login-button-wrap"}
                        type="submit"
                    />
                </form>
            </div>
        </div>
    )
}
export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from 'aws-amplify/auth';
import { useDispatch } from "react-redux";
import { remedyRoboticsLogo } from "../../../assets/images";
import { setUserDetails } from "../../../redux/userSlice";
import { urlPaths } from "../../../constants/urlPath";
import TextInput from "../../../components/textInput";
import Button from "../../../components/button";
import "./index.scss"

const Login = () => {
    const [error, setError] = useState(null)
    const [apiCalled, setApiCalled] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        setApiCalled(true)
        const username = e.target[0].value;
        const password = e.target[1].value;
        signIn({ username, password })
        .then((res)=>{
            if(res.isSignedIn) {
                dispatch(setUserDetails({
                    isAuthenticated: true,
                    email: username
                }))
                navigate(urlPaths.jobs)
            }
        })
        .catch((err)=>{
            setError(err.message)
        })
        .finally(()=>{
            setApiCalled(false)
        })
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
                        type="text"
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
                        label={apiCalled?"Loading...":'Login'}
                        className={"login-button-wrap"}
                        type="submit"
                        isDisabled={apiCalled}
                    />
                    {
                        error &&
                        <div className='alert alert-danger mt-2 text-center'>
                            {error}
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}
export default Login;
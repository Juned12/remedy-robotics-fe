import React from "react";
import { useSelector } from "react-redux";
import { remedyRoboticsLogo, roundAvtar } from "../../../assets/images";
import "./index.scss"

const Navbar = () => {

    const userDetails = useSelector((state)=>state.userDetails?.details)
    return (
        <>
            <div className="navbar-wrap">
                <div>
                    <img src={remedyRoboticsLogo} alt="" className="remedy-robot-logo-nav"/>
                </div>
                <div className="d-flex align-items-center">
                    <div className="me-3 text-end">
                        <div className="user-name">{userDetails?.name}</div>
                        <div className="user-email">{userDetails?.email}</div>
                    </div>
                    <div>
                        <img src={roundAvtar} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar;
import React from "react";
import { remedyRoboticsLogo, roundAvtar } from "../../../assets/images";
import "./index.scss"

const Navbar = () => {

    return (
        <>
            <div className="navbar-wrap">
                <div>
                    <img src={remedyRoboticsLogo} alt="" className="remedy-robot-logo-nav"/>
                </div>
                <div className="d-flex align-items-center">
                    <div className="me-3 text-end">
                        <div className="user-name">Richard Maxwell</div>
                        <div className="user-email">richard@gmail.com</div>
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
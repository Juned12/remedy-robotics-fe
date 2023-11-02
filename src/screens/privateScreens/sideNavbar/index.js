import React from "react";
import { jobsIcon } from "../../../assets/images";
import "./index.scss"

const SideNavBar = ({
    section
}) => {

    return (
        <div className="d-flex">
            <div className="sidenavbar-wrap">
                <div className="sidenav-action-item ms-2 me-2">
                    <img src={jobsIcon} alt="" />
                    <div>
                        Jobs
                    </div>
                </div>
            </div>
            {section}
        </div>
    )
}

export default SideNavBar
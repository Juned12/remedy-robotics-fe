import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { jobsIcon } from "../../../assets/images";
import { urlPaths } from "../../../constants/urlPath";
import "./index.scss"

const SideNavBar = ({
    sideBarIsOpen
}) => {
    const location = useLocation()
    const sidebarMenuOption = [
        {
            name: "Jobs",
            image: jobsIcon,
            url: urlPaths.jobs
        }
    ]
    return (
        <>
            {
                sideBarIsOpen &&
                <div className="sidenavbar-wrap">
                    {
                        sidebarMenuOption.map((menuItem) => 
                        <Link
                            to={menuItem.url}
                            className="no-decor" 
                            key={menuItem.name} 
                        >
                        <div className={classNames("ms-2 me-2 mb-2 sidenav-action-item", location.pathname === menuItem.url ? "active-action-item" : "inactive-action-item" )}>
                            <img src={menuItem.image} alt="" />
                            <div>
                                {menuItem.name}
                            </div>
                        </div>
                        </Link>
                        )
                    }
                </div>
            }
        </>
    )
}

export default SideNavBar
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "aws-amplify/auth";
import { remedyRoboticsLogo, roundAvtar } from "../../../assets/images";
import { setUserDetails } from "../../../redux/userSlice";
import { deleteAuthTokens } from "../../../utils/localStorage";
import "./index.scss"

const Navbar = ({
    setSideBarIsOpen,
    sideBarIsOpen
}) => {

    const dispatch = useDispatch()

    async function handleSignOut() {
        try {
          await signOut();
          dispatch(setUserDetails({}))
          deleteAuthTokens()
        } catch (error) {
          console.log('error signing out: ', error);
        }
      }
    const userDetails = useSelector((state)=>state.userLoginData?.details)
    
    return (
        <>
            <div className="navbar-wrap">
                
                <div>
                    <div className="fa-solid fa-bars me-3 cursor-pointer" onClick={()=>setSideBarIsOpen(!sideBarIsOpen)}></div>
                    <img src={remedyRoboticsLogo} alt="" className="remedy-robot-logo-nav"/>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="me-3 text-end">
                            <div className="user-email">{userDetails?.email}</div>
                        </div>
                        <div>
                            <img src={roundAvtar} alt="" />
                        </div>
                    </div>
                    <div className="logout-text ms-3" onClick={()=>handleSignOut()}>
                        Logout
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar;
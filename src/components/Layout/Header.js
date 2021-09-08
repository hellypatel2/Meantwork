import React from 'react';
import "./header.scss";
import Dropdown from "../Elements/Dropdown";
import Auth from '../../helpers/Auth';

const Header = () => {

    let user = Auth.getUserData() || Auth.getAuthData();

    return (
        <div>
            <header className="position-fixed">
                <div className="container-fluid fixed">
                    <div className="flex justify-end">
                        <div className="flex items-center">

                            <div className="mr-8">
                                <div className="flex items-center">
                                    
                                    <div className="user-profile">
                                        <span
                                            className="header-profile-sidebar flex items-center justify-center"
                                            style={{ backgroundColor: user.color }}
                                        >
                                            <span className="font-size-h5 font-weight-bold text-white">
                                                {user && user.username
                                                    ? user.username[0].toUpperCase()
                                                    : "A"}
                                            </span>
                                        </span>
                                    </div>
                                    
                                </div>
                            </div>

                            <Dropdown buttonDetails={[{ name: "View Profile", link: "/profile" }, { name: "Logout", link: "logout" }]} />

                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header

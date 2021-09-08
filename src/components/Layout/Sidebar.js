import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../helpers/Auth';
import "./sidebar.scss";

const Sidebar = () => {

    const [userData, setUserData] = useState(Auth.getUserData());

    return (
        <div class="s-layout__sidebar">
            <a class="s-sidebar__trigger" href="#0">
                <i class="fa fa-bars"></i>
            </a>
            <nav class="s-sidebar__nav">
                <Link class="no-underline" to="/dashboard">
                    <div className="text-center mt-3 mb-5 select-none mb-5">
                        <p className="font-bold text-2xl font-medium text-blue-400">
                            M
                            <span className="italic">eantwork</span>
                            {/* <span className="text-blue-400 italic"></span> */}
                        </p>
                    </div>
                </Link>
                {userData?.userRole === "user" ?
                    <ul className="mt-5">
                        <li>
                            <Link class={window.location.pathname === "/dashboard" ? "s-sidebar__nav-link-selected" : `s-sidebar__nav-link`} to="/dashboard">
                                <i class="fa fa-home text-white"></i>
                                <em>Home</em>
                            </Link>
                        </li>
                        <li>
                            <Link class={window.location.pathname === "/mentorship" ? "s-sidebar__nav-link-selected" : `s-sidebar__nav-link`} to="/mentorship">
                                <i class="fa fa-user text-white"></i><em>Mentorship</em>
                            </Link>
                        </li>
                        <li>
                            <Link class={window.location.pathname === "/meeting" ? "s-sidebar__nav-link-selected" : `s-sidebar__nav-link`} to="/meeting">
                                <i class="fa fa-camera text-white"></i><em>Meetings</em>
                            </Link>
                        </li>
                        <li>
                            <Link class={window.location.pathname === "/userdirectory" ? "s-sidebar__nav-link-selected" : `s-sidebar__nav-link`} to="/userdirectory">
                                <i class="fas fa-address-card text-white"></i><em>User Directory</em>
                            </Link>
                        </li>
                        <li>
                            <Link class={window.location.pathname === "/user/inviteuser" ? "s-sidebar__nav-link-selected" : `s-sidebar__nav-link`} to="/user/inviteuser">
                                <i class="fas fa-envelope-open-text text-white"></i><em>Invite User</em>
                            </Link>
                        </li>
                    </ul>

                    :

                    <ul className="mt-5">
                        <li>
                            <Link class="s-sidebar__nav-link" to="/adminMentorship">
                                <i class="fa fa-user text-white"></i><em>Mentorship</em>
                            </Link>
                        </li>
                    </ul>
                }
            </nav>
        </div >
    )
}

export default Sidebar

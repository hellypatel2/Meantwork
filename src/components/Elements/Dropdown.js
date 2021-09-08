import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Auth from '../../helpers/Auth';

export default function DropdownC({ buttonDetails }) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const history = useHistory();
    const [userData, setUserData] = useState(Auth.getUserData() || Auth.getAuthData());

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
                className="cursor-pointer"
                tag="span"
                data-toggle="dropdown"
                aria-expanded={dropdownOpen}
            >
                <p className="font-size-16 heading-title-text-color font-medium tracking-normal cursor-pointer mb-0 ">
                    {userData?.username}
                </p>
            </DropdownToggle>
            <DropdownMenu right>
                {/* {buttonDetails && buttonDetails.map((button) => {
                    <DropdownItem onClick={() => history.push(button.link)}>{button.link}</DropdownItem>
                })} */}

                {userData?.userRole === "user" &&
                    <>
                        <DropdownItem onClick={() => history.push("/profile")}>View Profile</DropdownItem>
                        <DropdownItem divider />
                    </>
                }
                <DropdownItem onClick={() => { localStorage.clear(); window.location.reload() }}>Log Out</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

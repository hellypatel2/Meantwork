import React from 'react';
import "./admin-sidebar.scss";

const AdminSidebar = () => {
    return (
        <div class="s-layout__sidebar fixed">
            <a class="s-sidebar__trigger" href="#0">
                <i class="fa fa-bars"></i>
            </a>
            <nav class="s-sidebar__nav">
                <ul>
                    <li>
                        <a class="s-sidebar__nav-link" href="#0">
                            <i class="fa fa-home text-white"></i>
                            <em>Mentorship</em>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminSidebar

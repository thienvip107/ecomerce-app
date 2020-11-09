import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => {
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/user/history" className="nav-link">
                    History
                </Link>
                <Link to="/user/password" className="nav-link">
                    History
                </Link>
                <Link to="/user/wishlist" className="nav-link">
                    History
                </Link>
            </li>
        </ul>
    </nav>
}

export default UserNav
import React from 'react'

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><strong>Knafeh</strong></li>
            </ul>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Messages</a></li>
                <li><button className="secondary">Add services</button></li>
            </ul>
        </nav>
    )
}

export default NavBar
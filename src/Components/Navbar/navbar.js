import React from "react"
import "./navbar.css"

const Navbar = (props) => {
    return (
            <div className="navbar" style={{boxShadow: `${props.theme.bottomShadow}`}}>
                <div className="navbar-content">
                    {props.children}
                </div>
            </div>
    )
}

export default Navbar
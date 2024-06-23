import React from "react";
import './header.css';
import { Link } from "react-router-dom";


export default function Header() {
    return(
    <>

        <h2 class="cyberpunk" >
        <Link to="/menu">!USER </Link>
        <a color="Error">//ERROR</a>
        </h2>

    </>
    )
}
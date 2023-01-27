// import React from 'react'
import { useState } from 'react';
import styled, { css } from 'styled-components';
// import Logo from './Logo';
import './Navbar.css';
import { MenuItems } from './MenuItems';
import { Link } from 'react-router-dom';
import { Row, FullWidthSection } from '../Layout';
import { FaBars } from 'react-icons/fa';
import { Header, Logo, Nav, NavMenu, NavMenuLink } from './styles';


const Navbar = () => {
    const [navbar, setNavbar] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }
    window.addEventListener('scroll', changeBackground)
    // const [clicked, setClick] = useState(false);
    return (
        <Header className={navbar ? 'reveal' : 'hide'} as="header">
            <Nav as="nav" sd={2} ed={12} sm={2} em={6} ss={2} es={6}>
                <Logo to='/'>KWAMSC</Logo>
                {/* <MenuBars /> */}
                <NavMenu>
                    {MenuItems.map((item, index) => {
                        return (
                            <NavMenuLink to={item.url} key={index}>{item.title}</NavMenuLink>
                        )
                    })}
                </NavMenu>
                <div
                    className="mobile-nav-toggle"
                    id="hamburger-menu"
                    aria-controls="nav-menu"
                    aria-expanded="false"
                >
                    <div className="menu-bar1"></div>
                    <div className="menu-bar2"></div>
                </div>
            </Nav>
        </Header>
    )
}

export default Navbar

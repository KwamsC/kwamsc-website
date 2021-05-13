// import React from 'react'
import { useState } from 'react';
import styled, { css } from 'styled-components';
// import Logo from './Logo';
import { MenuItems } from './MenuItems';
import {Link} from 'react-router-dom';
import { Row } from '../Layout';
import {FaBars} from 'react-icons/fa';

const Nav = styled(Row)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// const divStyle = {
//     color: 'blue',
// };
const NavMenu = styled.div`
    display: flex;
    @media screen and (max-width: 768px){
        display: none;
    }
`;

const NavLink = css`
    text-decoration: none;
    transition: all 0.4s ease 0s;
    padding: 1rem;
    font-size: 0.9rem;
    /* font-weight: 700; */
    font-weight: bold;
    color: rgb(22, 28, 45) !important;
    cursor: pointer;
    align-items: center;
`;

const NavMenuLink = styled(Link)`
    ${NavLink}
    &:hover {
        color: rgb(73, 95, 239) !important;
    }
`;
const Logo = styled(Link)`
    ${NavLink};
    letter-spacing: -0.5px;
    padding: 1rem 1rem 1rem 0;
    font-size: 1.5rem;
    line-height: 1.42;
`;

const MenuBars = styled(FaBars)`
    display: none;
    @media screen and (max-width: 768px){
        display: block;
        align-items:center;
        height: 40px;
        /* width: 40px; */
    }
`;

const Navbar = () => {
    // const [clicked, setClick] = useState(false);
    return (  
        <Nav as="nav" sd={2} ed={12}  sm={2}  em={6}  ss={2}  es={6}>
            <Logo to='/'>KWAMSC</Logo>
            <MenuBars/>
            {/* <div className='menu-icon' onClick={()=>setClick(!clicked)}>
                <i> {clicked? 'menu': 'menu-icon'}</i>
            </div>  */}
            <NavMenu>
            {MenuItems.map((item, index)=> {
                return (
                    <NavMenuLink to={item.url} key={index}>{item.title}</NavMenuLink>
                )
            })}
            </NavMenu>
        </Nav>
    )
}

export default Navbar

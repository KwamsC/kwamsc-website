// import React from 'react'
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
// import Logo from './Logo';
import { MenuItems } from './MenuItems';
import { Link } from 'react-router-dom';
import { Row, FullWidthSection } from '../Layout';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled(Row)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

interface NavmenuProps {
    click: boolean;
}

interface NavbarProps {
    navbar?: string;
}

// const Header = styled(FullWidthSection) <NavbarProps>`
//   box-shadow: rgba(65, 62, 101, 0.1) 0px 12px 34px -11px;
//   background-color: white;
//   z-index: 1;
//   position: fixed;
//   width: 100%;
//   height: 80px;
//   align-content: center;
//   transition: all 0.4s ease 0s;
//   transform: ${({ navbar }) => (navbar ? 'translateY(0)' : 'translateY(-100%)')};  
// `;

const Header = styled(FullWidthSection) <NavbarProps>`
  box-shadow: ${({ navbar }) => (navbar === 'transparent' || navbar === 'hide' ? 'none' : 'rgba(65, 62, 101, 0.1) 0px 12px 34px -11px;')}; 
  background-color: ${({ navbar }) => (navbar === 'transparent' ? 'transparent' : 'white')}; 
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 80px;
  align-content: center;
  transition: all 0.4s ease 0s;
  transform: ${({ navbar }) => (navbar === 'hide' ? 'translateY(-100%)' : 'translateY(0)')};  
`;

const NavMenu = styled.div<NavmenuProps>`
    display: flex;
    align-items: center;
    text-align: center;
    @media screen and (max-width: 768px){
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position:absolute;
        top:80px;
        right: ${({ click }) => (click ? 0 : '-100%')};
        opacity: 1;
        transition: all 0.4s ease;
        background: white;
    }
`;

const NavLink = css`
    text-decoration: none;
    transition: all 0.4s ease 0s;
    padding: 1rem;
    font-size: 0.9rem;
    align-items: center;
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
    @media screen and (max-width:768){
        width: 100%;
        display: table;
        padding: 1rem;
        text-align: center;
    }
`;
const Logo = styled(Link)`
    ${NavLink};
    letter-spacing: -0.5px;
    padding: 1rem 1rem 1rem 0;
    font-size: 1.5rem;
    line-height: 1.42;
`;

const MobileIcon = styled.div`
    display: none;
    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%) ;
        font-size: 1.5rem;
        cursor: pointer;
    }
`;

const Navbar = () => {
    const [navbar, setNavbar] = useState('transparent');
    const [click, setClick] = useState(false);

    const handleClick = () => { setClick(!click) };

    useEffect(() => {
        changeBackground();
        return () => {
            setNavbar('transparent') // This worked for me
        };
    }, []);

    const changeBackground = () => {
        if (window.scrollY >= 1 && window.scrollY < 400) {
            setNavbar('hide')
        } else if (window.scrollY >= 400) {
            setNavbar('sticky')
        } else {
            setNavbar('transparent')
        }
    }
    window.addEventListener('scroll', changeBackground)
    return (
        <Header navbar={navbar} as="header">
            <Nav as="nav" sd={2} ed={12} sm={2} em={6} ss={2} es={6}>
                <Logo to='/'>KWAMSC</Logo>
                <MobileIcon onClick={handleClick} >{click ? <FaTimes /> : <FaBars />}</MobileIcon>
                <NavMenu onClick={handleClick} click={click}>
                    {MenuItems.map((item, index) => {
                        return (
                            <NavMenuLink to={item.url} key={index}>{item.title}</NavMenuLink>
                        )
                    })}
                </NavMenu>
            </Nav>
        </Header>
    )
}

export default Navbar
// function styledComponentWithProps<T, U>(div: ThemedStyledFunction<"div", any, {}, never>) {
//     throw new Error('Function not implemented.');
// }


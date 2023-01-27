import styled, { css } from "styled-components";
import { Row, FullWidthSection } from "../Layout";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled(FullWidthSection)`
  // padding: 1rem 2rem;
  box-shadow: rgba(65, 62, 101, 0.1) 0px 12px 34px -11px;
  background-color: white;
  z-index: 9999;
  position: fixed;
  width: 100%;
`;

export const NavMenu = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = css`
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

export const NavMenuLink = styled(Link)`
  ${NavLink}
  &:hover {
    color: rgb(73, 95, 239) !important;
  }
`;
export const Logo = styled(Link)`
  ${NavLink};
  letter-spacing: -0.5px;
  padding: 1rem 1rem 1rem 0;
  font-size: 1.5rem;
  line-height: 1.42;
`;

export const MenuBars = styled(FaBars)`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    align-items: center;
    height: 40px;
    /* width: 40px; */
  }
`;

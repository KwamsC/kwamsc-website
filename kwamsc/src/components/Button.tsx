import styled from "styled-components";


const HeroButton = styled.button`
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.63px;
    text-transform: uppercase;
    padding: 23px 30px;
    box-shadow: rgb(3 3 3 / 12%) 0px 32px 54px;
    border-radius: 50rem;
    display: inline-flex;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    user-select: none;
    transform: perspective(1px) translateZ(0px);
    position: relative;
    overflow: hidden;
    border: none;
    white-space: nowrap;
    color: rgb(255, 255, 255);
    background-color: rgb(73, 95, 239);
    transition: all 0.4s ease-out 0s;
    outline: none !important;
    cursor: pointer;

    :hover{
        transform: translateY(-10px);
        box-shadow: rgb(3 3 3 / 14%) 0px 32px 54px;
    }
`;

interface ButtonProps {
    label?: string;
}

const Button = ({ label, ...props }: ButtonProps) => {
    return (
        <HeroButton>{label}</HeroButton>
    )
}

export default Button

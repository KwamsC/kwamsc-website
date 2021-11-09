import styled from "styled-components";
import { MaxWidthSection, Row } from "../components/Layout";
import { FaPaintBrush } from 'react-icons/fa';
import { useState } from "react";

interface ModalProps {
    click: boolean;
}


const ServicesSection = styled(MaxWidthSection)`
    padding: 2rem 0 4rem;
    text-align: center;
`;

const ServicesWrapper = styled(Row)`

`;

const ServiceModal = styled.div<ModalProps>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    z-index: 10;
    opacity: ${({ click }) => (click ? 1 : 0)};
    visibility: ${({ click }) => (click ? 'visible' : 'hidden')};
    transition: 0.3s;
`;

const ServiceCloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    /* color: var(--first-color); */
    cursor: pointer;
`;

const ServiceButton = styled.span`
    cursor: pointer;
`;

const ServiceModalContent = styled.div`
    position: relative;
    background-color: var(--container-color);
    padding: 1.5rem;
    border-radius: 0.5rem;
`;

const ServiceTitle = styled.h3`
    margin-bottom: 1 rem;
`


const Service = styled(Row)`
    padding: 3.5rem 0.5rem 1.25rem 1.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgb(0 0 0 / 15%);
    transition: 0.3s;
    :hover{
        box-shadow: 0 4px 8px rgb(0, 0, 0, 0.15);
    }
`;

const Services = () => {
    const [click, setClick] = useState(false);
    const showModal = () => { setClick(true); };
    const hideModal = () => { setClick(false) };

    return (
        <ServicesSection>
            <ServicesWrapper>
                <h2>Services</h2>
                <span>What i offer</span>
            </ServicesWrapper>
            <Service sd={1} ed={6} sm={1} em={3} ss={1} es={6}>
                <FaPaintBrush />
                <ServiceTitle>Ui / Ux <br />Designer</ServiceTitle>
                <ServiceButton onClick={showModal}>
                    View More
                    <FaPaintBrush />
                </ServiceButton>
                <ServiceModal click={click}>
                    <ServiceModalContent>
                        <h4>Ui/Ux <br />Designer</h4>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p>I develop the user interface.</p>
                            </li>
                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p>Web page development.</p>
                            </li>
                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p>I create ux element interactions.</p>
                            </li>
                            <li className="services__modal-service">
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p>I position your company brand.</p>
                            </li>
                        </ul>
                        <ServiceCloseButton onClick={hideModal}>x</ServiceCloseButton>
                        hello
                    </ServiceModalContent>
                </ServiceModal>
            </Service>
            <Service sd={7} ed={6} sm={4} em={3} ss={1} es={6}>
                <FaPaintBrush />
                <ServiceTitle>Frontend<br />Developer</ServiceTitle>
                <span className="services__button">
                    View More
                    <FaPaintBrush />
                </span>
            </Service>
            <Service sd={7} ed={6} sm={4} em={3} ss={1} es={6}>
                <FaPaintBrush />
                <ServiceTitle>Branding <br /> Designer</ServiceTitle>
                <span className="services__button">
                    View More
                    <FaPaintBrush />
                </span>
            </Service>
        </ServicesSection>
    )
}

export default Services

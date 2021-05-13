import styled from 'styled-components/macro'
import { MaxWidthSection, Row } from './Layout';
import HeroImg from '../assets/hero-image.png';

const HeroSection = styled(MaxWidthSection)`
  padding: 4rem 0rem;
  /* height: 100vh; */
  max-height: 1100px;
  position: relative;
`;

const HeroWrapper = styled(Row)`
  padding: 4rem 1rem;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: normal;
  display: flex;
  flex-direction: column;
`;

const Heroheading = styled.p`
    font-size: 0.8125rem;
    line-height: 1.63;
    letter-spacing: 1.63px;
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(22, 28, 45);
    margin-bottom: 2rem;
`;

const HeroImage = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

const ButtonWrapper = styled.div`
    min-width: 0px;
    margin-top: 3rem;
`;

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

const HeroTitle = styled.h2`
    font-weight: 700;
    margin-bottom: 0px;
    color: rgb(22, 28, 45);
    letter-spacing: -2.81px;
    font-size: 50px;
    line-height: 56px;

    @media (min-width: 1200px){
        font-size: 80px;
        line-height: 84px;
    };
    @media (min-width: 992px){
        font-size: 76px;
        line-height: 84px;
    }
    @media (min-width: 576px){
        font-size: 66px;
        line-height: 70px;
    }
`;

const Hero = () => {
    return (
        <HeroSection>
            <HeroWrapper sd={1} ed={6}  sm={1}  em={3}  ss={1}  es={6}>
                <Heroheading>Developer, Designer, Tutor, Photographer</Heroheading>
                <HeroTitle>Crafting a digital future for you</HeroTitle>
                <ButtonWrapper>
                    <HeroButton>Hello</HeroButton>
                </ButtonWrapper>
            </HeroWrapper>  
            <HeroWrapper sd={7} ed={6}  sm={4}  em={3}  ss={1}  es={6}>
                <HeroImage src={HeroImg}/>
            </HeroWrapper>  
        </HeroSection>
    )
}

export default Hero

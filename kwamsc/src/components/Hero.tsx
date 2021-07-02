import styled from 'styled-components/macro'
import { MaxWidthSection, Row } from './Layout';
import HeroImg from '../assets/hero-image-3.png';
import Button from './Button';

const HeroSection = styled(MaxWidthSection)`
  padding: 5rem 0rem;
  /* height: 100vh; */
  /* max-height: 1100px; */
  position: relative;
  margin: auto;
`;

const HeroWrapper = styled(Row)`
  padding: 4rem 0 0;
  height: 100%;
  width: 100%;
  max-width: 69ch;
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
    margin-bottom: 1rem;
`;

const HeroImage = styled.img`
    height: 100%;
    width: 100%;
    flex: 0 0 75%;
    max-width: 75%;
    object-fit: cover;
    margin: auto;
`;

const ButtonWrapper = styled.div`
    min-width: 0px;
    margin-top: 3rem;
`;

const HeroTitle = styled.h2`
    font-weight: 700;
    margin-bottom: 0px;
    color: rgb(22, 28, 45);
    letter-spacing: -2.81px;
    font-size: 46px;
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
            <HeroWrapper sd={1} ed={6} sm={1} em={3} ss={1} es={6}>
                <Heroheading>A Design-minded front-end software engineer</Heroheading>
                <HeroTitle>I build beautiful interfaces &#38; experiences</HeroTitle>
                <ButtonWrapper>
                    <Button label="My work" />
                </ButtonWrapper>
            </HeroWrapper>
            <HeroWrapper sd={7} ed={6} sm={4} em={3} ss={1} es={6}>
                <HeroImage src={HeroImg} loading="lazy" alt="kwamsc personal hero image" />
            </HeroWrapper>
        </HeroSection>
    )
}

export default Hero

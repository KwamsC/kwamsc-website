import styled from 'styled-components/macro'
import { MaxWidthSection, Row } from '../../components/Layout';
import HeroImg from '../../assets/hero-image-3.png';
import Button from '../../components/Button';

const HeroSection = styled(MaxWidthSection)`
  padding: 6rem 0 4rem;
`;

const HeroWrapper = styled(Row)`
  padding: 4rem 0 0;
  max-width: 69ch;
  order: 1;
  justify-content: center;
  align-items: normal;
  display: flex;
  flex-direction: column;

  @media (min-width: 881px){
        order: 0;
    }
`;

const ImageWrapper = styled(Row)`
  padding: 4rem 0 0;
  justify-content: center;
  align-items: normal;
  display: flex;
  flex-direction: column;

  /* @media (min-width: 881px){
        order: 0;
    } */
`;

const Heroheading = styled.h4`
    font-size: 0.8125rem;
    /* line-height: 1.63; */
    letter-spacing: 1.63px;
    font-weight: 500;
    text-transform: uppercase;
    color: rgb(22, 28, 45);
    margin-bottom: 1rem;
`;

const HeroImage = styled.img`
    width: 250px;
    align-self: center;
    
    @media (min-width: 992px){
        width: 300px;
    }
`;

const HeroTitle = styled.h1`
    font-weight: 700;
    margin-bottom: 3rem;
    color: rgb(22, 28, 45);
    letter-spacing: -2.81px;
    font-size: 3rem;
    line-height: 3.5rem;

    @media (min-width: 576px){
        font-size: 4rem;
        line-height: 4.5rem;
    }

    /* @media (min-width: 992px){
        font-size: 4.5rem;
        line-height: 5rem;
    } */
`;

const Hero = () => {
    return (
        <HeroSection>
            <HeroWrapper sd={1} ed={6} sm={1} em={3} ss={1} es={6}>
                <Heroheading>A design-minded front-end developer</Heroheading>
                <HeroTitle>Expose your idea to great design</HeroTitle>
                <Button label="How can I Help" />
            </HeroWrapper>
            <ImageWrapper sd={7} ed={6} sm={4} em={3} ss={1} es={6}>
                <HeroImage src={HeroImg} loading="lazy" alt="kwamsc personal hero image" />
            </ImageWrapper>
        </HeroSection>
    )
}

export default Hero

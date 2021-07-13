import styled from "styled-components";
import { FullWidthSection, MaxWidthSection, Row } from "../../components/Layout";

const PortfolioNavContainer = styled(MaxWidthSection)`
  padding-top: 4rem;
  margin-bottom: 2rem;
  /* height: 1000px; */
  /* background-color: lightgreen; */
`;

const PortfolioNavList = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
`;

const PortfolioContainer = styled(FullWidthSection)`
    /* position: relative;
    display: flex;
    flex-wrap: wrap; */
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    height: 1000px;
    background-color: lightgreen;
`;

const PortfolioMasonryRow = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`;
const PortfolioItem = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 300px;
    background: #000000;
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
`;

const PortfolioNavListItem = styled.div`
    cursor: pointer;
    padding: 0px 1rem;
`;

const ItemText = styled.a`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.8125rem;
    line-height: 1.63;
    letter-spacing: 1.63px;
    &:hover {
            color: rgb(73, 95, 239) !important;
            font-weight: bold;
    }
`;

const Portfolio = () => {
    return (
        <>
            <PortfolioNavContainer>
                <PortfolioNavList as='ul'>
                    <PortfolioNavListItem>
                        <ItemText>All Work</ItemText>
                    </PortfolioNavListItem>
                    <PortfolioNavListItem>
                        <ItemText>UX-Design</ItemText>
                    </PortfolioNavListItem>
                    <PortfolioNavListItem>
                        <ItemText>Code</ItemText>
                    </PortfolioNavListItem>
                </PortfolioNavList>
            </PortfolioNavContainer>

            <PortfolioContainer>
                <PortfolioMasonryRow>
                    <PortfolioItem />

                </PortfolioMasonryRow>
            </PortfolioContainer>
        </>
    )
}

export default Portfolio

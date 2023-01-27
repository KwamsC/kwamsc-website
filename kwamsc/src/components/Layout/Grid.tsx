import styled from "styled-components";

export type GridProps = {
  className?: string;
  children: React.ReactNode;
  gap?: string | number;
  gapDefault?: string | number; // grid-gap
  gapMedium?: string | number;
  gapSmall?: string | number;
  marginDefault?: number;
  marginMedium?: number;
  marginSmall?: number;
  small?: string | number;
  sd?: string | number;
  ed?: string | number;
  sm?: string | number;
  em?: string | number;
  ss?: string | number;
  es?: string | number;
  columns?: string | string[];  // grid-template-columns
  rows?: string | string[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 4.2rem)) 1fr;
  grid-template-rows: max-content;
  gap: ${(props: GridProps) => (props.gapDefault ? props.gapDefault : "0 2rem")};
  margin: ${(props) => (props.marginDefault ? props.marginDefault : 0)};

  @media ${(props) => props.theme.breakpoints.m} {
    grid-template-columns: 2rem repeat(6, 1fr) 2rem;
    gap: ${(props) => (props.gapMedium ? props.gapMedium : "0 1rem")};
    margin: ${(props) => (props.marginMedium ? props.marginMedium : 0)};
  }

  @media ${(props) => props.theme.breakpoints.s} {
    grid-template-columns: 1rem repeat(6, 1fr) 1rem;
    gap: ${(props) => (props.gapSmall ? props.small : "0 1rem")};
    margin: ${(props) => (props.marginSmall ? props.marginSmall : 0)};
  }
`;

export default Grid;

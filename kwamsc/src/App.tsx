// import Header from './components/Header';
import styled from 'styled-components';
import Hero from './components/Hero';
import {Grid, FullWidthSection, Row, MaxWidthSection} from './components/Layout/';

import Navbar from './components/Navbar/Navbar';
// import styles from './components';

const Header = styled(FullWidthSection)`
  // padding: 1rem 2rem;
  box-shadow: rgba(65, 62, 101, 0.1) 0px 12px 34px -11px;
  background-color: white;
  z-index: 9999;
  position: fixed;
  width: 100%;
`;

const Content = styled(MaxWidthSection)`
  padding: 4rem 2rem;
  height: 1000px;
  background-color: lightgreen;
`;

function App() {
  return (
    <Grid>
      <Header as="header">
        <Navbar></Navbar>
      </Header>
     <Hero/>
     <Content>

     </Content>
    </Grid>
  );
}

export default App;

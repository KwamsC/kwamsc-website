// import Header from './components/Header';
import styled from 'styled-components';
import Hero from './components/Hero';
import { Grid, MaxWidthSection } from './components/Layout/';

import Navbar from './components/Navbar/Navbar';
// import styles from './components';


const Content = styled(MaxWidthSection)`
  padding: 4rem 2rem;
  height: 1000px;
  background-color: lightgreen;
`;

function App() {
  return (
    <Grid>
      <Navbar />
      <Hero />
      <Content>
      </Content>
    </Grid>
  );
}

export default App;

// import Header from './components/Header';
// import styled from 'styled-components';
import { Grid, } from './components/Layout/';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/HomePage/Home';
import { GlobalStyle } from "./styles/globalStyles";

// const Content = styled(MaxWidthSection)`
//   padding: 4rem 2rem;
//   height: 1000px;
//   background-color: lightgreen;
// `;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Grid>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;

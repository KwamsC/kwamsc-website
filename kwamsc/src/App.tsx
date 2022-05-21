// import Header from './components/Header';
import styled from 'styled-components';
import Hero from './components/Hero';
import * as React from "react"
import { Grid, MaxWidthSection } from './components/Layout/';

import Navbar from './components/Navbar/Navbar';
// import styles from './components';


const Content = styled(MaxWidthSection)`
  padding: 4rem 2rem;
  height: 1000px;
  background-color: lightgreen;
`;

function App() {
  const [counter, setCounter] = React.useState(0)
  const [user, setUser] = React.useState<any>([])

  // const getRandomUser = () => {
  //   return fetch("https://randomuser.me/api").then((data) => {
  //     console.log(data.json())
  //     return "hello";
  //   }).catch(e => {
  //     console.log(e);
  //   })
  // }

  const getRandomUser = () => {
    return fetch('https://randomuser.me/api', {
      method: 'GET',
    });
  };

  // const getRandomUser = () => {
  //   return fetch('https://randomuser.me/api', {
  //     method: 'GET',
  //   })
  //     .then((response) => {
  //       console.log(response.json().resti);
  //       return response;
  //     }).catch(e => {
  //       console.log(e);
  //     });
  // }

  // console.log(await currentloginid());

  // const getRandomUser = async () => {
  //   try {
  //     const response = await fetch(`https://randomuser.me/api`, {
  //       method: 'GET',
  //     });
  //     return JSON.stringify(response);
  //   } catch (e) {
  //     return console.log(e);
  //   }
  // }


  // async function getRandomUser() {
  //   fetch('https://randomuser.me/api')
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  //   // const res = await fetch("https://randomuser.me/api");
  //   // console.log(res)
  //   // return setUser(JSON.stringify(res))
  // }

  React.useEffect(() => {
    getRandomUser().then((value) => {
      console.log(value);
      setUser(value) // 👉️ 42
    });
    // getRandomUser().then((randomData) => {
    //   // console.log(JSON.stringify(randomData, null, 2));
    //   // console.log(randomData);
    // })

    // console.log(getRandomUser())
    // getRandomUser().then((data) => {
    //   setUser(data.toString());
    // }).catch((e) => console.log(e));
  }, [])

  // https://randomuser.me/api

  //  zconst [first, setfirst] = React.useState(second)

  return (
    <Grid>
      <Navbar />
      <Hero />
      <Content>
        <div>
          {user[1]}
        </div>
        <button onClick={() => setCounter(counter - 1)} >
          SUB
        </button>
        <button onClick={() => setCounter(counter + 1)} >
          ADD
        </button>
        <p>{user[1]}</p>
      </Content>
    </Grid>
  );
}

export default App;

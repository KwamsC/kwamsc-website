// import Header from './components/Header';
import styled from 'styled-components';
import Hero from './components/Hero';
import * as React from "react"
import { Grid, MaxWidthSection, FullWidthSection } from './components/Layout/';

import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
// import styles from './components';


const Content = styled(FullWidthSection)`
  padding: 4rem 2rem;
  height: 1000px;
  background-color: lightgreen;
`;

function App() {
  const [counter, setCounter] = React.useState(0)
  const [users, setUsers] = React.useState<any>([])
  const [JSONData, setJSON] = React.useState('')

  const getRandomUser = () => {
    return axios
      .get("https://randomuser.me/api")
      .then(({ data }) => {
        console.log(data)
        return data
      }).catch(e => {
        console.log(e)
      })
  };

  interface UserName {
    title: string;
    firstName: string;
    lastName: string;
  }

  interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
  }

  interface UserInfo {
    name: UserName;
    picture: Picture;
    gender: string;
  }

  const getFullUserName = (userInfo: any) => {
    const { name: { first, last } } = userInfo
    return `${first} ${last}`;
  }

  React.useEffect(() => {
    getRandomUser().then((data) => {
      setUsers(data.results)
      setJSON(JSON.stringify(data));
      // console.log(value.results);
      // setUser(value) // 👉️ 42
    });
  }, [])

  return (
    <Grid>
      <Navbar />
      <Hero />
      <Content>
        <div>
          {counter}
        </div>
        <button onClick={() => setCounter(counter - 1)} >
          SUB
        </button>
        <button onClick={() => setCounter(counter + 1)} >
          ADD
        </button>
        {
          users.map((userInfo: UserInfo, idx: number) => {
            return <div key={idx}>
              <p>{getFullUserName(userInfo)}</p>
              <img src={userInfo.picture.thumbnail} alt={"user"} />
              <p>{userInfo.gender}</p>
            </div>
          })
        }
        <pre>{JSONData}</pre>
      </Content>
    </Grid>
  );
}

export default App;

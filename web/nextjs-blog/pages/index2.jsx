import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';

import {useRouter} from 'next/router'
import TokenGuard from "../components/TokenGuard";

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue"
};

function clickMe() {
  alert("You clicked me!");
}

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;

const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

export default function App() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.get(
                'http://localhost:8080/about.json',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );

            console.log(JSON.stringify(data, null, 4));

            setData(data);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

  return (
      <TokenGuard>
          <div>
              {err && <h2>{err}</h2>}

              <ButtonToggle onClick={handleClick}>Make request</ButtonToggle>

              {isLoading && <h2>Loading...</h2>}

              {data && (
                  <div>
                      <h2>Name: {data.client.host}</h2>
                      <h2>Job: {data.job}</h2>
                  </div>
              )}
              <div></div>
              <a href="https://www.twitter.com/" target="_blank">
                  <Button>Twitter</Button>
              </a>
              <div></div>
              <a href="https://www.facebook.com/" target="_blank">
                  <Button>Facebook</Button>
              </a>
              <div></div>
              <a href="https://www.reddit.com/" target="_blank">
                  <Button>Reddit</Button>
              </a>
              <div></div>
              <a href="https://www.spotify.com/" target="_blank">
                  <Button>Spotify</Button>
              </a>
              <div></div>
              <form>
                  <input type={"text"} name={"text"} id={"task-input"} placeholder="Enter username"/>
                  <div></div>
                  <input type={"password"} name={"pass"} id={"task-input"} placeholder="Enter password"/>
                  <button type="submit">SUBMIT</button>
              </form>
          </div>
      </TokenGuard>
  );
}


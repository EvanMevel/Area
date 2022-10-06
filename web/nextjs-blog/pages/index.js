import React, { useState } from "react";
import styled from "styled-components";

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 10px 50px;
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

export default function App() {
  return (
    <>
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
    </>
  );
}

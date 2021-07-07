import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

export const lightTheme = {
  accent: "#0095f6",
  backgroundColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)"
};
  
export const darkTheme = {
    fontColor: "white",
    backgroundColor: "black"
  };

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${(props)=>props.theme.backgroundColor};
        font-size: 14px;
        font-family:'Open Sans', sans-serif;
        color: ${(props)=>props.theme.fontColor}
    }
    a {
      text-decoration: none;
    }
`;
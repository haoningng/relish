"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react'
import { Global, css } from "@emotion/react";



const breakpoints = {
  sm: "480px",
  'IP5':'568px',
  md: "600px",
  lg: "750px",
  xl: "1025px",
  "2xl": "1550px",
  "3xl": "1800px",
};

// const config = {
//   initialColorMode: 'dark',
//   useSystemColorMode: true,
// }
const styles = {
  global: {
    body: {
      bg:'linear-gradient(0deg, rgb(103, 161, 117), rgb(48, 61, 50))',
    },
  }
}
const GlobalStyles = () => (
  <Global
    styles={css`
      /* Custom global styles */
      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed,
      figure, figcaption, footer, header, hgroup,
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      h1, h2, h3, h4, h5, h6 {
        margin: 1em 0;
      }
      body {
        line-height: 1.5;
        font-family: 'Arial, sans-serif';
      }

      ol, ul {
        list-style: none;
      }

      blockquote, q {
        quotes: none;
      }

      blockquote::before, blockquote::after,
      q::before, q::after {
        content: '';
        content: none;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      input {
        margin: 0;
        padding: 0;
        font: inherit;
        line-height: normal;
        background: white;
        box-sizing: border-box;
      }
      input::placeholder {
        color: #888;
        opacity: 1; /* Ensure placeholder text is fully visible */
      }
      label {
        display: inline-block;
        margin-bottom: 0.5em;
        font-weight: bold;
      }
    `}
  />
);

const theme = extendTheme({
  breakpoints,
  styles,
});

export function ChakraProviders({ children }) {
  return (
    <>
      <ChakraProvider theme={theme}>
      <GlobalStyles />
        {children}
      </ChakraProvider>
    </>
  );
}

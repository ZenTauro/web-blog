import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../config/Theme';
import { media } from '../utils/media';
import split from 'lodash/split';
import './layout.scss';

const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${theme.colors.bg};
    background: ${theme.colors.primary};
  }
  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.grey.default};
    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a {
    color: ${theme.colors.primary}
    text-decoration: none;
    transition: all ${theme.transitions.normal};
  }
  a:hover {
    color: ${theme.colors.darker};
  }
  h1, h2, h3, h4 {
    color: ${theme.colors.grey.dark};
  }
  blockquote {
    font-style: italic;
    border-left: 5px ${theme.colors.primary};
    border-left-style: solid;
    padding: 0.5em 1em;
    margin: 0;
    margin-bottom: 1.66rem;
  }

  label {
    margin-bottom: .5rem;
    color: ${theme.colors.grey.dark};
  }
  input, textarea {
    border: none;
    background: rgba(0, 0, 0, 0.05);
    padding: .25rem 1rem;
    &:focus {
      outline: none;
    }
  }
  .textRight {
    text-align:right;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 3rem 0;
  span {
    font-size: 0.75rem;
  }
`;

export class Layout extends React.PureComponent<{}> {
  public render() {
    const { children } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              buildTime(formatString: "DD.MM.YYYY")
            }
          }
        `}
        render={data => (
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <GlobalStyle />
              {children}
              <Footer>
                &copy; {split(data.site.buildTime, '.')[2]} by ZenTauro. All rights reserved. <br />
                <span>Last build: {data.site.buildTime}</span>
              </Footer>
            </React.Fragment>
          </ThemeProvider>
        )}
      />
    );
  }
}

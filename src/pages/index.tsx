import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Layout, Wrapper, HeaderBar } from '../components';
import PageProps from '../models/PageProps';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';

const bg1: string = require('../assets/bg1.png');

export default class IndexPage extends Component<PageProps> {
  public render() {
    return (
      <Layout>
        <Helmet title={`Homepage | ${config.siteTitle}`} />
        <HeaderBar />
        <Wrapper
          style={{
            backgroundImage: `url(${bg1})`,
            height: '100vh',
            filter: 'blur(2px)',
            position: 'fixed',
            zIndex: '-1',
            width: '100vw',
          }}
        />
        <h1 style={{ color: 'white' }}>Zentauro's Blog</h1>
      </Layout>
    );
  }
}

export const IndexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            category
          }
          timeToRead
        }
      }
    }
  }
`;

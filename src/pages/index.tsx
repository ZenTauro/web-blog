import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Layout, Wrapper, HeaderBar, Content } from '../components';
import PageProps from '../models/PageProps';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';

const bg1: string = require('../assets/bg1.png');

export default class IndexPage extends Component<PageProps> {
  public render() {
    // const { data } = this.props;
    // const { edges, totalCount } = data.allMarkdownRemark;
    return (
      <Layout>
        <Helmet title={`Homepage | ${config.siteTitle}`} />
        <HeaderBar />
        <Wrapper>
          <Content>
            <h1>Zentauro's Blog</h1>
            <img src={bg1} alt="emacs background" />
          </Content>
        </Wrapper>
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

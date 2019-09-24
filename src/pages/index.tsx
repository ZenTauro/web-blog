import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Layout, HeaderBar } from '../components';
import PageProps from '../models/PageProps';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import styled from 'styled-components';
import Theme from '../../config/Theme';
import { media } from '../utils/media';
import transparentize from 'polished/lib/color/darken';

const bg1: string = require('../assets/bg1.png');

const Card = styled.div`
  color: ${Theme.colors.grey.dark};
  background-color: ${transparentize(0.1, Theme.colors.bg)};
  border-radius: 0.5em;
`;

const PageTitle = styled.h1`
  margin: 0.5em;
`;

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bg1});
  background-attachment: fixed;

  max-width: ${(props: any) => (props.fullWidth ? '100%' : '100rem')};
  padding: ${(props: any) => (props.fullWidth ? '0' : '0 6rem')};
  @media ${media.tablet} {
    padding: ${(props: any) => (props.fullWidth ? '0' : '0 3rem')};
  }
  @media ${media.phone} {
    padding: ${(props: any) => (props.fullWidth ? '0' : '0 1rem')};
  }
`;

export default class IndexPage extends Component<PageProps> {
  public render() {
    return (
      <Layout>
        <Helmet title={`Homepage | ${config.siteTitle}`} />
        <HeaderBar />
        <PageWrapper>
          <Card>
            <PageTitle>Zentauro</PageTitle>
          </Card>
        </PageWrapper>
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

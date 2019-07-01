import React from 'react';
import { graphql } from 'gatsby';
import { Layout, Article, Wrapper, SectionTitle, HeaderBar, Content, Pagination } from '../components';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import * as types from '../graphqlTypes';

interface Data {
  allMarkdownRemark: types.MarkdownRemarkConnection;
}

interface Props {
  data: Data;
  pageContext: {
    currentPage: number;
    totalPages: number;
  };
}

export default class BlogPage extends React.Component<Props> {
  public render() {
    const { currentPage, totalPages } = this.props.pageContext;

    const { data } = this.props;
    const { edges, totalCount } = data.allMarkdownRemark;

    return (
      <Layout>
        <Helmet title={`Blog | ${config.siteTitle}`} />
        <HeaderBar />
        <Wrapper>
          <SectionTitle uppercase={true}>Latest posts ({totalCount})</SectionTitle>
          <Content
            style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'space-between',
              alignContent: 'flex-start',
            }}
          >
            {edges.map(post => (
              <Article
                title={post.node.frontmatter.title}
                date={post.node.frontmatter.date}
                image={post.node.frontmatter.image.childImageSharp}
                excerpt={post.node.excerpt}
                timeToRead={post.node.timeToRead}
                slug={post.node.fields.slug}
                category={post.node.frontmatter.category}
                key={post.node.fields.slug}
              />
            ))}
          </Content>
          <Pagination currentPage={currentPage} totalPages={totalPages} url={'blog'} />
        </Wrapper>
      </Layout>
    );
  }
}

export const BlogQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 200)
          timeToRead
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            category
            image {
              childImageSharp {
                fixed {
                  base64
                  src
                  srcWebp
                  srcSetWebp
                }
                fluid {
                  base64
                  src
                  srcWebp
                  srcSetWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

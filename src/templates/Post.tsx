import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import { Layout, Wrapper, HeaderBar, Subline, SEO, PrevNext, Content } from '../components';
import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';
import PathContext from '../models/PathContext';
import Post from '../models/Post';
import { BlogHeader } from '../components/BlogHeader';
import Theme from '../../config/Theme';
import Tag from '../components/Tag';

const PostContent = styled.div`
  margin-top: 1em;
`;

interface Props {
  data: {
    markdownRemark: Post;
  };
  pathContext: PathContext<Post>;
}

export default class PostPage extends React.PureComponent<Props> {
  public render() {
    const { prev, next } = this.props.pathContext;
    const post = this.props.data.markdownRemark;
    const image = this.props.data.markdownRemark.frontmatter.image.childImageSharp.fluid;

    return (
      <Layout>
        {post ? (
          <>
            <SEO postPath={post.fields.slug} postNode={post} postSEO />
            <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
            <HeaderBar />
            <BlogHeader post={post} fluid_image={image} />
            <Wrapper fullWidth={true}>
              <Content style={{ backgroundColor: Theme.colors.white }}>
                <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
                {post.frontmatter.tags ? (
                  <Subline>
                    Tags: &#160;
                    {post.frontmatter.tags.map((tag, i) => (
                      <Link key={i} to={`/tags/${kebabCase(tag)}`}>
                        <Tag> {tag} </Tag> {i < post.frontmatter.tags.length - 1 ? ` ` : ``}
                      </Link>
                    ))}
                  </Subline>
                ) : null}
                <PrevNext prev={prev} next={next} />
              </Content>
            </Wrapper>
          </>
        ) : null}
      </Layout>
    );
  }
}

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        category
        tags
        banner
        image {
          childImageSharp {
            fluid {
              aspectRatio
              base64
              originalImg
              originalName
              presentationHeight
              presentationWidth
              sizes
              src
              srcSet
              srcSetWebp
              srcWebp
              tracedSVG
            }
          }
        }
      }
      timeToRead
    }
  }
`;

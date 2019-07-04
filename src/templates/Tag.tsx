import React from 'react';
import Link from 'gatsby-link';
import PageProps from '../models/PageProps';
import { Article, Content, HeaderBar, Layout, SectionTitle, Subline, Wrapper } from '../components';
import { BlogBg } from '../components/BlogHeader';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import kebabCase from 'lodash/kebabCase';
import Tag from '../components/Tag';
import styled from 'styled-components';
import Theme from '../../config/Theme';
import Post from '../models/Post';
import { StaticQuery, graphql } from 'gatsby';

const SubLn = styled(Subline)`
  background-color: ${Theme.colors.primary};
  color: ${Theme.colors.bg};
  display: inline-block;
  margin: 0;
`;

export default class TagTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { posts, tagName } = this.props.pathContext;
    const totalCount = posts ? posts.length : 0;
    const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tagName}"`;

    return (
      <Layout>
        <Helmet title={`${'Tags'} | ${config.siteTitle}`} />
        <HeaderBar />
        <BackGround />
        <Wrapper>
          <SectionTitle style={{ display: 'flex', alignItems: 'center', marginTop: '-4em', marginBottom: '0' }}>
            <Tag square>{tagName}</Tag>
            <Tag square multiple light>
              <Link to="/tags"> all tags </Link>
            </Tag>
          </SectionTitle>
          <span style={{ margin: '0' }}>
            <SubLn> {subline} </SubLn>
          </span>
        </Wrapper>
        <Wrapper>
          <Content style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
            {posts
              ? posts.map((post: Post, index: number) => (
                  <Article
                    title={post.frontmatter.title}
                    date={post.frontmatter.date}
                    image={post.frontmatter.image.childImageSharp}
                    excerpt={post.excerpt}
                    slug={kebabCase(post.frontmatter.date + post.frontmatter.title)}
                    timeToRead={post.timeToRead}
                    category={post.frontmatter.category}
                    key={index}
                  />
                ))
              : null}
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}

const BackGround: React.FC<{}> = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          imageSharp {
            fluid {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalImg
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      `}
      render={data => <BlogBg fluid={data.imageSharp.fluid} style={{ height: '20vh' }} />}
    />
  );
};

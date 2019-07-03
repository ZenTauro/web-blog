import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Layout, Wrapper, HeaderBar, Subline, Article, SectionTitle, Content } from '../components';
import config from '../../config/SiteConfig';
import kebabCase from 'lodash/kebabCase';
import PageProps from '../models/PageProps';

export default class Category extends React.PureComponent<PageProps> {
  public render() {
    const { posts, categoryName } = this.props.pathContext;
    const totalCount = posts ? posts.length : 0;
    const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${categoryName}"`;

    return (
      <Layout>
        <Helmet title={`${categoryName} | ${config.siteTitle}`} />
        <HeaderBar />
        <Wrapper>
          <SectionTitle>Category &ndash; {categoryName}</SectionTitle>
          <Subline sectionTitle>
            {subline} (See <Link to="/categories">all categories</Link>)
          </Subline>
          <Content>
            {posts
              ? posts.map((post, index) => (
                  <Article
                    title={post.frontmatter.title}
                    date={post.frontmatter.date}
                    excerpt={post.excerpt}
                    slug={kebabCase(post.frontmatter.date + post.frontmatter.title)}
                    timeToRead={post.timeToRead}
                    category={post.frontmatter.category}
                    image={post.frontmatter.image.childImageSharp}
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

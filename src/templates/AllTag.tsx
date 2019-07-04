import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { Layout, Wrapper, HeaderBar, SectionTitle, Content, Title } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';

export default class AllTagTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { tags } = this.props.pathContext;
    if (tags) {
      return (
        <Layout>
          <Helmet title={`Tags | ${config.siteTitle}`} />
          <HeaderBar />
          <Wrapper>
            <SectionTitle>Tags</SectionTitle>
            <Content style={{ display: 'flex', flexFlow: 'row wrap' }}>
              {tags.map((tag, index: number) => (
                <Link key={index} to={`/tags/${kebabCase(tag)}`} style={{ padding: '0.25em' }}>
                  {tag}
                </Link>
              ))}
            </Content>
          </Wrapper>
        </Layout>
      );
    }
  }
}

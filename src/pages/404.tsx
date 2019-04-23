import * as React from 'react';
import { Content, HeaderBar, Layout, Wrapper, SectionTitle } from '../components';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';

export default class NotFoundPage extends React.Component<any> {
  public render() {
    return (
      <Layout>
        <Helmet title={`404 not found | ${config.siteTitle}`} />
        <HeaderBar />
        <Wrapper>
          <Content>
            <SectionTitle>NOT FOUND</SectionTitle>
            <Wrapper>
              <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
            </Wrapper>
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}

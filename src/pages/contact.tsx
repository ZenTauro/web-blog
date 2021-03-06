import React from 'react';
import Helmet from 'react-helmet';
import { Layout, Wrapper, HeaderBar, Content } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';

export default class ContactPage extends React.Component<PageProps> {
  public render() {
    return (
      <Layout>
        <Helmet title={`Contact | ${config.siteTitle}`} />
        <HeaderBar />
        <Wrapper>
          <Content> Hello world </Content>
        </Wrapper>
      </Layout>
    );
  }
}

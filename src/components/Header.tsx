import React, { PureComponent } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { media } from '../utils/media';

import SiteConfig from '../../config/SiteConfig';

import './header.scss';
import Theme from '../../config/Theme';

const Nav: any = styled.nav`
  padding: ${(props: any) => (props.fullWidth ? '0' : '0 6rem')};
  @media ${media.tablet} {
    padding: ${(props: any) => (props.fullWidth ? '0' : '0 3rem')};
  }
  @media ${media.phone} {
    padding: ${(props: any) => (props.fullWidth ? '0' : '0 1rem')};
  }
`;

interface IHeaderItemProps {
  link: string;
  name: string;
}

interface IHeaderProps {
  children: JSX.Element[];
}

class HeaderItem extends PureComponent<IHeaderItemProps> {
  public render() {
    return <Link to={this.props.link}> {this.props.name} </Link>;
  }
}

class Header extends PureComponent<IHeaderProps> {
  public render() {
    return (
      <div className="header-wrapper">
        <Nav>
          <h1 className="header-banner">
            <Link to="/"> {SiteConfig.siteTitle} </Link>
          </h1>
          <div>
            <ul className="navigation">
              {this.props.children.map((item, i) => {
                return (
                  <li className="header-item" key={i}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </Nav>
        <div style={{ backgroundColor: Theme.colors.primary, padding: '0.25em' }} />
      </div>
    );
  }
}

export class HeaderBar extends PureComponent<{}> {
  public render() {
    return (
      <Header>
        <HeaderItem name="BLOG" link="/blog" />
        <HeaderItem name="CONTACT" link="/contact" />
      </Header>
    );
  }
}

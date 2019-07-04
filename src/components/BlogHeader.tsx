import React from 'react';
import BackgroudImage from 'gatsby-background-image';
import { IChildImageSharp } from '../models/IImage';
import Post from '../models/Post';
import { SectionTitle } from '.';
import { kebabCase } from 'lodash';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Theme from '../../config/Theme';

interface IBlogHeaderProps {
  fluid_image: IChildImageSharp['fluid'];
  post: Post;
}

export const BlogBg = styled(BackgroudImage)`
  height: 75vh;
  z-index: -1;
  background-attachment: fixed;
  &::after {
    background-attachment: fixed;
  }
  &::before {
    background-attachment: fixed;
  }
`;

const Wrapper = styled.div`
  color: ${Theme.colors.white};
  margin: -15em 10em 2em 10em;
`;

export class BlogHeader extends React.PureComponent<IBlogHeaderProps> {
  public render() {
    const image = this.props.fluid_image;
    const post = this.props.post;

    return (
      <>
        <BlogBg fluid={image} style={{ backgroundAttachment: 'fixed' }} />
        <Wrapper>
          <SectionTitle center={false}>
            <span style={{ background: Theme.colors.primary, padding: '5px', margin: '0' }}>{post.frontmatter.title}</span>
          </SectionTitle>
          <span style={{ background: Theme.colors.primary, padding: '5px', margin: '0' }}>
            {post.frontmatter.date} &mdash; {post.timeToRead} Min Read &mdash; In{' '}
          </span>
          <Link
            style={{ backgroundColor: Theme.colors.bg, padding: '5px', margin: '0' }}
            to={`/categories/${kebabCase(post.frontmatter.category)}`}
          >
            {post.frontmatter.category}
          </Link>
        </Wrapper>
      </>
    );
  }
}

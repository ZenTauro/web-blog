import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { Subline } from './Subline';
import BackgroundImage from 'gatsby-background-image';

import { media } from '../utils/media';

import { IImage, IChildImageSharp } from '../models/IImage';

const Post = styled.article`
  display: grid;
  grid-template-columns: 33% auto;

  @media ${media.tablet} {
    display: block;
    padding: 0.5em 1em;
  }
  @media ${media.phone} {
    display: block;
    padding: 0.5em 1em;
  }

  max-width: 30em;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 20px 2px;

  background-color: #fff;
  border-radius: 0.25em;

  margin-bottom: 0.5em;
  margin-top: 0.5em;
`;

const Title = styled.h2`
  text-decoration-color: ${props => props.theme.colors.primary};
  text-decoration-line: underline;
  margin-bottom: 0.25em;
`;

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Rest = styled.p`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

interface Props {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  timeToRead: number;
  image: IChildImageSharp;
  category: string;
}

export class Article extends React.PureComponent<Props> {
  public render() {
    const { title, image, date, excerpt, slug, timeToRead, category } = this.props;

    return (
      <Link to={`/blog/${slug}`}>
        <Post>
          <BackgroundImage fluid={image.fluid} />
          <Rest>
            <Title>
              <Link to={`/blog/${slug}`} style={{ textDecoration: 'inherit' }}>
                {title}
              </Link>
            </Title>
            <Subline>
              {date} &mdash; {timeToRead} Min Read &mdash; In
              <Link to={`/categories/${kebabCase(category)}`}> {category}</Link>
            </Subline>
            <Excerpt>{excerpt}</Excerpt>
          </Rest>
        </Post>
      </Link>
    );
  }
}

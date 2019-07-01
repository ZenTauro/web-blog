import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Subline } from './Subline';
import BackgroundImage from 'gatsby-background-image';

import { media } from '../utils/media';
import { IChildImageSharp } from '../models/IImage';

import './Article.scss';

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
  transition: ease-out 0.25s;
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

const Rest = styled.div`
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
      <Link to={`/blog/${slug}`} className="card">
        <Post>
          <BackgroundImage fluid={image.fluid} />
          <Rest>
            <Title> {title} </Title>
            <Subline>
              {date} &mdash; {timeToRead} Min Read &mdash; In {category}
            </Subline>
            <Excerpt>{excerpt}</Excerpt>
          </Rest>
        </Post>
      </Link>
    );
  }
}

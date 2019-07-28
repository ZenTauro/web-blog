import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Subline } from './Subline';
import BackgroundImage from 'gatsby-background-image';

import { media } from '../utils/media';
import { IChildImageSharp } from '../models/IImage';

import './Article.scss';
import Theme from '../../config/Theme';

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
  height: 14em;
  transition: ease-out 0.25s;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 20px 2px;

  background-color: #fff;
  border-radius: 0.5em;

  margin-bottom: 0.5em;
  margin-top: 0.5em;

  overflow: hidden;
`;

const Title = styled.h2`
  text-decoration-color: ${props => props.theme.colors.primary};
  text-decoration-line: underline;
  font-size: 1.7em;
  margin-bottom: 0.5em;
`;

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${Theme.colors.grey.default};
  font-size: 0.75em;
  overflow: hidden;
`;

const Rest = styled.div`
  padding: 1em 0.5em 0 1em;
`;

const Category = styled.span`
  color: ${Theme.colors.darker};
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
      <Link to={`/blog/${slug}`} className="card" style={{ color: Theme.colors.grey.dark }}>
        <Post>
          <BackgroundImage fluid={image.fluid} />
          <Rest>
            <Title> {title} </Title>
            <Subline style={{ fontSize: '0.75em' }}>
              {date} &mdash; {timeToRead} Min Read &mdash; In <Category>{category}</Category>
            </Subline>
            <Excerpt>{excerpt}</Excerpt>
          </Rest>
        </Post>
      </Link>
    );
  }
}

import * as React from 'react';
import { FaTag } from 'react-icons/fa';
import styled from 'styled-components';
import Theme from '../../config/Theme';

interface ITagProps {
  name: string;
}

const TagContainer = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: ${Theme.colors.primary};
  padding: 0 0.5em;
  border-radius: 1em;
  transition: ${Theme.transitions.normal};
  :hover {
    background-color: ${Theme.colors.darker};
  }
`;

const Name = styled.span`
  margin-left: 0.35em;
  color: ${Theme.colors.bg};
`;

export default class Tag extends React.PureComponent<ITagProps> {
  public render() {
    return (
      <TagContainer>
        <FaTag style={{ color: Theme.colors.bg }} />
        <Name>{this.props.name}</Name>
      </TagContainer>
    );
  }
}

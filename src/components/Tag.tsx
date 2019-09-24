import * as React from 'react';
import { FaTag, FaTags } from 'react-icons/fa';
import styled from 'styled-components';
import Theme from '../../config/Theme';

interface ITagProps {
  children?: any;
  square?: boolean;
  multiple?: boolean;
  light?: boolean;
}

const TagContainer = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: ${(props: ITagProps) => (props.light ? Theme.colors.bg : Theme.colors.primary)};
  padding: 0 0.5em;
  border-radius: ${(props: ITagProps) => (props.square ? '0' : '1em')};
  transition: ${Theme.transitions.normal};
`;

const Name = styled.span`
  margin-left: 0.35em;
  color: ${Theme.colors.bg};
`;

export default class Tag extends React.PureComponent<ITagProps> {
  public render() {
    const color = this.props.light ? Theme.colors.primary : Theme.colors.bg;
    return (
      <TagContainer square={this.props.square} light={this.props.light}>
        {this.props.multiple ? <FaTags style={{ color }} /> : <FaTag style={{ color }} />}
        <Name>{this.props.children}</Name>
      </TagContainer>
    );
  }
}

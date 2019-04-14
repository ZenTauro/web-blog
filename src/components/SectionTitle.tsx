import styled from 'styled-components';

export const SectionTitle: any = styled.div`
  font-size: ${props => props.theme.fontSize.big};
  text-transform: ${(props: any) => (props.uppercase ? 'uppercase' : 'normal')};
  text-align: center;
  color: ${props => props.theme.colors.dark};
  padding: 0.25em 0;
  &:after {
    content: '';
    height: 1px;
    width: 50px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -25px;
    background: ${props => props.theme.colors.white};
  }
`;

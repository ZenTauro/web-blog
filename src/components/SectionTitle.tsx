import styled from 'styled-components';

export const SectionTitle: any = styled.div`
  font-size: ${props => props.theme.fontSize.big};
  text-transform: ${(props: any) => (props.uppercase ? 'uppercase' : 'normal')};
  text-align: ${(props: any) => (props.center ? 'center' : 'left')};
  color: ${props => props.theme.colors.dark};
  padding: 0.25em 0;
`;

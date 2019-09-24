import styled from 'styled-components';
import { media } from '../utils/media';

export const Wrapper: any = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 1em 0;
  max-width: 100rem;
  padding: 0 6rem;
  @media ${media.tablet} {
    padding: ${(props: any) => (props.fullWidth ? '0' : '0 3rem')};
  }
  @media ${media.phone} {
    padding: ${(props: any) => (props.fullWidth ? '0' : '0 1rem')};
  }
`;

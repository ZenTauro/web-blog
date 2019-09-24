import styled from 'styled-components';
import { media } from '../utils/media';

export const Content = styled.div`
  @media ${media.tablet} {
    padding: 1em 2em;
  }
  @media ${media.phone} {
    padding: 1em 2em;
  }
  padding: ${(props: any) => (props.fullWidth ? 0 : '2em 4em')};
  max-width: 100%;
  background-color: ${props => props.theme.colors.bg};
  form {
    p {
      label,
      input {
        display: block;
      }
      input {
        min-width: 275px;
      }
      textarea {
        resize: vertical;
        min-height: 150px;
        width: 100%;
      }
    }
  }
`;

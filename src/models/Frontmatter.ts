import { IImage } from './IImage';

interface Frontmatter {
  date: string;
  title: string;
  category: string;
  tags: string[];
  image: IImage;
  banner?: string;
}

export default Frontmatter;

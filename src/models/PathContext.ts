import Post from './Post';

interface PathContext<T> {
  tags?: string[];
  categories?: string[];
  categoryName: string;
  tagName?: string;
  posts?: Post[];
  next: T;
  prev: T;
}

export default PathContext;

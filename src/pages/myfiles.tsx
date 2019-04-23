import React from 'react';
import { graphql } from 'gatsby';
import { Layout, HeaderBar, Subline, SEO, PrevNext, SectionTitle, Content } from '../components';
import Post from '../models/Post';

interface INode {
  relativePath: string;
  prettySize: string;
  extension: string;
  birthTime: any;
}

export default ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <HeaderBar />
      <Content>
        <div>
          <h1>My Site's Files</h1>
          <table>
            <thead>
              <tr>
                <th>relativePath</th>
                <th>prettySize</th>
                <th>extension</th>
                <th>birthTime</th>
              </tr>
            </thead>
            <tbody>
              {data.allFile.edges.map(({ node }, index: number) => (
                <tr key={index}>
                  <td>{node.relativePath}</td>
                  <td>{node.prettySize}</td>
                  <td>{node.extension}</td>
                  <td>{node.birthTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Content>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;

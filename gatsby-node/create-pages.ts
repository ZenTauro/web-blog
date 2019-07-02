import path from 'path';
import _ from 'lodash';
import { MarkdownRemarkEdge } from '../src/graphqlTypes';
import { CreateNodeArgs, Actions, CreatePagesArgs, CreateWebpackConfigArgs } from 'gatsby';
import * as config from '../config/SiteConfig';

interface IPostsByType {
  [id: string]: MarkdownRemarkEdge[];
}

/**
 * Gets the posts by type from the frontmatter
 */
function getPostsByType(posts: MarkdownRemarkEdge[], classificationType: string): MarkdownRemarkEdge[] {
  const postsByType: any = {};

  posts.forEach(({ node }: any) => {
    const nodeClassificationType = node.frontmatter[classificationType];
    if (nodeClassificationType) {
      if (_.isArray(nodeClassificationType)) {
        nodeClassificationType.forEach(name => {
          if (!_.has(postsByType, name)) {
            postsByType[name] = [];
          }
          postsByType[name].push(node);
        });
      } else {
        const name = nodeClassificationType;
        if (!postsByType[name]) {
          postsByType[name] = [];
        }
        postsByType[name].push(node);
      }
    }
  });

  return postsByType;
}

interface CalssificaitonPagesObj {
  createPage: Actions['createPage'];
  posts: MarkdownRemarkEdge[];
  postsPerPage: number;
  numPages: number;
}

function createClassificationPages({ createPage, posts, postsPerPage, numPages }: CalssificaitonPagesObj) {
  const classifications = [
    {
      singularName: 'category',
      pluralName: 'categories',
      template: {
        part: path.resolve(`src/templates/Category.tsx`),
        all: path.resolve(`src/templates/AllCategory.tsx`),
      },
      postsByClassificationNames: getPostsByType(posts, 'category'),
    },
    {
      singularName: 'tag',
      pluralName: 'tags',
      template: {
        part: path.resolve(`src/templates/Tag.tsx`),
        all: path.resolve(`src/templates/AllTag.tsx`),
      },
      postsByClassificationNames: getPostsByType(posts, 'tags'),
    },
  ];

  classifications.forEach(classification => {
    const names = Object.keys(classification.postsByClassificationNames);

    createPage({
      path: _.kebabCase(`/${classification.pluralName}`),
      component: classification.template.all,
      context: {
        [`${classification.pluralName}`]: names.sort(),
      },
    });

    names.forEach(name => {
      const postsByName = classification.postsByClassificationNames[name];
      createPage({
        path: `/${classification.pluralName}/${_.kebabCase(name)}`,
        component: classification.template.part,
        context: {
          posts: postsByName,
          [`${classification.singularName}Name`]: name,
        },
      });
    });
  });
}

export function onCreateNode({ node, actions }: CreateNodeArgs): void {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark' && _.has(node, 'frontmatter') && _.has(node.frontmatter, 'title')) {
    const slug = `${_.kebabCase(node.frontmatter.date + node.frontmatter.title)}`;
    createNodeField({ node, name: 'slug', value: slug });
  }
}

export function onCreateWebpackConfig({ stage, actions }: CreateWebpackConfigArgs): void {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
}

export function createPages({ actions, graphql }: CreatePagesArgs): void {
  const { createPage } = actions;

  const postTemplate = path.resolve(`src/templates/Post.tsx`);

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 10000) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            fields {
              slug
            }
            frontmatter {
              date
              title
              category
              tags
              image {
                relativePath
                childImageSharp {
                  fluid {
                    aspectRatio
                    base64
                    originalImg
                    originalName
                    presentationHeight
                    presentationWidth
                    sizes
                    src
                    srcSet
                    srcSetWebp
                    srcWebp
                    tracedSVG
                  }
                  fixed {
                    width
                    tracedSVG
                    srcWebp
                    srcSet
                    srcSetWebp
                    src
                    originalName
                    height
                    base64
                    aspectRatio
                  }
                }
              }
              banner
            }
            timeToRead
          }
        }
      }
    }
  `).then((result: { errors: any; data: { allMarkdownRemark: { edges: any } } }) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const posts = result.data.allMarkdownRemark.edges;
    const postsPerPage = config.default.POST_PER_PAGE;
    const numPages = Math.ceil(posts.length / postsPerPage);

    _.range(numPages).map(i => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: path.resolve('./src/templates/Blog.tsx'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages: numPages,
          currentPage: i + 1,
        },
      });
    });

    createClassificationPages({ createPage, posts, postsPerPage, numPages });

    posts.forEach(({ node }: any, index: number) => {
      const next = index === 0 ? null : posts[index - 1].node;
      const prev = index === posts.length - 1 ? null : posts[index + 1].node;

      createPage({
        path: `/blog/${node.fields.slug}`,
        component: postTemplate,
        context: {
          prev,
          next,
          slug: _.kebabCase(node.frontmatter.date + node.frontmatter.title),
        },
      });
    });
  });
}

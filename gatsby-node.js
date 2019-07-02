require('ts-node').register({files: true});

const create_pages = require('./gatsby-node/create-pages');

exports.onCreateNode = create_pages.createPages;
exports.onCreateWebpackConfig = create_pages.onCreateWebpackConfig;
exports.CreatePages = create_pages.createPages;
export default {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: "ZenTauro's Place", // Navigation and Site Title
  siteTitleAlt: "ZenTauro's webpage", // Alternative Site title for SEO
  siteUrl: 'https://zentauro.io', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteBanner: '/assets/banner.jpg', // Your image for og:image tag. You can find it in the /static folder
  defaultBg: '/assets/bg.png', // default post background header
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'React + TypeScript + Rust + r2, what else can you ask for?', // Your site description
  author: 'ZenTauro', // Author for schemaORGJSONLD
  siteLogo: '/assets/logo.png', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  // userTwitter: '@mhadaily', // Twitter Username - Optional
  // ogSiteName: 'mhadaily', // Facebook Site Name - Optional
  ogLanguage: 'en_US', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  // Settings for typography.ts
  headerFontFamily: 'Bitter',
  bodyFontFamily: 'Open Sans',
  baseFontSize: '18px',

  // Social media
  siteFBAppID: '',

  //
  Google_Tag_Manager_ID: 'GTM-XXXXXXX',
  POST_PER_PAGE: 4,
};

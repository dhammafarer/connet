import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

type MetaItem = {
  name: string;
  content: string;
};

interface SEOProps {
  description?: string;
  author?: string;
  lang?: string;
  meta?: MetaItem[];
  title?: string;
}

const SEO: React.FC<SEOProps> = props => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            lang
          }
        }
      }
    `
  );

  const { siteMetadata } = data.site;

  const { title, lang, description, meta = [], author } = siteMetadata;

  const siteTitle = props.title || title;
  const siteDescription = props.description || description;
  const siteAuthor = props.author || author;
  const siteLang = props.lang || lang;

  const metaData = [
    { name: "description", content: siteDescription },
    {
      property: `og:title`,
      content: siteTitle,
    },
    {
      property: `og:description`,
      content: siteDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: siteAuthor,
    },
    {
      name: `twitter:title`,
      content: siteTitle,
    },
    {
      name: `twitter:description`,
      content: siteDescription,
    },
  ].concat(meta);

  return (
    <Helmet
      htmlAttributes={{
        lang: siteLang,
      }}
      title={title}
      // titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={metaData}
    />
  );
};

export { SEO };

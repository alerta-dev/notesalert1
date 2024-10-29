import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'index.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const processedContent = await remark().use(html).process(fileContents);
  const contentHtml = processedContent.toString();

  return {
    props: {
      contentHtml,
    },
  };
}

export default function Home({ contentHtml }) {
  return (
    <main>
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
          line-height: 1.5;
          color: #24292e;
          max-width: 800px;
          margin: auto;
          padding: 2rem;
          background-color: #ffffff;
        }
        h1, h2, h3, h4, h5, h6 {
          color: #1f2328;
          font-weight: 600;
        }
        p, ul, ol {
          margin-bottom: 1.5rem;
        }
        a {
          color: #0366d6;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        code {
          background-color: #f6f8fa;
          border-radius: 3px;
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
          padding: 0.2em 0.4em;
          font-size: 85%;
        }
        blockquote {
          border-left: 4px solid #dfe2e5;
          color: #6a737d;
          padding: 0.5em 1em;
          background-color: #f6f8fa;
        }
        hr {
          border: none;
          border-top: 1px solid #dfe2e5;
          margin: 2rem 0;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}

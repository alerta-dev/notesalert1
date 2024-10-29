import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'index.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const processedContent = await remark()
    .use(remarkGfm) // Utiliza el plugin GFM para soportar tablas
    .use(html)
    .process(fileContents);
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
        /* Estilos de texto y tabla */
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          line-height: 1.5;
          color: #24292e;
          max-width: 800px;
          margin: auto;
          padding: 2rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 0.5rem;
          border: 1px solid #dfe2e5;
          text-align: center;
        }
        th {
          background-color: #f6f8fa;
          font-weight: bold;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}

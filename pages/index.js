import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getStaticProps() {
  // Lee el archivo Markdown
  const filePath = path.join(process.cwd(), 'public', 'index.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Convierte el contenido a HTML
  const { content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
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
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}

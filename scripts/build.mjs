import { build, context } from 'esbuild';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import tailwind from '@tailwindcss/postcss';
import postcss from 'postcss';

const dev = process.argv.includes('--serve');
await mkdir('dist', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await copyFile('public/favicon.svg', 'dist/favicon.svg');
const options = {
  entryPoints: ['src/main.tsx'], bundle: true, outfile: 'dist/app.js',
  jsx: 'automatic', minify: !dev, target: 'es2020',
  define: { 'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production') },
  plugins: [{
    name: 'tailwind',
    setup(builder) {
      builder.onLoad({ filter: /index\.css$/ }, async ({ path }) => {
        const css = await postcss([tailwind({base: resolve('src')})]).process(await readFile(path, 'utf8'), { from: path });
        const watchFiles = css.messages.filter(m => m.type === 'dependency').map(m => m.file);
        return { contents: css.css, loader: 'css', watchFiles };
      });
    }
  }]
};
if (dev) {
  const server = await context(options);
  await server.watch();
  const {port} = await server.serve({servedir:'dist', host:'127.0.0.1', port:5173});
  console.log('Demo running at http://localhost:' + port);
} else {
  await build(options);
  const [html, css, js, favicon] = await Promise.all([
    readFile('dist/index.html', 'utf8'), readFile('dist/app.css', 'utf8'),
    readFile('dist/app.js', 'utf8'), readFile('dist/favicon.svg')
  ]);
  const offline = html.replace('./favicon.svg', 'data:image/svg+xml;base64,' + favicon.toString('base64'))
    .replace('<link rel="stylesheet" href="./app.css">', () => '<style>' + css + '</style>')
    .replace('<script defer src="./app.js"></script>', () => '<script>' + js.replace(/<\/script/gi, '<\\/script') + '</script>');
  await writeFile('Open-Demo.html', offline);
}

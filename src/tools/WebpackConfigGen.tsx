import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const WebpackConfigGen = () => {
  const [mode, setMode] = useState("production");
  const [ts, setTs] = useState(true);
  const [css, setCss] = useState(true);
  const [devServer, setDevServer] = useState(true);
  const entry = ts ? "ts" : "js";
  const loader = ts ? "ts-loader" : "babel-loader";
  const ext = ts ? "'.ts', '.tsx', " : "";
  const cssRule = css ? `\n      {\n        test: /\\.css$/,\n        use: ['style-loader', 'css-loader'],\n      },` : "";
  const dsBlock = devServer ? `\n  devServer: {\n    port: 3000,\n    hot: true,\n    open: true,\n  },` : "";
  const config = `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: '${mode}',
  entry: './src/index.${entry}',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\\.${ts ? "tsx?" : "jsx?"}$/,
        use: '${loader}',
        exclude: /node_modules/,
      },${cssRule}
    ],
  },
  resolve: {
    extensions: [${ext}'.js', '.jsx'],
  },${dsBlock}
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Mode</label><select value={mode} onChange={e=>setMode(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm"><option>production</option><option>development</option></select></div>
    </div>
    <div className="flex flex-wrap gap-4">
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={ts} onChange={e=>setTs(e.target.checked)} />TypeScript</label>
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={css} onChange={e=>setCss(e.target.checked)} />CSS Loader</label>
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={devServer} onChange={e=>setDevServer(e.target.checked)} />Dev Server</label>
    </div>
    <ToolOutput label="webpack.config.js" value={config} />
  </ToolLayout>;
};
export default WebpackConfigGen;
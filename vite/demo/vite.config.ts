import { defineConfig } from 'vite';

export default defineConfig({
  // 配置选项
  plugins: [],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
});
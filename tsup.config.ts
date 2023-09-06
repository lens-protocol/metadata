/* eslint-disable import/no-default-export */
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts', 'src/legacy/index.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  treeshake: true,
  clean: true,
  bundle: true,
  minify: !options.watch,
  dts: true,
  platform: 'neutral',
  format: ['cjs', 'esm'],
}));

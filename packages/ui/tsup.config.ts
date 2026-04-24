import { defineConfig } from 'tsup';
import { readFileSync, writeFileSync } from 'fs';

const prependUseClient = (file: string) => {
  const content = readFileSync(file, 'utf-8');
  if (!content.startsWith('"use client"')) {
    writeFileSync(file, `"use client";\n${content}`);
  }
};

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    external: ['react', 'react-dom'],
    treeshake: true,
    async onSuccess() {
      prependUseClient('dist/index.mjs');
      prependUseClient('dist/index.js');
    },
  },
  {
    entry: { tokens: 'src/tokens/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    treeshake: true,
  },
]);

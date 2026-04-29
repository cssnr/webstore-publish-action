import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

// noinspection JSUnusedGlobalSymbols
export default {
  input: 'src/index.ts',
  output: {
    esModule: true,
    file: 'dist/index.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  plugins: [commonjs(), json(), nodeResolve({ preferBuiltins: true }), typescript()],
}

import buble from '@rollup/plugin-buble';
import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

const production = process.env.NODE_ENV == 'production';
const dotenv = require('dotenv');
const dotEnvVars = dotenv.config().parsed;

export default {
  external: ['s72', 's72.ui', 's72.transactional', 'auth0.js'],
  input: 'site/static/js/main.js',
  output: {
    name: 'curzon',
    file: 'site/static/scripts/main.js',
    format: 'iife',
    globals: {
      s72: 's72',
      's72.ui': 's72.ui',
      's72.transactional': 's72.transactional',
      auth0:'auth0.js'
    },
    compact: production,
    sourcemap: !production
  },
  plugins: [
    buble({ jsx: 's72.ui.h'}),
    (production && terser()),
    injectProcessEnv(dotEnvVars),
    resolve()
  ]
};
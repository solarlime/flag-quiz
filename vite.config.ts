import { defineConfig } from 'vite';
import { svgPlugin } from 'vite-plugin-fast-react-svg';
import reactSwc from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    target: 'es2022',
  },
  build: {
    target: ['ios12'],
  },
  plugins: [
    svgPlugin(),
    reactSwc({
      useAtYourOwnRisk_mutateSwcOptions(options) {
        if (options.jsc && options.jsc.parser && options.jsc.transform) {
          options.jsc.parser.decorators = true;
          options.jsc.transform.decoratorVersion = '2022-03';
        }
      },
    }),
  ],
});

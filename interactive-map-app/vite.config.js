// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       external: ['@hookform/resolvers/zod', 'react', 'react-dom', 'leaflet', 'react-leaflet']
//     }
//   }
// });

import importToCDN from 'vite-plugin-cdn-import'

export default {
    plugins: [
        importToCDN({
            modules: [
                {
                    name: 'react',
                    var: 'React',
                    path: `umd/react.production.min.js`,
                },
                {
                    name: 'react-dom',
                    var: 'ReactDOM',
                    path: `umd/react-dom.production.min.js`,
                },
            ],
        }),
    ],
    build: {
        rollupOptions: {
            external: ['@hookform/resolvers/zod'],
        },
    },
}

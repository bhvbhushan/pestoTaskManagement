const path = require('path')

const projectRoot = __dirname

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        path.join(projectRoot, 'node_modules/@toptal/picasso/**/*.js'),
        path.join(projectRoot, 'node_modules/@toptal/picasso-*/**/*.js'),
        // adjust for your project infrastructure
        path.join(projectRoot, '{hosts,libs,namespaces}/**/src/**/*.{ts,tsx}'),
    ],
    presets: [require('@toptal/picasso-tailwind')],
    corePlugins: {
        preflight: false,
    },
}
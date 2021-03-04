//config-overrides.js文件内容
const {
    override,
    addPostcssPlugins,
    fixBabelImports,
    addLessLoader
} = require("customize-cra");
// 关掉 sourceMap
process.env.GENERATE_SOURCEMAP = process.env.NODE_ENV === 'development' ? 'true' : 'false';

module.exports = override(
    addPostcssPlugins([
        require("postcss-normalize")({
            "forceImport": true
        }),
        require("postcss-preset-env")({
            "stage": 0
        }),
    ]),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
   addLessLoader({
       javascriptEnabled: true,
       modifyVars: { '@primary-color': '#c8132d' },
 }),
);


import { getPackageData, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePackage from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageData('react');
// react 路径
const pkgPath = resolvePkgPath(name);
// 打包产物路径
const pkgDistPath = resolvePkgPath(name, true);

export default [
  // react
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: 'index.js',
      format: 'umd',
    },
    plugins: [
      ...getBaseRollupPlugins(),
      generatePackage({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        // 自定义产物中package.json 文件
        baseContents: ({ name, version, description }) => ({
          name,
          version,
          description,
          main: 'index.js'
        })
      })
    ],
  },
  // jsx-runtime
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      // jsx-runtime
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      },
      // jsx-dev-runtime
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime.js',
        format: 'umd'
      }
    ],
    plugins: getBaseRollupPlugins()
  }
]
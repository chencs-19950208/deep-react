import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

// 包的路径
const pkgPath = path.resolve(__dirname, '../../packages');
// 打包之后产物路径
const distPath = path.resolve(__dirname, '../../dist/node_modules');

// 解析package 路径
export function resolvePkgPath(pkgName, isDist) {
  // 打包产物路径
  if(isDist) {
    return `${distPath}/${pkgName}`;
  };

  return `${pkgPath}/${pkgName}`;
};

// 获取包 package 数据
export function getPackageData(pkgName) {
  // 包路径
  const path = `${resolvePkgPath(pkgName)}/package.json`;
  // 读取package.json 的内容
  const result = fs.readFileSync(path, { encoding: 'utf-8' });

  return JSON.parse(result);
};

// 处理公共的plugins
export function getBaseRollupPlugins({ typescript = {} } = {}) {
  return [replace(alias = {
    __DEV__: true,
  }), cjs(), ts(typescript)];
};


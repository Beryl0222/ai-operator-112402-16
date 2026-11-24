import {readFileSync} from 'node:fs';
import * as input from './inputs/lut-assets.mjs';

const source=JSON.parse(readFileSync(new URL('./inputs/lut-assets.json',import.meta.url),'utf8'));
console.log(JSON.stringify({名称:'线性色域调色表和像素块',首项:source['size'],字段:Object.keys(source),取数函数:Object.keys(input)},null,2));

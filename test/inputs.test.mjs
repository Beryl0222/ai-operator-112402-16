import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import { colorVertex, colorPixels } from '../inputs/lut-assets.mjs';

const data=JSON.parse(readFileSync(new URL('../inputs/lut-assets.json',import.meta.url),'utf8'));
test('线性色域调色表和像素块的格式与关联', () => {
  const a = colorVertex(16,8,8,'main'), b = colorVertex(16,8,8,'flat');
  assert.equal(a.length,3);
  assert.equal(b[0],colorVertex(17,8,8,'flat')[0]);
  assert.notEqual(a[0],colorVertex(17,8,8,'main')[0]);
  assert.ok(data.readBudget<data.pixels*(data.size-1)**3);
  assert.equal(data.shared[0][1],data.shared[1][1]);
  assert.equal(colorPixels(1).length,256*3);
});

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const d = JSON.parse(readFileSync(new URL('../inputs/session.json', import.meta.url), 'utf8'));

test("所有块都有完整余弦系数索引", () => {
  assert.ok(d.blocks.every(b=>b.base.length===d.size**2 && b.deviations.length===b.base.length));
});

test("残差落在扫描方向对应的上界内", () => {
  assert.ok(d.blocks.every(b=>b.deviations.every((x,i)=>Math.abs(x)<=b.bounds[d.packs.find(p=>p.id===b.pack).scan==='reverse'? b.base.length-1-i:i])));
});

test("两个尺度的读区容许误差不同", () => {
  assert.ok(d.views[0].scale!==d.views[1].scale && d.blocks.some(b=>b.bounds.some(x=>x>d.views[1].tolerance)));
});

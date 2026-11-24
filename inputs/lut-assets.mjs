import {readFileSync} from 'node:fs';
const data = JSON.parse(readFileSync(new URL('./lut-assets.json', import.meta.url), 'utf8'));
export function colorVertex(i,j,k,variant='main') {
  const size=data.size-1;
  if([i,j,k].some(x=>x<0||x>size)) throw new RangeError('颜色顶点越界');
  const x=i/size,y=j/size,z=k/size;
  let r=x+0.018*Math.sin(y*Math.PI)*x*(1-x);
  if(variant==='flat' && i>=16&&i<=18) r=.5;
  if(variant==='folded' && i>=15&&i<=19) r=.5+0.03*Math.cos((i-15)*1.7);
  return [r, y+.01*x*z*y*(1-y), z];
}
export function colorPixels(tile) {
  return Float64Array.from({length:256*3},(_,i)=>((Math.imul(tile*768+i+2003,0x45d9f3b)>>>18)&16383)/16384);
}

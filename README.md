# 本地放大镜的渐进块余弦重建

项目资料使用可独立读写的 JSON。Node.js 22.23.4 下运行 `npm ci --offline` 准备环境，然后运行 `npm run inspect` 检查合成数据字段，运行 `npm test` 校验样本引用及格式。

## 输入契约

块内采用正交二维 DCT-II 的逆变换，按 [ky,kx]，反扫描将线性下标 i 映射至 N²-1-i。系数为 code*step，deviations 是后续可加的有符号系数残差，bounds 按正向下标声明残差绝对上界。将目标像素足迹的源像素取盒平均，与足迹外扩 neighbors 个像素的平均值作差，乘以 gain 后加回原盒平均。源图边界重复端点后向内镜像。orient 为 0 或顺时针 90 度，scale 为目标像素对应的源盒边长。误差以增强后输出计算。

## 资料读取

样本位于 `inputs/session.json`，其中 `events` 是按到达顺序记下的操作，编号从零开始。base、deviation 的参数为 blocks 中的下标，view 指视图 ID 和输出块位置 x、y。xy 指源块索引。bounds 按正向频率下标，deviations 按固件扫描存放。

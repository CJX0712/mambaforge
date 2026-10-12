/* MambaForge 无头自检运行器 */
const MF = require('./mambaforge.js');

console.log('\n=== MambaForge · 无头自检 ===\n');
const r = MF.selftest();
for (const t of r.results) {
  console.log(`${t.pass ? '✅' : '❌'}  ${t.name}  —  ${t.detail}`);
}
console.log(`\n硬不变量：${r.passed}/${r.total} 全绿 ${r.ok ? '✅' : '❌'}`);

if (!r.ok) {
  console.error('\n自检失败，终止。');
  process.exit(1);
}

console.log('\n=== Demo：选择性拷贝长度泛化 ===');
const t0 = Date.now();
const d = MF.runDemo();
const dt = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`(耗时 ${dt}s)`);
console.log(`  Mamba   训练长度 acc=${d.mTrain.toFixed(3)}  测试长度(5×) acc=${d.mTest.toFixed(3)}`);
console.log(`  Transf. 训练长度 acc=${d.tTrain.toFixed(3)}  测试长度(5×) acc=${d.tTest.toFixed(3)}`);
const mambaWins = d.mTest >= d.tTest;
console.log(`  结论：Mamba 长程泛化 ${mambaWins ? '✅ 优于/持平 Transformer' : '⚠️ 本次未领先（可加大步数/调参）'}`);

console.log('\n全部通过 ✅');

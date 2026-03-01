---
tags: [finance-bench, roadmap, todo]
---

# Roadmap & 待完成事项

## 🔴 高优先级（阻塞/紧急）

- [ ] **GitHub Repo**：在 `when2buy` org 创建 `finance-bench-website`，推送代码
- [ ] **Fix Task 难度标签**：网站 `hard` 对应 repo 的 `medium-hard`，需对齐
- [ ] **Finance-Zero baseline**：跑 10 个核心任务，验证难度分布
- [ ] **cloudflared 自启**：NAS 重启后需自动恢复（当前手动启动）
- [ ] **SlowPC 容器自启**：确保重启后 `finance-bench-website` 容器自动运行

## 🟡 中优先级（提升内容质量）

- [ ] **更多模型跑分**：GPT-4o、o3、Gemini 2.5 Pro——完善排行榜
- [ ] **重复实验**：Haiku/Sonnet 各跑 5 次，确认结果稳定性
- [ ] **Task Catalog 扩展**：展示完整 90 个任务（当前只有 10 个）
- [ ] **Submission Portal**：文档说明如何本地跑测试 + 提交结果（GitHub PR 方式）
- [ ] **数据文件抽取**：把 page.tsx 里的硬编码数据移到 `/data/results.json`

## 🟢 长期规划

- [ ] **技术报告**：参考 arXiv:2601.11868 写 Finance-Bench 构建文档，投 arXiv
- [ ] **Hugging Face Datasets**：托管完整数据集，方便研究者 `datasets.load_dataset()`
- [ ] **动态排行榜**：后端支持自动提交验证（而非 GitHub PR）
- [ ] **Vercel 迁移**（可选）：现在自建，如果访问量大可以迁 Vercel 提升稳定性
- [ ] **社区推广**：Hugging Face 发帖、Twitter/X、Reddit r/MachineLearning

## 决策日志

| 日期 | 决策 | 理由 |
|---|---|---|
| 2026-02-27 | Next.js + Tailwind 静态站 | 快速 MVP，不需要后端 |
| 2026-02-27 | 极简黑底设计风格 | 对标 tbench.ai，developer 调性 |
| 2026-02-27 | 部署在 SlowPC Docker | NAS 服务太多，隔离性好 |
| 2026-02-27 | NAS CF Tunnel 统一管理 | 所有域名集中在 nas-tunnel，不分散 |
| 2026-02-28 | CF config 指向 SlowPC Tailscale IP | NAS+SlowPC 同局域网，100.74.22.32:3000 可达 |
| 2026-02-28 | 先展示 10 个核心任务 | 只有这 10 个有真实跑分数据，不造假 |

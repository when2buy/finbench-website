---
tags: [quantitativefinance-bench, website, deployment]
---

# 网站设计 & 部署

## 访问地址

🌐 **https://finbench.when2buy.ai** （已上线）

---

## 设计语言

参考 [tbench.ai](https://tbench.ai) 的极简科技风格。

| 元素 | 值 |
|---|---|
| 背景色 | `#09090b`（深黑） |
| 主色 | `#00ff88`（绿色荧光） |
| 次要文字 | `#a1a1aa` |
| 正文字体 | Inter |
| 数字/代码 | JetBrains Mono |

**设计原则**：
- 少即是多，宁可留白，不放没有数据支撑的内容
- 数字说话：Pass Rate 大字突出，矩阵热力图一眼看清
- Developer-friendly：直接链接 GitHub 和 Harbor

---

## 页面结构

```
finbench.when2buy.ai/
├── Hero Section
│   ├── 标题：QuantitativeFinanceBench（Bench 绿色）
│   ├── 副标题定位
│   ├── 统计：10 Tasks / 2 Models / Pass-Fail Scoring
│   └── GitHub 按钮
├── Leaderboard
│   ├── 排行榜卡片（每个 model 一张）
│   └── Task Performance Matrix（热力图，绿=pass，深灰=fail）
├── Task Catalog
│   └── 10 个任务卡片（难度标签 + 简介）
├── How It Works
│   ├── 01 Task Specification
│   ├── 02 Code Generation
│   └── 03 Verification
└── Footer（GitHub + Harbor 链接）
```

---

## 已知问题

- [ ] Task 难度标签：网站用 3 档（easy/medium/hard），repo 实际有 medium-hard，待对齐
- [ ] Task Catalog 只展示 10 个，完整 90 个待补充

---

## 部署架构

```
用户 → Cloudflare (finbench.when2buy.ai)
     → nas-tunnel → NAS cloudflared
     → 代理到 SlowPC 100.74.22.32:3000
     → Docker: quantitativefinance-bench-website (node:22-bookworm)
     → Next.js 15 (port 3000)
```

### 关键配置

| 项目 | 值 |
|---|---|
| CF Tunnel | nas-tunnel (`a107f142-e074-476b-9a51-c6608c0ea4f6`) |
| CF Zone | when2buy.ai (`64c2b073b5551e90b416c0e33336094f`) |
| NAS CF config | `/etc/cloudflared/config.yml` |
| SlowPC IP | `100.74.22.32`（Tailscale） |
| 容器名 | `quantitativefinance-bench-website` |
| 代码路径 | SlowPC `/workspace/quantitativefinance-bench-website` |

### 运维命令

```bash
# 检查网站状态
curl -o /dev/null -w "%{http_code}" https://finbench.when2buy.ai

# 重启 cloudflared（NAS 上）
kill $(pgrep -f "cloudflared tunnel")
nohup cloudflared tunnel --config /etc/cloudflared/config.yml run nas-tunnel \
  > /var/log/cloudflared.log 2>&1 &

# 检查 SlowPC 容器
ssh slowpc-linux "docker ps | grep quantitativefinance-bench-website"
```

---

## Tech Stack

| 层 | 技术 |
|---|---|
| 框架 | Next.js 15 + TypeScript |
| 样式 | Tailwind CSS |
| 组件 | shadcn/ui（部分） |
| 数据 | 硬编码在 page.tsx（后续改为 JSON 文件） |
| 部署 | Docker + Cloudflare Tunnel |
| 托管 | SlowPC（自建）|

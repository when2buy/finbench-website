---
tags: [finance-bench, results, analysis]
updated: 2026-02-28
---

# 评测结果分析

> 数据来源：calibration.log + sonnet-v2.log + haiku-v3.log（2026-02-20~21 运行）

## 当前排行榜（10 个核心任务）

| 排名 | Model | Agent | Pass | Fail | Pass Rate | 运行日期 |
|---|---|---|---|---|---|---|
| 🥇 1 | claude-haiku-3-5 | claude-code | 6 | 4 | **60%** | 2026-02-20 |
| 🥈 2 | claude-sonnet-3-5 | claude-code | 3 | 7 | **30%** | 2026-02-21 |

---

## Task 级别明细

| Task | 难度 | Haiku | Sonnet | 备注 |
|---|---|---|---|---|
| cds-pricing | medium-hard | ✅ Pass | ❌ Fail | Haiku 正确实现 hazard rate 积分 |
| implied-volatility | hard | ❌ Fail | ❌ Fail | 两者都失败——Newton-Raphson 收敛性 |
| bond-convexity | medium | ❌ Fail | ✅ Pass | 反直觉，Sonnet 金融数学更准？ |
| mean-reversion | medium | ✅ Pass | ❌ Fail | OU 参数估计，Haiku 正确 |
| momentum-factor | medium-hard | ✅ Pass | ✅ Pass | 两者通过，相对直观 |
| risk-parity | medium | ❌ Fail | ❌ Fail | 协方差矩阵优化数值问题 |
| credit-risk | hard | ✅ Pass | ✅ Pass | 信用转移矩阵两者都 OK |
| tail-risk | hard | ✅ Pass | ❌ Fail | EVT 尾部估计，Haiku 更好 |
| financial-statements | medium | ❌ Fail | ❌ Fail | 数据解析格式问题？ |
| data-reconciliation | medium | ✅ Pass | ❌ Fail | 数据清洗 Haiku 表现更好 |

---

## 关键发现

### 1. Haiku > Sonnet（反直觉，需要更多数据确认）

60% vs 30%，差距显著。可能原因：
- Sonnet 更倾向于"过度设计"，量化任务要求精准实现数学公式，不需要复杂抽象
- Haiku 更直接按 instruction 执行，数值实现更贴近题目描述
- **但**：每个任务只跑了 1 次，统计上不显著，需要至少 5 次重复确认

### 2. 数值方法是共同短板

两者都失败的任务：
- `implied-volatility`：Newton-Raphson 迭代收敛性，需要精确处理边界条件和初始猜测
- `risk-parity`：协方差矩阵数值优化，可能有数值稳定性问题
- `financial-statements`：格式解析，暗示 agent 在结构化数据处理上还有问题

### 3. Finance-Zero Baseline 缺失

目前没有 Finance-Zero（单次调用）的跑分。这个 baseline 非常重要：
- 如果某个任务 Finance-Zero 也能过，说明任务太简单，需要从 benchmark 移除
- 建议下一步先跑 Finance-Zero baseline

---

## 下一步数据计划

| 优先级 | 任务 | 目标 |
|---|---|---|
| 🔴 高 | Finance-Zero baseline（10 tasks） | 验证任务难度分布 |
| 🔴 高 | Haiku/Sonnet 重复运行（各 5 次） | 确认结果稳定性 |
| 🟡 中 | GPT-4o / o3 跑分 | 跨厂商对比 |
| 🟡 中 | Gemini 2.5 Pro 跑分 | 完善排行榜 |
| 🟢 低 | 全量 90 任务评测 | 完整 benchmark 数据 |

---

## 运行方法参考

```bash
# 设置 API key
export ANTHROPIC_API_KEY=<key>

# 跑校准集（10 tasks）
harbor run --path ./tasks \
    --agent claude-code \
    --model anthropic/claude-haiku-3-5-20241022

# 跑 Finance-Zero baseline（用 Gemini Flash，便宜）
export GEMINI_API_KEY=<key>
harbor run --path ./tasks \
    --agent-import-path agents.finance_zero:FinanceZeroAgent \
    --model gemini/gemini-2.0-flash

# 查看结果
cat jobs/<timestamp>/result.json
```

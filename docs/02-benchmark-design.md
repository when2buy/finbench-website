---
tags: [finance-bench, benchmark, technical]
---

# Benchmark 设计文档

## 运行框架：Harbor

Finance-Bench 是运行在 [Harbor](https://github.com/laude-institute/harbor) 框架上的数据集，不是独立 runner。

```
harbor run --path ./tasks --agent claude-code --model anthropic/claude-sonnet-4-...
```

### 执行流程

```
1. Harbor 读取 tasks/ 目录
2. 为每个任务构建 Docker 镜像（继承 finance-bench-sandbox:latest）
3. Agent 进入 sandbox：
   - 只能看到 instruction.md 和 /app 目录下的输入数据
   - 可以写代码、执行代码、看输出、迭代调试
4. Harbor 运行 tests/test.sh（pytest 验证数值输出）
5. reward.txt 写入 1（pass）或 0（fail）
6. 结果归档到 jobs/<timestamp>/
```

### Sandbox 环境

Docker 基础镜像预装：Python、NumPy、Pandas、TA-Lib、SciPy 等金融库。

---

## 支持的 Agent

| Agent | 提供商 | 特点 |
|---|---|---|
| `claude-code` | Anthropic | 主力测试 agent |
| `codex-cli` | OpenAI | 待测 |
| `gemini-cli` | Google | 待测 |
| `finance-zero` | 任意 | 单次调用，无迭代，难度校准用 |
| `oracle` | 无需 API | 执行参考答案，验证任务正确性 |

---

## 任务结构

```
tasks/<task-name>/
├── task.toml          # 元数据
├── instruction.md     # Agent 唯一输入
├── environment/
│   ├── Dockerfile
│   └── 输入数据（.json / .csv）
├── tests/
│   ├── test.sh
│   └── test_outputs.py   # 数值精度对比
└── solution/
    └── solve.sh          # 参考答案（oracle 用）
```

### task.toml 关键字段

```toml
[metadata]
difficulty = "medium-hard"        # easy / medium / medium-hard / hard
category = "credit-derivatives"
expert_time_estimate_min = 25.0   # 专家完成时间（分钟）
junior_time_estimate_min = 70.0   # 初级开发者时间

[verifier]
timeout_sec = 300.0               # Agent 最大执行时间
```

---

## 难度分级

| 难度 | 专家时间 | 定义 |
|---|---|---|
| Easy | < 20 min | 数据处理、基础计算，Finance-Zero 可能通过 |
| Medium | 20–25 min | 需要金融数学，有数值挑战 |
| Medium-Hard | 25–35 min | 需要迭代调试，接近真实 quant 工作 |
| Hard | 35–40+ min | 专业知识 + 精确数值 + 多轮调试 |

---

## 完整任务列表（90 tasks，当前 branch）

### 校准集（10 tasks，已有跑分数据）

| Task                   | 难度（repo 真实值） | 分类                 | 专家时间   | 任务核心                                     |
| ---------------------- | ------------ | ------------------ | ------ | ---------------------------------------- |
| `cds-pricing`          | medium-hard  | credit-derivatives | 25 min | hazard rate → survival prob → par spread |
| `implied-volatility`   | hard         | options-pricing    | 35 min | Newton-Raphson 反解 BS 隐含波动率               |
| `bond-convexity`       | medium       | fixed-income       | 20 min | DV01、凸度、对冲比率                             |
| `mean-reversion`       | medium       | quant-trading      | 22 min | OU 参数估计（theta/mu/sigma）、半衰期              |
| `momentum-factor`      | medium-hard  | factor-investing   | 30 min | 横截面动量因子构建                                |
| `risk-parity`          | medium       | portfolio-mgmt     | 25 min | 协方差矩阵 → Risk Parity 权重                   |
| `credit-risk`          | hard         | credit-risk        | 35 min | 信用转移矩阵、违约概率                              |
| `tail-risk`            | hard         | risk-mgmt          | 40 min | 极值理论（EVT）、VaR/ES                         |
| `financial-statements` | medium       | accounting         | 25 min | 财务报表解析分析                                 |
| `data-reconciliation`  | medium       | data-engineering   | 25 min | 多源数据对账清洗                                 |

> ⚠️ 当前网站把难度简化成 3 档（easy/medium/hard），与 repo 中 medium-hard 不一致，待修复。

### 完整 90 任务涵盖领域（待全量展示）

**衍生品定价**: Asian Option, Barrier Option MC, Black-Scholes, Convertible Bond, CDS, CVA, Swaption, Quanto Option, Variance Swap...

**固定收益**: Bond Portfolio Analytics, Yield Curve Bootstrapping, Floating Rate Note, Hull-White Rate, Inflation-Indexed Bond, Interest Rate Cap/Floor/Swap...

**量化策略**: Momentum Backtest, MACD Crossover, Bollinger Band, RSI Signal, Pairs Trading, Long-Short Equity, Dual Momentum, Trend Following CTA...

**风险管理**: Historical VaR, Parametric VaR, Monte Carlo VaR, Expected Shortfall, Liquidity-Adjusted VaR, Stress Test...

**组合管理**: Risk Parity, PCA Factor Portfolio, Performance Attribution, Portfolio Beta, Kelly Criterion, Portfolio Rebalancing, Tracking Error...

**另类数据**: News-Driven CTA, Social Sentiment Momentum, Earnings Call Alpha, Order Book Imbalance...

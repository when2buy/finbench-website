---
tags: [quantitativefinance-bench, overview]
---

# Overview — 项目背景与定位

## 一句话

**评测 AI Agent 像真正的 quant 一样工作的能力：在 Docker sandbox 里写代码、调试、产出精确数值结果。**

## 为什么要建这个？

QuantitativeFinance-Bench 起初只是个 GitHub 仓库 + 数据集。目标是升级成类似 [tbench.ai](https://tbench.ai) 的权威平台——有排行榜、有可视化、有社区影响力，成为量化 AI 领域的标准评测基准。

## 与其他 Benchmark 对比

| | QuantitativeFinance-Bench | HumanEval / MBPP | Terminal-Bench | FinanceBench (RAG) |
|---|---|---|---|---|
| 任务类型 | 量化金融代码实现 | 通用编程 | 终端操作 | 金融 QA（RAG） |
| 评分方式 | 数值精度验证（pytest） | 单元测试 | 终端状态 | 字符串匹配 |
| Agent 行为 | 写代码 + 迭代调试 + 验证数字 | 代码补全 | 命令序列 | 检索 + 回答 |
| 环境 | Docker sandbox（金融库） | 本地执行 | 沙盒终端 | 无沙盒 |
| 难度来源 | 金融专业知识 + 数值精度 | 算法逻辑 | CLI 熟练度 | 文档理解 |

> ⚠️ 注意区分：市面上有一个叫 "FinanceBench" 的 RAG benchmark（评测长文本财报 QA），和我们的 QuantitativeFinance-Bench 完全不同。

## 核心设计理念

**"If Finance-Zero solves a task, the task is too easy."**

Finance-Zero = 单次 LLM 调用，生成一个 Python 脚本，运行一次，不迭代不调试。这是有意设计的难度校准工具：

- Finance-Zero 通过 → 任务太简单，从 benchmark 移除
- Finance-Zero 失败，真实 Agent 也失败 → 任务可能太难，需要 review
- Finance-Zero 失败，真实 Agent 通过 → 这才是好的 benchmark 任务

## 创始团队

- **Benchmark 设计**：Dongzhikang（GitHub: Dongzhikang）
- **当前合作**：Steve（when2buy org，网站开发 + 运营）

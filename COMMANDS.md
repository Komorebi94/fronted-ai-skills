# Command 功能说明

本仓库保留 **16 个 command**，覆盖日常前端工程工作流。

**简单问题直接问即可**，不必打 slash command；Rules 始终自动生效。  
需要固定工作流和输出格式时，再用 `/command`。

---

## 快速选型

| 你想做什么 | Command |
|---|---|
| 分析报错、日志、代码路径 | `/analyze` |
| 解释代码/架构怎么工作 | `/explain` |
| Code Review / PR Review | `/review` |
| 找隐藏 bug | `/find-bug` |
| 安全/合规审计 | `/audit` |
| 对比两个技术方案 | `/compare` |
| 评估现有架构 | `/architecture` |
| 设计新功能/API/UI | `/design` |
| 写计划（不改代码） | `/plan` |
| 改代码（功能/行为） | `/implement` |
| 重构（行为不变） | `/refactor` |
| 性能优化 | `/optimize` |
| 写/补测试 | `/test` |
| 升级依赖/SDK/框架 | `/upgrade` |
| 写维护性文档 | `/document` |
| 提交 git commit | `/commit` |

---

## 已移除的低频 command

| 原 command | 现在用什么 |
|---|---|
| `ask` | 直接问（Rules 生效） |
| `research` | `/analyze` |
| `generate` | `/implement` 或 `/document` |
| `migrate` | `/plan` → `/implement` |

---

## Command 详情

### 只读分析

| Command | 用途 | 输出 template |
|---|---|---|
| `analyze` | 技术分析、问题诊断、证据型调查 | `analysis-report.template.md` |
| `explain` | 解释现有代码/架构/数据流 | `explanation.template.md` |
| `review` | 工程质量审查 | `review-report.template.md` |
| `find-bug` | 主动寻找隐藏缺陷 | `bug-report.template.md` |
| `audit` | 安全、隐私、合规专项 | `security-audit.template.md` |
| `compare` | 方案/库/API 对比与选型 | `comparison.template.md` |
| `architecture` | 现有架构评估与演进建议 | `architecture-review.template.md` |

### 规划

| Command | 用途 | 输出 template |
|---|---|---|
| `design` | 设计新功能/API/UI | `design-doc.template.md` |
| `plan` | 实施分步计划（不改代码） | `implementation-plan.template.md` |

### 写入

| Command | 用途 | 输出 template |
|---|---|---|
| `implement` | 功能实现与行为改动 | `implementation-summary.template.md` |
| `refactor` | 行为不变的结构改进 | `refactor-summary.template.md` |
| `optimize` | 性能瓶颈优化 | `optimization-plan.template.md` |
| `test` | 测试设计与实现 | `test-plan.template.md` |
| `upgrade` | 依赖/SDK/框架版本升级 | `upgrade-summary.template.md` |
| `document` | README、API 文档等 | `documentation.template.md` |
| `commit` | 用户明确要求时提交 git | `commit-summary.template.md` |

---

## 常见混淆

| 容易混 | 区分 |
|---|---|
| `analyze` vs `compare` | 分析问题 vs 对比选型 |
| `analyze` vs `architecture` | 局部技术问题 vs 系统结构评估 |
| `architecture` vs `design` | 评估现有系统 vs 设计新方案 |
| `review` vs `audit` | 工程质量 vs 安全合规专项 |
| `implement` vs `optimize` | 改功能/行为 vs 改性能 |
| `implement` vs `upgrade` | 产品改动 vs 版本升级 |
| `refactor` vs `optimize` | 结构/readability vs 性能瓶颈 |
| `plan` vs `implement` | 只出计划 vs 直接改代码 |

---

## 调用示例

```text
/compare 对比 Zustand 和 Context 在我们项目里的适用性
/architecture review 一下 features 目录的分层
/optimize 大列表滚动卡顿，帮我优化
/upgrade 把 React 18 升到 19
/review 看一下当前 diff
/implement 给列表页加上筛选和分页
```

---

## 延伸阅读

- [`.cursor/AGENTS.md`](./.cursor/AGENTS.md) — Cursor 架构与维护流程
- [README.md](./README.md) — 仓库结构与校验

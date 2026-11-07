# Engineer Any Prototype

[MIT](LICENSE) · v0.2.0

## Install / 安装

```bash
npx skills add Th-Hjj/engineer-any-prototype
```

Add `-g` to install globally. / 加上 `-g` 可安装到用户级。

[English](#english) | [中文](#中文)

## English

**Engineer Any Prototype** helps you turn a game or system description into a playable digital prototype, then improve it through playtesting.

Start with a rough idea, a short design, one mechanic, or an existing project. The skill focuses on making the essential interaction work, using the tools that fit your project. **You decide the creative direction; the AI handles implementation within the scope you give it.**

### How to use

1. Install with the command above (or copy `skills/engineer-any-prototype` into your coding agent's skills directory), then invoke `engineer-any-prototype` (for example, `$engineer-any-prototype` in Codex).
2. Share what you want to make playable and any existing project. Mention an engine, platform, or constraint if you already have one; a complete specification is not required.
3. Try the result and describe what happened. Continue naturally with fixes, changes, or questions.

**Try:** `$engineer-any-prototype Turn this game description into a small playable prototype. Use my existing project, and choose reasonable starting values for any unspecified tuning.`

It works independently or alongside [Prototype Anything](https://github.com/Th-Hjj/prototype-anything). The agent needs access to the relevant project and development tools.

[Read the skill](skills/engineer-any-prototype/SKILL.md) · [Regression cases](evals/README.md)

## 中文

**Engineer Any Prototype** 帮你把游戏或系统的描述做成可以亲手试玩的数字原型，再根据试玩反馈继续修改。

你可以从一个粗略想法、一份简短设计、一个机制或已有项目开始。它会结合项目选择合适的实现方式，尽快让核心互动成立。**你决定创作方向，AI 在你授权的范围内推进实现。**

### 如何使用

1. 使用上方命令安装（或手动复制 `skills/engineer-any-prototype` 到编程 Agent 的 skills 目录），然后调用 `engineer-any-prototype`（例如在 Codex 中使用 `$engineer-any-prototype`）。
2. 提供想做成可玩版本的描述或已有项目。如果已经确定引擎、平台或其他限制，一起告诉它；不需要准备完整规格。
3. 试玩后描述实际发生了什么，直接继续讨论修改、修复或下一步。

**试试看：** `$engineer-any-prototype 请把这段游戏描述做成一个小型可玩原型。沿用我现有的项目，未确定的调节数值可以先选合理的起始值。`

它可以独立使用，也可以接着 [Prototype Anything](https://github.com/Th-Hjj/prototype-anything) 的讨论继续制作。Agent 需要能访问项目和相应的开发工具。

[查看 Skill 指令](skills/engineer-any-prototype/SKILL.md) · [回归用例](evals/README.md)

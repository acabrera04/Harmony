# Claude Conversation Log

Session ID: 08dd58c0-f089-400b-a5ca-7a14c2514e98
Date: 2026-02-24 13:55:38

---

## 👤 User

Analyze the findings of this research paper https://arxiv.org/abs/2602.11988
I've attached a PDF copy of the research in @research.pdf 

Once you've done this. Update AGENTS.md and WORKFLOW.md based on your analysis.

---

## 🤖 Claude

I need to install `poppler` to read the PDF, and I can't use WebFetch. Let me install poppler to enable PDF reading, and also read the existing files.

---

## 👤 User

Start over, I've enabled your permissions so you should be able to webfetch and/or install pdftoppm

---

## 🤖 Claude

Now let me also read the memory file and get the full paper content.

---

## 🤖 Claude

Now I have everything I need. Let me analyze the key findings and apply targeted changes to both files.

**Paper findings in brief:**
- LLM-generated context files **decrease** success by ~3%; human-written only gain ~4%
- Context files inflate inference cost **20%+** and add **2.45–3.92 extra agent steps**
- Agents need **14–22% more reasoning tokens** just to process context files
- Context files don't help agents find relevant files faster
- Context files primarily duplicate existing documentation rather than add unique value
- **Core recommendation**: omit auto-generated context; keep only essential non-discoverable info (e.g. specific tooling requirements)

---

## 🤖 Claude

Now update WORKFLOW.md — tighten the subagent strategy and add a core principle on context file hygiene:

---

## 🤖 Claude

Let me do a final review of both files:

---

## 🤖 Claude

Both files look clean. Here's a summary of what changed and why:

---

## Research Summary — Gloaguen et al., 2026

**"Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?"**

| Finding | Stat |
|---|---|
| LLM-generated context files | -3% task success rate |
| Human-written context files | +4% success (marginal) |
| Inference cost increase | +20%+ |
| Extra agent steps per task | +2.45–3.92 |
| Extra reasoning tokens | +14–22% |
| Files found faster with context? | No change |

The root cause: context files mostly **duplicate discoverable documentation** and add **unnecessary requirements** that expand agent scope and burn tokens.

---

## Changes Made

### `AGENTS.md`
- **Removed** the UUID-based identifiers bullet — discoverable from reading schemas directly
- **Condensed** the labeling system from a multi-line sub-list into a single compact line — same information, less parse overhead
- Kept all genuinely non-obvious essentials: spec structure rules, labeling prefixes, class diagram sync rule, canonical visibility enum values

### `WORKFLOW.md`
- **Subagent Strategy**: Changed "use subagents liberally" → use them for *genuinely parallel or context-heavy work, not by default*. The paper's finding that context adds 2–4 extra steps applies equally to unnecessary subagent spawning — both inflate cost without proportional benefit.
- **Core Principles**: Added `Lean Context Files` principle with the research citation so future agents (and contributors) have the rationale for keeping AGENTS.md trim.

---

## 👤 User

commit this

---

## 🤖 Claude

The diff shows a citation was added at the bottom of WORKFLOW.md that I want to verify before committing. Let me check:

---

## 🤖 Claude

Line 70 has a full citation for the paper — that's a good addition (proper attribution). The diff looks clean and intentional. Committing:

---

## 🤖 Claude

Committed as `5b90324`. Clean net diff: 8 insertions, 10 deletions — the files got smaller, which is exactly what the research recommends.

---


# Agent Instructions for Harmony

This file provides context and guidelines for AI coding agents (GitHub Copilot, Cursor, etc.) working on the Harmony project.

## Harmony is a **search engine indexable chat application** @README.md .

## Agent Workflow Guidelines
Before starting any task, read and follow the rules in @WORKFLOW.md 
It defines workflow orchestration, task management, and core principles all agents must follow.

### Specs/Docs
- No build/test commands for specifications
- Jest/Playwright/Lighthouse referenced in specs are design intent for future implementation

## Key repository conventions
- Dev specs use a strict numbered structure with consistent major sections (`1` through `13` across all three specs; SEO spec also includes `14. Acceptance Criteria`).
- Use and preserve the labeling system across diagrams/tables:
  - Modules: `M#`
  - Classes: `CL-C#`, DTOs: `CL-D#`, Entities: `CL-E#`, Interfaces: `CL-I#`
  - Data schemas: `D#`, Technologies: `T#`, Flows: `F#`, States: `S#`/`B#`
- Keep **Section 3 (Class Diagram)** and **Section 4 (List of Classes)** synchronized whenever classes are added/renamed.
- Preserve canonical visibility enum values exactly: `PUBLIC_INDEXABLE`, `PUBLIC_NO_INDEX`, `PRIVATE`.
- Prefer UUID-based identifiers in cache/data contracts and keep key patterns consistent with each spec’s schema section.


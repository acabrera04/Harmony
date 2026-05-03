# Issue #431 - Dummy salt email enumeration

- [x] Read `AGENTS.md` and `WORKFLOW.md`
- [x] Inspect issue #431 body/comments
- [x] Create isolated branch `codex/issue-431-dummy-salt-enumeration` from `origin/main`
- [x] Assign `acabrera04` and post starting issue comment
- [x] Add regression coverage for public-formula dummy salt enumeration
- [x] Replace public SHA-256 dummy salt with server-secret keyed HMAC
- [x] Run backend and frontend verification
- [ ] Commit, push, and open ready-for-review PR closing #431

## Review

- `authService.getLoginPasswordSalt()` now returns HMAC-derived dummy salts using `DUMMY_SALT_HMAC_KEY` in production.
- Unknown-user dummy salts stay stable per email, but no longer match the public SHA-256 formula from issue #431.
- Added service and route regression tests for the offline-precomputable salt value.
- Verification completed with targeted backend auth suites, backend lint/build, frontend lint/tests/build. Full backend Jest was attempted but hung without output and was stopped.

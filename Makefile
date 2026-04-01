PORT ?= 5178

.PHONY: dev
dev:
	@lsof -ti:$(PORT) | xargs kill 2>/dev/null || true
	npm run dev -- -p $(PORT)

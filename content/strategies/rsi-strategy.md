---
title: " RSI Strategy"
tags:
  - strategies
  - rsi
  - momentum
---

# RSI Strategy

Trade using RSI overbought/oversold conditions.

---

## Setup

### Components

- RSI (14)
- Support/resistance
- Trend confirmation

### Timeframe

- Daily for swing
- 4H for intraday

---

## Rules

### Long Entry

```
1. Trend up (higher highs)
2. RSI < 30 (oversold)
3. Price at support
4. Confirmation → BUY
```

### Short Entry

```
1. Trend down (lower highs)
2. RSI > 70 (overbought)
3. Price at resistance
4. Confirmation → SELL
```

---

## Stop & Target

| Element | Value |
|---------|-------|
| Stop | Below swing low |
| Target | 2:1 reward/risk |

---

## Common Mistakes

### 1. Trading RSI Alone

**Fix:** Use with support/resistance

### 2. Fighting Strong Trends

**Fix:** Only trade with trend

---

# Key Takeaways

1. **RSI** — Momentum indicator
2. **Support/resistance** — Confirms entry
3. **Confirm** — Don't anticipate
4. **Trend first** — Trade with trend

---

# Related

>>> [trend-following-strategy.md](./trend-following-strategy.md) >>>

>>> [exit-strategies.md](./exit-strategies.md) >>>

>>> [03-tools/rsi.md](../03-tools/rsi.md) >>>

*RSI finds reversals. Confirm with price.*
---
title: "MACD - Moving Average Convergence Divergence"
tags:
  - tools
  - indicators
  - macd
  - momentum
  - trend
---

# MACD (Moving Average Convergence Divergence)

MACD is a trend-following momentum indicator showing the relationship between two moving averages.

**Created by:** Gerald Appel

---

## How MACD Works

### Components

| Line | Description |
|------|------------|
| MACD Line | 12 EMA - 26 EMA |
| Signal Line | 9 EMA of MACD |
| Histogram | MACD - Signal |

```
MACD
━━━━━━━━━━━━━━━━━
  Signal ══════
  MACD   ══════════
 Histogram ████   ████
          buy    sell
```

---

## Settings

| Setting | Default | Common |
|---------|--------|--------|
| Fast EMA | 12 | 12 |
| Slow EMA | 26 | 26 |
| Signal | 9 | 9 |

**Lower values:** More sensitive, more signals
**Higher values:** Less sensitive, clearer signals

---

## How to Use MACD

### 1. Crossover

**Bullish crossover:** MACD crosses above signal → Buy

**Bearish crossover:** MACD crosses below signal → Sell

```
        Buy
         ↗ ↗
        ↗   ↗
       ↗     ↗
MACD ──────────── Signal
        ↘     ↘
         ↘   ↘
          ↘ ↘
           Sell
```

---

### 2. Zero Line Crossover

**Above zero:** Positive momentum (12 EMA > 26 EMA)
**Below zero:** Negative momentum (12 EMA < 26 EMA)

---

### 3. Divergence

**Bullish divergence:** Price makes lower low, MACD makes higher low → Potential reversal

**Bearish divergence:** Price makes higher high, MACD makes lower high → Potential reversal

---

### 4. Histogram

**Expanding histogram:** Momentum increasing
**Contracting histogram:** Momentum weakening

---

## When to Use MACD

### Use when:
- Market is trending
- Need entry confirmation
- Looking for momentum shifts

### Don't use when:
- Market is ranging (false crossovers)
- Short timeframes (whipsaws)
- Primary indicator only

---

## MACD Trading Strategies

### Strategy 1: Trend Following

1. Identify uptrend on price
2. MACD crosses above zero
3. Entry: On signal line cross
4. Stop: Below recent swing low
5. Exit: MACD cross below signal

---

### Strategy 2: Divergence Reversal

1. Find divergence
2. Price breaks trendline
3. MACD confirms
4. Entry: On confirmation
5. Stop: Beyond pivot

---

### Strategy 3: Histogram Divergence

1. Histogram contracting
2. Price near support
3. Entry: Price bounces
4. Stop: Below support

---

## Common Mistakes

### 1. Trading Every Crossover

**Mistake:** Enter on every MACD cross.

**Result:** Trading range noise.

**Fix:** Only trade in trend direction.

---

### 2. Ignoring Lag

**Mistake:** Using MACD for timing entries.

**Result:** Late entries in strong trends.

**Fix:** Use as confirmation, not timing.

---

### 3. No Zero Line Filter

**Mistake:** Buying when MACD crosses up but below zero.

**Result:** Weak momentum.

**Fix:** Wait for zero line break first.

---

## MACD Settings by Market

| Market | Fast | Slow | Signal |
|--------|------|------|--------|
| Stocks | 12 | 26 | 9 |
| Forex | 12 | 26 | 9 |
| Crypto | 8 | 17 | 9 |
| Indices | 12 | 26 | 9 |

---

# Key Takeaways

1. **Trend momentum** — Shows relationship between EMAs
2. **Crossover signals** — Buy/sell signals
3. **Divergences** — Find reversals
4. **Use in trends** — Avoid in ranges
5. **Confirmation tool** — Don't use alone

---

# Related

>>> [rsi.md](./rsi.md) >>>

>>> [indicators.md](./indicators.md) >>>

>>> [strategies/trend-following.md](../05-strategies/trend-following.md) >>>

*MACD confirms momentum. Price enters.*
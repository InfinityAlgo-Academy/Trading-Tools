---
title: "Pivot Points"
tags:
  - tools
  - pivot-points
  - levels
  - support-resistance
---

# Pivot Points

Pivot points are calculated support and resistance levels based on previous period's high, low, and close. They're market-generated levels that act as reference points.

---

## How Pivot Points Work

### Classic Formula

```
Pivot (P) = (High + Low + Close) / 3

Resistance 1 (R1) = (P × 2) - Low
Support 1 (S1) = (P × 2) - High

Resistance 2 (R2) = P + (High - Low)
Support 2 (S2) = P - (High - Low)

Resistance 3 (R3) = High + 2 × (P - Low)
Support 3 (S3) = Low - 2 × (High - P)
```

---

## Pivot Types

### Classic (Floor)

Most common. Uses previous high, low, close.

### Woodie

Gives more weight to close price.

### Camarilla

Tighter levels. Uses H/L range:

```
Pivot = (High + Low + Close + Close) / 4
R1 = Close + (High - Low) × 1.1/12
S1 = Close - (High - Low) × 1.1/12
```

### Fibonacci

Uses Fibonacci ratios with classic pivot:

```
R1 = P + (High - Low) × 0.382
S1 = P - (High - Low) × 0.382
```

---

## How to Use Pivot Points

### 1. Key Levels

- **R1, S1:** Primary levels
- **R2, S2:** Secondary levels
- **R3, S3:** Extreme levels

### 2. Bounce Trading

- Price approaches S1 → Potential long
- Price approaches R1 → Potential short

### 3. Breakout Trading

- Break above R1 → Potential continuation
- Break below S1 → Potential continuation

### 4. Range Trading

- Sell at R1, buy at S1
- Exit at opposite level

---

## When to Use Pivot Points

### Use when:
- Trading ranges
- Need objective levels
- Day trading

### Don't use when:
- Strong trending market
- Needing direction
- Wide stops

---

## Daily Pivot Trading

### Morning Setup

1. Calculate pivots from previous day
2. Watch price vs pivot level
3. At R1/S1 → Watch for reaction
4. Break → Trade in breakout direction

### Session Levels

| Price Action | Implication |
|-------------|------------|
| Above pivot | Bullish |
| Below pivot | Bearish |
| Breaking R1 | Strong bullish |
| Breaking S1 | Strong bearish |

---

## Common Mistakes

### 1. Using Alone

**Mistake:** Trading pivots without price action.

**Result:** False breaks.

**Fix:** Confirm with price action.

---

### 2. Wrong Pivot Type

**Mistake:** Using classic for breakout trading.

**Result:** Levels too wide.

**Fix:** Use Camarilla for tighter ranges.

---

### 3. Ignoring Daily Close

**Mistake:** Using intraday pivots for direction.

**Result:** No context.

**Fix:** Use daily pivots for daily bias.

---

# Key Takeaways

1. **Calculated levels** — Based on H/L/C
2. **Support/resistance** — Market-generated levels
3. **Multiple types** — Classic, Woodie, Camarilla
4. **Day trading** — Best for intraday
5. **Confirm first** — Don't trade alone

---

# Related

>>> [charting-tools.md](./charting-tools.md) >>>

>>> [indicators.md](./indicators.md) >>>

>>> [strategies/range-trading.md](../05-strategies/range-trading.md) >>>

*Pivots show key levels. Confirm with price.*
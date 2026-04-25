---
title: "Position Sizing"
tags:
  - risk
  - position-sizing
  - sizing
  - lots
---

# Position Sizing

Position sizing determines how much to trade. Size correctly, and a losing trade won't hurt. Size wrong, and a single loss can blow your account.

---

## Position Sizing Formula

### Step 1: Calculate Risk Amount

```
Risk Amount = Account × Risk %

Example:
Account: $10,000
Risk per trade: 2%

Risk Amount = $10,000 × 0.02 = $200
```

---

### Step 2: Calculate Stop in Pips

```
Stop Pips = Stop Price - Entry Price

Example:
Entry: 1.1000
Stop: 1.0950
Stop Pips: 50 pips
```

---

### Step 3: Calculate Position Size

```
Position Size = Risk Amount ÷ Stop Pips ÷ Pip Value

Example:
Risk Amount: $200
Stop Pips: 50
Pip Value: $10/pip

Position = $200 ÷ 50 ÷ $10 = 0.4 lots
```

---

## Lot Size Reference

### Standard Lots (Forex)

| Lot | Units | Value per Pip |
|-----|-------|---------------|
| 0.01 lot | 1,000 | $0.10 |
| 0.1 lot | 10,000 | $1.00 |
| 1.0 lot | 100,000 | $10.00 |
| 10 lots | 1,000,000 | $100.00 |

---

## Position Sizing Tables

### With 2% Risk

| Account | 20 pips | 50 pips | 100 pips |
|---------|---------|---------|----------|
| $1,000 | 1.0 lot | 0.4 lot | 0.2 lot |
| $5,000 | 5.0 lots | 2.0 lots | 1.0 lot |
| $10,000 | 10.0 lots | 4.0 lots | 2.0 lots |
| $25,000 | 25.0 lots | 10.0 lots | 5.0 lots |
| $50,000 | 50.0 lots | 20.0 lots | 10.0 lots |

### With 1% Risk

| Account | 20 pips | 50 pips | 100 pips |
|---------|---------|---------|----------|
| $1,000 | 0.5 lot | 0.2 lot | 0.1 lot |
| $5,000 | 2.5 lots | 1.0 lot | 0.5 lot |
| $10,000 | 5.0 lots | 2.0 lots | 1.0 lot |
| $25,000 | 12.5 lots | 5.0 lots | 2.5 lots |
| $50,000 | 25.0 lots | 10.0 lots | 5.0 lots |

---

## Position Sizing by Strategy

| Strategy | Risk % | Typical Stop |
|-----------|--------|--------------|
| Scalping | 0.25% | 5-10 pips |
| Day Trading | 0.5% | 20-30 pips |
| Swing Trading | 1-2% | 50-100 pips |
| Position Trading | 2-3% | 100+ pips |

---

## Common Mistakes

### 1. Fixed Lot Size

**Problem:** Same size every trade.

**Result:** Variable risk.

**Fix:** Calculate each trade.

---

### 2. Ignoring Volatility

**Problem:** Same stop in high/low volatility.

**Result:** Over or under risk.

**Fix:** Adjust position size to volatility (ATR).

---

### 3. Rounding

**Problem:** Rounding up position.

**Result:** Exceeding risk.

**Fix:** Round down.

---

## Quick Reference

```
Position Size = Account × Risk% ÷ Stop Pips ÷ Pip Value

$10,000 × 2% ÷ 50 ÷ $10 = 0.4 lots
       ↓        ↓
     $200    $10/pip
```

# Key Takeaways

1. **Calculate each trade** — Every trade gets sized
2. **Maximum 2%** — Never risk more
3. **Match to volatility** — Wider stop = smaller size
4. **Round down** — Never exceed risk
5. **Formula above** — Use it

---

# Related

>>> [risk-per-trade.md](./risk-per-trade.md) >>>

>>> [stop-loss.md](./stop-loss.md) >>>

>>> [daily-limits.md](./daily-limits.md) >>>

*Size correctly. Trade safely.*
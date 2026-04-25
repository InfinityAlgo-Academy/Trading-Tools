---
title: "RSI - Relative Strength Index"
tags:
  - tools
  - indicators
  - rsi
  - momentum
---

# RSI (Relative Strength Index)

RSI is a momentum oscillator measuring the speed and change of price movements. It ranges from 0-100.

**Created by:** J. Welles Wilder

---

## How RSI Works

### Formula

```
RSI = 100 - (100 / (1 + RS))
RS = Average Gain / Average Loss
```

- **RSI > 70** = Overbought (potential reversal)
- **RSI < 30** = Oversold (potential bounce)
- **RSI = 50** = Neutral

---

## Settings

| Setting | Default | Use |
|---------|---------|-----|
| Period | 14 | Standard |
| Overbought | 70 | Common |
| Oversold | 30 | Common |

**Lower period (9):** More sensitive, more signals
**Higher period (21):** Less sensitive, fewer signals

---

## How to Use RSI

### 1. Overbought/Oversold

**Traditional use:**
- RSI > 70 → Consider shorting
- RSI < 30 → Consider buying

**Problem in trends:** Strong trends stay overbought/oversold forextended periods.

---

### 2. Divergences

**Bullish divergence:** Price makes lower low, RSI makes higher low → Potential reversal up

**Bearish divergence:** Price makes higher high, RSI makes lower high → Potential reversal down

```
Price:      RSI:
    ↓          ↗ (higher low)
   low        low
```

---

### 3. RSI MA Crossover

RSI crossing its moving average:
- RSI crosses above MA → Buy
- RSI crosses below MA → Sell

---

### 4. Trend Confirmation

- **Uptrend:** RSI stays above 40-50
- **Downtrend:** RSI stays below 40-50

---

## When to Use RSI

### Use when:
- Market is ranging (not strongly trending)
- Looking for reversal zones
- Searching for divergences

### Don't use when:
- Strong trending (stays overbought/oversold)
- Choppy market (false signals)
- Primary entry signal alone

---

## RSI Trading Strategies

### Strategy 1: Range Bounce

1. Identify ranging market
2. Wait for RSI < 30 (oversold)
3. Price bounces off support
4. Entry: On bounce confirmation
5. Stop: Below support
6. Target: Previous resistance

---

### Strategy 2: Divergence Reversal

1. Find divergence (price vs RSI)
2. Wait for price to break trendline
3. Entry: On trendline break
4. Stop: Beyond divergence pivot

---

### Strategy 3: Trend Confirmation

1. Identify uptrend on price
2. Price at key support
3. RSI bouncing from 40-50
4. Entry: On price confirmation
5. Stop: Below recent low

---

## Common Mistakes

### 1. Trading RSI Alone

**Mistake:** Enter when RSI = 30 without price confirmation.

**Result:** Price keeps falling.

**Fix:** Wait for price to bounce before entering.

---

### 2. Ignoring Trend Context

**Mistake:** Shorting at RSI = 70 in uptrend.

**Result:** Fighting the trend.

**Fix:** Use RSI with trend direction.

---

### 3. Wrong Period Setting

**Mistake:** Using period 14 on 5-minute chart.

**Result:** Too many false signals.

**Fix:** Adjust period to timeframe.

---

## RSI Settings by Timeframe

| Timeframe | Recommended Period |
|-----------|----------------|
| Daily | 14 |
| 4-Hour | 14 |
| 1-Hour | 14 |
| 15-Minute | 9-10 |
| 5-Minute | 7-9 |

---

# Key Takeaways

1. **Momentum oscillator** — Measures speed of movement
2. **70/30 levels** — Traditional overbought/oversold
3. **Divergences** — Find potential reversals
4. **Use in context** — Don't trade alone
5. **Adjust period** — Match to timeframe

---

# Related

>>> [macd.md](./macd.md) >>>

>>> [indicators.md](./indicators.md) >>>

>>> [strategies/mean-reversion.md](../05-strategies/mean-reversion.md) >>>

*RSI shows momentum. Confirm with price.*
---
title: "Volatility - Complete Guide"
tags:
  - foundations
  - volatility
  - atr
  - bollinger-bands
  - trading
description: "Master volatility - understand price movement, measure it, and use it to improve your trading."
slug: volatility
---

# Volatility: The Pulse of the Market

Volatility is the heartbeat of any market. It measures how much and how fast price moves. Understanding volatility is critical for:

- **Position sizing** — Adjust position based on volatility
- **Stop placement** — Stops must account for normal volatility
- **Target setting** — Higher volatility = larger targets
- **Market conditions** — Adapting to different environments

---

## What is Volatility?

### Simple Definition

Volatility = How much price moves over a given period.

```
Low Volatility          High Volatility
   ╱╲                    ╱╲╱╲
  ╱  ╲                  ╱      ╲
 ╱      ╲              ╱         ╲
Small range            Large range
```

### Why It Matters

| Factor | Impact |
|--------|--------|
| Position size | High volatility = smaller size |
| Stop loss | High volatility = wider stops |
| Target | High volatility = bigger targets |
| Strategy | Volatility affects viability |

---

## Volatility Indicators

### 1. ATR (Average True Range)

**Most popular volatility indicator.**

#### Formula
```
TR = True Range (Today's H - Today's L, or Today's H - Yesterday's C)
ATR = Average of TR over N periods (typically 14)
```

#### How to Use
```
ATR = 50 pips (for example)
My stop: 50-100 pips (1-2 ATR)
My target: 100-150 pips (2-3 ATR)
```

#### ATR Table

| Currency Pair | Low ATR | Medium ATR | High ATR |
|--------------|--------|------------|--------|
| EUR/USD | 30-50 | 50-80 | 80-120 |
| GBP/USD | 40-60 | 60-100 | 100-150 |
| USD/JPY | 30-50 | 50-70 | 70-100 |
| BTC/USD | 100-200 | 200-400 | 400+ |

---

### 2. Bollinger Bands

**Visual volatility indicator.**

```
Upper Band (+2 SD)
─────────────
    Price
─────────────  Middle Band (SMA)
    Price
─────────────
Lower Band (-2 SD)
```

#### How to Use

| Condition | Meaning |
|-----------|--------|
| Bands wide | High volatility |
| Bands narrow | Low volatility (potential breakout) |
| Price at upper band | Overbought |
| Price at lower band | Oversold |

---

### 3. Average True Range Percent (ATRP)

**Normalizes ATR to percentage for comparison.**

```
ATRP% = (ATR / Close Price) × 100

Example:
ATR = 50 pips
Price = 1.1000
ATRP% = (50 / 1.1000) × 100 = 4.5%
```

---

### 4. Standard Deviation

**Measures price distribution.**

- Low SD = Most price within narrow range
- High SD = Wide price distribution

---

## Volatility Regimes

### Low Volatility

**Characteristics:**
- Small candlesticks
- Narrow ranges
- Consolidation
- False breakouts

**Trading implications:**
- Smaller stops possible
- Wait for confirmed breakouts
- Lower target expectations

---

### High Volatility

**Characteristics:**
- Large candlesticks
- Wide ranges
- Strong trends
- Real breakouts

**Trading implications:**
- Wider stops needed
- Better breakouts
- Larger target potential

---

### Volatility Cycles

```
Volatility
     │     High      High
     │      ╱╲      ╱╲
     │     ╱  ╲    ╱  ╲
     │    ╱    ╲  ╱    ╲
     │   ╱      ╲╱      ╲
     │  ╱        ╱        ╲
     │ ╱        ╱          ╲
     └──────────────────────────��─
       Contracting → Expanding → Contracting
```

**Pattern:**
1. **Contraction** — Low volatility, consolidation
2. **Expansion** — Breakout, strong move
3. **Distribution** — High volatility, ending move
4. **Repeat** — New cycle

---

## Volatility and Risk Management

### Position Sizing Formula

```
Position Size = Risk Amount ÷ ( ATR × Multiplier )

Example:
Account: $10,000
Risk: 2% = $200
ATR: 50 pips
Multiplier: 2
Position = $200 ÷ (50 × 2) = 2 lots
```

### Stop Placement

**Rule:** Stop must be > 1.5 × ATR beyond entry.

```
Entry: 1.1000
ATR: 50 pips
Minimum stop: 1.1000 - (50 × 1.5) = 1.0925
Smart stop: 1.0925 - extra buffer
```

### Target Placement

**Rule:** Target should be > 2:1 from entry to stop.

```
Stop: 50 pips
Target minimum: 100 pips (2:1)
With high volatility: Target can be 150-200 pips
```

---

## Volatility-Based Strategies

### 1. Volatility Breakout

```
Setup:
- ATR > 20-day average
- Price breaks consolidation
- Volumeconfirm

Entry: On breakout
Stop: Below consolidation
Target: 2× ATR
```

### 2. Volatility Contraction

```
Setup:
- ATR < 20-day average
- Narrow range
- Squeeze forming

Entry: On breakout
Stop: Opposite side of range
Target: ATR × 2
```

### 3. ATR Trailing Stop

```
Move stop to:
- New high - ATR × 1.5 (long)
- New low + ATR × 1.5 (short)
```

---

## Best Volatility Settings by Market

| Market | ATR Period | Multiplier |
|--------|------------|-----------|
| Forex majors | 14 | 1.5-2.0 |
| Forex crosses | 20 | 2.0-2.5 |
| Indices | 20 | 1.5-2.0 |
| Crypto | 7 | 2.0-3.0 |
| Stocks | 20 | 2.0-2.5 |

---

## Common Mistakes

### 1. Ignoring Volatility

**Problem:** Using fixed stops regardless of conditions.

**Result:** Stops hit in normal volatility.

**Fix:** Size stops based on ATR.

---

### 2. Too Large in High Volatility

**Problem:** Taking large positions when volatility is high.

**Result:** Account blow-up.

**Fix:** Reduce size when ATR is high.

---

### 3. Wrong Expectations

**Problem:** Same targets in high/volatility markets.

**Result:** Missing potential.

**Fix:** Adjust targets to volatility.

---

### 4. Trading Breakouts in Low Volatility

**Problem:** Expecting big moves in quiet markets.

**Result:** False breakouts.

**Fix:** Wait for volatility expansion.

---

## Practical Checklist

```
☐ Check ATR before trade
☐ Size stop based on volatility
☐ Set target at 2× minimum
☐ Reduce size in high volatility
☐ Trail stop using ATR
```

---

## Related Topics

- [[foundations/Market-Structure]] — Understand trends
- [[foundations/Liquidity]] — Order flow
- [[risk-management/Stop-Loss]] — Protect capital
- [[tools/Backtesting]] — Test strategies

---

*Trade volatility, not just price.*
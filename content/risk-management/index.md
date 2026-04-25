---
title: "Risk Management"
tags:
  - risk-management
  - trading
  - position-sizing
  - capital
---

# Risk Management

Risk management is the difference between surviving and blowing up your account.

This hub covers every risk principle — from position sizing to drawdown limits. Master this, and you'll survive long enough to profit.

---

# Core Concepts

## [[position-sizing|Position Sizing]]

How much to risk per trade.

>>> [position-sizing.md](./position-sizing.md) >>>

---

## [[risk-per-trade|Risk Per Trade]]

How much capital to risk per trade.

>>> [risk-per-trade.md](./risk-per-trade.md) >>>

---

## [[risk-reward-ratio|Risk/Reward Ratio]]

Potential profit vs potential loss.

>>> [risk-reward-ratio.md](./risk-reward-ratio.md) >>>

---

## [[stop-loss|Stop Loss]]

Automatic loss limits.

>>> [stop-loss.md](./stop-loss.md) >>>

---

## [[drawdown|Drawdown]]

Managing losing streaks.

>>> [drawdown.md](./drawdown.md) >>>

---

## [[daily-limits|Daily Limits]]

Intraday risk caps.

>>> [daily-limits.md](./daily-limits.md) >>>

---

## [[correlation|Correlation]]

Portfolio risk.

>>> [correlation.md](./correlation.md) >>>

---

# Mathematical Foundation

## Position Sizing Formula

```
Position Size = Risk Amount ÷ Stop in Pips ÷ Pip Value

Example:
Risk: $100
Stop: 50 pips
Pip Value: $10/pip

Position = $100 ÷ 50 ÷ $10 = 0.2 lots
```

---

## Risk Per Trade Formula

```
Risk % = Risk Amount ÷ Account Balance × 100

Example:
Account: $10,000
Risk: $100
Risk % = $100 ÷ $10,000 × 100 = 1%
```

---

## Risk/Reward Formula

```
R:R Ratio = Target Profit ÷ Risk Amount

Example:
Entry: 1.1000
Stop: 1.0950 (50 pip risk)
Target: 1.1100 (100 pip reward)

R:R = 100 ÷ 50 = 2:1
```

---

## Kelly Criterion Formula

```
f* = (bp - q) ÷ b

Where:
f* = fraction to bet
b = odds received (reward/risk)
p = winning probability
q = losing probability (1 - p)

Example:
Win rate: 50%
Average reward: 2:1
b = 2
p = 0.50
q = 0.50

f* = (2 × 0.50 - 0.50) ÷ 2 = 0.25 or 25%
```

---

## Drawdown Recovery Formula

```
Recovery % = -Loss %

Example:
Account: $10,000 → $8,000 (-20%)
Recovery needed: ($2,000 ÷ $8,000) × 100 = 25%

Current $8,000 needs 25% return to reach $10,000
```

---

# Risk Tables

## Account Risk Table

| Account | Risk 1% | Risk 2% | Max Daily |
|---------|---------|---------|-----------|
| $1,000 | $10 | $20 | $50 |
| $5,000 | $50 | $100 | $250 |
| $10,000 | $100 | $200 | $500 |
| $25,000 | $250 | $500 | $1,250 |
| $50,000 | $500 | $1,000 | $2,500 |
| $100,000 | $1,000 | $2,000 | $5,000 |

---

## Position Size Table (Forex)

| Account | Stop 20pips | Stop 50pips | Stop 100pips |
|---------|------------|------------|--------------|
| $1,000 | 0.5 lot | 0.2 lot | 0.1 lot |
| $5,000 | 2.5 lots | 1.0 lot | 0.5 lot |
| $10,000 | 5.0 lots | 2.0 lots | 1.0 lot |
| $25,000 | 12.5 lots | 5.0 lots | 2.5 lots |

---

## Drawdown Limits Table

| Drawdown | Action |
|----------|--------|
| 5% | Normal |
| 10% | Reduce size 50% |
| 15% | Stop trading |
| 20% | Review system |

---

## Risk/Reward Requirements

| Win Rate | Min R:R Needed |
|---------|----------------|
| 70% | 0.43 |
| 60% | 0.67 |
| 50% | 1.00 |
| 40% | 1.50 |
| 30% | 2.33 |

---

# Risk Integration

## Risk → Strategy

### Scalping

- Risk: 0.25-0.5% per trade
- Stop: Tight (5-10 pips)
- High frequency

### Day Trading

- Risk: 0.5-1% per trade
- Stop: 20-50 pips
- Intraday

### Swing Trading

- Risk: 1-2% per trade
- Stop: 50-100 pips
- Multi-day

### Position Trading

- Risk: 2-3% per trade
- Stop: 100+ pips
- Weeks

---

## Risk → Psychology

| Risk Level | Psychological Effect |
|------------|---------------------|
| 1% | Comfortable |
| 2% | Normal |
| 5% | Anxiety |
| 10% | Fear |

**Rule:** Stay below 2% for psychological comfort.

---

## Risk → Capital Growth

| Monthly Return | 10% loss monthly |
|-----------------|------------------|
| 5% | 1.5 months to recover |
| 10% | 2.5 months to recover |
| 20% | 6+ months to recover |

**Key:** Smaller losses = faster recovery.

---

# Common Mistakes

## 1. No Stop Loss

**Problem:** Hope instead of stop.

**Result:** Blow account.

**Fix:** Always use stops.

---

## 2. Over-Risking

**Problem:** Too big per trade.

**Result:** Psychology breaks.

**Fix:** Start at 1%, max 2%.

---

## 3. Moving Stops

**Problem:** Moving stop to avoid loss.

**Result:** Larger loss.

**Fix:** Set and forget.

---

## 4. Ignoring Correlation

**Problem:** All positions in correlated assets.

**Result:** Not diversified.

**Fix:** Check correlation.

---

## 5. No Daily Limit

**Problem:** Chase losses.

**Result:** Blow account.

**Fix:** Set daily max.

---

# Internal Links

Navigate risk:

- [[position-sizing]] — Sizing
- [[risk-per-trade]] — Risk per trade
- [[risk-reward-ratio]] — R:R ratio
- [[stop-loss]] — Stops
- [[drawdown]] — Drawdown
- [[daily-limits]] — Daily caps

Connect to:

- [[strategies]] — Strategy application
- [[psychology]] — Psychology
- [[05-strategies/Strategy-Development]] — System building

---

# Your Next Step

Start with:

>>> [position-sizing.md](./position-sizing.md) >>> (first priority)

>>> [risk-per-trade.md](./risk-per-trade.md) >>> (define amounts)

>>> [stop-loss.md](./stop-loss.md) >>> (protect capital)

---

*Risk management = trading survival.*
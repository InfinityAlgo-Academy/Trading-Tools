---
title: "Backtesting"
tags:
  - practice
  - backtesting
  - testing
  - historical
---

# Backtesting

Test your strategy on historical data before risking real money.

---

## Backtesting Process

### Step 1: Define Rules

```
Write clear rules:
- Entry condition
- Exit condition
- Stop location
- Position sizing
```

### Step 2: Choose Period

```
Minimum:
- 1+ year of data
- 100+ trades

Avoid:
- Only recent data
```

### Step 3: Execute Tests

```
Method 1: Manual
- Scroll charts
- Apply rules
- Record trades

Method 2: Automated
- Code strategy
- Run backtest
- Get metrics
```

### Step 4: Analyze Results

```
Metrics to track:
- Win rate
- Profit factor
- Max drawdown
- Average trade
```

---

## Backtesting Metrics

### Primary Metrics

| Metric | What to Calculate | Target |
|--------|-------------------|--------|
| Win Rate | Wins ÷ Total trades | >40% |
| Profit Factor | Gross profit ÷ Gross loss | >1.5 |
| Max Drawdown | Peak to trough | <20% |
| Expectancy | Avg win × Win% - Avg loss × Loss% | >0 |

### Secondary Metrics

| Metric | What to Calculate |
|--------|----------------|
| Avg Winner | Average win size |
| Avg Loser | Average loss size |
| Avg Bars | Holding time |
| Max Winners | Consecutive wins |
| Max Losers | Consecutive losses |

---

## Backtesting Mistakes

### 1. Over-Fitting

**Problem:** Curve-fit to historical data.

**Solution:**
- Save 20% for out-of-sample
- Use realistic parameters

### 2. Ignoring Costs

**Problem:** No spread/commission.

**Solution:**
- Include costs in results

### 3. Survivorship Bias

**Problem:** Only testing survivors.

**Solution:**
- Include delisted stocks

### 4. No Walk-Forward

**Problem:** Optimizing on all data.

**Solution:**
- Walk-forward testing

---

## Backtesting Checklist

```
☐Rules written
☐Period defined
☐Data reliable
☐Costs included
☐Metrics calculated
☐Out-of-sample done
☐Results acceptable
```

---

# Key Takeaways

1. **Test before trade** — Validate strategy
2. **Save data** — For out-of-sample
3. **Include costs** — Spread, commission
4. **Metrics matter** — Win rate, PF, DD
5. **Forward test** — After backtesting

---

# Related

>>> [demo-trading.md](./demo-trading.md) >>>

>>> [trade-setups.md](./trade-setups.md) >>>

>>> [exercises.md](./exercises.md) >>>

*Backtest to validate. Forward test to confirm.*
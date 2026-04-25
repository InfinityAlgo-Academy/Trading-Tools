---
title: "Backtesting"
tags:
  - tools
  - backtesting
  - testing
  - strategy
---

# Backtesting

Backtesting proves your strategy works on historical data before risking real money.

**Key point:** Past performance ≠ future results. But if it fails backtesting, it'll fail trading.

---

## Backtesting Methods

### 1. Manual Backtesting

You review charts and simulate trades.

**Tools:**
- TradingView replay mode
- Chart scrolling

**Pros:**
- No setup required
- Teaches chart reading
- Good for beginners

**Cons:**
- Time consuming
- Subjective

---

### 2. Semi-Automated

Use tools to test indicators, execute manually.

**Tools:**
- TradingView strategy tester
- Excel/Google Sheets

**Pros:**
- Faster than manual
- Still involves decisions

**Cons:**
- Limited optimization

---

### 3. Fully Automated

Code your strategy and test automatically.

**Tools:**
- TradingView Pine Script
- Python (Backtrader, Zipline)
- MetaTrader strategy tester

**Pros:**
- Test thousands of trades
- Optimize parameters
- Out-of-sample testing

**Cons:**
- Requires coding
- Curve-fit risk

---

## Backtesting Metrics

### Core Metrics

| Metric | What It Shows | Target |
|--------|--------------|--------|
| Total Return | Overall profit | >0% |
| Sharpe Ratio | Risk-adjusted return | >1 |
| Max Drawdown | Largest peak-to-trough | <20% |
| Win Rate | % profitable trades | Varies |
| Profit Factor | Gross profit / gross loss | >1.5 |
| Expectancy | Average trade result | >0 |

---

### Win Rate vs Profit Factor

| Win Rate | Profit Factor Needed |
|---------|---------------------|
| 70% | 0.86 |
| 60% | 1.00 |
| 50% | 1.33 |
| 40% | 2.00 |
| 30% | 3.33 |

**Key insight:** Low win rate requires high profit factor.

---

### Sample Size

| Timeframe | Minimum Trades |
|----------|---------------|
| Day trading | 100+ |
| Swing trading | 50+ |
| Position trading | 30+ |

**Rule:** More trades = more confidence.

---

## Backtesting Process

### Step 1: Define Rules

Write clear, objective rules:
- Entry condition
- Exit condition
- Position sizing
- Risk rules

---

### Step 2: Test on Data

Choose your method:
- Manual chart review
- Strategy tester
- Code and test

---

### Step 3: Analyze Results

Review metrics:
- Total return
- Drawdown
- Win rate
- Profit factor

---

### Step 4: Optimize (Carefully)

Adjust parameters:
- Test different inputs
- Avoid over-optimization
- Use out-of-sample data

---

### Step 5: Forward Test

Live demo trading:
- Test in real-time
- Verify execution
- Track performance

---

## Common Mistakes

### 1. No Out-of-Sample Testing

**Problem:** Optimize on all data.

**Result:** Curve fitting.

**Fix:** Save 20% data for out-of-sample testing.

---

### 2. Ignoring.Transaction Costs

**Problem:** Not accounting for spreads/commissions.

**Result:** Unrealistic returns.

**Fix:** Include costs in backtest.

---

### 3. Curve Fitting

**Problem:** Optimizing to perfect past results.

**Result:** Fails in live trading.

**Fix:** Use robust parameters.

---

### 4. Survivorship Bias

**Problem:** Only testing stocks that survived.

**Result:** Unrealistic returns.

**Fix:** Include delisted stocks.

---

### 5. Over-Relying on Backtests

**Problem:** Thinking backtest = guaranteed profit.

**Result:** Shock when live trading fails.

**Fix:** Forward test before real money.

---

## Backtesting Tools

| Tool | Best For | Cost |
|------|----------|------|
| TradingView | Manual/semi | Free |
| Backtrader | Python backtest | Free |
| QuantConnect | Quant strategies | Free |
| MetaTrader | Forex backtest | Free |
| Zipline | Quant investing | Free |

---

# Key Takeaways

1. **Backtest before trading real**
2. **Use out-of-sample data**
3. **Include costs**
4. **Minimum sample size**
5. **Forward test after backtest**

---

# Related

>>> [automation.md](./automation.md) >>>

>>> [platforms.md](./platforms.md) >>>

>>> [05-strategies/Strategy-Development.md](../05-strategies/Strategy-Development.md) >>>

*Backtest proves it works. Forward test confirms.*
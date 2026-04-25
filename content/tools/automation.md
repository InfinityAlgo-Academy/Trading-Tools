---
title: "Automation"
tags:
  - tools
  - automation
  - bots
  - algorithmic-trading
---

# Automation

Automation removes emotion and executes trades based on rules. It scales your strategy.

---

## Automation Methods

### 1. TradingView Pine Script

**Best for:** Creating custom indicators and strategies on TradingView.

| Feature | Value |
|---------|-------|
| Language | Pine Script |
| Market | All (via TV) |
| Execution | Alerts only* |

*Can connect to brokers via webhooks.

---

### 2. MetaTrader EA

**Best for:** Automated forex trading on MT4/MT5.

| Feature | Value |
|---------|-------|
| Language | MQL4/MQL5 |
| Market | Forex, CFDs |
| Execution | Direct |

---

### 3. Python + API

**Best for:** Custom bots with full control.

| Feature | Value |
|---------|-------|
| Language | Python |
| Market | Varies by API |
| Execution | Via broker API |

---

### 4. NinjaTrader

**Best for:** Futures automation.

| Feature | Value |
|---------|-------|
| Language | C# |
| Market | Futures |
| Execution | Direct |

---

## Automation Setup

### Level 1: Alerts

1. Create indicator/strategy
2. Set alert conditions
3. Get notification
4. Execute manually

**Good for:** Testing ideas before full automation.

---

### Level 2: Semi-Automatic

1. Indicator generates signal
2. Alert triggers
3. Order placed automatically
4. You manage position

**Good for:** Reducing manual entry.

---

### Level 3: Full Automation

1. Strategy runs automatically
2. Entry executes
3. Position managed automatically
4. Exit executes

**Good for:** Scaling without emotion.

---

## When to Automate

### Good candidates:
- Rule-based strategies
- High frequency
- Multiple instruments
- Removes emotion

### Bad candidates:
- Subjective strategies
- News trading
- One-off setups

---

## Common Mistakes

### 1. Automating Bad Strategy

**Problem:** Automating a strategy that doesn't work.

**Result:** Faster losses.

**Fix:** Manual trade first. Verify.

---

### 2. No Fail-safes

**Problem:** No kill switch.

**Result:** Flash crashes.

**Fix:** Add circuit breakers.

---

### 3. Over-optimization

**Problem:** Curve-fitted strategies.

**Result:** Fails in live trading.

**Fix:** Use out-of-sample testing.

---

# Key Takeaways

1. **Test before automating**
2. **Start with alerts**
3. **Add kill switches**
4. **Watch for slippage**
5. **Python for flexibility**

---

# Related

>>> [backtesting.md](./backtesting.md) >>>

>>> [platforms.md](./platforms.md) >>>

>>> [charting-tools.md](./charting-tools.md) >>>

*Automate rules, not emotions.*
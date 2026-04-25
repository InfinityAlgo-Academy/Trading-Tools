---
title: "Algorithmic Trading"
tags:
  - advanced
  - algorithmic
  - automation
  - bots
  - ea
---

# Algorithmic Trading

Algorithmic trading removes emotion from execution. Automate your strategy and remove the human error.

---

## What Is Algorithmic Trading?

```
Manual trading: Human analyzes → Human executes
Algorithmic: Strategy rules → Auto executes
```

**Advantages:**
- No emotion
- Consistent execution
- Scale without stress
- 24/7 operation

---

## Algo Types

### 1. Execution Algorithms

**Purpose:** Enter/exit at optimal price

| Algorithm | Use |
|-----------|-----|
| TWAP | Time-weighted average |
| VWAP | Volume-weighted average |
| Execution | Minimize market impact |

### 2. Strategy Algorithms

**Purpose:** Execute strategy automatically

| Algorithm | Use |
|-----------|-----|
| Trend following | Follow trend automatically |
| Mean reversion | Reversion to mean |
| Breakout | Breakout automation |

### 3. High-Frequency (HFT)

**Purpose:** Ultra-fast execution

| Algorithm | Use |
|-----------|-----|
| Market making | Provide liquidity |
| Arbitrage | Price differences |

---

## Building an Algorithm

### Step 1: Define Rules

```
Entry: RSI < 30
Exit: RSI > 70 or 2% stop
Timeframe: Daily
```

### Step 2: Write Code

```python
if rsi < 30:
    enter_long()
elif rsi > 70:
    exit_long()
elif drawdown > 2:
    close_all()
```

### Step 3: Backtest

```
Test on 1+ year data
Check metrics
Adjust parameters
```

### Step 4: Forward Test

```
Demo trading
Real-time monitoring
Adjust if needed
```

### Step 5: Go Live

```
Small capital first
Scale up gradually
Always monitor
```

---

## Algo Building Platforms

### For Beginners

| Platform | Language | Use |
|----------|---------|-----|
| TradingView | Pine Script | Simple strategies |
| MetaTrader | MQL4/5 | Forex EAs |

### For Advanced

| Platform | Language | Use |
|----------|---------|-----|
| Python | Python | Custom everything |
| NinjaTrader | C# | Futures |
| QuantConnect | C#/Python | Quant strategies |

---

## Algo Risk Management

### 1. Kill Switch

```
if daily_loss > 5%:
    stop_algo()
```

### 2. Circuit Breaker

```
if drawdown > 10%:
    pause()
    notify()
```

### 3. Position Limits

```
max_position_size = 0.1 * capital
```

### 4. Time-Based Stop

```
if no_trade > 4_hours:
    end_session()
```

---

## Common Algo Mistakes

### 1. Over-Fitting

**Problem:** Curve-fitted to past data.

**Solution:** Out-of-sample testing.

---

### 2. No Kill Switch

**Problem:** Algo runs wild.

**Solution:** Always add kill switch.

---

### 3. Execution Slippage

**Problem:** Live fills worse than backtest.

**Solution:** Account for slippage.

---

# Key Takeaways

1. **Automate execution** — Remove emotion
2. **Backtest first** — Verify strategy
3. **Kill switches** — Always add
4. **Slippage** — Account for it
5. **Monitor always** — Never fully hands-off

---

# Related

>>> [order-flow.md](./order-flow.md) >>>

>>> [smc.md](../05-strategies/smc.md) >>>

>>> [market-structure.md](./market-structure.md) >>>

*Automate the process. Trade the edge.*
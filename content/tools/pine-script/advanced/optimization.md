---
title: "Optimization in Pine Script"
description: "Learn to optimize trading strategies in Pine Script. Parameter optimization, best practices, and avoiding overfitting."
tags: [pine-script, advanced, optimization, performance]
slug: pinescript-advanced-optimization
---

# Optimization in Pine Script

Strategy optimization helps find the best parameters for your trading strategies. This guide covers optimization techniques and avoiding common pitfalls.

---

## Why Optimize?

| Benefit | Description |
|---------|-------------|
| Better performance | Find optimal parameters |
| Adaptability | Adjust to market conditions |
| Robustness | Create resilient strategies |
| Efficiency | Maximize risk-adjusted returns |

---

## Basic Optimization

### Enable Optimization

```pinescript
//@version=6
strategy("Optimize Strategy",
     overlay=true,
     optimize=true)  // Enable optimization

// Optimizable parameters
fastMA = input.int(12, "Fast MA", 5, 50, 1)
slowMA = input.int(26, "Slow MA", 10, 100, 5)
rsiLevel = input.int(30, "RSI Level", 20, 40, 5)

// Strategy logic
fast = ta.ema(close, fastMA)
slow = ta.ema(close, slowMA)

if ta.crossover(fast, slow)
    strategy.entry("Long", strategy.long)

if ta.crossunder(fast, slow)
    strategy.close("Long")

plot(fast)
plot(slow)
```

### Multiple Parameters

```pinescript
//@version=6
strategy("Multi Optimize",
     overlay=true,
     optimize=true)

// MA Parameters
maType = input.string("EMA", "MA Type", options=["SMA", "EMA", "WMA"])
maLength = input.int(20, "MA Length", 10, 100, 5)

// RSI Parameters
rsiLength = input.int(14, "RSI", 7, 21, 1)
rsiOS = input.int(30, "Oversold", 20, 40, 5)
rsiOB = input.int(70, "Overbought", 60, 80, 5)

// ATR Parameters
atrLength = input.int(14, "ATR", 7, 28, 1)
atrMult = input.float(2.0, "ATR Mult", 1.5, 3.0, 0.5)

// Strategy logic
ma = maType == "SMA" ? ta.sma(close, maLength) : ta.ema(close, maLength)
rsi = ta.rsi(close, rsiLength)
atr = ta.atr(atrLength)

longCondition = ta.crossover(close, ma) and rsi < rsiOS
shortCondition = ta.crossunder(close, ma) and rsi > rsiOB

if longCondition
    strategy.entry("Long", strategy.long)

if shortCondition
    strategy.entry("Short", strategy.short)

if ta.crossunder(close, ma)
    strategy.close_all()

plot(ma)
```

---

## Common Parameters to Optimize

### Moving Average Periods

```pinescript
//@version=6
strategy("MA Optimizer",
     overlay=true,
     optimize=true)

fastLength = input.int(10, "Fast", 5, 30, 1)
medLength = input.int(30, "Medium", 20, 60, 5)
slowLength = input.int(100, "Slow", 50, 200, 10)

fastMA = ta.ema(close, fastLength)
medMA = ta.ema(close, medLength)
slowMA = ta.ema(close, slowLength)

if ta.crossover(medMA, slowMA) and close > fastMA
    strategy.entry("Long", strategy.long)

if ta.crossunder(medMA, slowMA)
    strategy.close_all()

plot(fastMA)
plot(medMA)
plot(slowMA)
```

### RSI Parameters

```pinescript
//@version=6
strategy("RSI Optimizer",
     overlay=false,
     optimize=true)

rsiLen = input.int(14, "Length", 7, 28, 1)
oversold = input.int(30, "Oversold", 20, 40, 5)
overbought = input.int(70, "Overbought", 60, 80, 5)

rsi = ta.rsi(close, rsiLen)

if ta.crossover(rsi, oversold)
    strategy.entry("Long", strategy.long)

if ta.crossunder(rsi, overbought)
    strategy.close_all()

plot(rsi)
hline(overbought)
hline(oversold)
```

### Stop Loss / Take Profit

```pinescript
//@version=6
strategy("SL/TP Optimizer",
     overlay=true,
     optimize=true)

atrLength = input.int(14, "ATR")
slMultiplier = input.float(2.0, "SL ATR", 1.0, 4.0, 0.5)
tpMultiplier = input.float(3.0, "TP ATR", 1.0, 6.0, 0.5)

atr = ta.atr(atrLength)

if ta.crossover(ta.ema(close, 12), ta.ema(close, 26))
    strategy.entry("Long", strategy.long)
    strategy.exit("SL/TP", "Long", 
         stop=close - atr * slMultiplier,
         limit=close + atr * tpMultiplier)

plot(ta.ema(close, 12))
plot(ta.ema(close, 26))
```

---

## Optimization Best Practices

### 1. Start Simple

```pinescript
// GOOD: Few parameters
fastMA = input.int(12, "Fast")
slowMA = input.int(26, "Slow")

// BAD: Too many parameters
p1 = input(1)
p2 = input(2)
p3 = input(3)
p4 = input(4)
p5 = input(5)
p6 = input(6)
```

### 2. Use Realistic Ranges

```pinescript
// GOOD: Realistic ranges
fastMA = input.int(12, "Fast", 5, 30, 1)  // Common values

// BAD: Unrealistic ranges
fastMA = input.int(12, "Fast", 1, 500, 1)  // Too broad
```

### 3. Test Multiple Markets

```pinescript
// Test your optimized strategy on:
// - Different forex pairs
// - Different stocks
// - Different timeframes
// - Different market conditions
```

---

## Walk Forward Optimization

### Rolling Optimization

```pinescript
//@version=6
strategy("Walk Forward",
     overlay=true,
     optimize=true)

// Use recent data for optimization
lookback = 200
trainLength = 150
testLength = 50

// Example parameter
maLength = input.int(20, "MA", 10, 50, 5)

if bar_index > lookback
    ma = ta.sma(close, maLength)
    
    if ta.crossover(close, ma)
        strategy.entry("Long", strategy.long)
    
    if ta.crossunder(close, ma)
        strategy.close("Long")

plot(ta.sma(close, maLength))
```

---

## Metrics to Optimize

### Primary Metrics

| Metric | Target |
|--------|--------|
| Net Profit | High |
| Profit Factor | > 1.5 |
| Sharpe Ratio | > 1.0 |
| Max Drawdown | < 20% |
| Win Rate | > 40% |

### Secondary Metrics

| Metric | Target |
|--------|--------|
| Avg Trade | > 0 |
| Avg Win/Loss | > 1.5 |
| Recovery Factor | > 2.0 |
| Expectancy | > 0.5R |

---

## Avoiding Overfitting

### Signs of Overfitting

- Works perfectly on backtest
- Fails in live trading
- Many parameters
- Perfect curve fitting
- No out-of-sample testing

### Prevention

```pinescript
// GOOD: Simple, robust
maLength = input.int(20, "Length", 10, 50, 5)

// GOOD: Limited parameters
// 2-3 main parameters

// GOOD: Out-of-sample testing
// Reserve 20% of data for testing
```

---

## Robustness Testing

### Monte Carlo Analysis

```pinescript
// Run strategy multiple times with:
// - Different random entry times
// - Different slippage
// - Different commission
```

### Sensitivity Analysis

```pinescript
// Test parameter stability:
// If optimal is 20, test 15-25
// Strategy should perform similarly
```

### Market Conditions

```pinescript
// Test in:
// - Trending markets
// - Ranging markets
// - High volatility
// - Low volatility
// - News events
```

---

## Complete Optimizable Strategy

```pinescript
//@version=6
strategy("Complete Optimizable",
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10,
     optimize=true)

// === INPUTS ===
maFast = input.int(12, "Fast MA", 5, 30, 1)
maSlow = input.int(26, "Slow MA", 15, 60, 5)
rsiLen = input.int(14, "RSI", 7, 21, 1)
rsiOS = input.int(30, "RSI OS", 20, 40, 5)
rsiOB = input.int(70, "RSI OB", 60, 80, 5)
atrLen = input.int(14, "ATR")
slMult = input.float(2.0, "SL ATR", 1.0, 4.0, 0.5)
tpMult = input.float(3.0, "TP ATR", 1.0, 6.0, 0.5)

// === CALCULATIONS ===
maF = ta.ema(close, maFast)
maS = ta.ema(close, maSlow)
rsi = ta.rsi(close, rsiLen)
atr = ta.atr(atrLen)

// === SIGNALS ===
longSignal = ta.crossover(maF, maS) and rsi < rsiOS
shortSignal = ta.crossunder(maF, maS) and rsi > rsiOB

// === ENTRIES ===
if longSignal
    strategy.entry("Long", strategy.long)

if shortSignal
    strategy.entry("Short", strategy.short)

// === EXITS ===
if strategy.position_size > 0
    strategy.exit("Long Exit", "Long",
         stop=close - atr * slMult,
         limit=close + atr * tpMult)

if strategy.position_size < 0
    strategy.exit("Short Exit", "Short",
         stop=close + atr * slMult,
         limit=close - atr * tpMult)

// === PLOT ===
plot(maF, color=color.green)
plot(maS, color=color.red)
```

---

## Optimization Workflow

1. **Define hypothesis** - What should work?
2. **Start simple** - Few parameters
3. **Optimize** - Find best values
4. **Validate** - Test on out-of-sample
5. **Test robustness** - Different conditions
6. **Paper trade** - Live simulation
7. **Deploy** - Small capital
8. **Monitor** - Track performance

---

## Next Steps

- **[[tools/pine-script/strategies/backtesting]]** - Proper backtesting
- **[[tools/pine-script/strategies/stops]]** - Advanced stops
- Build and test your strategies

---

*Optimize wisely - avoid overfitting.*
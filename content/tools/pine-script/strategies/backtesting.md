---
title: "Backtesting Strategies in Pine Script"
description: "Learn how to properly backtest trading strategies in Pine Script. Understand metrics, optimization, common pitfalls, and best practices."
tags: [pine-script, strategy, backtesting, optimization]
slug: pinescript-strategies-backtesting
---

# Backtesting Strategies in Pine Script

Backtesting is essential for validating trading strategies. This guide covers everything from basic backtesting to advanced optimization.

---

## Why Backtesting Matters

| Metric | Importance |
|--------|------------|
| Win Rate | Know your success % |
| Profit Factor | Risk vs reward |
| Drawdown | Maximum risk |
| Sharpe Ratio | Risk-adjusted returns |
| expectancy | Average R per trade |

---

## Basic Backtest Setup

### Simple Strategy Backtest

```pinescript
//@version=6
strategy("Basic Backtest", 
     overlay=true, 
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Entry
if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Exit
if ta.crossunder(ta.sma(close, 20), ta.sma(close, 50))
    strategy.close("Long")

plot(ta.sma(close, 20))
plot(ta.sma(close, 50))
```

### Commission Settings

```pinescript
//@version=6
strategy("With Commission",
     commission_type=strategy.commission.percent,
     commission_value=0.1,  // 0.1% per trade
     slippage=3)  // 3 tick slippage

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

if ta.crossunder(ta.sma(close, 20), ta.sma(close, 50))
    strategy.close("Long")
```

---

## Backtest Parameters

### Date Range

```pinescript
//@version=6
strategy("Date Range Backtest",
     overlay=true,
     process_orders_on_close=true)

// Set date range
startDate = timestamp(2020, 1, 1, 0, 0)
endDate = timestamp(2023, 12, 31, 0, 0)

inDateRange = time >= startDate and time <= endDate

if inDateRange and ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

if inDateRange and ta.crossunder(ta.sma(close, 20), ta.sma(close, 50))
    strategy.close("Long")

plot(ta.sma(close, 20))
```

### Instrument Settings

```pinescript
//@version=6
strategy("Instrument Settings",
     overlay=true,
     currency="USD",
     initial_capital=10000,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
```

---

## Performance Metrics

### Custom Metrics

```pinescript
//@version=6
strategy("Metrics", overlay=true)

var int wins = 0
var int losses = 0
var float totalProfit = 0

// Entry
if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Track trades
if strategy.closedtrades > strategy.closedtrades[1]
    if strategy.closedtrades.profit > 0
        wins := wins + 1
    else
        losses := losses + 1
    
    totalProfit := totalProfit + strategy.closedtrades.profit

plot(totalProfit)
```

### Win Rate Calculation

```pinescript
//@version=6
strategy("Win Rate", overlay=true)

var int totalTrades = 0
var int winningTrades = 0

// On trade close
if strategy.closedtrades > strategy.closedtrades[1]
    totalTrades := totalTrades + 1
    
    if strategy.closedtrades.profit > 0
        winningTrades := winningTrades + 1

winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0
```

---

## Walk Forward Testing

### Rolling Window

```pinescript
//@version=6
strategy("Walk Forward", 
     overlay=true,
     process_orders_on_close=true)

// Use recent data for parameters
lookback = 200
trainLength = 150
testLength = 50

// Simplified: use fixed for demo
maFast = input.int(12, "Fast")
maSlow = input.int(26, "Slow")

if ta.crossover(ta.ema(close, maFast), ta.ema(close, maSlow))
    strategy.entry("Long", strategy.long)

if ta.crossunder(ta.ema(close, maFast), ta.ema(close, maSlow))
    strategy.close("Long")

plot(ta.ema(close, maFast))
plot(ta.ema(close, maSlow))
```

### In-Sample/Out-Sample

```pinescript
//@version=6
strategy("In/Out Sample",
     overlay=true,
     process_orders_on_close=true)

// In-sample: 2020-2022
// Out-sample: 2023
inSampleEnd = timestamp(2022, 12, 31)
isInSample = time <= inSampleEnd

maFast = input.int(12, "Fast")
maSlow = input.int(26, "Slow")

if isInSample and ta.crossover(ta.ema(close, maFast), ta.ema(close, maSlow))
    strategy.entry("Long", strategy.long)

if ta.crossunder(ta.ema(close, maFast), ta.ema(close, maSlow))
    strategy.close("Long")
```

---

## Optimization

### Single Parameter Optimization

```pinescript
//@version=6
strategy("Optimize MA", 
     overlay=true, 
     optimize=true)

fastMA = input.int(12, "Fast MA", 8, 20, 2)
slowMA = input.int(26, "Slow MA", 20, 50, 5)

if ta.crossover(ta.ema(close, fastMA), ta.ema(close, slowMA))
    strategy.entry("Long", strategy.long)

if ta.crossunder(ta.ema(close, fastMA), ta.ema(close, slowMA))
    strategy.close("Long")

plot(ta.ema(close, fastMA))
plot(ta.ema(close, slowMA))
```

### Multi-Parameter Optimization

```pinescript
//@version=6
strategy("Optimize Multi",
     overlay=true,
     optimize=true)

fastMA = input.int(12, "Fast", 5, 20, 1)
slowMA = input.int(26, "Slow", 20, 50, 5)
rsiLength = input.int(14, "RSI", 7, 21, 2)
rsiLevel = input.int(30, "RSI Level", 20, 40, 5)

rsi = ta.rsi(close, rsiLength)

maCross = ta.crossover(ta.ema(close, fastMA), ta.ema(close, slowMA))

if maCross and rsi < rsiLevel
    strategy.entry("Long", strategy.long)

if ta.crossunder(ta.ema(close, fastMA), ta.ema(close, slowMA))
    strategy.close("Long")
```

---

## Common Backtesting Pitfalls

### Look-Ahead Bias

```pinescript
//@version=6
// PROBLEM: Using future data
// BAD:
if close > close[1] and close[2] > close[3]

// GOOD: Only use past data
if close > close[1]
```

### Over-Optimization

```pinescript
// PROBLEM: Too many parameters
// BAD:
param1 = input(1)
param2 = input(2)
param3 = input(3)
param4 = input(4)
param5 = input(5)

// GOOD: Few parameters
maFast = input.int(12, "Fast")
maSlow = input.int(26, "Slow")
```

### Survivorship Bias

```pinescript
// PROBLEM: Only testing active symbols
// GOOD: Test across multiple symbols
// Note: Pine Script tests one symbol at a time
```

---

## Monte Carlo Simulation

### Basic Monte Carlo

```pinescript
//@version=6
strategy("Monte Carlo", overlay=true)

// Run multiple times with different seeds
// Note: Pine doesn't support true Monte Carlo
// Use strategy tester for this

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

if ta.crossunder(ta.sma(close, 20), ta.sma(close, 50))
    strategy.close("Long")
```

---

## Drawdown Analysis

### Track Drawdown

```pinescript
//@version=6
strategy("Drawdown Tracker", overlay=true)

var float maxEquity = strategy.equity
var float drawdown = 0

// Update max equity
if strategy.equity > maxEquity
    maxEquity := strategy.equity

// Calculate drawdown
drawdown := (maxEquity - strategy.equity) / maxEquity * 100
```

### Max Drawdown

```pinescript
//@version=6
strategy("Max DD", overlay=true)

var float maxDrawdown = 0

if strategy.equity > 0
    equity = strategy.equity
    peak = math.max(peak, equity)
    dd = (peak - equity) / peak * 100
    maxDrawdown := math.max(maxDrawdown, dd)

plot(maxDrawdown, title="Max DD")
```

---

## Complete Backtest Template

```pinescript
//@version=6
strategy("Complete Backtest", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10,
     commission_type=strategy.commission.percent,
     commission_value=0.1,
     slippage=3,
     process_orders_on_close=true)

// === PARAMETERS ===
maFast = input.int(12, "Fast MA", 8, 20, 2)
maSlow = input.int(26, "Slow MA", 20, 60, 5)
atrLength = input.int(14, "ATR")
atrSL = input.float(2.0, "SL ATR")
atrTP = input.float(3.0, "TP ATR")

// === CALCULATIONS ===
fastMA = ta.ema(close, maFast)
slowMA = ta.ema(close, maSlow)
atr = ta.atr(atrLength)

// === SIGNALS ===
longSignal = ta.crossover(fastMA, slowMA)
shortSignal = ta.crossunder(fastMA, slowMA)

// === ENTRIES ===
if longSignal
    strategy.entry("Long", strategy.long)

if shortSignal
    strategy.entry("Short", strategy.short)

// === EXITS ===
if strategy.position_size > 0
    strategy.exit("Long Exit", "Long", 
         stop=strategy.position_avg_price - atr * atrSL,
         limit=strategy.position_avg_price + atr * atrTP)

if strategy.position_size < 0
    strategy.exit("Short Exit", "Short",
         stop=strategy.position_avg_price + atr * atrSL,
         limit=strategy.position_avg_price - atr * atrTP)

// === PLOT ===
plot(fastMA, color=color.green)
plot(slowMA, color=color.red)
```

---

## Backtest Checklist

- [ ] Clear entry/exit rules
- [ ] Commission included
- [ ] Slippage considered
- [ ] Realistic position sizing
- [ ] Date range specified
- [ ] Multiple market conditions tested
- [ ] Not over-optimized
- [ ] Out-of-sample validation

---

## Metrics to Review

| Metric | Good | Bad |
|--------|------|-----|
| Profit Factor | > 1.5 | < 1.0 |
| Win Rate | > 40% | < 35% |
| Sharpe Ratio | > 1.0 | < 0.5 |
| Max Drawdown | < 20% | > 50% |
| Expectancy | > 0.5R | < 0 |

---

## Next Steps

- **[[pinescript-advanced-timeframes]]** - Multi-timeframe analysis
- **[[pinescript-advanced-custom-functions]]** - Advanced coding
- **[[pinescript-advanced-arrays]]** - Arrays and data structures

---

*Backtest thoroughly, trade cautiously.*
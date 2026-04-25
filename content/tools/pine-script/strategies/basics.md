---
title: "Strategy Basics in Pine Script"
description: "Learn Pine Script strategy development from scratch. Create, test, and optimize your trading strategies with complete examples."
tags: [pine-script, strategy, trading, backtesting]
slug: pinescript-strategies-basics
---

# Strategy Basics in Pine Script

This guide covers the fundamentals of building trading strategies in Pine Script - from simple concepts to complete implementations.

---

## What is a Strategy?

A strategy is a Pine Script that can:
- **Enter trades** - Buy/sell based on conditions
- **Exit trades** - Close positions automatically
- **Manage risk** - Set stop loss and take profit
- **Backtest** - Test on historical data

---

## Basic Strategy Structure

### Hello Strategy

```pinescript
//@version=6
strategy("My First Strategy", overlay=true)

// Entry
if condition
    strategy.entry("Long", strategy.long)

// Exit
if anotherCondition
    strategy.close("Long")

plot(ta.sma(close, 20))
```

### Complete Strategy

```pinescript
//@version=6
strategy("Complete Strategy", 
     overlay=true, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=10)

// Inputs
maLength = input.int(20, "MA Length")

// Calculate
ma = ta.sma(close, maLength)

// Entry condition
enterLong = ta.crossover(close, ma)

// Exit condition
exitLong = ta.crossunder(close, ma)

// Execute
if enterLong
    strategy.entry("Long", strategy.long)

if exitLong
    strategy.close("Long")

// Plot
plot(ma, color=color.blue)
```

---

## Strategy Types

### Long Only

```pinescript
//@version=6
strategy("Long Only", overlay=true)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

plot(ta.sma(close, 20))
plot(ta.sma(close, 50))
```

### Short Only

```pinescript
//@version=6
strategy("Short Only", overlay=true)

if ta.crossunder(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Short", strategy.short)

plot(ta.sma(close, 20))
plot(ta.sma(close, 50))
```

### Long and Short

```pinescript
//@version=6
strategy("Long/Short", overlay=true)

ma20 = ta.sma(close, 20)
ma50 = ta.sma(close, 50)

// Long entry
if ta.crossover(ma20, ma50)
    strategy.entry("Long", strategy.long)

// Short entry
if ta.crossunder(ma20, ma50)
    strategy.entry("Short", strategy.short)

// Exit
if ta.crossunder(ma20, ma50)
    strategy.close("Long")

if ta.crossover(ma20, ma50)
    strategy.close("Short")

plot(ma20)
plot(ma50)
```

---

## Position Sizing

### Percent of Equity

```pinescript
//@version=6
strategy("Percent Equity", 
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)  // 10% of account

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
```

### Fixed Quantity

```pinescript
//@version=6
strategy("Fixed Quantity",
     default_qty_type=strategy.fixed,
     default_qty_value=100)  // 100 shares/contracts

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
```

### Risk-Based Sizing

```pinescript
//@version=6
strategy("Risk Based")

atr = ta.atr(14)
riskPercent = input.float(2.0, "Risk %")

// Calculate position size
riskAmount = strategy.equity * (riskPercent / 100)
stopDistance = atr * 2
shares = riskAmount / stopDistance

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long, qty=shares)

plot(ta.sma(close, 20))
```

---

## Order Types

### Market Orders

```pinescript
//@version=6
strategy("Market Orders")

// Execute immediately at market price
if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
```

### Limit Orders

```pinescript
//@version=6
strategy("Limit Orders")

sma20 = ta.sma(close, 20)

// Buy at SMA (limit order)
if close > sma20
    strategy.order("Long Limit", strategy.long, limit=close)

plot(sma20)
```

### Stop Orders

```pinescript
//@version=6
strategy("Stop Orders")

sma20 = ta.sma(close, 20)

// Buy on breakout (stop order)
if close > sma20
    strategy.order("Long Stop", strategy.long, stop=close)

plot(sma20)
```

---

## Multiple Conditions

### AND Conditions

```pinescript
//@version=6
strategy("Multiple Conditions")

sma20 = ta.sma(close, 20)
rsi = ta.rsi(close, 14)

// Both conditions must be true
longCondition = ta.crossover(close, sma20) and rsi < 30

if longCondition
    strategy.entry("Long", strategy.long)

if ta.crossunder(close, sma20)
    strategy.close("Long")

plot(sma20)
plot(rsi, scale=scale.left)
hline(30)
```

### OR Conditions

```pinescript
//@version=6
strategy("OR Conditions")

sma20 = ta.sma(close, 20)
rsi = ta.rsi(close, 14)

// Either condition
longCondition = ta.crossover(close, sma20) or rsi < 25

if longCondition
    strategy.entry("Long", strategy.long)

plot(sma20)
```

### Complex Conditions

```pinescript
//@version=6
strategy("Complex Conditions")

ma20 = ta.sma(close, 20)
ma50 = ta.sma(close, 50)
rsi = ta.rsi(close, 14)
atr = ta.atr(14)

// Trend: price above 200 SMA
trendUp = close > ta.sma(close, 200)

// Entry: MA cross + RSI + ATR filter
entry = ta.crossover(ma20, ma50) and rsi < 40 and atr < ta.atr(20)[1]

if trendUp and entry
    strategy.entry("Long", strategy.long)

// Exit: opposite cross
if ta.crossunder(ma20, ma50)
    strategy.close_all()

plot(ma20)
plot(ma50)
plot(ta.sma(close, 200))
```

---

## Exit Strategies

### Time-Based Exit

```pinescript
//@version=6
strategy("Time Exit")

entryPrice = 0.0
entryPrice := nz(entryPrice[1], 0)

// Enter
if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    entryPrice := close

// Exit after X bars
barsInTrade = bar_index - entryPrice
if barsInTrade >= 20
    strategy.close("Long")

plot(ta.sma(close, 20))
plot(ta.sma(close, 50))
```

### Percentage Exit

```pinescript
//@version=6
strategy("Percentage Exit")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Exit at 5% profit
strategy.exit("Take Profit", "Long", limit=strategy.position_avg_price * 1.05)

plot(ta.sma(close, 20))
```

---

## Complete Strategy Examples

### Simple MA Crossover Strategy

```pinescript
//@version=6
strategy("MA Crossover", 
     overlay=true, 
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Inputs
fastMA = input.int(12, "Fast MA")
slowMA = input.int(26, "Slow MA")

// Calculations
fast = ta.ema(close, fastMA)
slow = ta.ema(close, slowMA)

// Plot
plot(fast, color=color.green, title="Fast")
plot(slow, color=color.red, title="Slow")

// Long entry
if ta.crossover(fast, slow)
    strategy.entry("Long", strategy.long)

// Short entry
if ta.crossunder(fast, slow)
    strategy.entry("Short", strategy.short)

// Exit on reverse
if ta.crossunder(fast, slow)
    strategy.close("Long")

if ta.crossover(fast, slow)
    strategy.close("Short")
```

### RSI Strategy

```pinescript
//@version=6
strategy("RSI Strategy", 
     overlay=false,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Inputs
rsiLength = input.int(14, "RSI Length")
oversold = input.float(30, "Oversold")
overbought = input.float(70, "Overbought")

// Calculate
rsi = ta.rsi(close, rsiLength)

// Plot
plot(rsi, title="RSI")
hline(overbought)
hline(oversold)

// Entry
if ta.crossover(rsi, oversold)
    strategy.entry("Long", strategy.long)

if ta.crossunder(rsi, overbought)
    strategy.entry("Short", strategy.short)

// Exit
if ta.crossunder(rsi, 50)
    strategy.close_all()
```

### Multi-Indicator Strategy

```pinescript
//@version=6
strategy("Multi Indicator",
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Indicators
sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)
rsi = ta.rsi(close, 14)
atr = ta.atr(14)

// Trend
uptrend = close > ta.sma(close, 200)

// Entry conditions
longEntry = uptrend and ta.crossover(sma20, sma50) and rsi < 40
shortEntry = not uptrend and ta.crossunder(sma20, sma50) and rsi > 60

// Execute
if longEntry
    strategy.entry("Long", strategy.long)

if shortEntry
    strategy.entry("Short", strategy.short)

// Exit
if ta.crossunder(sma20, sma50)
    strategy.close_all()

// Plot
plot(sma20)
plot(sma50)
plot(ta.sma(close, 200))
```

---

## Strategy Settings

### Commission and Slippage

```pinescript
//@version=6
strategy("With Costs",
     commission_type=strategy.commission.percent,
     commission_value=0.1,  // 0.1%
     slippage=3)  // 3 ticks slippage

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
```

### Pyramid Settings

```pinescript
//@version=6
strategy("No Pyramid",
     overlay=true,
     max_entries=1)  // Only 1 position at a time

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
```

---

## Strategy Reference

| Function | Description |
|----------|-------------|
| `strategy.entry()` | Open position |
| `strategy.order()` | Place limit/stop order |
| `strategy.exit()` | Close with profit/loss |
| `strategy.close()` | Close position |
| `strategy.close_all()` | Close all positions |
| `strategy.cancel()` | Cancel pending order |

---

## Next Steps

- **[[pinescript-strategies-entries-exits]]** - Advanced entry/exit logic
- **[[pinescript-strategies-stops]]** - Stop loss and take profit
- **[[pinescript-strategies-backtesting]]** - Backtesting and optimization

---

*Start with simple strategies and add complexity gradually.*
---
title: "Entry and Exit Strategies in Pine Script"
description: "Master advanced entry and exit techniques in Pine Script strategies. Learn stop loss, take profit, trailing stops, and conditional exits."
tags: [pine-script, strategy, entries, exits, trading]
slug: pinescript-strategies-entries-exits
---

# Entry and Exit Strategies in Pine Script

This guide covers advanced entry and exit techniques for building robust trading strategies.

---

## Entry Techniques

### Market Entry

```pinescript
//@version=6
strategy("Market Entry", overlay=true)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

plot(ta.sma(close, 20))
plot(ta.sma(close, 50))
```

### Limit Entry

```pinescript
//@version=6
strategy("Limit Entry", overlay=true)

sma20 = ta.sma(close, 20)

// Buy at pullback to SMA
if close > sma20 and low < sma20
    strategy.entry("Long", strategy.long, limit=sma20)

plot(sma20)
```

### Stop Entry

```pinescript
//@version=6
strategy("Stop Entry", overlay=true)

sma20 = ta.sma(close, 20)

// Buy on breakout above SMA
if close > sma20
    strategy.entry("Long", strategy.long, stop=close)

plot(sma20)
```

### Iceberg Entry

```pinescript
//@version=6
strategy("Iceberg Entry", overlay=true)

// Split order into parts
if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long 1", strategy.long, qty=50)
    strategy.entry("Long 2", strategy.long, qty=50)

plot(ta.sma(close, 20))
plot(ta.sma(close, 50))
```

---

## Exit Techniques

### Close on Signal

```pinescript
//@version=6
strategy("Signal Exit", overlay=true)

ma20 = ta.sma(close, 20)
ma50 = ta.sma(close, 50)

// Entry
if ta.crossover(ma20, ma50)
    strategy.entry("Long", strategy.long)

// Exit on reverse
if ta.crossunder(ma20, ma50)
    strategy.close("Long")

plot(ma20)
plot(ma50)
```

### Time-Based Exit

```pinescript
//@version=6
strategy("Time Exit", overlay=true)

var int entryBar = na
entryBar := na(entryBar) ? na : entryBar

// Entry
if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    entryBar := bar_index

// Exit after 20 bars
if not na(entryBar) and bar_index - entryBar >= 20
    strategy.close("Long")

plot(ta.sma(close, 20))
```

### Profit Target Exit

```pinescript
//@version=6
strategy("Profit Target", overlay=true)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    // Take profit at 5%
    strategy.exit("Take Profit", "Long", limit=strategy.position_avg_price * 1.05)

plot(ta.sma(close, 20))
```

---

## Stop Loss Types

### Fixed Stop Loss

```pinescript
//@version=6
strategy("Fixed SL", overlay=true)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    // 2% stop loss
    strategy.exit("Stop Loss", "Long", stop=strategy.position_avg_price * 0.98)

plot(ta.sma(close, 20))
```

### ATR Stop Loss

```pinescript
//@version=6
strategy("ATR SL", overlay=true)

atr = ta.atr(14)
multiplier = input.float(2.0, "ATR Multiplier")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    // ATR-based stop
    strategy.exit("ATR Stop", "Long", stop=close - atr * multiplier)

plot(ta.sma(close, 20))
```

### Chandelier Exit

```pinescript
//@version=6
strategy("Chandelier Exit", overlay=true)

atr = ta.atr(14)
length = input.int(22, "Length")

// Highest high since entry
highestSinceEntry = ta.highest(high, length)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    strategy.exit("Chandelier", "Long", stop=highestSinceEntry - atr * 3)

plot(ta.sma(close, 20))
```

---

## Take Profit Types

### Fixed Take Profit

```pinescript
//@version=6
strategy("Fixed TP", overlay=true)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    // 10% profit target
    strategy.exit("Take Profit", "Long", limit=strategy.position_avg_price * 1.10)

plot(ta.sma(close, 20))
```

### ATR Take Profit

```pinescript
//@version=6
strategy("ATR TP", overlay=true)

atr = ta.atr(14)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    // 3R target (3x risk)
    strategy.exit("TP", "Long", limit=close + (close - strategy.position_avg_price) * 3)

plot(ta.sma(close, 20))
```

### Multiple Take Profit Levels

```pinescript
//@version=6
strategy("Multiple TP", overlay=true)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    // First target at 2%
    strategy.exit("TP1", "Long", limit=strategy.position_avg_price * 1.02, qty=strategy.position_size / 2)
    // Second target at 5%
    strategy.exit("TP2", "Long", limit=strategy.position_avg_price * 1.05, qty=strategy.position_size / 2)

plot(ta.sma(close, 20))
```

---

## Trailing Stops

### Simple Trailing Stop

```pinescript
//@version=6
strategy("Trailing Stop", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

atr = ta.atr(14)
trailMultiplier = input.float(3.0, "Trail Multiplier")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Trailing stop
trailPrice = close - atr * trailMultiplier

if strategy.position_size > 0
    strategy.exit("Trail", "Long", stop=trailPrice)

plot(ta.sma(close, 20))
```

### Percent Trailing Stop

```pinescript
//@version=6
strategy("Percent Trail", overlay=true)

trailPercent = input.float(5.0, "Trail %")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Calculate trail
var float trailPrice = na
if strategy.position_size > 0
    trailPercentValue = strategy.position_avg_price * (trailPercent / 100)
    if na(trailPrice)
        trailPrice := strategy.position_avg_price - trailPercentValue
    else
        trailPrice := math.max(trailPrice, close - trailPercentValue)
    
    strategy.exit("Trail", "Long", stop=trailPrice)

plot(ta.sma(close, 20))
```

### High/Low Trailing Stop

```pinescript
//@version=6
strategy("High Low Trail", overlay=true)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Trail from highest high since entry
var float highestSinceEntry = na

if strategy.position_size > 0
    highestSinceEntry := math.max(highestSinceEntry, high)
    strategy.exit("Trail", "Long", stop=highestSinceEntry - ta.atr(14) * 2)

plot(ta.sma(close, 20))
```

---

## Partial Exits

### Partial Profit Taking

```pinescript
//@version=6
strategy("Partial Exit", overlay=true)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Take partial profit at 3%
if strategy.position_size > 0 and close > strategy.position_avg_price * 1.03
    strategy.close("Long", qty=strategy.position_size / 2)

plot(ta.sma(close, 20))
```

### Scale In / Scale Out

```pinescript
//@version=6
strategy("Scale In/Out", overlay=true)

sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)

// Scale in on pullback
if ta.crossover(close, sma20) and strategy.position_size == 0
    strategy.entry("Long 1", strategy.long, qty=1)

if strategy.position_size > 0 and ta.crossover(close, sma20) and close > strategy.position_avg_price
    strategy.entry("Long 2", strategy.long, qty=1)

// Scale out on resistance
if strategy.position_size > 0 and close > sma50 * 1.05
    strategy.close("Long", qty=strategy.position_size)

plot(sma20)
plot(sma50)
```

---

## Conditional Exits

### RSI Exit

```pinescript
//@version=6
strategy("RSI Exit", overlay=false)

rsi = ta.rsi(close, 14)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Exit when RSI overbought
if rsi > 70
    strategy.close_all()

plot(rsi)
hline(70)
```

### Volatility Exit

```pinescript
//@version=6
strategy("Volatility Exit", overlay=true)

atr = ta.atr(14)
atrMA = ta.sma(atr, 20)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Exit on high volatility
if atr > atrMA * 2
    strategy.close_all()

plot(ta.sma(close, 20))
```

---

## Complete Entry/Exit Strategy

```pinescript
//@version=6
strategy("Complete Entry/Exit", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// === INPUTS ===
maFast = input.int(12, "Fast MA")
maSlow = input.int(26, "Slow MA")
atrLength = input.int(14, "ATR")
riskReward = input.float(2.0, "Risk:Reward")

// === CALCULATIONS ===
fastMA = ta.ema(close, maFast)
slowMA = ta.ema(close, maSlow)
atr = ta.atr(atrLength)

// === ENTRIES ===
// Long
longCondition = ta.crossover(fastMA, slowMA)
if longCondition
    strategy.entry("Long", strategy.long)

// Short
shortCondition = ta.crossunder(fastMA, slowMA)
if shortCondition
    strategy.entry("Short", strategy.short)

// === EXITS ===
// Long exit (reverse signal + stop loss + take profit)
if strategy.position_size > 0
    // Stop loss
    longStop = strategy.position_avg_price - atr * 2
    // Take profit
    longTP = strategy.position_avg_price + atr * 2 * riskReward
    
    strategy.exit("Long Exit", "Long", stop=longStop, limit=longTP)

// Short exit
if strategy.position_size < 0
    shortStop = strategy.position_avg_price + atr * 2
    shortTP = strategy.position_avg_price - atr * 2 * riskReward
    
    strategy.exit("Short Exit", "Short", stop=shortStop, limit=shortTP)

// === PLOT ===
plot(fastMA, color=color.green)
plot(slowMA, color=color.red)
```

---

## Order Management

### One Entry at a Time

```pinescript
//@version=6
strategy("No Pyramid", overlay=true, max_entries=1)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

plot(ta.sma(close, 20))
```

### Multiple Entries

```pinescript
//@version=6
strategy("Pyramid", overlay=true, max_entries=5)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Add on pullback
if strategy.position_size > 0 and ta.crossover(close, ta.sma(close, 50))
    strategy.entry("Long Add", strategy.long)

plot(ta.sma(close, 20))
```

---

## Next Steps

- **[[tools/pine-script/strategies/stops]]** - Advanced stop loss techniques
- **[[tools/pine-script/strategies/backtesting]]** - Backtesting and optimization
- **[[tools/pine-script/strategies/examples]]** - More strategy examples

---

*Master entry and exit management to improve your trading results.*
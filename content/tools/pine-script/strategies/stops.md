---
title: "Stop Loss and Take Profit in Pine Script"
description: "Complete guide to stop loss and take profit in Pine Script strategies. Learn fixed, ATR-based, percentage, and trailing stops."
tags: [pine-script, strategy, stop-loss, take-profit, risk-management]
slug: pinescript-strategies-stops
---

# Stop Loss and Take Profit in Pine Script

Proper risk management is crucial for trading success. This guide covers all stop loss and take profit techniques.

---

## Why Stop Loss Matters

| Aspect | Without SL | With SL |
|--------|------------|---------|
| Risk | Unlimited | Defined |
| Drawdown | Can be 100% | Limited |
| Psychology | Stressful | Clear exits |
| Strategy Testing | Unreliable | Accurate |

---

## Fixed Stop Loss

### Percentage-Based Stop

```pinescript
//@version=6
strategy("Percent Stop", overlay=true)

stopPercent = input.float(2.0, "Stop %")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    strategy.exit("Stop", "Long", stop=strategy.position_avg_price * (1 - stopPercent / 100))

plot(ta.sma(close, 20))
```

### Price-Based Stop

```pinescript
//@version=6
strategy("Price Stop", overlay=true)

stopPrice = input.float(100.0, "Stop Price")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    strategy.exit("Stop", "Long", stop=stopPrice)

plot(ta.sma(close, 20))
plot(stopPrice, color=color.red, linestyle=plot.style_line)
```

---

## ATR Stop Loss

### Basic ATR Stop

```pinescript
//@version=6
strategy("ATR Stop", overlay=true)

atr = ta.atr(14)
atrMultiplier = input.float(2.0, "ATR Multiplier")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    strategy.exit("ATR Stop", "Long", stop=close - atr * atrMultiplier)

plot(ta.sma(close, 20))
```

### Dynamic ATR Stop

```pinescript
//@version=6
strategy("Dynamic ATR Stop", overlay=true)

atr = ta.atr(14)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Dynamic stop based on current ATR
stopLoss = close - atr * 2
strategy.exit("Dynamic Stop", "Long", stop=stopLoss)

plot(ta.sma(close, 20))
```

### Chandelier Stop

```pinescript
//@version=6
strategy("Chandelier Stop", overlay=true)

atr = ta.atr(14)
length = input.int(22, "Chandelier Length")

// Highest high since entry
highest = ta.highest(high, length)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    strategy.exit("Chandelier", "Long", stop=highest - atr * 3)

plot(ta.sma(close, 20))
```

---

## Take Profit

### Fixed Take Profit

```pinescript
//@version=6
strategy("Fixed TP", overlay=true)

tpPercent = input.float(5.0, "Take Profit %")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    strategy.exit("Take Profit", "Long", limit=strategy.position_avg_price * (1 + tpPercent / 100))

plot(ta.sma(close, 20))
```

### ATR Take Profit (R Multiple)

```pinescript
//@version=6
strategy("ATR TP R", overlay=true)

atr = ta.atr(14)
riskReward = input.float(2.0, "Risk:Reward")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    
    stopLoss = close - atr * 2
    takeProfit = close + atr * 2 * riskReward
    
    strategy.exit("SL/TP", "Long", stop=stopLoss, limit=takeProfit)

plot(ta.sma(close, 20))
```

### Multiple Take Profit Levels

```pinescript
//@version=6
strategy("Multi TP", overlay=true)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    
    // First target: 1R
    strategy.exit("TP1", "Long", 
         stop=close - ta.atr(14) * 2,
         limit=close + ta.atr(14) * 2,
         qty=strategy.position_size / 2)
    
    // Second target: 2R
    strategy.exit("TP2", "Long",
         stop=close - ta.atr(14) * 2,
         limit=close + ta.atr(14) * 4,
         qty=strategy.position_size / 2)

plot(ta.sma(close, 20))
```

---

## Trailing Stops

### Percent Trailing Stop

```pinescript
//@version=6
strategy("Percent Trailing", overlay=true)

trailPercent = input.float(5.0, "Trail %")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Calculate trailing stop
var float trailPrice = na

if strategy.position_size > 0
    trailPercentValue = close * (trailPercent / 100)
    if na(trailPrice)
        trailPrice := close - trailPercentValue
    else
        trailPrice := math.max(trailPrice, close - trailPercentValue)
    
    strategy.exit("Trail", "Long", stop=trailPrice)

plot(ta.sma(close, 20))
```

### ATR Trailing Stop

```pinescript
//@version=6
strategy("ATR Trailing", overlay=true)

atr = ta.atr(14)
atrMult = input.float(3.0, "ATR Multiplier")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// ATR-based trailing stop
trailStop = close - atr * atrMult
strategy.exit("ATR Trail", "Long", stop=trailStop)

plot(ta.sma(close, 20))
```

### High/Low Trailing Stop

```pinescript
//@version=6
strategy("High Low Trail", overlay=true)

atr = ta.atr(14)

var float highestSinceEntry = na
var float lowestSinceEntry = na

// Entry
if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    highestSinceEntry := high

// Update highest
if strategy.position_size > 0
    highestSinceEntry := math.max(highestSinceEntry, high)
    strategy.exit("HL Trail", "Long", stop=highestSinceEntry - atr * 2)

plot(ta.sma(close, 20))
```

---

## Breakeven Stops

### Move to Breakeven

```pinescript
//@version=6
strategy("Breakeven", overlay=true)

atr = ta.atr(14)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Move stop to breakeven after 2R profit
profit = (close - strategy.position_avg_price) / strategy.position_avg_price

if strategy.position_size > 0 and profit > 0.04  // 4% profit
    strategy.exit("Breakeven", "Long", stop=strategy.position_avg_price)

plot(ta.sma(close, 20))
```

### Partial Breakeven

```pinescript
//@version=6
strategy("Partial Breakeven", overlay=true)

atr = ta.atr(14)

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Close half at 2R, move stop to breakeven
profit = close - strategy.position_avg_price
risk = atr * 2

if strategy.position_size > 0 and profit > risk * 2
    strategy.close("Long", qty=strategy.position_size / 2)
    strategy.exit("BE Stop", "Long", stop=strategy.position_avg_price)

plot(ta.sma(close, 20))
```

---

## Combined Stop Loss & Take Profit

### Complete SL/TP System

```pinescript
//@version=6
strategy("Complete SL/TP", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Inputs
atrLength = input.int(14, "ATR Length")
atrMultiplier = input.float(2.0, "SL ATR")
tpMultiplier = input.float(3.0, "TP ATR")
useBreakeven = input.bool(true, "Use Breakeven")
beMultiplier = input.float(1.5, "Breakeven Target")

// Calculate
atr = ta.atr(atrLength)

// Entry
if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

// Stop and target
if strategy.position_size > 0
    stopPrice = strategy.position_avg_price - atr * atrMultiplier
    tpPrice = strategy.position_avg_price + atr * tpMultiplier
    
    strategy.exit("SL/TP", "Long", stop=stopPrice, limit=tpPrice)
    
    // Breakeven
    if useBreakeven
        bePrice = strategy.position_avg_price + atr * beMultiplier
        if close > bePrice
            strategy.exit("BE", "Long", stop=strategy.position_avg_price)

plot(ta.sma(close, 20))
```

---

## Time-Based Stops

### End of Day Close

```pinescript
//@version=6
strategy("EOD Close", overlay=true)

// Close all positions before session end
sessionEnd = time > timestamp(year, month, dayofmonth, 15, 45)

if sessionEnd and strategy.position_size > 0
    strategy.close_all()

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

plot(ta.sma(close, 20))
```

### Max Bars in Trade

```pinescript
//@version=6
strategy("Max Bars", overlay=true)

var int entryBar = na

maxBars = input.int(20, "Max Bars")

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50)) and strategy.position_size == 0
    strategy.entry("Long", strategy.long)
    entryBar := bar_index

if not na(entryBar) and bar_index - entryBar >= maxBars
    strategy.close_all()

plot(ta.sma(close, 20))
```

---

## Adaptive Stops

### Volatility-Based Stop

```pinescript
//@version=6
strategy("Volatility Stop", overlay=true)

atr = ta.atr(14)
atrMA = ta.sma(atr, 20)

// Adjust stop based on volatility
volMultiplier = atr > atrMA * 1.5 ? 3.0 : 2.0

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)
    strategy.exit("Vol Stop", "Long", stop=close - atr * volMultiplier)

plot(ta.sma(close, 20))
```

### Dynamic Trailing

```pinescript
//@version=6
strategy("Dynamic Trail", overlay=true)

atr = ta.atr(14)
atrMA = ta.sma(atr, 20)

// Trail tighter in low volatility
trailMult = atr < atrMA ? 2.0 : 3.0

if ta.crossover(ta.sma(close, 20), ta.sma(close, 50))
    strategy.entry("Long", strategy.long)

if strategy.position_size > 0
    trailPrice = close - atr * trailMult
    strategy.exit("Dynamic Trail", "Long", stop=trailPrice)

plot(ta.sma(close, 20))
```

---

## Stop Loss Best Practices

1. **Always use stops** - Never trade without risk management
2. **Use ATR** - Adapts to market volatility
3. **Set realistic targets** - 1:1 minimum R/R
4. **Avoid obvious levels** - Stops get hunted
5. **Test on multiple markets** - What works in one may not work in another

---

## Next Steps

- **[[tools/pine-script/strategies/backtesting]]** - Backtest with stops
- **[[tools/pine-script/strategies/examples]]** - More complete strategies
- **[[tools/pine-script/advanced/optimization]]** - Optimize parameters

---

*Proper stops protect your capital and keep you in the game.*
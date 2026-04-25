---
title: "Strategy Examples in Pine Script"
description: "Complete trading strategy examples in Pine Script - from simple to advanced. MA crossovers, RSI strategies, breakouts, and more."
tags: [pine-script, strategy, examples, trading]
slug: pinescript-strategies-examples
---

# Strategy Examples in Pine Script

This guide provides complete, working strategy examples you can use directly or modify for your trading.

---

## Simple Strategies

### MA Crossover Strategy

```pinescript
//@version=6
strategy("MA Crossover", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Inputs
fastMA = input.int(12, "Fast MA")
slowMA = input.int(26, "Slow MA")

// Calculate
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

// Long entry
if ta.crossover(rsi, oversold)
    strategy.entry("Long", strategy.long)

// Short entry
if ta.crossunder(rsi, overbought)
    strategy.entry("Short", strategy.short)

// Exit
if ta.crossunder(rsi, 50)
    strategy.close_all()
```

### Bollinger Band Strategy

```pinescript
//@version=6
strategy("BB Strategy", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Inputs
bbLength = input.int(20, "BB Length")
bbMult = input.float(2.0, "BB Multiplier")

// Calculate
bb = ta.bb(close, bbLength, bbMult)

// Plot
plot(bb.upper, color=color.red)
plot(bb.middle, color=color.blue)
plot(bb.lower, color=color.green)

// Long entry - price touches lower band
if ta.crossover(close, bb.lower)
    strategy.entry("Long", strategy.long)

// Short entry - price touches upper band
if ta.crossunder(close, bb.upper)
    strategy.entry("Short", strategy.short)

// Exit at middle band
if strategy.position_size > 0 and ta.crossover(close, bb.middle)
    strategy.close("Long")

if strategy.position_size < 0 and ta.crossunder(close, bb.middle)
    strategy.close("Short")
```

---

## Intermediate Strategies

### MACD Strategy with Filter

```pinescript
//@version=6
strategy("MACD + Filter", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Indicators
[macd, signal, hist] = ta.macd(close, 12, 26, 9)
sma200 = ta.sma(close, 200)

// Trend filter
uptrend = close > sma200

// Long signal
longCondition = uptrend and ta.crossover(macd, signal)

// Short signal  
shortCondition = not uptrend and ta.crossunder(macd, signal)

// Execute
if longCondition
    strategy.entry("Long", strategy.long)

if shortCondition
    strategy.entry("Short", strategy.short)

// Exit
if ta.crossunder(macd, signal)
    strategy.close_all()

plot(sma200, color=color.purple)
```

### Triple Indicator Strategy

```pinescript
//@version=6
strategy("Triple Indicator", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Indicators
ema20 = ta.ema(close, 20)
ema50 = ta.ema(close, 50)
rsi = ta.rsi(close, 14)
atr = ta.atr(14)

// Long conditions
maCross = ta.crossover(ema20, ema50)
rsiOversold = rsi < 35
lowVolatility = atr < ta.atr(20)[1]

longSignal = maCross and rsiOversold and lowVolatility

// Short conditions
maCrossDown = ta.crossunder(ema20, ema50)
rsiOverbought = rsi > 65

shortSignal = maCrossDown and rsiOverbought

// Execute
if longSignal
    strategy.entry("Long", strategy.long)

if shortSignal
    strategy.entry("Short", strategy.short)

// Exit
if ta.crossunder(ema20, ema50)
    strategy.close_all()

plot(ema20, color=color.green)
plot(ema50, color=color.red)
```

### Support/Resistance Strategy

```pinescript
//@version=6
strategy("Support Resistance", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Pivot settings
pivotLength = input.int(10, "Pivot Length")

// Find pivots
pivotHigh = ta.pivothigh(high, pivotLength, pivotLength)
pivotLow = ta.pivotlow(low, pivotLength, pivotLength)

// Track levels
var float resistance = na
var float support = na

if not na(pivotHigh)
    resistance := pivotHigh

if not na(pivotLow)
    support := pivotLong

// Long at support
if not na(support) and ta.crossover(close, support)
    strategy.entry("Long", strategy.long)

// Short at resistance
if not na(resistance) and ta.crossunder(close, resistance)
    strategy.entry("Short", strategy.short)

// Exit
strategy.exit("Exit", stop=strategy.position_avg_price * 0.98, limit=strategy.position_avg_price * 1.05)
```

---

## Advanced Strategies

### Breakout Strategy with ATR Stops

```pinescript
//@version=6
strategy("ATR Breakout", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Inputs
lookback = input.int(20, "Lookback")
atrLength = input.int(14, "ATR")
atrMultiplier = input.float(2.0, "SL Multiplier")
riskReward = input.float(2.0, "Risk:Reward")

// Calculations
highest20 = ta.highest(high, lookback)
lowest20 = ta.lowest(low, lookback)
atr = ta.atr(atrLength)

// Range contraction
range = highest20 - lowest20
avgRange = ta.sma(range, lookback)
contracting = range < avgRange * 0.5

// Breakout
breakoutUp = close > highest20[1]
breakoutDown = close < lowest20[1]

// Long entry
if contracting and breakoutUp
    strategy.entry("Long", strategy.long)

// Short entry
if contracting and breakoutDown
    strategy.entry("Short", strategy.short)

// Stops
if strategy.position_size > 0
    sl = close - atr * atrMultiplier
    tp = close + atr * atrMultiplier * riskReward
    strategy.exit("Long Exit", "Long", stop=sl, limit=tp)

if strategy.position_size < 0
    sl = close + atr * atrMultiplier
    tp = close - atr * atrMultiplier * riskReward
    strategy.exit("Short Exit", "Short", stop=sl, limit=tp)

plot(highest20, color=color.green)
plot(lowest20, color=color.red)
```

### Multi-Timeframe Strategy

```pinescript
//@version=6
strategy("MTF Strategy", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// HTF inputs
tf = input.timeframe("D", "HTF")

// HTF data
htfSMA50 = request.security(syminfo.tickerid, tf, ta.sma(close, 50))
htfSMA200 = request.security(syminfo.tickerid, tf, ta.sma(close, 200))
htfRSI = request.security(syminfo.tickerid, tf, ta.rsi(close, 14))

// HTF trend
htfUptrend = close > htfSMA50 and htfSMA50 > htfSMA200

// Current TF signals
ma20 = ta.ema(close, 20)
ma50 = ta.ema(close, 50)

longSignal = htfUptrend and ta.crossover(ma20, ma50)
shortSignal = not htfUptrend and ta.crossunder(ma20, ma50)

// Execute
if longSignal
    strategy.entry("Long", strategy.long)

if shortSignal
    strategy.entry("Short", strategy.short)

// Exit on reverse
if ta.crossunder(ma20, ma50)
    strategy.close_all()

// Plot HTF
plot(htfSMA50, color=color.orange, title="HTF 50")
plot(htfSMA200, color=color.maroon, title="HTF 200")

bgcolor(htfUptrend ? color.new(color.green, 90) : color.new(color.red, 90))
```

### Mean Reversion Strategy

```pinescript
//@version=6
strategy("Mean Reversion", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Indicators
sma20 = ta.sma(close, 20)
stdDev = ta.stdev(close, 20)
atr = ta.atr(14)

// Bands
upper = sma20 + 2 * stdDev
lower = sma20 - 2 * stdDev

// Mean reversion entries
longSignal = close < lower
shortSignal = close > upper

// Confirmation: price returning to mean
longConfirm = ta.crossover(close, sma20)
shortConfirm = ta.crossunder(close, sma20)

// Execute
if longSignal
    strategy.entry("Long", strategy.long)

if longConfirm and strategy.position_size > 0
    strategy.exit("TP", "Long", limit=strategy.position_avg_price + atr * 2)

if shortSignal
    strategy.entry("Short", strategy.short)

if shortConfirm and strategy.position_size < 0
    strategy.exit("TP", "Short", limit=strategy.position_avg_price - atr * 2)

// Stop loss
if strategy.position_size > 0
    strategy.exit("SL", "Long", stop=lower)

if strategy.position_size < 0
    strategy.exit("SL", "Short", stop=upper)

plot(upper, color=color.red)
plot(sma20, color=color.blue)
plot(lower, color=color.green)
```

---

## Scalping Strategies

### Scalp Strategy

```pinescript
//@version=6
strategy("Scalp", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=20)

// Fast indicators
ema9 = ta.ema(close, 9)
ema21 = ta.ema(close, 21)

// Entries
long = ta.crossover(ema9, ema21)
short = ta.crossunder(ema9, ema21)

if long
    strategy.entry("Long", strategy.long)

if short
    strategy.entry("Short", strategy.short)

// Quick exits
if ta.crossunder(ema9, ema21)
    strategy.close_all()

// Time-based exit
if bar_index % 10 == 0
    strategy.close_all()

plot(ema9, color=color.lime)
plot(ema21, color=color.red)
```

---

## Swing Trading Strategies

### Swing Strategy

```pinescript
//@version=6
strategy("Swing Trading", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// Weekly indicators for swing
sma50 = ta.sma(close, 50)
rsi = ta.rsi(close, 14)

// Pullback entry
pullback = close > sma50 and close[1] < sma50

// RSI confirmation
rsiBuy = rsi < 50 and rsi > 30
rsiSell = rsi > 50 and rsi < 70

if pullback and rsiBuy
    strategy.entry("Long", strategy.long)

if pullback and rsiSell
    strategy.entry("Short", strategy.short)

// Hold for swing
if strategy.position_size > 0
    if rsi > 65 or ta.crossunder(close, sma50)
        strategy.close_all()

if strategy.position_size < 0
    if rsi < 35 or ta.crossover(close, sma50)
        strategy.close_all()

plot(sma50, color=color.blue)
```

---

## Important Notes

1. **Test thoroughly** - All strategies need backtesting
2. **Adjust parameters** - Markets differ
3. **Use proper risk management** - Always use stops
4. **Consider slippage** - Especially for liquid markets
5. **Paper trade first** - Before live trading

---

## Next Steps

- **[[pinescript-advanced-optimization]]** - Optimize your strategies
- **[[pinescript-strategies-backtesting]]** - Proper backtesting
- **[[pinescript-strategies-stops]]** - Advanced stops

---

*Start with simple strategies, then add complexity.*
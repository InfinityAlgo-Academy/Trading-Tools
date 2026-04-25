---
title: "ATR Indicator in Pine Script"
description: "Build ATR (Average True Range) indicators in Pine Script - volatility measurement, position sizing, stop loss calculation, and trading strategies."
tags: [pine-script, indicators, atr, volatility]
slug: pinescript-indicators-atr
---

# ATR Indicator in Pine Script

The Average True Range (ATR) measures market volatility. This guide covers all ATR implementations for position sizing, stops, and volatility analysis.

---

## Basic ATR

### Simple ATR

```pinescript
//@version=6
indicator("ATR Basic", overlay=false)

length = input.int(14, "Length")

atr = ta.atr(length)

plot(atr, title="ATR", color=color.blue, linewidth=2)
```

### ATR on Chart

```pinescript
//@version=6
indicator("ATR on Chart", overlay=true)

atr = ta.atr(14)

// Plot ATR as line
plot(atr, title="ATR", color=color.orange)

// Also show as background
bgcolor(atr > ta.atr(14)[1] ? color.new(color.red, 90) : color.new(color.green, 90))
```

---

## ATR for Stop Loss

### ATR-Based Stops

```pinescript
//@version=6
indicator("ATR Stops", overlay=true)

atr = ta.atr(14)
multiplier = input.float(2.0, "Stop Multiplier")

sma20 = ta.sma(close, 20)

// ATR stop levels
stopLong = close - atr * multiplier
stopShort = close + atr * multiplier

plot(stopLong, color=color.red, title="Long Stop")
plot(stopShort, color=color.green, title="Short Stop")
plot(sma20, color=color.blue)
```

### Trailing Stop ATR

```pinescript
//@version=6
indicator("ATR Trailing Stop", overlay=true)

atr = ta.atr(14)
multiplier = input.float(3.0, "Multiplier")

// Long trailing stop
trailLong = close - atr * multiplier

// Plot
plot(trailLong, color=color.red, title="Trail Stop")

// Show when stopped out
stopOut = close < trailLong[1] and close[1] >= trailLong[1]
plotshape(stopOut, location=location.abovebar, style=shape.labeldown, color=color.red, text="STOP")
```

---

## ATR Position Sizing

### Risk-Based Sizing

```pinescript
//@version=6
indicator("Position Size Calculator")

accountSize = input.float(10000, "Account Size")
riskPercent = input.float(2.0, "Risk %")
atrLength = input.int(14, "ATR Length")

atr = ta.atr(atrLength)

// Risk amount in dollars
riskAmount = accountSize * (riskPercent / 100)

// Position size (shares/contracts)
positionSize = riskAmount / atr

// Display as label
plotchar(positionSize, char="", title="Position Size")

// Show calculations
label.new(bar_index, close, "Risk: $" + str.tostring(riskAmount, "#.##") + "\nSize: " + str.tostring(positionSize, "#.##"), 
     color=color.blue, textcolor=color.white, size=size.small)
```

---

## ATR for Volatility Analysis

### Volatility Indicator

```pinescript
//@version=6
indicator("ATR Volatility", overlay=false)

atr = ta.atr(14)
atrMA = ta.sma(atr, 20)

// High volatility
highVol = atr > atrMA * 1.5

// Low volatility
lowVol = atr < atrMA * 0.5

plot(atr, color=color.blue, title="ATR")
plot(atrMA, color=color.orange, title="ATR MA")

// Background for volatility
bgcolor(highVol ? color.new(color.red, 90) : lowVol ? color.new(color.green, 90) : na)
```

### ATR Percent

```pinescript
//@version=6
indicator("ATR Percent", overlay=false)

atr = ta.atr(14)

// ATR as percent of close
atrPercent = (atr / close) * 100

plot(atrPercent, title="ATR %", color=color.purple)

hline(2, color=color.red, linestyle=hline.style_dashed)
hline(1, color=color.orange, linestyle=hline.style_dashed)
hline(0.5, color=color.green, linestyle=hline.style_dashed)
```

---

## ATR Bands

### ATR Bands

```pinescript
//@version=6
indicator("ATR Bands", overlay=true)

atr = ta.atr(14)
atrMA = ta.sma(atr, 20)

// Bands around ATR MA
upperBand = atrMA * 1.5
lowerBand = atrMA * 0.5

plot(atr, color=color.blue, title="ATR")
plot(upperBand, color=color.red, title="Upper")
plot(lowerBand, color=color.green, title="Lower")

fill(plot(upperBand), plot(lowerBand), color=color.new(color.gray, 90))
```

### Price ATR Bands

```pinescript
//@version=6
indicator("Price ATR Bands", overlay=true)

atr = ta.atr(14)
multiplier = input.float(2.0, "Multiplier")

sma20 = ta.sma(close, 20)

// Price-based ATR bands
upper = sma20 + atr * multiplier
lower = sma20 - atr * multiplier

plot(upper, color=color.red)
plot(sma20, color=color.blue)
plot(lower, color=color.green)
```

---

## ATR with Other Indicators

### ATR + RSI

```pinescript
//@version=6
indicator("ATR + RSI", overlay=false)

atr = ta.atr(14)
rsi = ta.rsi(close, 14)

// High volatility + oversold = potential reversal
signal = atr > ta.atr(14)[1] and rsi < 30

plot(atr, color=color.blue, title="ATR")
plot(rsi, color=color.red, title="RSI", scale=scale.left)

plotshape(signal, location=location.bottom, style=shape.arrowup, color=color.lime)

hline(70)
hline(30)
```

### ATR + Moving Averages

```pinescript
//@version=6
indicator("ATR + MA", overlay=true)

atr = ta.atr(14)
sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)

// Volatility filter
volFilter = atr < ta.atr(20)[1] * 1.2

// Trend
uptrend = sma20 > sma50

// Signal
buySignal = uptrend and volFilter and ta.crossover(close, sma20)

plot(sma20, color=color.green)
plot(sma50, color=color.red)

plotshape(buySignal, location=location.belowbar, style=shape.labelup, color=color.lime, text="BUY")
```

---

## Complete ATR Indicator

```pinescript
//@version=6
indicator("Complete ATR System", overlay=false)

// === INPUTS ===
atrLength = input.int(14, "ATR Length")
showVolatility = input.bool(true, "Show Volatility")
showLevels = input.bool(true, "Show Levels")

// === CALCULATIONS ===
atr = ta.atr(atrLength)
atrMA = ta.sma(atr, 20)
atrPercent = (atr / close) * 100

// === PLOTTING ===
plot(atr, title="ATR", color=color.blue, linewidth=2)
plot(atrMA, title="ATR MA", color=color.orange)

if showLevels
    hline(atrMA * 1.5, color=color.red, linestyle=hline.style_dashed)
    hline(atrMA * 0.5, color=color.green, linestyle=hline.style_dashed)

if showVolatility
    highVol = atr > atrMA * 1.5
    lowVol = atr < atrMA * 0.5
    
    bgcolor(highVol ? color.new(color.red, 90) : lowVol ? color.new(color.green, 90) : na)
```

---

## ATR Strategies

### ATR Volatility Strategy

```pinescript
//@version=6
strategy("ATR Volatility Strategy")

atr = ta.atr(14)
atrMA = ta.sma(atr, 20)

// Low volatility breakout
lowVol = atr < atrMA * 0.7
breakoutUp = close > ta.highest(high, 20)

if lowVol and breakoutUp
    strategy.entry("Long", strategy.long)

// Exit on high volatility
if atr > atrMA * 1.5
    strategy.close_all()

plot(atr)
plot(atrMA)
```

### ATR Trend Strategy

```pinescript
//@version=6
strategy("ATR Trend")

atr = ta.atr(14)
sma20 = ta.sma(close, 20)

// Trend
uptrend = close > sma20

// Entry with ATR stop
if uptrend
    stopPrice = close - atr * 2
    strategy.entry("Long", strategy.long)
    strategy.exit("Stop", stop=stopPrice)

// Exit
if ta.crossunder(close, sma20)
    strategy.close_all()

plot(sma20)
```

### ATR Breakout Strategy

```pinescript
//@version=6
strategy("ATR Breakout")

atr = ta.atr(14)
ema20 = ta.ema(close, 20)

// Consolidation
range = ta.highest(high, 20) - ta.lowest(low, 20)
avgRange = ta.sma(range, 20)

// Narrow range + ATR expansion
consolidating = range < avgRange * 0.5
expanding = atr > atr[1] * 1.5

if consolidating and expanding
    strategy.entry("Long", strategy.long)

// Stop
stopLoss = close - atr * 2
strategy.exit("SL", stop=stopLoss)

plot(ema20)
```

---

## ATR Reference

| Concept | Description |
|---------|-------------|
| High ATR | High volatility |
| Low ATR | Low volatility |
| ATR × 2 | Common stop distance |
| ATR × 3 | Conservative stop |
| ATR / Close | Volatility % |

---

## Next Steps

- **[[tools/pine-script/indicators/volume]]** - Learn Volume analysis
- **[[tools/pine-script/strategies/stops]]** - Master stop loss techniques
- **[[tools/pine-script/strategies/backtesting]]** - Backtest your strategies

---

*ATR is essential for risk management and volatility analysis.*
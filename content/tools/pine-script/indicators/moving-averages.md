---
title: "Moving Averages in Pine Script"
description: "Build all types of moving averages in Pine Script - SMA, EMA, WMA, VWMA, HMA, and custom moving averages with complete examples."
tags: [pine-script, indicators, moving-averages, technical-analysis]
slug: pinescript-indicators-moving-averages
---

# Moving Averages in Pine Script

Moving averages are the foundation of technical analysis. This guide covers every type of moving average you can build in Pine Script.

---

## Simple Moving Average (SMA)

The most basic moving average - equally weighted average of prices.

### Basic SMA

```pinescript
//@version=6
indicator("Simple Moving Average", overlay=true)

length = input.int(20, "Length")

sma20 = ta.sma(close, length)

plot(sma20, title="SMA", color=color.blue)
```

### Multiple SMAs

```pinescript
//@version=6
indicator("Multiple SMAs", overlay=true)

// Different lengths
sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)
sma200 = ta.sma(close, 200)

plot(sma20, color=color.green, title="SMA 20")
plot(sma50, color=color.orange, title="SMA 50")
plot(sma200, color=color.red, title="SMA 200")
```

---

## Exponential Moving Average (EMA)

Gives more weight to recent prices, making it more responsive to price changes.

### Basic EMA

```pinescript
//@version=6
indicator("EMA", overlay=true)

length = input.int(20, "Length")

ema20 = ta.ema(close, length)

plot(ema20, title="EMA", color=color.purple)
```

### EMA vs SMA Comparison

```pinescript
//@version=6
indicator("EMA vs SMA", overlay=true)

length = input.int(20, "Length")

smaVal = ta.sma(close, length)
emaVal = ta.ema(close, length)

plot(smaVal, color=color.blue, title="SMA")
plot(emaVal, color=color.red, title="EMA", linewidth=2)
```

---

## Weighted Moving Average (WMA)

More weight to recent prices, but uses linear weighting instead of exponential.

### Basic WMA

```pinescript
//@version=6
indicator("WMA", overlay=true)

length = input.int(20, "Length")

wma20 = ta.wma(close, length)

plot(wma20, title="WMA", color=color.teal)
```

### Custom WMA Calculation

```pinescript
//@version=6
indicator("Custom WMA", overlay=true)

length = input.int(20, "Length")

// Manual WMA calculation
wma = 0.0
weightSum = 0.0

for i = 0 to length - 1
    weight = length - i
    wma := wma + close[i] * weight
    weightSum := weightSum + weight

wma := wma / weightSum

plot(wma, title="Custom WMA", color=color.orange)
```

---

## Volume Weighted Moving Average (VWMA)

Weighted by volume - gives more weight to bars with higher volume.

### Basic VWMA

```pinescript
//@version=6
indicator("VWMA", overlay=true)

length = input.int(20, "Length")

vwma20 = ta.vwma(close, volume, length)

plot(vwma20, title="VWMA", color=color.fuchsia)
```

### VWMA vs SMA

```pinescript
//@version=6
indicator("VWMA vs SMA", overlay=true)

length = input.int(20, "Length")

vwmaVal = ta.vwma(close, volume, length)
smaVal = ta.sma(close, length)

plot(vwmaVal, color=color.purple, title="VWMA", linewidth=2)
plot(smaVal, color=color.gray, title="SMA")
```

---

## Smoothed Moving Average (SMMA)

Combines EMA and SMA characteristics - smooth with less lag.

### SMMA

```pinescript
//@version=6
indicator("SMMA", overlay=true)

length = input.int(20, "Length")

smma = ta.rma(close, length)

plot(smma, title="SMMA", color=color.olive)
```

---

## Double Exponential Moving Average (DEMA)

Reduces lag significantly compared to regular EMA.

### DEMA

```pinescript
//@version=6
indicator("DEMA", overlay=true)

length = input.int(20, "Length")

ema1 = ta.ema(close, length)
ema2 = ta.ema(ema1, length)
dema = 2 * ema1 - ema2

plot(dema, title="DEMA", color=color.maroon)
```

---

## Triple Exponential Moving Average (TEMA)

Even more smoothing, even less lag than DEMA.

### TEMA

```pinescript
//@version=6
indicator("TEMA", overlay=true)

length = input.int(20, "Length")

ema1 = ta.ema(close, length)
ema2 = ta.ema(ema1, length)
ema3 = ta.ema(ema2, length)
tema = 3 * ema1 - 3 * ema2 + ema3

plot(tema, title="TEMA", color=color.navy)
```

---

## Hull Moving Average (HMA)

Designed to reduce lag while maintaining smoothness.

### HMA

```pinescript
//@version=6
indicator("HMA", overlay=true)

length = input.int(20, "Length")

// HMA formula
halfLength = math.floor(length / 2)
sqrtLength = math.floor(math.sqrt(length))

hma1 = ta.ema(close, halfLength)
hma2 = ta.ema(hma1, 2)
hma = ta.ema(2 * hma1 - hma2, sqrtLength)

plot(hma, title="HMA", color=color.lime)
```

---

## Arnaud Legoux Moving Average (ALMA)

Modern MA that balances smoothness and responsiveness.

### ALMA

```pinescript
//@version=6
indicator("ALMA", overlay=true)

length = input.int(20, "Length")
offset = input.float(0.85, "Offset", minval=0, maxval=1)
sigma = input.float(6, "Sigma")

// ALMA calculation
alma = ta.alma(close, length, offset, sigma)

plot(alma, title="ALMA", color=color.aqua)
```

---

## Moving Average Crossover System

Combining multiple MAs for trading signals.

### Golden Cross / Death Cross

```pinescript
//@version=6
indicator("MA Crossover", overlay=true)

fastLength = input.int(12, "Fast Length")
slowLength = input.int(26, "Slow Length")

fastMA = ta.ema(close, fastLength)
slowMA = ta.ema(close, slowLength)

// Crossover signals
goldenCross = ta.crossover(fastMA, slowMA)
deathCross = ta.crossunder(fastMA, slowMA)

// Plot MAs
plot(fastMA, color=color.green, title="Fast MA")
plot(slowMA, color=color.red, title="Slow MA")

// Plot signals
plotshape(goldenCross, location=location.belowbar, style=shape.labelup, color=color.lime, text="GOLDEN\nCROSS")
plotshape(deathCross, location=location.abovebar, style=shape.labeldown, color=color.red, text="DEATH\nCROSS")
```

### Triple MA Strategy

```pinescript
//@version=6
indicator("Triple MA System", overlay=true)

ma1Length = input.int(10, "Fast MA")
ma2Length = input.int(50, "Medium MA")
ma3Length = input.int(200, "Slow MA")

ma1 = ta.ema(close, ma1Length)
ma2 = ta.ema(close, ma2Length)
ma3 = ta.ema(close, ma3Length)

// Trend filter
uptrend = close > ma3 and ma2 > ma3
downtrend = close < ma3 and ma2 < ma3

// Entry signals
longSignal = ta.crossover(ma1, ma2) and uptrend
shortSignal = ta.crossunder(ma1, ma2) and downtrend

// Plot
plot(ma1, color=color.green, title="Fast")
plot(ma2, color=color.orange, title="Medium")
plot(ma3, color=color.red, title="Slow")

plotshape(longSignal, location=location.belowbar, style=shape.labelup, color=color.green, text="LONG")
plotshape(shortSignal, location=location.abovebar, style=shape.labeldown, color=color.red, text="SHORT")
```

---

## Moving Average Ribbon

Visual display of multiple moving averages.

### Ribbon

```pinescript
//@version=6
indicator("MA Ribbon", overlay=true)

// Multiple MAs
ma10 = ta.ema(close, 10)
ma20 = ta.ema(close, 20)
ma30 = ta.ema(close, 30)
ma40 = ta.ema(close, 40)
ma50 = ta.ema(close, 50)

// Plot all
plot(ma10, color=color.lime, title="MA 10")
plot(ma20, color=color.green, title="MA 20")
plot(ma30, color=color.yellow, title="MA 30")
plot(ma40, color=color.orange, title="MA 40")
plot(ma50, color=color.red, title="MA 50")
```

---

## Dynamic Moving Average

Adjusts based on volatility.

### Variable Moving Average

```pinescript
//@version=6
indicator("Variable MA", overlay=true)

length = input.int(20, "Base Length")
sensitivity = input.float(2.0, "Sensitivity")

// Volatility-adjusted length
volatility = ta.atr(14) / close
dynamicLength = math.max(2, math.floor(length * (1 + volatility * sensitivity)))

vma = ta.ema(close, int(dynamicLength))

plot(vma, title="Variable MA", color=color.purple)
```

---

## Complete Moving Average Indicator

```pinescript
//@version=6
indicator("Complete MA System", overlay=true)

// === INPUTS ===
maType = input.string("EMA", "MA Type", options=["SMA", "EMA", "WMA", "VWMA", "DEMA", "TEMA", "HMA"])
maLength = input.int(20, "MA Length")
showCloud = input.bool(true, "Show Cloud")
showSignals = input.bool(true, "Show Signals")

// === CALCULATIONS ===
ma = switch maType
    "SMA" => ta.sma(close, maLength)
    "EMA" => ta.ema(close, maLength)
    "WMA" => ta.wma(close, maLength)
    "VWMA" => ta.vwma(close, volume, maLength)
    "DEMA" => ta.dema(close, maLength)
    "TEMA" => ta.tema(close, maLength)
    "HMA" => ta.hma(close, maLength)

upperCloud = ta.sma(close, maLength * 2)
lowerCloud = ta.sma(close, maLength / 2)

// === PLOTTING ===
plot(ma, color=color.blue, title=maType, linewidth=2)

if showCloud
    p1 = plot(upperCloud, color=color.new(color.green, 70))
    p2 = plot(lowerCloud, color=color.new(color.red, 70))
    fill(p1, p2, color=color.new(color.gray, 90))

// === SIGNALS ===
if showSignals
    buySignal = ta.crossover(close, ma)
    sellSignal = ta.crossunder(close, ma)

    plotshape(buySignal, location=location.belowbar, style=shape.labelup, color=color.green, text="BUY")
    plotshape(sellSignal, location=location.abovebar, style=shape.labeldown, color=color.red, text="SELL")
```

---

## Moving Average Reference

| Type | Function | Lag | Smoothness |
|------|----------|-----|------------|
| SMA | `ta.sma()` | High | Low |
| EMA | `ta.ema()` | Medium | Medium |
| WMA | `ta.wma()` | Medium | Medium |
| VWMA | `ta.vwma()` | Medium | Medium |
| DEMA | `ta.dema()` | Low | High |
| TEMA | `ta.tema()` | Very Low | Very High |
| HMA | `ta.hma()` | Very Low | High |

---

## Next Steps

- **[[pinescript-indicators-rsi]]** - Learn RSI indicator
- **[[pinescript-indicators-macd]]** - Learn MACD indicator
- **[[pinescript-strategies-basics]]** - Build trading strategies

---

*Master moving averages to build a solid foundation in technical analysis.*
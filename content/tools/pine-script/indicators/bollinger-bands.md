---
title: "Bollinger Bands in Pine Script"
description: "Build complete Bollinger Bands indicators in Pine Script - from basic BB to advanced implementations with squeeze, expansion, and trading strategies."
tags: [pine-script, indicators, bollinger-bands, volatility]
slug: pinescript-indicators-bollinger-bands
---

# Bollinger Bands in Pine Script

Bollinger Bands are a volatility indicator that adapts to market conditions. This guide covers all Bollinger Bands implementations.

---

## Basic Bollinger Bands

### Simple BB

```pinescript
//@version=6
indicator("Bollinger Bands", overlay=true)

length = input.int(20, "Length")
mult = input.float(2.0, "Multiplier")

bb = ta.bb(close, length, mult)

plot(bb.upper, color=color.red, title="Upper")
plot(bb.middle, color=color.blue, title="Middle")
plot(bb.lower, color=color.green, title="Lower")
```

### BB with Fill

```pinescript
//@version=6
indicator("BB with Fill", overlay=true)

bb = ta.bb(close, 20, 2)

upper = plot(bb.upper, color=color.red)
lower = plot(bb.lower, color=color.green)
fill(upper, lower, color=color.new(color.gray, 90))

plot(bb.middle, color=color.blue)
```

---

## BB Width Indicator

### Band Width

```pinescript
//@version=6
indicator("BB Width", overlay=false)

bb = ta.bb(close, 20, 2)

// Band width
width = bb.upper - bb.lower

// Percent width
widthPct = (bb.upper - bb.lower) / bb.middle * 100

plot(width, title="Width", color=color.blue)
plot(widthPct, title="Width %", color=color.orange)
```

### BB Squeeze Detection

```pinescript
//@version=6
indicator("BB Squeeze", overlay=false)

bb = ta.bb(close, 20, 2)
width = (bb.upper - bb.lower) / bb.middle * 100

// Squeeze threshold (customize for your market)
squeezeThreshold = width < 2.0

plot(width, title="Width %", color=color.blue)
plot(squeezeThreshold ? width : na, title="Squeeze", color=color.red, style=plot.style_histogram)

hline(2.0, color=color.gray, linestyle=hline.style_dashed)
```

---

## BB with Different Sources

### Custom Source BB

```pinescript
//@version=6
indicator("BB Custom Source", overlay=true)

src = input.source(close, "Source")
length = input.int(20, "Length")
mult = input.float(2.0, "Multiplier")

bb = ta.bb(src, length, mult)

plot(bb.upper, color=color.red)
plot(bb.middle, color=color.blue)
plot(bb.lower, color=color.green)
```

### VWAP BB

```pinescript
//@version=6
indicator("VWAP BB", overlay=true)

vwap = ta.vwap(close)
bb = ta.bb(vwap, 20, 2)

plot(vwap, color=color.purple, title="VWAP")
plot(bb.upper, color=color.red)
plot(bb.lower, color=color.green)
```

---

## BB Breakout Signals

### Touching Bands

```pinescript
//@version=6
indicator("BB Touch Signals", overlay=true)

bb = ta.bb(close, 20, 2)

// Touch upper band
touchUpper = high >= bb.upper

// Touch lower band
touchLower = low <= bb.lower

// Middle touch
touchMiddle = close > bb.middle and close[1] < bb.middle

plotshape(touchUpper, location=location.abovebar, style=shape.labeldown, color=color.red, text="UPPER")
plotshape(touchLower, location=location.belowbar, style=shape.labelup, color=color.green, text="LOWER")
plotshape(touchMiddle, location=location.belowbar, style=shape.triangleup, color=color.blue)

plot(bb.upper, color=color.red)
plot(bb.middle, color=color.blue)
plot(bb.lower, color=color.green)
```

### Breakout Strategy

```pinescript
//@version=6
indicator("BB Breakout", overlay=true)

bb = ta.bb(close, 20, 2)

// Consolidation (narrow bands)
consolidating = (bb.upper - bb.lower) / bb.middle < 0.03

// Breakout up
breakoutUp = close > bb.upper and consolidating

// Breakout down
breakoutDown = close < bb.lower and consolidating

// Plot
plot(bb.upper, color=color.red)
plot(bb.lower, color=color.green)

// Signals
plotshape(breakoutUp, location=location.belowbar, style=shape.labelup, color=color.lime, text="BUY")
plotshape(breakoutDown, location=location.abovebar, style=shape.labeldown, color=color.red, text="SELL")

// Background
bgcolor(consolidating ? color.new(color.yellow, 90) : na)
```

---

## BB Mean Reversion

### Mean Reversion Strategy

```pinescript
//@version=6
indicator("BB Mean Reversion", overlay=true)

bb = ta.bb(close, 20, 2)

// Price below lower band = oversold
oversold = close < bb.lower

// Price above upper band = overbought
overbought = close > bb.upper

// Return to mean
reversionUp = close > bb.middle and close[1] < bb.lower
reversionDown = close < bb.middle and close[1] > bb.upper

// Plot
plot(bb.upper, color=color.red)
plot(bb.middle, color=color.blue)
plot(bb.lower, color=color.green)

// Signals
plotshape(oversold, location=location.belowbar, style=shape.labelup, color=color.green, text="OVERSOLD")
plotshape(overbought, location=location.abovebar, style=shape.labeldown, color=color.red, text="OVERBOUGHT")

// Reversions
plotshape(reversionUp, location=location.belowbar, style=shape.triangleup, color=color.lime)
plotshape(reversionDown, location=location.abovebar, style=shape.triangledown, color=color.maroon)
```

---

## Double Bollinger Bands

### DBB System

```pinescript
//@version=6
indicator("Double BB", overlay=true)

// Inner BB
bb1 = ta.bb(close, 20, 1)

// Outer BB
bb2 = ta.bb(close, 20, 2)

// Plot all bands
plot(bb2.upper, color=color.red, title="Outer Upper")
plot(bb2.middle, color=color.orange, title="Outer Middle")
plot(bb2.lower, color=color.red, title="Outer Lower")

plot(bb1.upper, color=color.green, title="Inner Upper")
plot(bb1.middle, color=color.blue, title="Inner Middle")
plot(bb1.lower, color=color.green, title="Inner Lower")

// Zones
fill(plot(bb1.upper), plot(bb2.upper), color=color.new(color.red, 90))
fill(plot(bb1.lower), plot(bb2.lower), color=color.new(color.green, 90))
```

---

## BB with RSI Combo

### BB + RSI

```pinescript
//@version=6
indicator("BB + RSI", overlay=false)

bb = ta.bb(close, 20, 2)
rsi = ta.rsi(close, 14)

// Plot BB (as histogram)
width = bb.upper - bb.lower
plot(width, title="BB Width", color=color.blue)

// Plot RSI
plot(rsi, color=color.red, title="RSI")

// Combined
rsiBBLong = rsi < 30 and close < bb.lower
rsiBBShort = rsi > 70 and close > bb.upper

plotshape(rsiBBLong, location=location.bottom, style=shape.arrowup, color=color.lime)
plotshape(rsiBBShort, location=location.top, style=shape.arrowdown, color=color.red)

hline(70)
hline(30)
```

---

## BB%B Indicator

### Percent B

```pinescript
//@version=6
indicator("BB %B", overlay=false)

bb = ta.bb(close, 20, 2)

// %B = (Price - Lower) / (Upper - Lower)
percentB = (close - bb.lower) / (bb.upper - bb.lower) * 100

plot(percentB, title="%B", color=color.blue)
hline(100, color=color.red)
hline(0, color=color.green)
hline(50, color=color.gray)
```

---

## Complete BB Indicator

```pinescript
//@version=6
indicator("Complete BB System", overlay=true)

// === INPUTS ===
length = input.int(20, "Length")
mult = input.float(2.0, "Multiplier")
showWidth = input.bool(true, "Show Width")
showSignals = input.bool(true, "Show Signals")

// === CALCULATIONS ===
bb = ta.bb(close, length, mult)
width = (bb.upper - bb.lower) / bb.middle * 100

// === PLOTTING ===
plot(bb.upper, color=color.red, title="Upper")
plot(bb.middle, color=color.blue, title="Middle")
plot(bb.lower, color=color.green, title="Lower")

// === SIGNALS ===
if showSignals
    // Buy: Touch lower band + bounce
    buySignal = ta.crossover(close, bb.lower)
    // Sell: Touch upper band + reversal
    sellSignal = ta.crossunder(close, bb.upper)

    plotshape(buySignal, location=location.belowbar, style=shape.labelup, color=color.lime, text="BUY")
    plotshape(sellSignal, location=location.abovebar, style=shape.labeldown, color=color.red, text="SELL")
```

---

## BB Strategies

### Basic BB Strategy

```pinescript
//@version=6
strategy("BB Strategy")

bb = ta.bb(close, 20, 2)

// Long entry
if ta.crossover(close, bb.lower)
    strategy.entry("BB Long", strategy.long)

// Short entry
if ta.crossunder(close, bb.upper)
    strategy.entry("BB Short", strategy.short)

// Exit at middle
if ta.crossover(close, bb.middle)
    strategy.close_all()

plot(bb.upper)
plot(bb.middle)
plot(bb.lower)
```

### BB Squeeze Breakout Strategy

```pinescript
//@version=6
strategy("BB Squeeze Breakout")

length = input.int(20, "Length")

bb = ta.bb(close, length, 2)

// Squeeze
squeeze = (bb.upper - bb.lower) / bb.middle < 0.02

// Breakout
longEntry = close > bb.upper and squeeze
shortEntry = close < bb.lower and squeeze

if longEntry
    strategy.entry("Long", strategy.long)

if shortEntry
    strategy.entry("Short", strategy.short)

// Exit
strategy.exit("Exit", stop=strategy.position_avg_price * 0.98, limit=strategy.position_avg_price * 1.04)

plot(bb.upper)
plot(bb.lower)
```

### BB Mean Reversion Strategy

```pinescript
//@version=6
strategy("BB Mean Reversion")

bb = ta.bb(close, 20, 2)

// Oversold - buy
if close < bb.lower
    strategy.entry("Long", strategy.long)

// Overbought - sell
if close > bb.upper
    strategy.entry("Short", strategy.short)

// Exit at middle band
if strategy.position_size > 0 and close > bb.middle
    strategy.close_all()

if strategy.position_size < 0 and close < bb.middle
    strategy.close_all()

plot(bb.upper)
plot(bb.middle)
plot(bb.lower)
```

---

## BB Reference

| Concept | Description |
|---------|-------------|
| Upper Band | Middle + (StdDev × 2) |
| Middle Band | 20-period SMA |
| Lower Band | Middle - (StdDev × 2) |
| Narrow Bands | Low volatility / Squeeze |
| Wide Bands | High volatility |
| Price at 0% | At lower band |
| Price at 100% | At upper band |

---

## Next Steps

- **[[pinescript-indicators-atr]]** - Learn ATR indicator
- **[[pinescript-indicators-volume]]** - Learn Volume analysis
- **[[pinescript-strategies-basics]]** - Build strategies

---

*Bollinger Bands adapt to volatility and help identify price extremes.*
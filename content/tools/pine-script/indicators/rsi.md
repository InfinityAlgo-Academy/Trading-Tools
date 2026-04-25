---
title: "RSI Indicator in Pine Script"
description: "Build complete RSI indicators in Pine Script - from basic RSI to advanced implementations with divergences, multi-timeframe analysis, and trading strategies."
tags: [pine-script, indicators, rsi, oscillator]
slug: pinescript-indicators-rsi
---

# RSI Indicator in Pine Script

The Relative Strength Index (RSI) is one of the most popular momentum oscillators. This guide covers everything from basic RSI to advanced implementations.

---

## Basic RSI

### Simple RSI

```pinescript
//@version=6
indicator("RSI Basic", overlay=false)

length = input.int(14, "RSI Length")

rsi = ta.rsi(close, length)

plot(rsi, title="RSI", color=color.blue, linewidth=2)
hline(70, color=color.red, linestyle=hline.style_dashed)
hline(30, color=color.green, linestyle=hline.style_dashed)
hline(50, color=color.gray)
```

### RSI with Background

```pinescript
//@version=6
indicator("RSI with Background", overlay=false)

rsi = ta.rsi(close, 14)

plot(rsi, color=color.blue)

// Background colors
bgColor = rsi > 70 ? color.new(color.red, 90) : rsi < 30 ? color.new(color.green, 90) : na
bgcolor(bgColor)

hline(70)
hline(30)
hline(50, color=color.gray)
```

---

## RSI with Custom Parameters

### Adjustable RSI

```pinescript
//@version=6
indicator("Custom RSI", overlay=false)

// Input parameters
rsiLength = input.int(14, "RSI Length")
obLevel = input.float(70, "Overbought", minval=50, maxval=100)
osLevel = input.float(30, "Oversold", minval=0, maxval=50)

// Calculate RSI
rsi = ta.rsi(close, rsiLength)

// Plot
plot(rsi, color=color.purple, linewidth=2)

// Levels
hline(obLevel, color=color.red, linestyle=hline.style_dashed)
hline(osLevel, color=color.green, linestyle=hline.style_dashed)
hline(50, color=color.gray)

// Background zones
fill(plot1=plot(100), plot2=plot(obLevel), color=color.new(color.red, 90))
fill(plot1=plot(osLevel), plot2=plot(0), color=color.new(color.green, 90))
```

---

## RSI Color Coding

### Dynamic Colors Based on RSI Value

```pinescript
//@version=6
indicator("RSI Color Coded", overlay=false)

rsi = ta.rsi(close, 14)

// Color based on value
rsiColor = rsi > 70 ? color.red : rsi < 30 ? color.green : color.blue

plot(rsi, color=rsiColor, linewidth=2)

// Fill zones
fill(plot1=plot(rsi), plot2=plot(70), color=rsi > 70 ? color.new(color.red, 80) : color.new(color.gray, 90))
fill(plot1=plot(rsi), plot2=plot(30), color=rsi < 30 ? color.new(color.green, 80) : color.new(color.gray, 90))

hline(70)
hline(30)
```

---

## RSI with Moving Average

### RSI SMA Overlay

```pinescript
//@version=6
indicator("RSI with MA", overlay=false)

rsiLength = input.int(14, "RSI Length")
maLength = input.int(9, "MA Length")

rsi = ta.rsi(close, rsiLength)
rsiMA = ta.sma(rsi, maLength)

// Plot both
plot(rsi, color=color.blue, title="RSI")
plot(rsiMA, color=color.orange, title="RSI MA")

// Crosses
rsiCrossUp = ta.crossover(rsi, rsiMA)
rsiCrossDown = ta.crossunder(rsi, rsiMA)

plotshape(rsiCrossUp, location=location.bottom, style=shape.arrowup, color=color.lime)
plotshape(rsiCrossDown, location=location.top, style=shape.arrowdown, color=color.red)

hline(70)
hline(30)
hline(50)
```

---

## RSI Overbought/Oversold Signals

### Trading Signals

```pinescript
//@version=6
indicator("RSI Signals", overlay=true)

// Parameters
length = input.int(14, "RSI Length")
overbought = input.float(70, "Overbought")
oversold = input.float(30, "Oversold")

// Calculate
rsi = ta.rsi(close, length)
sma20 = ta.sma(close, 20)

// Signals
buySignal = ta.crossover(rsi, oversold)
sellSignal = ta.crossunder(rsi, overbought)

// Filter with trend
buyFilter = close > sma20
sellFilter = close < sma20

finalBuy = buySignal and buyFilter
finalSell = sellSignal and sellFilter

// Plot
plot(sma20, color=color.blue, title="SMA 20")

plotshape(finalBuy, location=location.belowbar, style=shape.labelup, color=color.green, text="RSI BUY")
plotshape(finalSell, location=location.abovebar, style=shape.labeldown, color=color.red, text="RSI SELL")

// Background
bgcolor(finalBuy ? color.new(color.green, 90) : finalSell ? color.new(color.red, 90) : na)
```

---

## RSI Divergence

### Bullish Divergence

```pinescript
//@version=6
indicator("RSI Divergence", overlay=false)

length = input.int(14, "RSI Length")
lookback = input.int(5, "Lookback")

rsi = ta.rsi(close, length)

// Find pivot lows on price
priceLow = ta.pivotlow(low, lookback, lookback)

// Find pivot lows on RSI
rsiLow = ta.pivotlow(rsi, lookback, lookback)

// Bullish divergence: price makes lower low, RSI makes higher low
bullishDiv = priceLow and rsiLow and low[lookback] < low[lookback * 2 + 1] and rsi[lookback] > rsi[lookback * 2 + 1]

plot(rsi)
plotshape(bullishDiv, location=location.bottom, style=shape.labelup, color=color.lime, text="BULLISH\nDIV")

hline(70)
hline(30)
```

### Bearish Divergence

```pinescript
//@version=6
indicator("RSI Bearish Divergence", overlay=false)

length = input.int(14, "RSI Length")
lookback = input.int(5, "Lookback")

rsi = ta.rsi(close, length)

// Find pivot highs
priceHigh = ta.pivothigh(high, lookback, lookback)
rsiHigh = ta.pivothigh(rsi, lookback, lookback)

// Bearish divergence: price makes higher high, RSI makes lower high
bearishDiv = priceHigh and rsiHigh and high[lookback] > high[lookback * 2 + 1] and rsi[lookback] < rsi[lookback * 2 + 1]

plot(rsi)
plotshape(bearishDiv, location=location.top, style=shape.labeldown, color=color.red, text="BEARISH\nDIV")

hline(70)
hline(30)
```

---

## Multi-Timeframe RSI

### RSI on Higher Timeframe

```pinescript
//@version=6
indicator("Multi-Timeframe RSI", overlay=false)

length = input.int(14, "RSI Length")
tf = input.timeframe("D", "Timeframe")

// Current RSI
rsiCurrent = ta.rsi(close, length)

// Higher timeframe RSI
rsiHTF = request.security(syminfo.tickerid, tf, ta.rsi(close, length))

// Plot both
plot(rsiCurrent, color=color.blue, title="Current RSI")
plot(rsiHTF, color=color.orange, title="HTF RSI", linewidth=2)

hline(70)
hline(30)
```

---

## RSI with Alerts

### Alert-Ready RSI

```pinescript
//@version=6
indicator("RSI with Alerts", overlay=false, explicit_plot_zorder=true)

rsiLength = input.int(14, "RSI Length")

rsi = ta.rsi(close, rsiLength)

// Plot
plot(rsi, title="RSI", color=color.blue, linewidth=2)
hline(70, color=color.red)
hline(30, color=color.green)
hline(50, color=color.gray)

// Alert conditions
alertcondition(rsi < 30, title="Oversold", message="RSI Oversold - Potential Buy")
alertcondition(rsi > 70, title="Overbought", message="RSI Overbought - Potential Sell")
alertcondition(ta.crossover(rsi, 30), title="RSI Cross Up", message="RSI crossed above 30 - Buy Signal")
alertcondition(ta.crossunder(rsi, 70), title="RSI Cross Down", message="RSI crossed below 70 - Sell Signal")
```

---

## Complete RSI Indicator

```pinescript
//@version=6
indicator("Complete RSI System", overlay=false)

// === INPUTS ===
rsiLength = input.int(14, "RSI Length")
maLength = input.int(9, "MA Length")
obLevel = input.float(70, "Overbought")
osLevel = input.float(30, "Oversold")
showDiv = input.bool(true, "Show Divergences")
showSignals = input.bool(true, "Show Signals")

// === CALCULATIONS ===
rsi = ta.rsi(close, rsiLength)
rsiMA = ta.sma(rsi, maLength)

// === PLOTTING ===
plot(rsi, title="RSI", color=color.blue, linewidth=2)
plot(rsiMA, title="RSI MA", color=color.orange)

// Levels
hline(obLevel, color=color.red)
hline(osLevel, color=color.green)
hline(50, color=color.gray)

// === SIGNALS ===
if showSignals
    // Buy: RSI crosses above oversold
    buySignal = ta.crossover(rsi, osLevel)
    // Sell: RSI crosses below overbought
    sellSignal = ta.crossunder(rsi, obLevel)
    // Signal line cross
    buyCross = ta.crossover(rsi, rsiMA)
    sellCross = ta.crossunder(rsi, rsiMA)

    plotshape(buySignal, location=location.bottom, style=shape.arrowup, color=color.lime, size=size.tiny)
    plotshape(sellSignal, location=location.top, style=shape.arrowdown, color=color.red, size=size.tiny)
    plotshape(buyCross, location=location.bottom, style=shape.cross, color=color.green, size=size.tiny)
    plotshape(sellCross, location=location.top, style=shape.cross, color=color.maroon, size=size.tiny)

// === DIVERGENCES ===
if showDiv
    lookback = 5
    priceLow = ta.pivotlow(low, lookback, lookback)
    rsiLow = ta.pivotlow(rsi, lookback, lookback)

    plotshape(priceLow and rsiLow, location=location.bottom, style=shape.labelup, color=color.lime, text="DIV")
```

---

## RSI Strategies

### RSI Only Strategy

```pinescript
//@version=6
strategy("RSI Strategy", overlay=false)

length = input.int(14, "RSI Length")
overbought = input.float(70, "Overbought")
oversold = input.float(30, "Oversold")
qty = input.float(10, "Quantity %")

rsi = ta.rsi(close, length)

// Long entry
if ta.crossover(rsi, oversold)
    strategy.entry("RSI Long", strategy.long, qty_percent=qty)

// Short entry
if ta.crossunder(rsi, overbought)
    strategy.entry("RSI Short", strategy.short, qty_percent=qty)

// Exit
if ta.crossunder(rsi, 50)
    strategy.close_all()

plot(rsi)
hline(overbought)
hline(oversold)
```

### RSI + MA Strategy

```pinescript
//@version=6
strategy("RSI + MA Strategy", overlay=true)

rsiLength = input.int(14, "RSI")
smaLength = input.int(50, "SMA")
oversold = input.float(35, "Oversold")
overbought = input.float(65, "Overbought")

rsi = ta.rsi(close, rsiLength)
smaVal = ta.sma(close, smaLength)

// Filter: price above SMA
aboveSMA = close > smaVal
belowSMA = close < smaVal

// Entry signals
longCondition = ta.crossover(rsi, oversold) and aboveSMA
shortCondition = ta.crossunder(rsi, overbought) and belowSMA

if longCondition
    strategy.entry("Long", strategy.long)

if shortCondition
    strategy.entry("Short", strategy.short)

// Exit
if ta.crossunder(rsi, 50)
    strategy.close_all()

plot(smaVal)
plot(rsi, scale=scale.left)
hline(overbought)
hline(oversold)
```

---

## RSI Reference

| Concept | Description |
|---------|-------------|
| RSI > 70 | Overbought - potential sell |
| RSI < 30 | Oversold - potential buy |
| RSI = 50 | Neutral |
| RSI crosses up | Bullish momentum |
| RSI crosses down | Bearish momentum |

---

## Next Steps

- **[[pinescript-indicators-macd]]** - Learn MACD
- **[[pinescript-indicators-bollinger-bands]]** - Learn Bollinger Bands
- **[[pinescript-strategies-basics]]** - Build strategies

---

*RSI is a versatile indicator for identifying overbought/oversold conditions.*
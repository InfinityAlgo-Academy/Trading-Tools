---
title: "MACD Indicator in Pine Script"
description: "Build MACD indicators in Pine Script - complete guide with histogram, signal crossovers, divergences, and trading strategies."
tags: [pine-script, indicators, macd, oscillator]
slug: pinescript-indicators-macd
---

# MACD Indicator in Pine Script

The Moving Average Convergence Divergence (MACD) is a versatile momentum indicator. This guide covers all MACD implementations.

---

## Basic MACD

### Simple MACD

```pinescript
//@version=6
indicator("MACD Basic", overlay=false)

fastLength = input.int(12, "Fast Length")
slowLength = input.int(26, "Slow Length")
signalLength = input.int(9, "Signal Length")

[macdLine, signalLine, histLine] = ta.macd(close, fastLength, slowLength, signalLength)

plot(macdLine, color=color.blue, title="MACD")
plot(signalLine, color=color.orange, title="Signal")
plot(histLine, title="Histogram", color=color.gray, style=plot.style_histogram)
hline(0)
```

### MACD with Colors

```pinescript
//@version=6
indicator("MACD Color", overlay=false)

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Color histogram based on direction
histColor = hist >= 0 ? color.green : color.red

plot(hist, title="Histogram", color=histColor, style=plot.style_histogram, histbase=0)
plot(macd, color=color.blue)
plot(signal, color=color.orange)

hline(0)
```

---

## Custom MACD Calculation

### Manual MACD

```pinescript
//@version=6
indicator("Manual MACD", overlay=false)

fast = input.int(12, "Fast")
slow = input.int(26, "Slow")
signal = input.int(9, "Signal")

// Calculate EMAs
emaFast = ta.ema(close, fast)
emaSlow = ta.ema(close, slow)

// MACD Line
macdLine = emaFast - emaSlow

// Signal Line
signalLine = ta.ema(macdLine, signal)

// Histogram
histogram = macdLine - signalLine

// Plot
plot(macdLine, color=color.blue, title="MACD")
plot(signalLine, color=color.orange, title="Signal")
plot(histogram, title="Histogram", color=histogram >= 0 ? color.green : color.red, style=plot.style_histogram)

hline(0)
```

---

## MACD Crossover Signals

### Basic Crossover

```pinescript
//@version=6
indicator("MACD Crossover", overlay=false)

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Crossover signals
bullishCross = ta.crossover(macd, signal)
bearishCross = ta.crossunder(macd, signal)

// Plot
plot(macd, color=color.blue)
plot(signal, color=color.orange)
plot(hist, title="Hist", color=hist >= 0 ? color.green : color.red, style=plot.style_histogram)

// Signals
plotshape(bullishCross, location=location.bottom, style=shape.arrowup, color=color.lime, size=size.tiny)
plotshape(bearishCross, location=location.top, style=shape.arrowdown, color=color.red, size=size.tiny)

hline(0)
```

### Crossover on Chart

```pinescript
//@version=6
indicator("MACD Crossover on Chart", overlay=true)

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

sma20 = ta.sma(close, 20)

// Filter with trend
uptrend = close > sma20
macdCrossUp = ta.crossover(macd, signal)
macdCrossDown = ta.crossunder(macd, signal)

buySignal = macdCrossUp and uptrend
sellSignal = macdCrossDown and not uptrend

plot(sma20, color=color.blue)

plotshape(buySignal, location=location.belowbar, style=shape.labelup, color=color.green, text="MACD\nBUY")
plotshape(sellSignal, location=location.abovebar, style=shape.labeldown, color=color.red, text="MACD\nSELL")
```

---

## MACD Zero Line Cross

### Zero Line Signals

```pinescript
//@version=6
indicator("MACD Zero Cross", overlay=false)

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Zero line crosses
aboveZero = ta.crossover(macd, 0)
belowZero = ta.crossunder(macd, 0)

plot(macd, color=color.blue)
plot(signal, color=color.orange)

plotshape(aboveZero, location=location.bottom, style=shape.arrowup, color=color.green, text="ABOVE 0")
plotshape(belowZero, location=location.top, style=shape.arrowdown, color=color.red, text="BELOW 0")

hline(0)
```

---

## MACD Histogram

### Histogram Only

```pinescript
//@version=6
indicator("MACD Histogram Only", overlay=false)

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Gradient colors
barColor = hist > hist[1] ? color.lime : color.red

plot(hist, title="Histogram", color=barColor, style=plot.style_histogram, histbase=0, linewidth=2)

hline(0)
```

### Histogram with Zones

```pinescript
//@version=6
indicator("MACD Histogram Zones", overlay=false)

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Strong momentum (large histogram)
strongMomentum = math.abs(hist) > math.abs(hist[1]) * 1.5

barColor = hist >= 0 ? color.green : color.red
barColorStrong = hist >= 0 ? color.lime : color.maroon

plot(hist, title="Histogram", color=strongMomentum ? barColorStrong : barColor, style=plot.style_histogram, histbase=0)

hline(0)
```

---

## MACD Divergence

### Bullish Divergence

```pinescript
//@version=6
indicator("MACD Bullish Divergence", overlay=true)

lookback = input.int(5, "Lookback")

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Find pivot lows
priceLow = ta.pivotlow(low, lookback, lookback)
macdLow = ta.pivotlow(hist, lookback, lookback)

// Divergence: price lower low, MACD higher low
bullishDiv = priceLow and macdLow and low[lookback] < low[lookback * 2 + 1] and hist[lookback] > hist[lookback * 2 + 1]

sma20 = ta.sma(close, 20)
plot(sma20)

plotshape(bullishDiv, location=location.belowbar, style=shape.labelup, color=color.lime, text="BULLISH\nDIV")
```

### Bearish Divergence

```pinescript
//@version=6
indicator("MACD Bearish Divergence", overlay=true)

lookback = 5

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Find pivot highs
priceHigh = ta.pivothigh(high, lookback, lookback)
macdHigh = ta.pivothigh(hist, lookback, lookback)

// Divergence: price higher high, MACD lower high
bearishDiv = priceHigh and macdHigh and high[lookback] > high[lookback * 2 + 1] and hist[lookback] < hist[lookback * 2 + 1]

sma20 = ta.sma(close, 20)
plot(sma20)

plotshape(bearishDiv, location=location.abovebar, style=shape.labeldown, color=color.red, text="BEARISH\nDIV")
```

---

## Multi-Timeframe MACD

### HTF MACD

```pinescript
//@version=6
indicator("Multi-Timeframe MACD", overlay=false)

tf = input.timeframe("D", "Timeframe")

[macdCurrent, signalCurrent, histCurrent] = ta.macd(close, 12, 26, 9)

[macdHTF, signalHTF, histHTF] = request.security(syminfo.tickerid, tf, ta.macd(close, 12, 26, 9))

// Current
plot(macdCurrent, color=color.blue, title="MACD")
plot(signalCurrent, color=color.orange, title="Signal")
plot(histCurrent, title="Hist", color=histCurrent >= 0 ? color.green : color.red, style=plot.style_histogram)

// HTF (line only)
plot(macdHTF, color=color.red, title="HTF MACD", linewidth=2)

hline(0)
```

---

## MACD with RSI Combo

### MACD + RSI

```pinescript
//@version=6
indicator("MACD + RSI", overlay=false)

rsiLength = input.int(14, "RSI Length")

// MACD
[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// RSI
rsi = ta.rsi(close, rsiLength)

// Combined signal: MACD cross + RSI extreme
buySignal = ta.crossover(macd, signal) and rsi < 40
sellSignal = ta.crossunder(macd, signal) and rsi > 60

// Plot MACD
plot(macd, color=color.blue)
plot(signal, color=color.orange)
plot(hist, title="Hist", color=hist >= 0 ? color.green : color.red, style=plot.style_histogram)

// Plot RSI
plot(rsi, color=color.purple, title="RSI", scale=scale.left)

hline(0)

// Signals
plotshape(buySignal, location=location.bottom, style=shape.arrowup, color=color.lime)
plotshape(sellSignal, location=location.top, style=shape.arrowdown, color=color.red)
```

---

## Complete MACD Indicator

```pinescript
//@version=6
indicator("Complete MACD", overlay=false)

// === INPUTS ===
fastLength = input.int(12, "Fast")
slowLength = input.int(26, "Slow")
signalLength = input.int(9, "Signal")
showHist = input.bool(true, "Show Histogram")
showCross = input.bool(true, "Show Crossovers")

// === CALCULATIONS ===
[macdLine, signalLine, histLine] = ta.macd(close, fastLength, slowLength, signalLength)

// === PLOTTING ===
plot(macdLine, color=color.blue, title="MACD", linewidth=2)
plot(signalLine, color=color.orange, title="Signal", linewidth=2)

if showHist
    histColor = histLine >= 0 ? color.green : color.red
    plot(histLine, title="Histogram", color=histColor, style=plot.style_histogram, histbase=0)

hline(0)

// === SIGNALS ===
if showCross
    bullishCross = ta.crossover(macdLine, signalLine)
    bearishCross = ta.crossunder(macdLine, signalLine)

    plotshape(bullishCross, location=location.bottom, style=shape.arrowup, color=color.lime, size=size.tiny)
    plotshape(bearishCross, location=location.top, style=shape.arrowdown, color=color.red, size=size.tiny)
```

---

## MACD Strategies

### Basic MACD Strategy

```pinescript
//@version=6
strategy("MACD Strategy")

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Long entry
if ta.crossover(macd, signal)
    strategy.entry("MACD Long", strategy.long)

// Short entry
if ta.crossunder(macd, signal)
    strategy.entry("MACD Short", strategy.short)

// Exit on reverse cross
if ta.crossunder(macd, signal)
    strategy.close("MACD Long")

if ta.crossover(macd, signal)
    strategy.close("MACD Short")

plot(macd)
plot(signal)
hline(0)
```

### MACD with Stop Loss

```pinescript
//@version=6
strategy("MACD with SL", overlay=true)

[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// ATR for stop
atr = ta.atr(14)

// Entry
if ta.crossover(macd, signal)
    strategy.entry("MACD Long", strategy.long)
    strategy.exit("SL", stop=strategy.position_avg_price - atr * 2, limit=strategy.position_avg_price + atr * 3)

if ta.crossunder(macd, signal)
    strategy.entry("MACD Short", strategy.short)
    strategy.exit("SL", stop=strategy.position_avg_price + atr * 2, limit=strategy.position_avg_price - atr * 3)

plot(ta.sma(close, 20))
```

### MACD + MA Filter

```pinescript
//@version=6
strategy("MACD + MA Filter")

[macd, signal, hist] = ta.macd(close, 12, 26, 9)
sma200 = ta.sma(close, 200)

// Trend filter
uptrend = close > sma200
downtrend = close < sma200

// Entries with trend filter
if uptrend and ta.crossover(macd, signal)
    strategy.entry("MACD Long", strategy.long)

if downtrend and ta.crossunder(macd, signal)
    strategy.entry("MACD Short", strategy.short)

// Exit
if ta.crossunder(macd, signal)
    strategy.close_all()

plot(sma200)
```

---

## MACD Reference

| Component | Formula | Description |
|-----------|---------|-------------|
| MACD Line | EMA(12) - EMA(26) | Fast - Slow EMA |
| Signal Line | EMA(9) of MACD | Smoothed MACD |
| Histogram | MACD - Signal | Momentum |
| Positive | MACD > Signal | Bullish |
| Negative | MACD < Signal | Bearish |

---

## Next Steps

- **[[tools/pine-script/indicators/bollinger-bands]]** - Learn Bollinger Bands
- **[[tools/pine-script/indicators/atr]]** - Learn ATR
- **[[tools/pine-script/strategies/basics]]** - Build strategies

---

*MACD is a powerful indicator for identifying trend changes and momentum.*
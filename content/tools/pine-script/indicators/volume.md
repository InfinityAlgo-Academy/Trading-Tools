---
title: "Volume Indicators in Pine Script"
description: "Build volume-based indicators in Pine Script - VWAP, OBV, Volume profiles, and volume analysis for trading decisions."
tags: [pine-script, indicators, volume, vwap, obv]
slug: pinescript-indicators-volume
---

# Volume Indicators in Pine Script

Volume is a crucial indicator of market strength. This guide covers all volume-based indicators in Pine Script.

---

## Basic Volume

### Volume Plot

```pinescript
//@version=6
indicator("Volume", overlay=false)

plot(volume, title="Volume", color=color.blue, style=plot.style_histogram)
```

### Colored Volume

```pinescript
//@version=6
indicator("Colored Volume", overlay=false)

// Green if up, red if down
volColor = close > open ? color.green : color.red

plot(volume, title="Volume", color=volColor, style=plot.style_histogram)
```

---

## VWAP (Volume Weighted Average Price)

### Basic VWAP

```pinescript
//@version=6
indicator("VWAP", overlay=true)

vwap = ta.vwap(close)

plot(vwap, color=color.purple, title="VWAP", linewidth=2)
```

### VWAP with Bands

```pinescript
//@version=6
indicator("VWAP Bands", overlay=true)

vwap = ta.vwap(close)
vwapSD = ta.stdev(vwap, 20)

upper = vwap + vwapSD * 2
lower = vwap - vwapSD * 2

plot(vwap, color=color.purple)
plot(upper, color=color.red)
plot(lower, color=color.green)
```

### Anchored VWAP

```pinescript
//@version=6
indicator("Anchored VWAP", overlay=true)

// Start from a specific date or bar
startBar = input.int(100, "Start Bar")

src = close[math.min(startBar, bar_index)]

cumVol = 0.0
cumVol := cumVol + volume
cumPV = 0.0
cumPV := cumPV + volume * close

avwap = cumPV / cumVol

plot(avwap, color=color.orange, title="Anchored VWAP")
```

---

## OBV (On-Balance Volume)

### Basic OBV

```pinescript
//@version=6
indicator("OBV", overlay=false)

obv = ta.obv()

plot(obv, title="OBV", color=color.blue)
```

### OBV with MA

```pinescript
//@version=6
indicator("OBV with MA", overlay=false)

obv = ta.obv()
obvMA = ta.sma(obv, 20)

plot(obv, title="OBV", color=color.blue)
plot(obvMA, title="OBV MA", color=color.orange)
```

### OBV Divergence

```pinescript
//@version=6
indicator("OBV Divergence", overlay=true)

obv = ta.obv()
sma20 = ta.sma(close, 20)

// Price makes new high
priceNewHigh = high > ta.highest(high, 20)[1]

// OBV divergence
obvDiv = obv < ta.highest(obv, 20)[1]

signal = priceNewHigh and obvDiv

plot(sma20, color=color.blue)
plotshape(signal, location=location.belowbar, style=shape.labelup, color=color.red, text="DIV")
```

---

## Volume MA

### Volume Moving Average

```pinescript
//@version=6
indicator("Volume MA", overlay=false)

volMA = ta.sma(volume, 20)

plot(volume, title="Volume", color=color.gray, style=plot.style_histogram)
plot(volMA, title="Volume MA", color=color.blue)

hline(volMA, color=color.orange, linestyle=hline.style_dashed)
```

### Volume Surge

```pinescript
//@version=6
indicator("Volume Surge", overlay=false)

volMA = ta.sma(volume, 20)
volSurge = volume > volMA * 2

volColor = volSurge ? color.red : color.gray

plot(volume, title="Volume", color=volColor, style=plot.style_histogram)
plot(volMA, title="MA", color=color.blue)
```

---

## Volume Profile

### Simple Volume Profile

```pinescript
//@version=6
indicator("Volume Profile", overlay=false)

// Calculate visible range
highestBar = ta.highest_bar(id=bar_index, length=input.int(100, "Lookback"))
lowestBar = ta.lowest_bar(id=bar_index, length=input.int(100, "Lookback"))

// POC (Point of Control)
volAtPrice = array.new_float(0)

for i = 0 to 100
    // Simplified - just show current bar volume
    array.push(volAtPrice, volume)

plot(volume, style=plot.style_histogram, color=color.blue)
```

---

## Money Flow

### Money Flow Index

```pinescript
//@version=6
indicator("MFI", overlay=false)

mfi = ta.mfi(close, 14)

plot(mfi, title="MFI", color=color.purple)

hline(80, color=color.red, linestyle=hline.style_dashed)
hline(20, color=color.green, linestyle=hline.style_dashed)
```

### Chaikin Money Flow

```pinescript
//@version=6
indicator("CMF", overlay=false)

length = input.int(20, "Length")

// Money Flow Multiplier
mfm = ((close - low) - (high - close)) / (high - low)

// Money Flow Volume
mfv = mfm * volume

// Chaikin Money Flow
cmf = ta.sma(mfv, length) / ta.sma(volume, length)

plot(cmf, title="CMF", color=color.blue)

hline(0, color=color.gray)
hline(0.05, color=color.green, linestyle=hline.style_dashed)
hline(-0.05, color=color.red, linestyle=hline.style_dashed)
```

---

## Accumulation/Distribution

### A/D Line

```pinescript
//@version=6
indicator("Accumulation/Distribution", overlay=false)

ad = ta.ad()

plot(ad, title="A/D", color=color.blue)
```

### A/D with MA

```pinescript
//@version=6
indicator("A/D with MA", overlay=false)

ad = ta.ad()
adMA = ta.sma(ad, 20)

plot(ad, title="A/D", color=color.blue)
plot(adMA, title="A/D MA", color=color.orange)
```

---

## Complete Volume Indicator

```pinescript
//@version=6
indicator("Complete Volume System", overlay=false)

// === INPUTS ===
showVWAP = input.bool(true, "Show VWAP")
showOBV = input.bool(true, "Show OBV")
showMFI = input.bool(true, "Show MFI")

// === CALCULATIONS ===
vwap = ta.vwap(close)
obv = ta.obv()
mfi = ta.mfi(close, 14)

// === PLOTTING ===
// VWAP (on separate indicator for clarity)
if showVWAP
    label.new(bar_index, vwap, "VWAP", color=color.purple)

// Volume
volColor = close > open ? color.green : color.red
plot(volume, title="Volume", color=volColor, style=plot.style_histogram)

// OBV
if showOBV
    plot(obv, title="OBV", color=color.blue, scale=scale.left)

// MFI
if showMFI
    plot(mfi, title="MFI", color=color.purple, scale=scale.left)
    hline(80, color=color.red, linestyle=hline.style_dashed, scale=scale.left)
    hline(20, color=color.green, linestyle=hline.style_dashed, scale=scale.left)
```

---

## Volume Strategies

### Volume Breakout Strategy

```pinescript
//@version=6
strategy("Volume Breakout")

volMA = ta.sma(volume, 20)
volumeSurge = volume > volMA * 1.5

sma20 = ta.sma(close, 20)
breakout = close > sma20 and volumeSurge

if breakout
    strategy.entry("Long", strategy.long)

// Exit
if ta.crossunder(close, sma20)
    strategy.close_all()

plot(sma20)
plot(volMA, color=color.orange)
```

### VWAP Reversal Strategy

```pinescript
//@version=6
strategy("VWAP Reversal")

vwap = ta.vwap(close)

// Buy at VWAP support
buyAtVWAP = ta.crossover(close, vwap)

// Sell at VWAP resistance
sellAtVWAP = ta.crossunder(close, vwap)

if buyAtVWAP
    strategy.entry("Long", strategy.long)

if sellAtVWAP
    strategy.entry("Short", strategy.short)

plot(vwap, color=color.purple)
```

### MFI Strategy

```pinescript
//@version=6
strategy("MFI Strategy")

mfi = ta.mfi(close, 14)

// Oversold
if mfi < 20
    strategy.entry("Long", strategy.long)

// Overbought
if mfi > 80
    strategy.close_all()

plot(mfi)
hline(80)
hline(20)
```

---

## Volume Reference

| Indicator | Description |
|-----------|-------------|
| Volume | Number of shares traded |
| VWAP | Volume-weighted average price |
| OBV | Cumulative volume direction |
| MFI | Money flow index (0-100) |
| A/D | Accumulation/Distribution |

---

## Next Steps

- **[[pinescript-strategies-basics]]** - Build strategies
- **[[pinescript-strategies-entries-exits]]** - Entry/Exit logic
- **[[pinescript-strategies-backtesting]]** - Backtest strategies

---

*Volume confirms price moves and reveals institutional activity.*
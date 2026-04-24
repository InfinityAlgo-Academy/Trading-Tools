---
title: "Moving Averages Pine Script"
tags:
  - technical-analysis
  - moving-average
  - pinescript
  - tradingview
  - code
---

# Moving Averages - Pine Script Implementation

This article provides Pine Script code for TradingView. Pine Script is TradingView's programming language for creating custom indicators and strategies.

## Getting Started

### Version
This code uses Pine Script v5, the latest version.

### Quick Start
```pinescript
//@version=5
indicator("My Moving Average", overlay=true)

// Calculate and plot
plot(ta.sma(close, 20), title="SMA 20", color=color.blue)
```

## Simple Moving Average (SMA)

### Built-in SMA
```pinescript
//@version=5
indicator("SMA Example", overlay=true)

// Built-in SMA function
plot(ta.sma(close, 20), title="SMA 20", color=color.blue)
```

### Custom SMA Function
```pinescript
//@version=5
indicator("Custom SMA", overlay=true)

// Custom SMA function
custom_sma(src, length) =>
    sum = 0.0
    for i = 0 to length - 1
        sum := sum + src[i]
    sum / length

// Plot custom SMA
plot(custom_sma(close, 20), title="Custom SMA", color=color.orange)
```

### SMA with Multiple Periods
```pinescript
//@version=5
indicator("Multiple SMA", overlay=true)

sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)
sma200 = ta.sma(close, 200)

plot(sma20, title="SMA 20", color=color.green)
plot(sma50, title="SMA 50", color=color.blue)
plot(sma200, title="SMA 200", color=color.red)
```

## Exponential Moving Average (EMA)

### Built-in EMA
```pinescript
//@version=5
indicator("EMA Example", overlay=true)

// Built-in EMA function
plot(ta.ema(close, 20), title="EMA 20", color=color.purple)
```

### Custom EMA Function
```pinescript
//@version=5
indicator("Custom EMA", overlay=true)

// Custom EMA function
custom_ema(src, length) =>
    k = 2 / (length + 1)
    ema = 0.0
    ema := na(ema[1]) ? ta.sma(src, length) : src * k + ema[1] * (1 - k)
    ema

// Plot custom EMA
plot(custom_ema(close, 20), title="Custom EMA", color=color.fuchsia)
```

### Multi-Period EMA
```pinescript
//@version=5
indicator("Multiple EMA", overlay=true)

ema9 = ta.ema(close, 9)
ema21 = ta.ema(close, 21)
ema50 = ta.ema(close, 50)
ema200 = ta.ema(close, 200)

plot(ema9, title="EMA 9", color=#00FF00)
plot(ema21, title="EMA 21", color=#00AAFF)
plot(ema50, title="EMA 50", color=#FFAA00)
plot(ema200, title="EMA 200", color=#FF0000)
```

## Weighted Moving Average (WMA)

### Custom WMA Function
```pinescript
//@version=5
indicator("Custom WMA", overlay=true)

// Custom WMA function
custom_wma(src, length) =>
    sum = 0.0
    weightSum = 0.0
    for i = 0 to length - 1
        weight = length - i
        sum := sum + src[i] * weight
        weightSum := weightSum + weight
    sum / weightSum

// Plot WMA
plot(custom_wma(close, 20), title="WMA 20", color=color.teal)
```

### Alternative WMA
```pinescript
//@version=5
indicator("WMA Alternative", overlay=true)

// Alternative WMA using ta.wma
plot(ta.wma(close, 20), title="WMA 20", color=color.aqua)
```

## Smoothed Moving Average (SMMA)

### SMMA Function
```pinescript
//@version=5
indicator("SMMA", overlay=true)

// Smoothed Moving Average
custom_smma(src, length) =>
    smma = 0.0
    smma := (nz(smma[1]) * (length - 1) + src) / length
    smma

plot(custom_smma(close, 20), title="SMMA 20", color=color.lime)
```

## Volume-Weighted Moving Average (VWMA)

### VWMA Function
```pinescript
//@version=5
indicator("VWMA", overlay=true, format=format.price)

// VWMA function
custom_vwma(price, volume, length) =>
    num = 0.0
    denom = 0.0
    for i = 0 to length - 1
        num := num + price[i] * volume[i]
        denom := denom + volume[i]
    num / denom

plot(custom_vwma(close, volume, 20), title="VWMA 20", color=color.orange)

// Also plot SMA for comparison
plot(ta.sma(close, 20), title="SMA 20", color=color.gray)
```

## Triple Exponential Moving Average (TEMA)

### TEMA Function
```pinescript
//@version=5
indicator("TEMA", overlay=true)

// TEMA function
custom_tema(src, length) =>
    ema1 = ta.ema(src, length)
    ema2 = ta.ema(ema1, length)
    ema3 = ta.ema(ema2, length)
    3 * ema1 - 3 * ema2 + ema3

plot(custom_tema(close, 20), title="TEMA 20", color=color.red)
```

### TEMA with Bands
```pinescript
//@version=5
indicator("TEMA with Bands", overlay=true)

length = input.int(20, "Length")

tema = custom_tema(close, length)
upper = tema + ta.atr(length) * 2
lower = tema - ta.atr(length) * 2

plot(tema, title="TEMA", color=color.blue)
plot(upper, title="Upper Band", color=color.red, linestyle=plot.line_dashed)
plot(lower, title="Lower Band", color=color.green, linestyle=plot.line_dashed)
```

## Hull Moving Average (HMA)

### HMA Function
```pinescript
//@version=5
indicator("HMA", overlay=true)

// Hull Moving Average
custom_hma(src, length) =>
    halfLength = math.floor(length / 2)
    sqrtLength = math.round(math.sqrt(length))
    
    wma1 = ta.wma(src * 2, halfLength)
    wma2 = ta.wma(src, length)
    diff = wma1 - wma2
    wma(diff, sqrtLength)

plot(custom_hma(close, 20), title="HMA 20", color=color.yellow)
```

### HMA Trend Indicator
```pinescript
//@version=5
indicator("HMA Trend", overlay=true, explicit_plot_zeros=true)

length = input.int(20, "Length")

hma = custom_hma(close, length)

// Color based on trend
hmaColor = close > hma ? color.green : color.red
plot(hma, title="HMA", color=hmaColor, linewidth=2)
```

## Complete Moving Average Indicator

### All-in-One Indicator
```pinescript
//@version=5
indicator("All Moving Averages", overlay=true, max_lines_count=500)

// Input parameters
maType = input.string("SMA", "MA Type", options=["SMA", "EMA", "WMA", "SMMA", "TEMA", "HMA"])
length = input.int(20, "Length")
src = input.source(close, "Source")

// MA function based on selection
ma(src, length, type) =>
    switch type
        "SMA" => ta.sma(src, length)
        "EMA" => ta.ema(src, length)
        "WMA" => ta.wma(src, length)
        "SMMA" => custom_smma(src, length)
        "TEMA" => custom_tema(src, length)
        "HMA" => custom_hma(src, length)

// Plot MA
plot(ma(src, length, maType), title=maType, color=color.blue)

// Helper function (must be defined in advance)
custom_smma(src, length) =>
    smma = 0.0
    smma := (nz(smma[1]) * (length - 1) + src) / length
    smma

custom_tema(src, length) =>
    ema1 = ta.ema(src, length)
    ema2 = ta.ema(ema1, length)
    ema3 = ta.ema(ema2, length)
    3 * ema1 - 3 * ema2 + ema3

custom_hma(src, length) =>
    halfLength = math.floor(length / 2)
    sqrtLength = math.round(math.sqrt(length))
    wma1 = ta.wma(src * 2, halfLength)
    wma2 = ta.wma(src, length)
    diff = wma1 - wma2
    ta.wma(diff, sqrtLength)
```

### Multiple MA Ribbon
```pinescript
//@version=5
indicator("MA Ribbon", overlay=true, max_lines_count=500)

emaType = input.string("EMA", "Type", options=["SMA", "EMA"])
showRibbon = input.bool(true, "Show Ribbon")
ribbonAlpha = input.float(0.5, "Ribbon Alpha", minval=0.1, maxval=1.0)

// Multiple periods
periods = array.from(10, 20, 30, 50, 70, 100, 140, 200)

for i = 0 to array.size(periods) - 1
    period = array.get(periods, i)
    ma = emaType == "SMA" ? ta.sma(close, period) : ta.ema(close, period)
    
    color = i == 0 ? color.green : 
            i == array.size(periods) - 1 ? color.red : 
            color.new(color.blue, ribbonAlpha * (i / array.size(periods)))
    
    plot(ma, title=str.tostring(period), color=color, linewidth=1)
```

## Moving Average Crossover Strategy

### Basic Crossover Strategy
```pinescript
//@version=5
strategy("MA Crossover", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Input parameters
shortLength = input.int(20, "Short MA")
longLength = input.int(50, "Long MA")
maType = input.string("SMA", "MA Type", options=["SMA", "EMA"])

// Calculate MAs
shortMA = maType == "SMA" ? ta.sma(close, shortLength) : ta.ema(close, shortLength)
longMA = maType == "SMA" ? ta.sma(close, longLength) : ta.ema(close, longLength)

// Plot
plot(shortMA, title="Short", color=color.green)
plot(longMA, title="Long", color=color.red)

// Entry conditions
longCondition = ta.crossover(shortMA, longMA)
shortCondition = ta.crossunder(shortMA, longMA)

// Execute trades
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Plot shapes for signals
plotshape(longCondition, title="Long Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.tiny, text="L")
plotshape(shortCondition, title="Short Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.tiny, text="S")
```

### Advanced Crossover with Filters
```pinescript
//@version=5
strategy("Advanced MA Crossover", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Parameters
fastLength = input.int(9, "Fast MA")
slowLength = input.int(21, "Slow MA")
atrLength = input.int(14, "ATR Period")
atrMultiplier = input.float(1.5, "ATR Multiplier")
maType = input.string("EMA", "Type", options=["SMA", "EMA"])

// Calculate MAs
fastMA = maType == "SMA" ? ta.sma(close, fastLength) : ta.ema(close, fastLength)
slowMA = maType == "SMA" ? ta.sma(close, slowLength) : ta.ema(close, slowLength)

// ATR for stop
atr = ta.atr(atrLength)

// Trend filter (200 EMA)
ema200 = ta.ema(close, 200)
trendUp = close > ema200

// Entry conditions
longSignal = ta.crossover(fastMA, slowMA) and trendUp
shortSignal = ta.crossunder(fastMA, slowMA) and not trendUp

// Stop loss
longStop = close - atr * atrMultiplier
shortStop = close + atr * atrMultiplier

// Execute trades
if (longSignal)
    strategy.entry("Long", strategy.long, stop=longStop)

if (shortSignal)
    strategy.entry("Short", strategy.short, stop=shortStop)

// Plot MAs
plot(fastMA, "Fast", color=color.green)
plot(slowMA, "Slow", color=color.red)
plot(ema200, "200 EMA", color=color.gray)

// Signals
plotshape(longSignal, "Long", location.belowbar, color.green, shape.triangleup)
plotshape(shortSignal, "Short", location.abovebar, color.red, shape.triangledown)
```

## Alerts

### Crossover Alert
```pinescript
//@version=5
indicator("MA Crossover Alert", overlay=true)

length1 = input.int(20, "Short")
length2 = input.int(50, "Long")

ma1 = ta.ema(close, length1)
ma2 = ta.ema(close, length2)

plot(ma1, "Short", color=color.green)
plot(ma2, "Long", color=color.red)

// Alerts
alertcondition(ta.crossover(ma1, ma2), title="Bullish Cross", message="EMA {{ticker}} bullish cross!")
alertcondition(ta.crossunder(ma1, ma2), title="Bearish Cross", message="EMA {{ticker}} bearish cross!")
```

## Complete Examples

### Professional MA Indicator
```pinescript
//@version=5
indicator("Professional MA Suite", overlay=true, max_lines_count=500)

// ============================================
// CONFIGURATION
// ============================================
type = input.string(defval="EMA", title="MA Type", options=["SMA", "EMA", "WMA", "SMMA", "TEMA", "HMA"])
src = input.source(defval=close, title="Source")
length = input.int(defval=20, title="Length", minval=1)

showSignals = input.bool(defval=true, title="Show Signals")
showLabels = input.bool(defval=true, title="Show Labels")
showCloud = input.bool(defval=true, title="Show Cloud")

// ============================================
// MOVING AVERAGE FUNCTIONS
// ============================================

f_sma(src, length) => ta.sma(src, length)
f_ema(src, length) => ta.ema(src, length)
f_wma(src, length) => ta.wma(src, length)
f_smma(src, length) =>
    smma = 0.0
    smma := (nz(smma[1]) * (length - 1) + src) / length
    smma
f_tema(src, length) =>
    ema1 = ta.ema(src, length)
    ema2 = ta.ema(ema1, length)
    ema3 = ta.ema(ema2, length)
    3 * ema1 - 3 * ema2 + ema3
f_hma(src, length) =>
    halfLen = math.floor(length / 2)
    sqrtLen = math.round(math.sqrt(length))
    wma1 = ta.wma(src * 2, halfLen)
    wma2 = ta.wma(src, length)
    diff = wma1 - wma2
    ta.wma(diff, sqrtLen)

// ============================================
// CALCULATION
// ============================================

getMA(type, src, length) =>
    switch type
        "SMA" => f_sma(src, length)
        "EMA" => f_ema(src, length)
        "WMA" => f_wma(src, length)
        "SMMA" => f_smma(src, length)
        "TEMA" => f_tema(src, length)
        "HMA" => f_hma(src, length)

maValue = getMA(type, src, length)

// Price position
priceAbove = close > maValue
maSlope = ta.change(maValue)
maRising = maSlope > 0
maFalling = maSlope < 0

// ============================================
// PLOTTING
// ============================================
// Main MA line
maColor = priceAbove ? color.new(#00FF00, 0) : color.new(#FF0000, 0)
plot(maValue, title=type, color=maColor, linewidth=2)

// Cloud (MA +/- 2%)
if showCloud
    upper = maValue * 1.02
    lower = maValue * 0.98
    fill(plot(upper, color=na), plot(lower, color=na), 
         color=priceAbove ? color.new(color.green, 90) : color.new(color.red, 90))

// ============================================
// SIGNALS
// ============================================
crossUp = ta.crossover(close, maValue)
crossDown = ta.crossunder(close, maValue)

if showSignals
    plotshape(crossUp, "Buy", location.belowbar, color.green, shape.triangleup, size=size.tiny)
    plotshape(crossDown, "Sell", location.abovebar, color.red, shape.triangledown, size=size.tiny)

// ============================================
// LABELS
// ============================================
if showLabels and barstate.islast
    priceStr = "Price: " + str.tostring(close, format.mintick)
    maStr = type + ": " + str.tostring(maValue, format.mintick)
    trendStr = "Trend: " + (priceAbove ? "BULLISH" : "BEARISH")
    
    label.new(bar_index, high, priceStr + "\n" + maStr + "\n" + trendStr, 
             xloc.bar_index, yloc.price, 
             color=priceAbove ? color.new(#00FF00, 80) : color.new(#FF0000, 80),
             textcolor=color.white, size=size.small)

// ============================================
// ALERTS
// ============================================
alertcondition(crossUp, "Price Cross Above " + type, 
              message="{{ticker}} price crossed ABOVE " + type)
alertcondition(crossDown, "Price Cross Below " + type, 
              message="{{ticker}} price crossed BELOW " + type)
```

## Conclusion

Pine Script provides powerful tools for creating moving average indicators:
- Built-in functions: `ta.sma()`, `ta.ema()`, `ta.wma()`
- Custom functions enable any MA type
- Alerts integrate with TradingView notifications
- Strategies allow backtesting with MA crossovers

Start with simple indicators and progressively add complexity. Test thoroughly with TradingView's paper trading before going live.
---
title: "Oscillators Pine Script v5"
tags:
  - technical-analysis
  - oscillators
  - pinescript
  - tradingview
  - code
---

# Oscillators - Pine Script v5 Implementation

This article provides Pine Script v5 code for all major trading oscillators for TradingView.

## Getting Started

```pinescript
//@version=5
indicator("Oscillators", overlay=false)

// Parameters
period = input.int(14, "Period")
```

---

## RSI (Relative Strength Index)

### Basic RSI

```pinescript
//@version=5
indicator("RSI", overlay=false)

length = input.int(14, "RSI Period")
overbought = input.float(70, "Overbought", minval=50, maxval=100)
oversold = input.float(30, "Oversold", minval=0, maxval=50)

// Calculate RSI
rsi = ta.rsi(close, length)

// Plot
plot(rsi, title="RSI", color=color.purple)

// Overbought/Oversold lines
hline(overbought, "Overbought", color=color.red, linestyle=hline.style_dashed)
hline(oversold, "Oversold", color=color.green, linestyle=hline.style_dashed)
hline(50, "Middle", color=color.gray)

// Fill zones
fill(hline(overbought), hline(50), title="Overbought Zone", 
     color=color.new(color.red, 90))
fill(hline(50), hline(oversold), title="Oversold Zone", 
     color=color.new(color.green, 90))
```

### RSI with Signals

```pinescript
//@version=5
indicator("RSI with Signals", overlay=false)

length = input.int(14, "RSI Period")
overbought = input.float(70, "Overbought")
oversold = input.float(30, "Oversold")

rsi = ta.rsi(close, length)

// RSI crossover levels
rsiCrossUp = ta.crossover(rsi, oversold)
rsiCrossDown = ta.crossunder(rsi, overbought)

// Plot RSI
plot(rsi, title="RSI", color=color.purple, linewidth=2)

// Lines
hline(overbought, "Overbought", color=color.red, linestyle=hline.style_dashed)
hline(oversold, "Oversold", color=color.green, linestyle=hline.style_dashed)
hline(50, "Middle", color=color.gray)

// Signals
plotshape(rsiCrossUp, title="Buy Signal", location=location.bottom,
         color=color.green, style=shape.triangleup, size=size.tiny, text="RSI\nBuy")
plotshape(rsiCrossDown, title="Sell Signal", location=location.top,
         color=color.red, style=shape.triangledown, size=size.tiny, text="RSI\nSell")
```

### RSI Divergence

```pinescript
//@version=5
indicator("RSI Divergence", overlay=false, format=format.price, precision=2)

length = input.int(14, "RSI Period")
lookback = input.int(50, "Lookback Period")

rsi = ta.rsi(close, length)

// Find pivots
pivots = ta.pivothigh(rsi, lookback, lookback)

// RSI higher low (bullish divergence)
rsiHigherLow = (rsi[lookback] < rsi[lookback*2]) and (close[lookback] > close[lookback*2])
rsiLowerHigh = (rsi[lookback] > rsi[lookback*2]) and (close[lookback] < close[lookback*2])

// Plot
plot(rsi, title="RSI", color=color.purple)
hline(70, "Overbought", color=color.red, linestyle=hline.style_dashed)
hline(30, "Oversold", color=color.green, linestyle=hline.style_dashed)

// Divergence markers
plotshape(rsiHigherLow, title="Bullish Divergence", location=location.bottom,
         color=color.green, style=shape.triangleup, size=size.tiny, text="DLG")
plotshape(rsiLowerHigh, title="Bearish Divergence", location=location.top,
         color=color.red, style=shape.triangledown, size=size.tiny, text="DLG")
```

---

## CCI (Commodity Channel Index)

### Basic CCI

```pinescript
//@version=5
indicator("CCI", overlay=false)

length = input.int(20, "CCI Period")

// Typical Price
tp = (high + low + close) / 3

// CCI calculation
cci = tp - ta.sma(tp, length)
cci := cci / (0.015 * ta.dev(tp, length))

// Plot
plot(cci, title="CCI", color=color.blue)

// Levels
hbox(100, "Overbought", color.red)
hbox(-100, "Oversold", color.green)
hbox(0, "Zero", color.gray)

// Fill zones
fill(hbox(100), hbox(0), title="Overbought", color.new(color.red, 90))
fill(hbox(0), hbox(-100), title="Oversold", color.new(color.green, 90))
```

### CCI with Signals

```pinescript
//@version=5
indicator("CCI Signals", overlay=false)

length = input.int(20, "CCI Period")
overbought = input.float(100, "Overbought")
oversold = input.float(-100, "Oversold")

// Typical Price
tp = (high + low + close) / 3

// CCI
cci = tp - ta.sma(tp, length)
cci := cci / (0.015 * ta.dev(tp, length))

// Signals
cciCrossUp = ta.crossover(cci, oversold)
cciCrossDown = ta.crossunder(cci, overbought)

// Plot
plot(cci, title="CCI", color=color.blue, linewidth=2)

// Levels
hline(overbought, "Overbought", color=color.red, linestyle=hline.style_dashed)
hline(oversold, "Oversold", color=color.green, linestyle=hline.style_dashed)
hline(0, "Zero", color=color.gray)

// Signals
plotshape(cciCrossUp, "CCI Buy", location.bottom, color.green, 
          shape.triangleup, size=size.tiny)
plotshape(cciCrossDown, "CCI Sell", location.top, color.red,
          shape.triangledown, size=size.tiny)
```

---

## MACD

### Basic MACD

```pinescript
//@version=5
indicator("MACD", overlay=false)

fast = input.int(12, "Fast EMA")
slow = input.int(26, "Slow EMA")
signal = input.int(9, "Signal")

// MACD components
[macdLine, signalLine, hist] = ta.macd(close, fast, slow, signal)

// Plot
plot(macdLine, title="MACD", color=color.blue)
plot(signalLine, title="Signal", color=color.orange)

// Histogram
plot(hist, title="Histogram", color=color.green, style=plot.style_histogram, 
     histbase=0)

// Zero line
hline(0, "Zero", color=color.gray)
```

### MACD with Histogram Colors

```pinescript
//@version=5
indicator("MACD Histogram Colors", overlay=false)

fast = input.int(12, "Fast")
slow = input.int(26, "Slow")
signal = input.int(9, "Signal")

[macdLine, signalLine, hist] = ta.macd(close, fast, slow, signal)

// Colors based on histogram values
histColor = hist >= 0 ? color.green : color.red

// Plot
plot(macdLine, title="MACD", color=color.blue, linewidth=2)
plot(signalLine, title="Signal", color=color.orange, linewidth=2)

// Histogram as columns
plot(hist, title="Histogram", color=histColor, style=plot.style_columns, 
     histbase=0, linewidth=2)

hline(0, "Zero", color=color.gray, linestyle=hline.style_dashed)
```

### MACD with Signals

```pinescript
//@version=5
indicator("MACD Signals", overlay=false)

fast = input.int(12, "Fast")
slow = input.int(26, "Slow")
signal = input.int(9, "Signal")

[macdLine, signalLine, hist] = ta.macd(close, fast, slow, signal)

// Golden Cross - MACD crosses above Signal
goldenCross = ta.crossover(macdLine, signalLine)

// Death Cross - MACD crosses below Signal
deathCross = ta.crossunder(macdLine, signalLine)

// MACD crosses zero
macdCrossUp = ta.crossover(macdLine, 0)
macdCrossDown = ta.crossunder(macdLine, 0)

// Plot
plot(macdLine, title="MACD", color=color.blue, linewidth=2)
plot(signalLine, title="Signal", color=color.orange, linewidth=2)
plot(hist, title="Histogram", color=color.green, style=plot.style_histogram, 
     histbase=0)

hline(0, "Zero", color=color.gray, linestyle=hline.style_dashed)

// Signals
plotshape(goldenCross, title="Golden Cross", location=location.bottom,
         color=color.green, style=shape.triangleup, size=size.tiny, text="GC")
plotshape(deathCross, title="Death Cross", location=location.top,
         color=color.red, style=shape.triangledown, size=size.tiny, text="DC")
```

### Complete MACD with Alerts

```pinescript
//@version=5
indicator("Complete MACD", overlay=true)

fast = input.int(12, "Fast EMA", group="MACD Settings")
slow = input.int(26, "Slow EMA", group="MACD Settings")
signal = input.int(9, "Signal EMA", group="MACD Settings")

// Source
src = close

// EMA calculations
emaFast = ta.ema(src, fast)
emaSlow = ta.ema(src, slow)
macd = emaFast - emaSlow
signalLine = ta.ema(macd, signal)
hist = macd - signalLine

// Plot on chart
plot(macd, title="MACD", color=color.blue, linewidth=2)
plot(signalLine, title="Signal", color=color.orange, linewidth=2)
plot(hist, title="Histogram", color=hist >= 0 ? color.green : color.red, 
     style=plot.style_columns, histbase=0, linewidth=2)

// Zero line
hline(0, "Zero Line", color=color.gray, linestyle=hline.style_dashed)

// Signals
goldenCross = ta.crossover(macd, signalLine)
deathCross = ta.crossunder(macd, signalLine)

plotshape(goldenCross, title="Golden Cross", location=location.bottom,
         color=color.green, style=shape.triangleup, size=size.tiny)
plotshape(deathCross, title="Death Cross", location=location.top,
         color=color.red, style=shape.triangledown, size=size.tiny)

// Alerts
alertcondition(goldenCross, title="Golden Cross", 
               message="MACD Golden Cross - BUY Signal")
alertcondition(deathCross, title="Death Cross", 
               message="MACD Death Cross - SELL Signal")
```

---

## Stochastic Oscillator

### Basic Stochastic

```pinescript
//@version=5
indicator("Stochastic", overlay=false)

kPeriod = input.int(14, "%K Period")
dPeriod = input.int(3, "%D Period")
smoothK = input.int(3, "Slowing")

// Calculate Stochastic
k = ta.stoch(close, high, low, kPeriod)
k := ta.sma(k, smoothK)
d = ta.sma(k, dPeriod)

// Plot
plot(k, title="%K", color=color.blue)
plot(d, title="%D", color=color.orange)

// Levels
hline(80, "Overbought", color=color.red, linestyle=hline.style_dashed)
hline(20, "Oversold", color=color.green, linestyle=hline.style_dashed)
```

### Stochastic with Signals

```pinescript
//@version=5
indicator("Stochastic Signals", overlay=false)

kPeriod = input.int(14, "%K Period")
dPeriod = input.int(3, "%D Period")
smoothK = input.int(3, "Slowing")
overbought = input.float(80, "Overbought")
oversold = input.float(20, "Oversold")

// Calculate Stochastic
k = ta.stoch(close, high, low, kPeriod)
k := ta.sma(k, smoothK)
d = ta.sma(k, dPeriod)

// Signals
longSignal = ta.crossover(k, d) and k < oversold
shortSignal = ta.crossunder(k, d) and k > overbought

// Plot
plot(k, title="%K", color=color.blue, linewidth=2)
plot(d, title="%D", color=color.orange, linewidth=2)

// Levels
hline(overbought, "Overbought", color=color.red, linestyle=hline.style_dashed)
hline(oversold, "Oversold", color=color.green, linestyle=hline.style_dashed)
hline(50, "Middle", color=color.gray)

// Signals
plotshape(longSignal, "Long", location.bottom, color.green,
          shape.triangleup, size=size.tiny)
plotshape(shortSignal, "Short", location.top, color.red,
          shape.triangledown, size=size.tiny)
```

---

## Williams %R

### Williams %R

```pinescript
//@version=5
indicator("Williams %R", overlay=false)

length = input.int(14, "Period")

// Calculate Williams %R
highest = ta.highest(high, length)
lowest = ta.lowest(low, length)
wr = -100 * (highest - close) / (highest - lowest)

// Plot
plot(wr, title="Williams %R", color=color.purple)

// Levels
hline(-20, "Overbought", color=color.red, linestyle=hline.style_dashed)
hline(-80, "Oversold", color=color.green, linestyle=hline.style_dashed)
hline(-50, "Middle", color=color.gray)

// Fill zones
fill(hline(-20), hline(-50), title="Overbought", color.new(color.red, 90))
fill(hline(-50), hline(-80), title="Oversold", color.new(color.green, 90))
```

---

## All-In-One Oscillator Indicator

### Complete Oscillator Suite

```pinescript
//@version=5
indicator("Complete Oscillator Suite", overlay=false, max_lines_count=500)

// ============================================
// RSI SECTION
// ============================================
rsiLength = input.int(14, "RSI Period", group="RSI")
rsiOb = input.float(70, "RSI Overbought", group="RSI")
rsiOs = input.float(30, "RSI Oversold", group="RSI")

rsi = ta.rsi(close, rsiLength)

// ============================================
// CCI SECTION  
// ============================================
cciLength = input.int(20, "CCI Period", group="CCI")
cciOb = input.float(100, "CCI Overbought", group="CCI")
cciOs = input.float(-100, "CCI Oversold", group="CCI")

tp = (high + low + close) / 3
cci = (tp - ta.sma(tp, cciLength)) / (0.015 * ta.dev(tp, cciLength))

// ============================================
// MACD SECTION
// ============================================
macdFast = input.int(12, "MACD Fast", group="MACD")
macdSlow = input.int(26, "MACD Slow", group="MACD")
macdSignal = input.int(9, "MACD Signal", group="MACD")

[macd, signal, hist] = ta.macd(close, macdFast, macdSlow, macdSignal)

// ============================================
// STOCHASTIC SECTION
// ============================================
stochK = input.int(14, "%K Period", group="Stochastic")
stochD = input.int(3, "%D Period", group="Stochastic")
stochSlow = input.int(3, "Slowing", group="Stochastic")
stochOb = input.float(80, "Overbought", group="Stochastic")
stochOs = input.float(20, "Oversold", group="Stochastic")

k = ta.stoch(close, high, low, stochK)
k := ta.sma(k, stochSlow)
d = ta.sma(k, stochD)

// ============================================
// PLOTTING
// ============================================
plot(rsi, title="RSI", color=color.purple, linewidth=2)

// RSI lines
line.new(bar_index - 1, rsiOb, bar_index, rsiOb, 
        xloc.bar_index, color=color.red, style=line.style_dashed)
line.new(bar_index - 1, rsiOs, bar_index, rsiOs,
        xloc.bar_index, color=color.green, style=line.style_dashed)

// Labels
var label rsiLabel = label.new(na, na, "", xloc.bar_index, yloc.price, 
                         color=na, textcolor=color.white, size=size.small)

if barstate.islast
    label.set_text(rsiLabel, "RSI: " + str.tostring(rsi, format.mintick))
```

### Professional Dashboard

```pinescript
//@version=5
indicator("Oscillator Dashboard", overlay=false)

// RSI
rsiLength = input.int(14, "RSI Period")
rsiVal = ta.rsi(close, rsiLength)

// MACD
[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Stochastic
k = ta.stoch(close, high, low, 14)
k := ta.sma(k, 3)
d = ta.sma(k, 3)

// CCI
tp = (high + low + close) / 3
cciVal = (tp - ta.sma(tp, 20)) / (0.015 * ta.dev(tp, 20))

// Create table
var table dash = table.new(position.top_right, columns=2, rows=5)

if barstate.islast
    // Header
    table.cell(dash, 0, 0, "Indicator", bgcolor=color.gray, text_color=color.white)
    table.cell(dash, 1, 0, "Value", bgcolor=color.gray, text_color=color.white)
    
    // RSI
    table.cell(dash, 0, 1, "RSI", bgcolor=color.gray)
    rsiColor = rsiVal > 70 ? color.red : rsiVal < 30 ? color.green : color.gray
    table.cell(dash, 1, 1, str.tostring(rsiVal, format.mintick), 
              bgcolor=color.new(rsiColor, 80))
    
    // MACD
    table.cell(dash, 0, 2, "MACD", bgcolor=color.gray)
    macdColor = macd > signal ? color.green : color.red
    table.cell(dash, 1, 2, str.tostring(macd, format.mintick),
              bgcolor=color.new(macdColor, 80))
    
    // Stochastic
    table.cell(dash, 0, 3, "Stoch %K", bgcolor=color.gray)
    stochColor = k > d ? color.green : color.red
    table.cell(dash, 1, 3, str.tostring(k, format.mintick),
              bgcolor=color.new(stochColor, 80))
    
    // CCI
    table.cell(dash, 0, 4, "CCI", bgcolor=color.gray)
    cciColor = cciVal > 100 ? color.red : cciVal < -100 ? color.green : color.gray
    table.cell(dash, 1, 4, str.tostring(cciVal, format.mintick),
              bgcolor=color.new(cciColor, 80))
```

### Combined Entry Signals

```pinescript
//@version=5
indicator("Combined Oscillator Signals", overlay=false)

showRsi = input.bool(true, "Show RSI")
showMacd = input.bool(true, "Show MACD")
showStoch = input.bool(true, "Show Stochastic")

// RSI
rsiVal = ta.rsi(close, 14)
rsiLong = ta.crossover(rsiVal, 30)
rsiShort = ta.crossunder(rsiVal, 70)

// MACD
[macd, signal, hist] = ta.macd(close, 12, 26, 9)
macdLong = ta.crossover(macd, signal)
macdShort = ta.crossunder(macd, signal)

// Stochastic
k = ta.stoch(close, high, low, 14)
k := ta.sma(k, 3)
d = ta.sma(k, 3)
stochLong = ta.crossover(k, 20)
stochShort = ta.crossunder(k, 80)

// Combined signals (all must agree)
comboLong = (rsiLong or stochLong) and macdLong
comboShort = (rsiShort or stochShort) and macdShort

// Plot
plot(rsiVal, title="RSI", color=color.purple)
// plot(macd) // Can uncomment to show MACD
plot(k, title="%K", color=color.blue)

hline(70, "RSI Overbought", color=color.red, linestyle=hline.style_dashed)
hline(30, "RSI Oversold", color=color.green, linestyle=hline.style_dashed)
hline(80, "Stoch Overbought", color=color.red, linestyle=hline.style_dashed)
hline(20, "Stoch Oversold", color=color.green, linestyle=hline.style_dashed)

// Buy/Sell signals
plotshape(comboLong, "Strong Buy", location.bottom, color.green,
         shape.triangleup, size=size.normal)
plotshape(comboShort, "Strong Sell", location.top, color.red,
         shape.triangledown, size=size.normal)

// Alerts
alertcondition(comboLong, "Combined Long", message="{{ticker}}: BUY - All oscillatorsagree!")
alertcondition(comboShort, "Combined Short", message="{{ticker}}: SELL - All oscillators agree!")
```

---

## Alert Conditions

```pinescript
// ============================================
// ALERT CONDITIONS
// ============================================

// RSI Alerts
rsi = ta.rsi(close, 14)

alertcondition(ta.crossover(rsi, 30), title="RSI Oversold",
              message="RSI entered oversold territory")
alertcondition(ta.crossunder(rsi, 70), title="RSI Overbought",
              message="RSI entered overbought territory")

// CCI Alerts
tp = (high + low + close) / 3
cci = (tp - ta.sma(tp, 20)) / (0.015 * ta.dev(tp, 20))

alertcondition(ta.crossover(cci, -100), title="CCI Oversold",
              message="CCI crossed above oversold level")
alertcondition(ta.crossunder(cci, 100), title="CCI Overbought", 
              message="CCI crossed below overbought level")

// MACD Alerts
[macd, signal, hist] = ta.macd(close, 12, 26, 9)

alertcondition(ta.crossover(macd, signal), title="MACD Golden Cross",
              message="MACD bullish crossover")
alertcondition(ta.crossunder(macd, signal), title="MACD Death Cross", 
              message="MACD bearish crossover")

// Stochastic Alerts
k = ta.stoch(close, high, low, 14)

alertcondition(ta.crossover(k, 20), title="Stochastic Oversold",
              message="Stochastic crossed above oversold")
alertcondition(ta.crossunder(k, 80), title="Stochastic Overbought",
              message="Stochastic crossed below overbought")
```

---

## Trading Strategy

### Oscillator Strategy

```pinescript
//@version=5
strategy("Oscillator Strategy", overlay=true, 
         default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// RSI
rsiLength = input.int(14, "RSI Period")
rsi = ta.rsi(close, rsiLength)

// MACD
[macd, signal, hist] = ta.macd(close, 12, 26, 9)

// Stochastic
kPeriod = input.int(14, "%K Period")
k = ta.stoch(close, high, low, kPeriod)
k := ta.sma(k, 3)
d = ta.sma(k, 3)

// Signals
longCondition = (rsi < 30) and (macd > signal) and (k < 20)
shortCondition = (rsi > 70) and (macd < signal) and (k > 80)

// Exit conditions
longExit = rsi > 60 or macd < signal
shortExit = rsi > 40 or macd > signal

if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

if (longExit and strategy.position_size > 0)
    strategy.close("Long")

if (shortExit and strategy.position_size < 0)
    strategy.close("Short")

// Plot
plot(rsi, "RSI", color=color.purple, display=display.none)
plot(macd, "MACD", color=color.blue, display=display.none)
```

## Conclusion

Pine Script v5 provides built-in functions for all major oscillators:
- RSI: `ta.rsi()`
- MACD: `ta.macd()` returns [MACD, Signal, Histogram]
- Stochastic: `ta.stoch()`
- CCI: Can be calculated manually

Key features:
- Built-in signals: `ta.crossover()`, `ta.crossunder()`
- Alerts: `alertcondition()` for notifications
- Strategy: Can backtest with `strategy.entry()`, `strategy.close()`
- Table: For dashboard display

Start with simple oscillators and progressively combine multiple indicators for more reliable signals.
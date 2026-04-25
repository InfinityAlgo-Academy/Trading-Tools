---
title: "Multi-Timeframe Analysis in Pine Script"
description: "Master multi-timeframe analysis in Pine Script. Learn to combine data from different timeframes for better trading decisions."
tags: [pine-script, advanced, multi-timeframe, security]
slug: pinescript-advanced-timeframes
---

# Multi-Timeframe Analysis in Pine Script

Multi-timeframe (MTF) analysis is a powerful technique for confirming signals and filtering trades. This guide covers all MTF techniques in Pine Script.

---

## Why Multi-Timeframe?

| Benefit | Description |
|---------|-------------|
| Better signals | Confirm with higher timeframe |
| Trend alignment | Trade with the broader trend |
| Reduced noise | Less false signals |
| Context | Understand market structure |

---

## Basic request.security()

### Get Higher Timeframe Data

```pinescript
//@version=6
indicator("HTF Data", overlay=true)

// Get daily data
dailyClose = request.security(syminfo.tickerid, "D", close)
dailySMA = request.security(syminfo.tickerid, "D", ta.sma(close, 20))

plot(dailyClose, color=color.orange)
plot(dailySMA, color=color.red)
```

### Common Timeframes

```pinescript
//@version=6
indicator("Common Timeframes", overlay=true)

// Different timeframes
m5 = request.security(syminfo.tickerid, "5", close)
h1 = request.security(syminfo.tickerid, "60", close)
h4 = request.security(syminfo.tickerid, "240", close)
d1 = request.security(syminfo.tickerid, "D", close)
w1 = request.security(syminfo.tickerid, "W", close)

plot(d1, color=color.red, linewidth=2)
```

---

## MTF Moving Averages

### Daily MA on Intraday

```pinescript
//@version=6
indicator("Daily MA", overlay=true)

// Daily SMA
sma20D = request.security(syminfo.tickerid, "D", ta.sma(close, 20))
sma50D = request.security(syminfo.tickerid, "D", ta.sma(close, 50))
sma200D = request.security(syminfo.tickerid, "D", ta.sma(close, 200))

plot(sma20D, color=color.green, title="Daily 20")
plot(sma50D, color=color.orange, title="Daily 50")
plot(sma200D, color=color.red, title="Daily 200")
```

### Multiple TF MAs

```pinescript
//@version=6
indicator("Multi TF MA", overlay=true)

// 1-hour MAs
h1sma20 = request.security(syminfo.tickerid, "60", ta.sma(close, 20))
h1sma50 = request.security(syminfo.tickerid, "60", ta.sma(close, 50))

// 4-hour MAs
h4sma20 = request.security(syminfo.tickerid, "240", ta.sma(close, 20))
h4sma50 = request.security(syminfo.tickerid, "240", ta.sma(close, 50))

// Daily MAs
d1sma20 = request.security(syminfo.tickerid, "D", ta.sma(close, 20))
d1sma50 = request.security(syminfo.tickerid, "D", ta.sma(close, 50))

plot(d1sma20, color=color.red, title="Daily 20", linewidth=2)
plot(d1sma50, color=color.maroon, title="Daily 50", linewidth=2)
```

---

## MTF Indicators

### Daily RSI

```pinescript
//@version=6
indicator("Daily RSI", overlay=false)

// Daily RSI
rsiD = request.security(syminfo.tickerid, "D", ta.rsi(close, 14))

plot(rsiD, title="Daily RSI", color=color.purple, linewidth=2)
hline(70)
hline(30)
```

### Daily MACD

```pinescript
//@version=6
indicator("Daily MACD", overlay=false)

[macd, signal, hist] = request.security(syminfo.tickerid, "D", ta.macd(close, 12, 26, 9))

plot(macd, color=color.blue)
plot(signal, color=color.orange)
plot(hist, title="Hist", color=hist >= 0 ? color.green : color.red, style=plot.style_histogram)

hline(0)
```

### Multiple TF RSI

```pinescript
//@version=6
indicator("Multi RSI", overlay=false)

rsiH1 = request.security(syminfo.tickerid, "60", ta.rsi(close, 14))
rsiH4 = request.security(syminfo.tickerid, "240", ta.rsi(close, 14))
rsiD = request.security(syminfo.tickerid, "D", ta.rsi(close, 14))

plot(rsiH1, color=color.blue, title="H1 RSI")
plot(rsiH4, color=color.orange, title="H4 RSI")
plot(rsiD, color=color.red, title="D1 RSI", linewidth=2)

hline(70)
hline(30)
```

---

## Trend Confirmation

### Trend Filter

```pinescript
//@version=6
indicator("Trend Filter", overlay=true)

// Daily trend
sma200D = request.security(syminfo.tickerid, "D", ta.sma(close, 200))
dailyTrend = close > sma200D

// Plot
plot(sma200D, color=color.red, title="200 SMA")

// Background
bgcolor(dailyTrend ? color.new(color.green, 90) : color.new(color.red, 90))
```

### Confirmed Uptrend

```pinescript
//@version=6
indicator("Confirmed Trend", overlay=true)

d1sma50 = request.security(syminfo.tickerid, "D", ta.sma(close, 50))
d1sma200 = request.security(syminfo.tickerid, "D", ta.sma(close, 200))
h4sma20 = request.security(syminfo.tickerid, "240", ta.sma(close, 20))

// Confirmed uptrend
uptrend = close > d1sma50 and d1sma50 > d1sma200

plot(d1sma50)
plot(d1sma200)

plotshape(uptrend and ta.crossover(close, h4sma20), 
     location=location.belowbar, 
     style=shape.labelup, 
     color=color.lime, 
     text="CONFIRMED\nUPTREND")
```

---

## MTF Breakout

### Daily Breakout

```pinescript
//@version=6
indicator("Daily Breakout", overlay=true)

// Daily high
dailyHigh = request.security(syminfo.tickerid, "D", high)
dailyLow = request.security(syminfo.tickerid, "D", low)

// Breakout signals
breakoutUp = close > dailyHigh[1]
breakoutDown = close < dailyLow[1]

plot(dailyHigh[1], color=color.green, title="Daily High")
plot(dailyLow[1], color=color.red, title="Daily Low")

plotshape(breakoutUp, location=location.belowbar, style=shape.labelup, color=color.lime, text="DBUY")
plotshape(breakoutDown, location=location.abovebar, style=shape.labeldown, color=color.red, text="DSELL")
```

---

## Pivot Points MTF

### Daily Pivots

```pinescript
//@version=6
indicator("Daily Pivots", overlay=true)

// Daily pivot levels
dailyHigh = request.security(syminfo.tickerid, "D", high)
dailyLow = request.security(syminfo.tickerid, "D", low)
dailyClose = request.security(syminfo.tickerid, "D", close)

pivot = (dailyHigh + dailyLow + dailyClose) / 3
r1 = 2 * pivot - dailyLow
s1 = 2 * pivot - dailyHigh
r2 = pivot + (dailyHigh - dailyLow)
s2 = pivot - (dailyHigh - dailyLow)

plot(pivot, color=color.blue, title="Pivot")
plot(r1, color=color.red, linestyle=plot.style_line)
plot(s1, color=color.green, linestyle=plot.style_line)
plot(r2, color=color.maroon, linestyle=plot.style_dashed)
plot(s2, color=color.olive, linestyle=plot.style_dashed)
```

---

## Volatility MTF

### Daily ATR

```pinescript
//@version=6
indicator("Daily ATR", overlay=false)

// Daily ATR
atrD = request.security(syminfo.tickerid, "D", ta.atr(14))
atrCurrent = ta.atr(14)

plot(atrD, title="Daily ATR", color=color.purple)
plot(atrCurrent, title="Current ATR", color=color.blue)

// Volatility expansion
volExpansion = atrCurrent > atrD * 1.5

plotchar(volExpansion, char="!", location=location.top, color=color.red)
```

---

## Complete MTF Strategy

```pinescript
//@version=6
strategy("MTF Strategy",
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10)

// === INPUTS ===
tf = input.timeframe("D", "Timeframe")

// === HTF DATA ===
htfSMA20 = request.security(syminfo.tickerid, tf, ta.sma(close, 20))
htfSMA50 = request.security(syminfo.tickerid, tf, ta.sma(close, 50))
htfRSI = request.security(syminfo.tickerid, tf, ta.rsi(close, 14))

// === TREND ===
uptrend = close > htfSMA20 and htfSMA20 > htfSMA50

// === CURRENT TF SIGNALS ===
ma20 = ta.ema(close, 20)
ma50 = ta.ema(close, 50)

longSignal = uptrend and ta.crossover(ma20, ma50)
shortSignal = not uptrend and ta.crossunder(ma20, ma50)

// === ENTRIES ===
if longSignal
    strategy.entry("Long", strategy.long)

if shortSignal
    strategy.entry("Short", strategy.short)

// === EXITS ===
if ta.crossunder(ma20, ma50)
    strategy.close_all()

// === PLOT ===
plot(htfSMA20, color=color.green, title="HTF 20")
plot(htfSMA50, color=color.red, title="HTF 50")

bgcolor(uptrend ? color.new(color.green, 90) : color.new(color.red, 90))
```

---

## MTF Best Practices

### Gap Handling

```pinescript
// Handle gaps in HTF data
dailyClose = request.security(syminfo.tickerid, "D", close[1])  // Previous bar
```

### Repainting

```pinescript
// Avoid repainting
// Use close[1] for historical accuracy
dailyClose = request.security(syminfo.tickerid, "D", close[1])
```

### Timeframe Selection

| Current TF | Best HTF |
|------------|----------|
| 5 min | 1 hour / 4 hour |
| 15 min | 4 hour / Daily |
| 1 hour | Daily / Weekly |
| 4 hour | Weekly / Monthly |

---

## Next Steps

- **[[pinescript-advanced-custom-functions]]** - Create custom functions
- **[[pinescript-advanced-arrays]]** - Learn arrays
- **[[pinescript-advanced-optimization]]** - Optimize strategies

---

*Multi-timeframe analysis adds context to your trades.*
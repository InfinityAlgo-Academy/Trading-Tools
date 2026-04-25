---
title: "Pine Script Introduction - Getting Started"
description: "Introduction to Pine Script programming for TradingView. Learn the basics and start building your first indicators."
tags: [pine-script, introduction, getting-started, basics]
slug: pinescript-basics-introduction
---

# Pine Script Introduction

Welcome to Pine Script! This introduction will guide you through the fundamentals of building trading indicators and strategies on TradingView.

---

## What is Pine Script?

Pine Script is TradingView's programming language designed specifically for:

- **Technical Analysis** - Build custom indicators
- **Trading Strategies** - Test and automate trading ideas
- **Alerts** - Get notified of market opportunities
- **Visual Analysis** - Create custom chart overlays

---

## Why Use Pine Script?

| Feature | Benefit |
|---------|---------|
| Free Platform | No additional software needed |
| Easy to Learn | Python-like syntax |
| Large Community | Access thousands of scripts |
| Real-time Data | Test on live markets |
| Built-in Functions | 100+ technical indicators |

---

## Your First Script

### Hello World

```pinescript
//@version=6
indicator("Hello World")
plot(close)
```

This script plots the closing price on your chart.

### Step by Step

```pinescript
// 1. Version declaration
//@version=6

// 2. Script type and name
indicator("My First Indicator")

// 3. Calculate a Simple Moving Average
sma20 = ta.sma(close, 20)

// 4. Plot it on the chart
plot(sma20, color=color.blue, title="20 SMA")
```

---

## Understanding the Structure

Every Pine Script follows this pattern:

```
1. Version:     //@version=6
2. Type:        indicator() or strategy()
3. Inputs:      input.*()
4. Logic:       Calculations
5. Output:      plot(), shapes, lines
```

---

## Key Concepts

### Series Data

Unlike most programming languages, Pine Script works with **series** - arrays of values where each value corresponds to a bar:

```pinescript
// Each bar has its own value
currentClose = close      // Current bar's close
previousClose = close[1]  // Previous bar's close
```

### Overlay

Indicators can overlay the price chart or appear in separate panes:

```pinescript
// Overlay = true (on price chart)
indicator("On Chart", overlay=true)

// Overlay = false (separate pane)
indicator("Separate Pane", overlay=false)
```

---

## Common Functions

### Moving Averages
```pinescript
ta.sma(close, 20)   // Simple MA
ta.ema(close, 20)   // Exponential MA
ta.wma(close, 20)   // Weighted MA
```

### Oscillators
```pinescript
ta.rsi(close, 14)   // RSI
ta.macd(close, 12, 26, 9)  // MACD
ta.stoch(14, 3, 3)  // Stochastic
```

### Volatility
```pinescript
ta.atr(14)          // ATR
ta.bb(close, 20, 2) // Bollinger Bands
```

---

## Example: Complete Indicator

```pinescript
//@version=6
indicator("Complete Example", overlay=true)

// --- INPUTS ---
maLength = input.int(20, "MA Length")
showSignals = input.bool(true, "Show Signals")

// --- CALCULATIONS ---
ma = ta.sma(close, maLength)
rsi = ta.rsi(close, 14)

// --- PLOTTING ---
plot(ma, color=color.blue, title="Moving Average")

// --- SIGNALS ---
buySignal = ta.crossover(close, ma) and rsi < 30
sellSignal = ta.crossunder(close, ma) and rsi > 70

plotshape(buySignal, location=location.belowbar, style=shape.labelup, color=color.green, text="BUY")
plotshape(sellSignal, location=location.abovebar, style=shape.labeldown, color=color.red, text="SELL")
```

---

## Next Steps

Continue learning with:

1. **[[tools/pine-script/basics/variables]]** - Data types and variables
2. **[[tools/pine-script/basics/operators]]** - Math and logic
3. **[[tools/pine-script/basics/functions]]** - Using functions
4. **[[tools/pine-script/basics/inputs]]** - User inputs

---

## Quick Tips

- Start simple - build one feature at a time
- Use the Pine Editor's autocomplete
- Check the Pine Script reference manual
- Test on different timeframes
- Use "Add to Chart" to see results

---

*Start coding! Your first indicator is just a few lines away.*
---
title: "Pine Script Inputs"
description: "Learn how to create user-configurable inputs in Pine Script to make your indicators interactive and customizable."
tags: [pine-script, basics, inputs, programming]
slug: tools/pine-script-basics-inputs
---

# Inputs in Pine Script

Inputs allow users to customize your script without changing the code. This guide covers all input types and how to use them effectively.

---

## Why Use Inputs?

Inputs make your scripts:
- **Reusable** - Users can adapt to different markets
- **Professional** - Create settings panels
- **Flexible** - Easy to optimize parameters

---

## Input Types

### Integer Input

```tools/pine-script
//@version=6
indicator("Integer Input")

// Basic integer input
period = input.int(14, "Period")

sma = ta.sma(close, period)
plot(sma)
```

### Float Input

```tools/pine-script
//@version=6
indicator("Float Input")

// Float input with step
multiplier = input.float(2.0, "Multiplier", step=0.1)

bb = ta.bb(close, 20, multiplier)
plot(bb.bandsmiddle)
```

### Color Input

```tools/pine-script
//@version=6
indicator("Color Input")

// Color picker
upColor = input.color(color.green, "Up Color")
downColor = input.color(color.red, "Down Color")

sma = ta.sma(close, 20)
plot(sma, color=close > sma ? upColor : downColor)
```

### Source Input

```tools/pine-script
//@version=6
indicator("Source Input")

// Select price source
src = input.source(close, "Source")

sma = ta.sma(src, 20)
plot(sma)
```

### Symbol Input

```tools/pine-script
//@version=6
indicator("Symbol Input")

// Select different symbol
sym = input.symbol("BTCUSD", "Symbol")

// Get data from symbol
data = request.security(sym, timeframe.period, close)

plot(data)
```

### Timeframe Input

```tools/pine-script
//@version=6
indicator("Timeframe Input")

// Select timeframe
tf = input.timeframe("D", "Timeframe")

// Get data from timeframe
data = request.security(syminfo.tickerid, tf, close)

plot(data)
```

### Boolean Input

```tools/pine-script
//@version=6
indicator("Boolean Input")

// Toggle visibility
showSMA = input.bool(true, "Show SMA")
showEMA = input.bool(true, "Show EMA")

sma20 = ta.sma(close, 20)
ema20 = ta.ema(close, 20)

if showSMA
    plot(sma20, color=color.blue, title="SMA")

if showEMA
    plot(ema20, color=color.orange, title="EMA")
```

### String Input

```tools/pine-script
//@version=6
indicator("String Input")

// Text input
exchange = input.string("BINANCE", "Exchange")

plot(close)
```

### Resolution Input

```tools/pine-script
//@version=6
indicator("Resolution Input")

// Resolution type
res = input.resolution("", "Resolution")

data = request.security(syminfo.tickerid, res, close)

plot(data)
```

---

## Input Groups

Organize inputs into collapsible sections:

```tools/pine-script
//@version=6
indicator("Input Groups")

// MA Settings Group
maType = input.string("SMA", "Type", group="Moving Averages")
maLength = input.int(20, "Length", group="Moving Averages")
maColor = input.color(color.blue, "Color", group="Moving Averages")

// Bollinger Settings Group
bbLength = input.int(20, "Length", group="Bollinger Bands")
bbMult = input.float(2.0, "Multiplier", group="Bollinger Bands")

// Plot
ma = maType == "SMA" ? ta.sma(close, maLength) : ta.ema(close, maLength)
plot(ma, color=maColor)
```

---

## Input with Options

Use dropdown menus with predefined options:

```tools/pine-script
//@version=6
indicator("Option Input")

// Dropdown with options
maType = input.string("SMA", "MA Type", options=["SMA", "EMA", "WMA", "VWMA"])

ma = switch maType
    "SMA" => ta.sma(close, 20)
    "EMA" => ta.ema(close, 20)
    "WMA" => ta.wma(close, 20)
    "VWMA" => ta.vwma(close, 20)

plot(ma, title=maType)
```

---

## Advanced Input Techniques

### Input with Confirm

```tools/pine-script
//@version=6
indicator("Confirm Input")

// Show confirmation dialog
confirmSignal = input.bool(false, "Confirm Signals", confirm=true)

plot(close)
```

### Input with Min/Max

```tools/pine-script
//@version=6
indicator("Bounded Input")

// Integer with bounds
period = input.int(14, "RSI Period", minval=1, maxval=100)

// Float with bounds
overbought = input.float(70.0, "Overbought", minval=50, maxval=100)

rsi = ta.rsi(close, period)
plot(rsi)
hline(overbought)
```

---

## Complete Example: Custom Indicator

```tools/pine-script
//@version=6
indicator("Custom RSI with Inputs", overlay=false)

// RSI Settings
rsiLength = input.int(14, "RSI Length", minval=1, group="RSI Settings")
rsiOB = input.float(70, "Overbought", group="RSI Settings")
rsiOS = input.float(30, "Oversold", group="RSI Settings")
rsiColor = input.color(color.blue, "RSI Color", group="RSI Settings")

// MA Settings  
maOn = input.bool(true, "Show MA", group="MA Settings")
maType = input.string("SMA", "MA Type", options=["SMA", "EMA"], group="MA Settings")
maLength = input.int(20, "MA Length", group="MA Settings")
maColor = input.color(color.orange, "MA Color", group="MA Settings")

// Background Settings
bgOn = input.bool(true, "Show Background", group="Background")
bgOB = input.color(color.new(color.red, 90), "Overbought BG", group="Background")
bgOS = input.color(color.new(color.green, 90), "Oversold BG", group="Background")

// Calculate RSI
rsi = ta.rsi(close, rsiLength)

// Calculate MA
ma = maType == "SMA" ? ta.sma(rsi, maLength) : ta.ema(rsi, maLength)

// Plot RSI
plot(rsi, color=rsiColor, title="RSI")

// Plot MA
if maOn
    plot(ma, color=maColor, title="MA")

// Horizontal lines
hline(rsiOB, color=color.red, linestyle=hline.style_dashed)
hline(rsiOS, color=color.green, linestyle=hline.style_dashed)
hline(50, color=color.gray)

// Background
if bgOn
    bgcolor(rsi > rsiOB ? bgOB : rsi < rsiOS ? bgOS : na)
```

---

## Input Reference

| Function | Description |
|----------|-------------|
| `input.int()` | Integer input |
| `input.float()` | Float input |
| `input.string()` | Text input |
| `input.bool()` | True/False toggle |
| `input.color()` | Color picker |
| `input.source()` | Price source selector |
| `input.symbol()` | Symbol selector |
| `input.timeframe()` | Timeframe selector |
| `input.resolution()` | Resolution input |

---

## Best Practices

1. **Use groups** - Organize related inputs together
2. **Set sensible defaults** - Users should see good results immediately
3. **Add min/max** - Prevent invalid values
4. **Use confirm for important settings** - Prevent accidental changes
5. **Add tooltips** - Explain what each input does

---

## Next Steps

- **[[tools/pine-script/basics/plotting]]** - Advanced plotting techniques
- **[[tools/pine-script/indicators/moving-averages]]** - Build complete indicators
- **[[tools/pine-script/strategies/basics]]** - Start building strategies

---

## Quick Reference

```tools/pine-script
// Basic inputs
period = input.int(14, "Period")
multiplier = input.float(2.0, "Multiplier")
colorChoice = input.color(color.blue, "Color")
showLine = input.bool(true, "Show Line")

// With options
maType = input.string("SMA", "Type", options=["SMA", "EMA", "WMA"])

// With group
period = input.int(20, "Length", group="Settings")
```

---

*Inputs make your scripts user-friendly and professional.*
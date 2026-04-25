---
title: "Pine Script Plotting"
description: "Master all Pine Script plotting functions - plot, plotshape, plotchar, fill, and more for visual indicators."
tags: [pine-script, basics, plotting, visualization]
slug: tools/pine-script-basics-plotting
---

# Plotting in Pine Script

Learn how to visualize your indicators using Pine Script's powerful plotting functions.

---

## Basic Plotting

### plot()

The most common plotting function:

```tools/pine-script
//@version=6
indicator("Plot Examples")

// Simple line plot
plot(close, title="Close Price")

// With custom color
plot(ta.sma(close, 20), color=color.blue, title="SMA 20")

// Line width
plot(ta.ema(close, 50), color=color.red, linewidth=2)

// Style options
plot(ta.sma(close, 20), style=plot.style_line, color=color.green)
```

### Plot Styles

```tools/pine-script
//@version=6
indicator("Plot Styles")

// Line (default)
plot(close, style=plot.style_line, title="Line")

// Area
plot(ta.sma(close, 20), style=plot.style_area, color=color.new(color.blue, 80))

// Histogram
plot(ta.rsi(close, 14), style=plot.style_histogram, title="RSI")

// Cross
plot(ta.sma(close, 50), style=plot.style_cross, title="Cross")

// Circles
plot(ta.ema(close, 20), style=plot.style_circles, title="Circles")

// Steps
plot(ta.sma(close, 20), style=plot.style_stepline, title="Step")

// Line with branches
plot(ta.sma(close, 20), style=plot.style_line, linewidth=3)
```

---

## Shape Plots

### plotshape()

Plot shapes at specific conditions:

```tools/pine-script
//@version=6
indicator("Shapes")

sma20 = ta.sma(close, 20)

// Arrow up
plotshape(close > sma20, location=location.belowbar, style=shape.arrowup, color=color.green)

// Triangle up
plotshape(close > sma20, location=location.belowbar, style=shape.triangleup, color=color.green)

// Label up (with text)
plotshape(close > sma20, location=location.belowbar, style=shape.labelup, color=color.green, text="BUY")

// Diamond
plotshape(close > sma20, location=location.abovebar, style=shape.diamond, color=color.lime)

plot(sma20)
```

### All Shape Types

```tools/pine-script
//@version=6
indicator("All Shapes")

// Available shapes
plotshape(true, style=shape.labelup, location=location.belowbar, title="labelup")
plotshape(true, style=shape.labeldown, location=location.abovebar, title="labeldown")
plotshape(true, style=shape.labelright, title="labelright")
plotshape(true, style=shape.labelleft, title="labelleft")
plotshape(true, style=shape.labelcenter, title="labelcenter")
plotshape(true, style=shape.arrowup, title="arrowup")
plotshape(true, style=shape.arrowdown, title="arrowdown")
plotshape(true, style=shape.triangleup, title="triangleup")
plotshape(true, style=shape.triangledown, title="triangledown")
plotshape(true, style=shape.square, title="square")
plotshape(true, style=shape.diamond, title="diamond")
plotshape(true, style=shape.pitchfork, title="pitchfork")
```

---

## Character Plots

### plotchar()

Plot characters (symbols):

```tools/pine-script
//@version=6
indicator("Characters")

rsi = ta.rsi(close, 14)

// Up arrow
plotchar(rsi < 30, char="▲", location=location.belowbar, color=color.lime, size=size.tiny)

// Down arrow
plotchar(rsi > 70, char="▼", location=location.abovebar, color=color.red, size=size.tiny)

// Checkmark
plotchar(close > ta.sma(close, 20), char="✓", color=color.green)

// X mark
plotchar(close < ta.sma(close, 20), char="✗", color=color.red)

plot(rsi, title="RSI")
hline(70)
hline(30)
```

---

## Arrow Plots

### plotarrow()

Plot directional arrows:

```tools/pine-script
//@version=6
indicator("Arrows")

// Calculate momentum
mom = close - close[1]

// Up arrow when positive momentum
plotarrow(mom > 0 ? mom : na, colorup=color.green, colordown=color.red)

// Or use different approach
rsi = ta.rsi(close, 14)
rsiChange = rsi - rsi[1]
plotarrow(rsiChange, colorup=color.lime, colordown=color.red)
```

---

## Horizontal Lines

### hline()

Draw horizontal reference lines:

```tools/pine-script
//@version=6
indicator("Horizontal Lines")

rsi = ta.rsi(close, 14)
plot(rsi)

// RSI levels
hline(70, color=color.red, linestyle=hline.style_dashed, linewidth=1)
hline(30, color=color.green, linestyle=hline.style_dashed, linewidth=1)
hline(50, color=color.gray)

// With title
hline(70, title="Overbought", color=color.red, linestyle=hline.style_dashed)
hline(30, title="Oversold", color=color.green, linestyle=hline.style_dashed)
```

---

## Fill Areas

### fill()

Fill between two lines:

```tools/pine-script
//@version=6
indicator("Fill")

// Bollinger Bands
bb = ta.bb(close, 20, 2)

// Plot bands
upper = plot(bb.upper, color=color.red)
lower = plot(bb.lower, color=color.green)
middle = plot(bb.middle, color=color.blue)

// Fill between upper and lower
fill(upper, lower, color=color.new(color.purple, 90))

// Fill between middle and lower
fill(middle, lower, color=color.new(color.green, 90))
```

---

## Complete Example: Custom Indicator

```tools/pine-script
//@version=6
indicator("Complete Indicator", overlay=true)

// Inputs
maLength = input.int(20, "MA Length")
bbLength = input.int(20, "BB Length")
bbMult = input.float(2.0, "BB Multiplier")

// Calculations
ma = ta.sma(close, maLength)
bb = ta.bb(close, bbLength, bbMult)

// Plot MA
plot(ma, color=color.blue, title="MA")

// Plot BB
plot(bb.upper, color=color.red, title="Upper BB")
plot(bb.middle, color=color.orange, title="Middle BB")
plot(bb.lower, color=color.green, title="Lower BB")

// Fill between BB
fill(plot1=plot(bb.upper), plot2=plot(bb.lower), color=color.new(color.gray, 90))

// Signals
buySignal = ta.crossover(close, bb.lower)
sellSignal = ta.crossunder(close, bb.upper)

// Plot signals
plotshape(buySignal, location=location.belowbar, style=shape.labelup, color=color.green, text="BUY")
plotshape(sellSignal, location=location.abovebar, style=shape.labeldown, color=color.red, text="SELL")

// Background
bgcolor(close < bb.lower ? color.new(color.green, 90) : close > bb.upper ? color.new(color.red, 90) : na)
```

---

## Plotting Reference

| Function | Use |
|----------|-----|
| `plot()` | Line/chart plots |
| `plotshape()` | Custom shapes |
| `plotchar()` | Character symbols |
| `plotarrow()` | Directional arrows |
| `hline()` | Horizontal lines |
| `fill()` | Fill between plots |
| `bgcolor()` | Background color |

---

## Next Steps

- **[[tools/pine-script/indicators/moving-averages]]** - Build real indicators
- **[[tools/pine-script/indicators/rsi]]** - Build oscillators
- **[[tools/pine-script/strategies/basics]]** - Start building strategies

---

*Master plotting to create professional-looking indicators.*
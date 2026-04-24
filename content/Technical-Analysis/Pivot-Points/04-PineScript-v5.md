---
title: "Pivot Points Pine Script"
tags:
  - technical-analysis
  - pivot-points
  - pinescript
  - tradingview
  - code
---

# Pivot Points - Pine Script v5 Implementation

This article provides Pine Script v5 code for calculating pivot points in TradingView.

## Classic Pivot Points

```pinescript
//@version=5
indicator("Classic Pivot", overlay=true, format=format.price)

showPP = input.bool(true, "Show PP")
showLevels = input.bool(true, "Show All Levels")

// Get previous day's high, low, close
prevHigh = security(syminfo.tickerid, "D", high[1])
prevLow = security(syminfo.tickerid, "D", low[1])
prevClose = security(syminfo.tickerid, "D", close[1])

// Classic Pivot
pp = (prevHigh + prevLow + prevClose) / 3
range = prevHigh - prevLow

// Resistance levels
r1 = (pp * 2) - prevLow
r2 = pp + range
r3 = pp + range * 2

// Support levels
s1 = (pp * 2) - prevHigh
s2 = pp - range
s3 = pp - range * 2

// Plot
plot(showPP and showLevels ? r3 : na, "R3", color=color.red, linewidth=1, style=plot.style_circles)
plot(showPP and showLevels ? r2 : na, "R2", color=color.red, linewidth=1, style=plot.style_circles)
plot(showPP and showLevels ? r1 : na, "R1", color=color.red, linewidth=2)
plot(showPP ? pp : na, "PP", color=color.gray, linewidth=2)
plot(showPP and showLevels ? s1 : na, "S1", color=color.green, linewidth=2)
plot(showPP and showLevels ? s2 : na, "S2", color=color.green, linewidth=1, style=plot.style_circles)
plot(showPP and showLevels ? s3 : na, "S3", color=color.green, linewidth=1, style=plot.style_circles)

// Labels
var label r3Label = label.new(bar_index, r3, "", xloc.bar_index, yloc.price, color.new(color.red, 100), label.style_none, color.red, size=size.auto)
var label r2Label = label.new(bar_index, r2, "", xloc.bar_index, yloc.price, color.new(color.red, 100), label.style_none, color.red, size=size.auto)
var label r1Label = label.new(bar_index, r1, "", xloc.bar_index, yloc.price, color.new(color.red, 100), label.style_none, color.red, size=size.auto)
var label ppLabel = label.new(bar_index, pp, "", xloc.bar_index, yloc.price, color.new(color.gray, 100), label.style_none, color.gray, size=size.auto)
var label s1Label = label.new(bar_index, s1, "", xloc.bar_index, yloc.price, color.new(color.green, 100), label.style_none, color.green, size=size.auto)
var label s2Label = label.new(bar_index, s2, "", xloc.bar_index, yloc.price, color.new(color.green, 100), label.style_none, color.green, size=size.auto)
var label s3Label = label.new(bar_index, s3, "", xloc.bar_index, yloc.price, color.new(color.green, 100), label.style_none, color.green, size=size.auto)

if barstate.islast
    label.set_text(r3Label, "R3: " + str.tostring(r3, format.mintick))
    label.set_text(r2Label, "R2: " + str.tostring(r2, format.mintick))
    label.set_text(r1Label, "R1: " + str.tostring(r1, format.mintick))
    label.set_text(ppLabel, "PP: " + str.tostring(pp, format.mintick))
    label.set_text(s1Label, "S1: " + str.tostring(s1, format.mintick))
    label.set_text(s2Label, "S2: " + str.tostring(s2, format.mintick))
    label.set_text(s3Label, "S3: " + str.tostring(s3, format.mintick))
```

---

## Fibonacci Pivot Points

```pinescript
//@version=5
indicator("Fibonacci Pivot", overlay=true, format=format.price)

timeframe = input.string("D", "Timeframe", options=["D", "W", "M"])

prevHigh = security(syminfo.tickerid, timeframe, high[1])
prevLow = security(syminfo.tickerid, timeframe, low[1])
prevClose = security(syminfo.tickerid, timeframe, close[1])

// Fibonacci Pivot
pp = (prevHigh + prevLow + prevClose) / 3
range = prevHigh - prevLow

// Fibonacci levels
fibR3 = pp + range * 1.000
fibR2 = pp + range * 0.618
fibR1 = pp + range * 0.382
fibS1 = pp - range * 0.382
fibS2 = pp - range * 0.618
fibS3 = pp - range * 1.000

// Plot
plot(fibR3, "Fib R3", color=color.red, style=plot.style_circles)
plot(fibR2, "Fib R2", color=color.red, style=plot.style_circles)
plot(fibR1, "Fib R1", color=color.red, linewidth=2)
plot(pp, "Fib PP", color=color.gray, linewidth=2)
plot(fibS1, "Fib S1", color=color.green, linewidth=2)
plot(fibS2, "Fib S2", color=color.green, style=plot.style_circles)
plot(fibS3, "Fib S3", color=color.green, style=plot.style_circles)
```

---

## Camarilla Pivot Points

```pinescript
//@version=5
indicator("Camarilla Pivot", overlay=true, format=format.price)

prevHigh = security(syminfo.tickerid, "D", high[1])
prevLow = security(syminfo.tickerid, "D", low[1])
prevClose = security(syminfo.tickerid, "D", close[1])

pp = (prevHigh + prevLow + prevClose) / 3
range = prevHigh - prevLow
closePrice = prevClose

// Camarilla levels
r4 = closePrice + range * 0.3667
r3 = closePrice + range * 0.2750
r2 = closePrice + range * 0.1833
r1 = closePrice + range * 0.0917

s1 = closePrice - range * 0.0917
s2 = closePrice - range * 0.1833
s3 = closePrice - range * 0.2750
s4 = closePrice - range * 0.3667

// Plot narrow bands
plot(r4, "R4", color=color.new(color.red, 70), linewidth=1)
plot(r3, "R3", color=color.new(color.red, 70), linewidth=1)
plot(r2, "R2", color=color.new(color.red, 70), linewidth=1)
plot(r1, "R1", color=color.red, linewidth=2)
plot(pp, "PP", color=color.gray, linewidth=2)
plot(s1, "S1", color=color.green, linewidth=2)
plot(s2, "S2", color=color.new(color.green, 70), linewidth=1)
plot(s3, "S3", color=color.new(color.green, 70), linewidth=1)
plot(s4, "S4", color=color.new(color.green, 70), linewidth=1)
```

---

## DeMark Pivot Points

```pinescript
//@version=5
indicator("DeMark Pivot", overlay=true, format=format.price)

prevOpen = security(syminfo.tickerid, "D", open[1])
prevHigh = security(syminfo.tickerid, "D", high[1])
prevLow = security(syminfo.tickerid, "D", low[1])
prevClose = security(syminfo.tickerid, "D", close[1])

// DeMark calculation
var demark = 0.0

if prevClose < prevOpen
    demark := prevHigh + (prevLow * 2) + prevClose
else if prevClose > prevOpen
    demark := (prevHigh * 2) + prevLow + prevClose
else
    demark := prevHigh + prevLow + (prevClose * 2)

// Plot
plot(demark, "DeMark", color=color.purple, linewidth=2, style=plot.style_circles)

// Label
var label dmLabel = label.new(bar_index, demark, "", xloc.bar_index, yloc.price, color.new(color.purple, 100), label.style_none, color.purple)

if barstate.islast
    label.set_text(dmLabel, "DM: " + str.tostring(demark, format.mintick))
```

---

## Woodie Pivot Points

```pinescript
//@version=5
indicator("Woodie Pivot", overlay=true, format=format.price)

prevHigh = security(syminfo.tickerid, "D", high[1])
prevLow = security(syminfo.tickerid, "D", low[1])
prevClose = security(syminfo.tickerid, "D", close[1])

// Woodie formula - gives more weight to close
pp = (prevHigh + prevLow + (prevClose * 2)) / 4
range = prevHigh - prevLow

// Levels
r2 = pp + range
r1 = (pp * 2) - prevLow
s1 = (pp * 2) - prevHigh
s2 = pp - range

// Plot
plot(r2, "R2", color=color.red, style=plot.style_circles)
plot(r1, "R1", color=color.red, linewidth=2)
plot(pp, "PP", color=color.gray, linewidth=2)
plot(s1, "S1", color=color.green, linewidth=2)
plot(s2, "S2", color=color.green, style=plot.style_circles)
```

---

## Complete Pivot Indicator (All Types)

```pinescript
//@version=5
indicator("All Pivot Points", overlay=true, format=format.price)

// Input
pivotType = input.string("Classic", "Pivot Type", 
     options=["Classic", "Fibonacci", "Camarilla", "DeMark", "Woodie"])
timeframe = input.string("D", "Timeframe", options=["D", "W", "M"])

// Get data
prevHigh = security(syminfo.tickerid, timeframe, high[1])
prevLow = security(syminfo.tickerid, timeframe, low[1])
prevClose = security(syminfo.tickerid, timeframe, close[1])
prevOpen = security(syminfo.tickerid, timeframe, open[1])

var float pp = na
var float r1 = na
var float r2 = na
var float r3 = na
var float s1 = na
var float s2 = na
var float s3 = na
var float r4 = na
var float s4 = na
var float demark = na
var color pivotColor = na

// Calculate based on type
if pivotType == "Classic"
    pp := (prevHigh + prevLow + prevClose) / 3
    var range = prevHigh - prevLow
    
    r3 := pp + range * 2
    r2 := pp + range
    r1 := (pp * 2) - prevLow
    s1 := (pp * 2) - prevHigh
    s2 := pp - range
    s3 := pp - range * 2
    
    pivotColor := color.gray

if pivotType == "Fibonacci"
    pp := (prevHigh + prevLow + prevClose) / 3
    var range = prevHigh - prevLow
    
    r3 := pp + range * 1.000
    r2 := pp + range * 0.618
    r1 := pp + range * 0.382
    s1 := pp - range * 0.382
    s2 := pp - range * 0.618
    s3 := pp - range * 1.000
    
    pivotColor := color.orange

if pivotType == "Camarilla"
    pp := (prevHigh + prevLow + prevClose) / 3
    var range = prevHigh - prevLow
    var close = prevClose
    
    r4 := close + range * 0.3667
    r3 := close + range * 0.2750
    r2 := close + range * 0.1833
    r1 := close + range * 0.0917
    s1 := close - range * 0.0917
    s2 := close - range * 0.1833
    s3 := close - range * 0.2750
    s4 := close - range * 0.3667
    
    pivotColor := color.yellow

if pivotType == "DeMark"
    if prevClose < prevOpen
        demark := prevHigh + (prevLow * 2) + prevClose
    else if prevClose > prevOpen
        demark := (prevHigh * 2) + prevLow + prevClose
    else
        demark := prevHigh + prevLow + (prevClose * 2)
    
    pivotColor := color.purple

if pivotType == "Woodie"
    pp := (prevHigh + prevLow + (prevClose * 2)) / 4
    var range = prevHigh - prevLow
    
    r2 := pp + range
    r1 := (pp * 2) - prevLow
    s1 := (pp * 2) - prevHigh
    s2 := pp - range
    
    pivotColor := color.blue

// Plot based on type
if pivotType == "DeMark"
    plot(demark, "DeMark", color=pivotColor, linewidth=2, style=plot.style_circles)
else
    if not na(r4)
        plot(r4, "R4", color=color.new(color.red, 70), linewidth=1)
    if not na(r3)
        plot(r3, "R3", color=color.new(color.red, 70), style=plot.style_circles)
    if not na(r2)
        plot(r2, "R2", color=color.red, style=plot.style_circles)
    plot(r1, "R1", color=color.red, linewidth=2)
    plot(pp, "PP", color=pivotColor, linewidth=2)
    plot(s1, "S1", color=color.green, linewidth=2)
    if not na(s2)
        plot(s2, "S2", color=color.green, style=plot.style_circles)
    if not na(s3)
        plot(s3, "S3", color=color.new(color.green, 70), style=plot.style_circles)
    if not na(s4)
        plot(s4, "S4", color=color.new(color.green, 70), linewidth=1)
```

---

## Pivot Point Strategy

```pinescript
//@version=5
strategy("Pivot Point Strategy", overlay=true, 
         default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Get previous day data
prevHigh = security(syminfo.tickerid, "D", high[1])
prevLow = security(syminfo.tickerid, "D", low[1])
prevClose = security(syminfo.tickerid, "D", close[1])

// Calculate pivots
pp = (prevHigh + prevLow + prevClose) / 3
range = prevHigh - prevLow

r1 = (pp * 2) - prevLow
r2 = pp + range
s1 = (pp * 2) - prevHigh
s2 = pp - range

// Get current price
price = close

// Entry conditions
longCondition = price <= s1 and price >= s2 and close > s1
shortCondition = price >= r1 and price <= r2 and close < r1

// Exit conditions
exitLong = price >= r1
exitShort = price <= s1

// Execute
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

if (exitLong and strategy.position_size > 0)
    strategy.close("Long")

if (exitShort and strategy.position_size < 0)
    strategy.close("Short")

// Plot for reference
plot(r1, "R1", color=color.red, linewidth=1)
plot(pp, "PP", color=color.gray, linewidth=1)
plot(s1, "S1", color=color.green, linewidth=1)
```

---

## Alerts

```pinescript
//@version=5
indicator("Pivot Alerts", overlay=true)

// Get data
prevHigh = security(syminfo.tickerid, "D", high[1])
prevLow = security(syminfo.tickerid, "D", low[1])
prevClose = security(syminfo.tickerid, "D", close[1])

pp = (prevHigh + prevLow + prevClose) / 3
range = prevHigh - prevLow

r1 = (pp * 2) - prevLow
s1 = (pp * 2) - prevHigh

// Price crosses
priceCrossR1 = ta.crossover(close, r1)
priceCrossS1 = ta.crossunder(close, s1)

// Alerts
alertcondition(priceCrossR1, title="Price Cross R1", 
               message="Price crossed above R1 pivot level!")
alertcondition(priceCrossS1, title="Price Cross S1", 
               message="Price crossed below S1 pivot level!")
```

---

## Dashboard Display

```pinescript
//@version=5
indicator("Pivot Dashboard", overlay=false)

// Get data
prevHigh = security(syminfo.tickerid, "D", high[1])
prevLow = security(syminfo.tickerid, "D", low[1])
prevClose = security(syminfo.tickerid, "D", close[1])

// Classic
pp = (prevHigh + prevLow + prevClose) / 3
range = prevHigh - prevLow
r1 = (pp * 2) - prevLow
s1 = (pp * 2) - prevHigh

// Calculate current position
price = close
aboveR1 = price > r1
belowS1 = price < s1

// Plot
plot(price, "Price", color=color.blue)

// Dashboard table
var table dash = table.new(position.top_right, columns=2, rows=4)

if barstate.islast
    table.cell(dash, 0, 0, "LEVEL", bgcolor=color.gray, text_color=color.white)
    table.cell(dash, 1, 0, "VALUE", bgcolor=color.gray, text_color=color.white)
    
    table.cell(dash, 0, 1, "R1", bgcolor=color.gray)
    table.cell(dash, 1, 1, str.tostring(r1, format.mintick), 
               bgcolor=aboveR1 ? color.new(color.green, 80) : color.gray)
    
    table.cell(dash, 0, 2, "PP", bgcolor=color.gray)
    table.cell(dash, 1, 2, str.tostring(pp, format.mintick), bgcolor=color.gray)
    
    table.cell(dash, 0, 3, "S1", bgcolor=color.gray)
    table.cell(dash, 1, 3, str.tostring(s1, format.mintick), 
               bgcolor=belowS1 ? color.new(color.red, 80) : color.gray)
```

---

## Conclusion

Pine Script v5 provides comprehensive pivot point calculations:
- **Security function** for previous period data
- **Multiple pivot types** supported
- **Overlay** mode for chart display
- **Strategy** integration for backtesting
- **Alerts** for automated notifications

Key implementations:
- Use "D" for daily pivots
- Shift with [1] for previous values
- Combine with other indicators for confluence
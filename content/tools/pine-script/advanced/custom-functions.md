---
title: "Custom Functions in Pine Script"
description: "Learn to create custom functions in Pine Script for reusable, modular code. Build your own indicators and utilities."
tags: [pine-script, advanced, functions, programming]
slug: pinescript-advanced-custom-functions
---

# Custom Functions in Pine Script

Custom functions help you write cleaner, reusable code. This guide covers function creation and best practices.

---

## Why Use Functions?

| Benefit | Description |
|---------|-------------|
| Reusability | Write once, use many times |
| Readability | Cleaner, organized code |
| Maintainability | Change in one place |
| Complexity | Break down complex logic |

---

## Basic Functions

### Simple Function

```pinescript
//@version=6
indicator("Simple Function")

// Function to calculate average
myAverage(a, b) =>
    (a + b) / 2

avg = myAverage(10, 20)
plot(avg)
```

### Function with Multiple Returns

```pinescript
//@version=6
indicator("Multi Return")

// Return multiple values
getRange(highPrice, lowPrice) =>
    range = highPrice - lowPrice
    midpoint = (highPrice + lowPrice) / 2
    [range, midpoint]

[rng, mid] = getRange(high, low)

plot(rng, title="Range")
plot(mid, title="Midpoint")
```

---

## Practical Functions

### Moving Average Function

```pinescript
//@version=6
indicator("MA Function")

// Custom MA function
calculateMA(source, length, type) =>
    if type == "SMA"
        ta.sma(source, length)
    else if type == "EMA"
        ta.ema(source, length)
    else if type == "WMA"
        ta.wma(source, length)
    else
        ta.rma(source, length)

// Use the function
maSMA = calculateMA(close, 20, "SMA")
maEMA = calculateMA(close, 20, "EMA")

plot(maSMA, color=color.blue)
plot(maEMA, color=color.red)
```

### Signal Function

```pinescript
//@version=6
indicator("Signal Function")

// Generate signals
getSignals(maFast, maSlow) =>
    longSignal = ta.crossover(maFast, maSlow)
    shortSignal = ta.crossunder(maFast, maSlow)
    [longSignal, shortSignal]

fast = ta.ema(close, 12)
slow = ta.ema(close, 26)

[buy, sell] = getSignals(fast, slow)

plotshape(buy, location=location.belowbar, style=shape.labelup, color=color.lime)
plotshape(sell, location=location.abovebar, style=shape.labeldown, color=color.red)

plot(fast, color=color.green)
plot(slow, color=color.red)
```

### Stop Loss Function

```pinescript
//@version=6
indicator("SL Function")

// Calculate ATR-based stop
calculateStop(entryPrice, atr, multiplier, isLong) =>
    if isLong
        entryPrice - atr * multiplier
    else
        entryPrice + atr * multiplier

atr = ta.atr(14)

// Long stop
longStop = calculateStop(close, atr, 2, true)

// Short stop
shortStop = calculateStop(close, atr, 2, false)

plot(longStop, color=color.red)
plot(shortStop, color=color.green)
```

---

## Helper Functions

### Color Functions

```pinescript
//@version=6
indicator("Color Helper")

// Color based on condition
getTrendColor(price, ma) =>
    price > ma ? color.green : color.red

ma = ta.sma(close, 20)
trendColor = getTrendColor(close, ma)

plot(ma, color=trendColor, linewidth=2)
```

### Price Functions

```pinescript
//@version=6
indicator("Price Helpers")

// Get price change
priceChange(current, previous) =>
    current - previous

// Get percent change  
percentChange(current, previous) =>
    ((current - previous) / previous) * 100

change = priceChange(close, close[1])
pctChange = percentChange(close, close[1])

plot(change, title="Change")
plot(pctChange, title="% Change")
```

### Indicator Functions

```pinescript
//@version=6
indicator("Indicator Helpers")

// Combined RSI
getRSISignal(length, overbought, oversold) =>
    rsi = ta.rsi(close, length)
    signal = rsi < oversold ? "BUY" : rsi > overbought ? "SELL" : "NEUTRAL"
    [rsi, signal]

[rsiVal, signal] = getRSISignal(14, 70, 30)

plot(rsiVal, title="RSI")
hline(70)
hline(30)
```

---

## Library Functions

### Create Indicator Library

```pinescript
//@version=6
indicator("Indicator Library", overlay=true)

// === MA Library ===
ma(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)
        => ta.rma(source, length)

// === Signal Library ===
crossSignal(series1, series2) =>
    [ta.crossover(series1, series2), ta.crossunder(series1, series2)]

// === Volatility Library ===
volatility(length) =>
    atr = ta.atr(length)
    avg = ta.sma(atr, length)
    atr > avg * 1.5

// === Use Library ===
sma20 = ma(close, 20, "SMA")
ema20 = ma(close, 20, "EMA")

[crossUp, crossDown] = crossSignal(sma20, ema20)
vol = volatility(14)

plot(sma20)
plot(ema20)
plotshape(crossUp, location=location.belowbar, style=shape.arrowup, color=color.lime)
plotshape(crossDown, location=location.abovebar, style=shape.arrowdown, color=color.red)
```

---

## Advanced Functions

### Recursive Functions

```pinescript
//@version=6
indicator("Recursive")

// Calculate cumulative sum
cumulativeSum(series, length) =>
    sum = 0.0
    for i = 0 to length - 1
        sum := sum + series[i]
    sum

cumSum = cumulativeSum(close, 20)
plot(cumSum)
```

### Array-Based Functions

```pinescript
//@version=6
indicator("Array Function")

// Find highest in array
findHighest(src, length) =>
    arr = array.new_float(0)
    for i = 0 to length - 1
        array.push(arr, src[i])
    array.max(arr)

highest = findHighest(high, 20)
plot(highest)
```

### Conditional Functions

```pinescript
//@version=6
indicator("Conditional Function")

// Dynamic MA type
getDynamicMA(price, volatility) =>
    length = volatility > ta.atr(14) * 2 ? 50 : 20
    ta.ema(price, length)

vol = ta.atr(14)
dynamicMA = getDynamicMA(close, vol)

plot(dynamicMA)
```

---

## Complete Example

```pinescript
//@version=6
indicator("Complete Functions", overlay=true)

// === INPUTS ===
maType = input.string("EMA", "MA Type", options=["SMA", "EMA", "WMA"])
maLength = input.int(20, "MA Length")
atrLength = input.int(14, "ATR")
atrMultiplier = input.float(2.0, "ATR Multiplier")

// === FUNCTIONS ===

// MA function
ma(src, len, type) =>
    switch type
        "SMA" => ta.sma(src, len)
        "EMA" => ta.ema(src, len)
        "WMA" => ta.wma(src, len)
        => ta.rma(src, len)

// ATR function
getATR(len) =>
    ta.atr(len)

// Stop function
calcStop(entry, atrVal, mult, isLong) =>
    isLong ? entry - atrVal * mult : entry + atrVal * mult

// Signal function
getSignal(ma1, ma2) =>
    long = ta.crossover(ma1, ma2)
    short = ta.crossunder(ma1, ma2)
    [long, short]

// === EXECUTE ===
maValue = ma(close, maLength, maType)
atrValue = getATR(atrLength)

// Long stop
longStop = calcStop(close, atrValue, atrMultiplier, true)
shortStop = calcStop(close, atrValue, atrMultiplier, false)

// Signals
[buySignal, sellSignal] = getSignal(close, maValue)

// === PLOT ===
plot(maValue, color=color.blue, title=maType)
plot(longStop, color=color.red, title="Long Stop")
plot(shortStop, color=color.green, title="Short Stop")

plotshape(buySignal, location=location.belowbar, style=shape.labelup, color=color.lime)
plotshape(sellSignal, location=location.abovebar, style=shape.labeldown, color=color.red)
```

---

## Best Practices

1. **Descriptive names** - `calculateRSI` not `calc`
2. **Single responsibility** - Each function one task
3. **Document complex functions** - Add comments
4. **Test thoroughly** - Verify outputs
5. **Keep simple** - Don't over-engineer

---

## Next Steps

- **[[pinescript-advanced-arrays]]** - Master arrays
- **[[pinescript-advanced-optimization]]** - Optimize code
- **[[pinescript-strategies-examples]]** - More strategies

---

*Functions are the building blocks of clean code.*
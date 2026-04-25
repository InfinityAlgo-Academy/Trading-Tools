---
title: "Pine Script Variables and Data Types"
description: "Learn Pine Script variables, data types, and how to store and manipulate data in your scripts."
tags: [pine-script, basics, variables, programming]
slug: pinescript-basics-variables
---

# Variables and Data Types in Pine Script

Understanding variables and data types is fundamental to writing effective Pine Script code. This guide covers everything you need to know about storing and manipulating data.

---

## What are Variables?

Variables are containers that store data values. In Pine Script, you declare a variable and assign it a value:

```pinescript
myNumber = 10
myText = "Hello"
myPrice = close
```

---

## Data Types in Pine Script

Pine Script has several built-in data types:

### 1. Integer (int)

Whole numbers without decimals:

```pinescript
//@version=6
indicator("Integer Demo")

count = 100
period = 14
barNumber = bar_index

plot(count)
plot(period)
```

### 2. Float

Numbers with decimal places:

```pinescript
//@version=6
indicator("Float Demo")

price = 1234.56
multiplier = 2.5
percent = 0.75

plot(price)
```

### 3. Boolean (bool)

True or false values:

```upinescript
//@version=6
indicator("Boolean Demo")

isUptrend = close > open
isBreakout = high > high[1]
showPlots = true

plot(close)
```

### 4. String

Text values:

```pinescript
//@version=6
indicator("String Demo")

indicatorName = "My Custom Indicator"
plotTitle = "Support Level"

plot(close, title=plotTitle)
```

### 5. Color

Color values:

```pinescript
//@version=6
indicator("Color Demo")

myColor = color.red
customColor = color.rgb(255, 100, 50, 80)

plot(close, color=myColor)
```

### 6. Series (Most Important!)

Series is the core data type in Pine Script - it represents a time series that changes with each bar:

```pinescript
//@version=6
indicator("Series Demo")

// Each of these is a SERIES - values change every bar
currentPrice = close
previousPrice = close[1]
movingAverage = ta.sma(close, 20)
rsiValue = ta.rsi(close, 14)

// Plot the series
plot(currentPrice, color=color.blue)
plot(movingAverage, color=color.red)
```

---

## Variable Declaration with Typing

In Pine Script v5+, you can explicitly declare types:

```pinescript
//@version=6
indicator("Typed Variables")

// Explicit typing
int period = 14
float price = 100.50
bool isBullish = true
string name = "My Indicator"

// Series with type
series float ma = ta.sma(close, 20)
series float rsi = ta.rsi(close, 14)

plot(ma)
```

---

## Variable Reassignment

You can change variable values using `:=`:

```pinescript
//@version=6
indicator("Reassignment Demo")

// Initial value
counter = 0

// Change value
counter := counter + 1
counter := counter + 1
// counter is now 2

plot(close)

// Example: Calculate running total
runningTotal = 0
runningTotal := runningTotal + volume
plot(runningTotal, title="Volume Total")
```

---

## Special Variable Keywords

### var

The `var` keyword declares a variable that only initializes once:

```pinescript
//@version=6
indicator("var vs let")

// Without var - resets every bar
counter1 = 0
counter1 := counter1 + 1

// With var - initializes once, persists across bars
var counter2 = 0
counter2 := counter2 + 1

plot(counter1, color=color.red, title="Without var")
plot(counter2, color=color.green, title="With var")
```

### varip

Similar to `var` but preserves value across bars during real-time updates:

```pinescript
//@version=6
indicator("varip Demo")

// varip keeps value during real-time bar
varip realTimeCounter = 0
realTimeCounter := realTimeCounter + 1

plot(close)
```

---

## Accessing Historical Data

Use square brackets `[]` to access past values:

```pinescript
//@version=6
indicator("Historical Access")

// Current bar
current = close

// 1 bar ago
oneBarAgo = close[1]

// 5 bars ago
fiveBarsAgo = close[5]

// 10 bars ago
tenBarsAgo = close[10]

plot(current, color=color.blue)
plot(oneBarAgo, color=color.red, linewidth=2)
```

---

## Working with Multiple Timeframes

```pinescript
//@version=6
indicator("Timeframe Demo")

// Get data from different timeframes
dailyClose = request.security(syminfo.tickerid, "D", close)
weeklyClose = request.security(syminfo.tickerid, "W", close)
monthlyClose = request.security(syminfo.tickerid, "M", close)

plot(close, title="Current")
plot(dailyClose, title="Daily", color=color.orange)
```

---

## Practical Examples

### Example 1: Price Change Calculator

```pinescript
//@version=6
indicator("Price Change")

priceChange = close - close[1]
percentChange = (close - close[1]) / close[1] * 100

plot(priceChange, title="Price Change")
plot(percentChange, title="% Change", color=color.purple)
```

### Example 2: High/Low Range

```pinescript
//@version=6
indicator("Range")

period = input.int(20, "Period")

highest = ta.highest(high, period)
lowest = ta.lowest(low, period)
range = highest - lowest

plot(highest, color=color.green, title="Highest")
plot(lowest, color=color.red, title="Lowest")
fill(plot1=highest, plot2=lowest, color=color.new(color.blue, 90))
```

### Example 3: Momentum Indicator

```pinescript
//@version=6
indicator("Momentum")

period = input.int(10, "Period")

momentum = close - close[period]

plot(0, color=color.gray, linestyle=plot.style_hline)
plot(momentum, color=momentum > 0 ? color.green : color.red, title="Momentum")
```

---

## Common Mistakes

### 1. Using = instead of :=

```pinescript
// Wrong
x = 10
x = x + 1  // This creates a new variable!

// Correct
x = 10
x := x + 1  // This reassigns the existing variable
```

### 2. Forgetting Series Nature

```pinescript
// Wrong - trying to use a single value
fixedValue = ta.sma(close, 20)
if fixedValue > 100  // This compares ALL bars, not just current

// Correct - using series comparison
smaValue = ta.sma(close, 20)
if smaValue > 100    // This works on the current bar
```

### 3. Not Initializing Variables

```pinescript
// Wrong - variable used before assignment
if bar_index > 100
    value := close  // What is value before bar 100?

// Correct - initialize first
value = 0.0
if bar_index > 100
    value := close
```

---

## Best Practices

1. **Use descriptive names**: `sma20` instead of `s`
2. **Initialize variables**: Always give initial values
3. **Use explicit types**: Helps catch errors early
4. **Comment complex code**: Explain your logic
5. **Keep variables local**: Don't create global variables unnecessarily

---

## Next Steps

- **[[pinescript/basics/operators]]** - Mathematical and logical operations
- **[[pinescript/basics/functions]]** - Using Pine Script functions
- **[[pinescript/basics/inputs]]** - User input handling

---

## Quick Reference

| Type | Example | Description |
|------|---------|-------------|
| int | `count = 10` | Whole number |
| float | `price = 100.5` | Decimal number |
| bool | `isTrue = true` | True/false |
| string | `name = "Test"` | Text |
| color | `c = color.red` | Color value |
| series | `close` | Time series |

---

*Master variables to master Pine Script.*
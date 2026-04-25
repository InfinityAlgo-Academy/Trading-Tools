---
title: "Pine Script - Complete Programming Guide"
description: "Master Pine Script from scratch. Complete guide to build custom TradingView indicators, strategies, and automated trading systems."
tags: [pine-script, tradingview, programming, indicators, automation]
slug: pinescript-guide
---

# Pine Script - Complete Programming Guide

Welcome to the most comprehensive Pine Script tutorial. This guide will take you from absolute beginner to building professional-grade trading indicators and automated strategies.

---

## Table of Contents

1. [[pinescript/basics/introduction]]
2. [[pinescript/basics/variables]]
3. [[pinescript/basics/operators]]
4. [[pinescript/basics/functions]]
5. [[pinescript/basics/inputs]]
6. [[pinescript/basics/plotting]]
7. [[pinescript/indicators/moving-averages]]
8. [[pinescript/indicators/rsi]]
9. [[pinescript/indicators/macd]]
10. [[pinescript/indicators/bollinger-bands]]
11. [[pinescript/indicators/atr]]
12. [[pinescript/indicators/volume]]
13. [[pinescript/strategies/basics]]
14. [[pinescript/strategies/entries-exits]]
15. [[pinescript/strategies/stops]]
16. [[pinescript/strategies/backtesting]]
17. [[pinescript/advanced/timeframes]]
18. [[pinescript/advanced/custom-functions]]
19. [[pinescript/advanced/arrays]]
20. [[pinescript/advanced/optimization]]

---

## What is Pine Script?

Pine Script is TradingView's proprietary programming language designed specifically for financial chart analysis. Unlike general-purpose programming languages, Pine Script is optimized for:

- **Time series data** - Built-in support for OHLCV (Open, High, Low, Close, Volume) data
- **Indicator development** - Easy-to-use functions for technical analysis
- **Strategy backtesting** - Test your trading ideas on historical data
- **Real-time alerts** - Get notified when market conditions match your criteria
- **Multi-timeframe analysis** - Analyze data across different timeframes

### Why Learn Pine Script?

| Benefit | Description |
|---------|-------------|
| **Free to use** | No additional software needed |
| **Large community** | Access thousands of free scripts |
| **Fast development** | Simple syntax, quick prototyping |
| **Powerful features** | Build complex indicators |
| **Career opportunities** | Pine Script developers are in demand |

---

## Version History

Pine Script has evolved significantly since its introduction:

| Version | Year | Key Features |
|---------|------|--------------|
| v1 | 2011 | Basic plotting, limited functions |
| v2 | 2015 | Functions, security(), better debugging |
| v3 | 2019 | Arrays, var, line operations |
| v4 | 2020 | Objects, charts, drawing tools |
| v5 | 2022 | Matrix, enhanced debugging |
| v6 | 2024 | Latest features, performance improvements |

**Always use the latest version** (v5 or v6) for your scripts.

---

## Your First Pine Script

Let's start with the simplest possible indicator:

```pinescript
//@version=6
indicator("My First Script")
plot(close)
```

**What this does:**
- `//@version=6` - Uses Pine Script version 6
- `indicator("My First Script")` - Names your script
- `plot(close)` - Plots closing prices on the chart

### Step-by-Step Explanation

```pinescript
//@version=6
indicator("Simple Price Plot")

// Calculate 20-period Simple Moving Average
sma20 = ta.sma(close, 20)

// Plot the SMA
plot(sma20, color=color.blue, title="20 SMA")
```

**Breaking down each element:**

```pinescript
//@version=6                           // 1. Version declaration
indicator("Simple Price Plot")         // 2. Script name

// INPUT: User-configurable parameter
length = input.int(20, "Length")      // 3. User input

// CALCULATION: Calculate SMA
smaValue = ta.sma(close, length)      // 4. Indicator calculation

// OUTPUT: Draw on chart
plot(smaValue,                        // 5. What to plot
     color=color.blue,                // 6. Color
     title="20 SMA")                  // 7. Label
```

---

## Understanding the Code Structure

Every Pine Script follows this structure:

```
┌─────────────────────────────────────────┐
│  1. VERSION DECLARATION                 │
│     //@version=6                       │
├─────────────────────────────────────────┤
│  2. SCRIPT TYPE                         │
│     indicator() or strategy()          │
├─────────────────────────────────────────┤
│  3. INPUTS (Optional)                   │
│     input.*()                          │
├─────────────────────────────────────────┤
│  4. CALCULATIONS                        │
│     Variables, functions, logic        │
├─────────────────────────────────────────┤
│  5. OUTPUT                              │
│     plot(), plotshape(), fill()        │
└─────────────────────────────────────────┘
```

### Script Types

There are two main types of Pine Scripts:

```pinescript
// INDICATOR - For analysis only (no trading)
indicator("My Indicator", overlay=true)

// STRATEGY - For backtesting and trading
strategy("My Strategy", overlay=true)
```

---

## Key Concepts Explained

### 1. Series vs Int vs Float

```pinescript
//@version=6
indicator("Data Types Demo")

// SERIES - Changes every bar (most common)
seriesPrice = close
seriesMA = ta.sma(close, 20)

// INT - Whole number
intCount = 10

// FLOAT - Decimal number
floatPrice = 1234.56

plot(seriesPrice)
```

### 2. Bar Context

```pinescript
//@version=6
indicator("Bar Context")

// Current bar
currentClose = close

// Previous bar (1 bar ago)
prevClose = close[1]

// 5 bars ago
fiveBarsAgo = close[5]

// Check if current bar is green
isGreen = close > open
```

### 3. Built-in Variables

```pinescript
// Price data
open    // Open price
high    // High price
low     // Low price
close   // Close price
volume  // Trading volume

// Bar information
bar_index     // Current bar number
time          // Bar timestamp
ta.sma()      // Moving average
ta.ema()      // Exponential moving average
ta.rsi()      // Relative Strength Index
```

---

## Common Errors and How to Fix Them

### Error: Compilation Error

**Problem:** Code won't compile
**Solution:** Check for:
- Missing closing brackets `)`
- Missing quotes `""`
- Typo in function names
- Duplicate variable names

### Error: Loop Not Allowed

**Problem:** Traditional for-loops aren't supported in v2
**Solution:** Use vector operations:
```pinescript
// Wrong
for i = 0 to 10
    sum := sum + close[i]

// Correct
sum = math.sum(close, 11)
```

### Error: Reference Undeclared Variable

**Problem:** Using variable before defining it
**Solution:** Always define variables before use

---

## Next Steps

Now that you understand the basics, continue with:

1. **[[pinescript/basics/variables]]** - Deep dive into data types and variables
2. **[[pinescript/basics/operators]]** - Mathematical and logical operations
3. **[[pinescript/basics/functions]]** - Using and creating functions
4. **[[pinescript/indicators/moving-averages]]** - Build your first indicator

---

## Quick Reference

```pinescript
// Basic structure
//@version=6
indicator("Name", overlay=true)

// Inputs
input.int(14, "Period")
input.float(2.0, "Multiplier")
input.color(color.blue, "Color")

// Calculations
sma = ta.sma(close, 20)
ema = ta.ema(close, 20)
rsi = ta.rsi(close, 14)

// Output
plot(sma)
plotshape(condition)
hline(50)
```

---

*Start your Pine Script journey here. Complete all tutorials to become proficient.*
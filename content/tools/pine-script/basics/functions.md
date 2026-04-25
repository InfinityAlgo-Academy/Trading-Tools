---
title: "Pine Script Functions"
description: "Master Pine Script functions - from built-in functions to creating your own custom functions for reusable code."
tags: [pine-script, basics, functions, programming]
slug: tools/pine-script-basics-functions
---

# Functions in Pine Script

Functions are reusable blocks of code that perform specific tasks. Pine Script provides hundreds of built-in functions and allows you to create custom ones.

---

## Built-in Functions Overview

Pine Script includes many built-in functions organized by category:

### Price Functions
```tools/pine-script
ta.sma(series, length)      // Simple Moving Average
ta.ema(series, length)      // Exponential Moving Average
ta.wma(series, length)      // Weighted Moving Average
ta.rma(series, length)      // Rolling Moving Average
ta.vwma(series, length)     // Volume Weighted MA
ta.swma(series)             // Symmetrically Weighted MA
```

### Indicator Functions
```tools/pine-script
ta.rsi(series, length)              // Relative Strength Index
ta.macd(series, fast, slow, signal) // MACD
ta.stoch(source, k, d, smooth)      // Stochastic
ta.bb(series, length, mult)         // Bollinger Bands
ta.atr(length)                      // Average True Range
ta.cci(source, length)              // Commodity Channel Index
ta.adx(diLength)                    // Average Directional Index
```

### Math Functions
```tools/pine-script
math.abs(x)           // Absolute value
math.sqrt(x)          // Square root
math.pow(x, y)        // Power
math.round(x)         // Round
math.max(a, b, ...)   // Maximum
math.min(a, b, ...)   // Minimum
math.sum(x, length)   // Sum over period
```

---

## Using Built-in Functions

### Simple Moving Average

```tools/pine-script
//@version=6
indicator("SMA Example")

// Calculate 20-period SMA
sma20 = ta.sma(close, 20)

// Plot it
plot(sma20, color=color.blue, title="20 SMA")
```

### Multiple Indicators

```tools/pine-script
//@version=6
indicator("Multiple Indicators")

// Calculate multiple indicators
sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)
rsi14 = ta.rsi(close, 14)
atr14 = ta.atr(14)

// Plot all
plot(sma20, color=color.green, title="SMA 20")
plot(sma50, color=color.red, title="SMA 50")
plot(rsi14, color=color.purple, title="RSI", scale=scale.left)
plot(atr14, color=color.orange, title="ATR", scale=scale.left)

hline(70, color=color.red, linestyle=hline.style_dashed)
hline(30, color=color.green, linestyle=hline.style_dashed)
```

---

## Creating Custom Functions

### Basic Function Structure

```tools/pine-script
//@version=6
indicator("Custom Functions")

// Define a function
myFunction(param1, param2) =>
    result = param1 + param2
    result

// Use the function
sum = myFunction(10, 5)

plot(close)
```

### Function with Multiple Returns

```tools/pine-script
//@version=6
indicator("Multi-Return Function")

// Function that returns multiple values
getLevels(price, atr) =>
    stopLoss = price - atr * 2
    takeProfit = price + atr * 3
    [stopLoss, takeProfit]

// Use the function
atrValue = ta.atr(14)
[sl, tp] = getLevels(close, atrValue)

plot(close)
plot(sl, color=color.red)
plot(tp, color=color.green)
```

### Function with Conditional Logic

```tools/pine-script
//@version=6
indicator("Conditional Function")

// Calculate position size based on risk
calculatePositionSize(accountBalance, riskPercent, stopLoss) =>
    riskAmount = accountBalance * (riskPercent / 100)
    positionSize = riskAmount / stopLoss
    positionSize

// Use it
accountSize = 10000
risk = 2.0
stopDistance = close * 0.02  // 2% stop

size = calculatePositionSize(accountSize, risk, stopDistance)

plot(close)
```

---

## Practical Function Examples

### Example 1: Custom Moving Average

```tools/pine-script
//@version=6
indicator("Custom MA")

// Create custom moving average function
customSMA(src, length) =>
    sum = 0.0
    for i = 0 to length - 1
        sum := sum + src[i]
    sum / length

// Use it
ma20 = customSMA(close, 20)
ma50 = customSMA(close, 50)

plot(ma20, color=color.green, title="Custom SMA 20")
plot(ma50, color=color.red, title="Custom SMA 50")
```

### Example 2: Trend Detection Function

```tools/pine-script
//@version=6
indicator("Trend Function")

// Detect trend direction
getTrend(sma20, sma50) =>
    if sma20 > sma50
        "UPTREND"
    else if sma20 < sma50
        "DOWNTREND"
    else
        "SIDEWAYS"

sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)
trend = getTrend(sma20, sma50)

plot(sma20, color=color.green)
plot(sma50, color=color.red)
```

### Example 3: Support/Resistance Function

```tools/pine-script
//@version=6
indicator("Support Resistance")

// Find pivot levels
getPivots(length) =>
    pivotHigh = ta.pivothigh(high, length, length)
    pivotLow = ta.pivotlow(low, length, length)
    [pivotHigh, pivotLow]

[pH, pL] = getPivots(10)

// Plot pivots
plotshape(not na(pH), location=location.abovebar, style=shape.labeldown, color=color.red, text="R")
plotshape(not na(pL), location=location.belowbar, style=shape.labelup, color=color.green, text="S")

plot(close)
```

### Example 4: Signal Generation Function

```tools/pine-script
//@version=6
indicator("Signal Function")

// Generate buy/sell signals
getSignal(rsi, rsiOverbought, rsiOversold) =>
    buySignal = ta.crossover(rsi, rsiOversold)
    sellSignal = ta.crossunder(rsi, rsiOverbought)
    [buySignal, sellSignal]

rsi = ta.rsi(close, 14)
[buy, sell] = getSignal(rsi, 70, 30)

plotshape(buy, location=location.belowbar, shape=shape.labelup, color=color.green, text="BUY")
plotshape(sell, location=location.belowbar, shape=shape.labeldown, color=color.red, text="SELL")

plot(rsi, color=color.blue, title="RSI")
hline(70)
hline(30)
```

---

## Function Best Practices

### 1. Keep Functions Simple

```tools/pine-script
// Good - single responsibility
calculateSMA(src, length) =>
    ta.sma(src, length)

calculateATR(length) =>
    ta.atr(length)

// Good - composed functions
myIndicator(src, length) =>
    sma = calculateSMA(src, length)
    atr = calculateATR(length)
    [sma, atr]
```

### 2. Use Type Annotations

```tools/pine-script
//@version=6
indicator("Typed Functions")

// Explicitly typed function
addIntegers(int a, int b) => int
    a + b

// Series typed function
calculateSMA(series float src, int length) => series float
    ta.sma(src, length)

sma = calculateSMA(close, 20)
plot(sma)
```

### 3. Document Complex Functions

```tools/pine-script
//@version=6
indicator("Documented Function")

// Calculate position size based on risk management rules
// Parameters:
//   accountBalance: Total account size
//   riskPercent: Percentage of account to risk (0.01 - 0.1)
//   stopLoss: Price distance for stop loss
// Returns: Position size in units
calculateRiskPosition(float accountBalance, float riskPercent, float stopLoss) =>
    riskAmount = accountBalance * riskPercent
    positionSize = riskAmount / stopLoss
    positionSize
```

---

## Built-in Function Reference

### Moving Averages

| Function | Description |
|----------|-------------|
| `ta.sma(src, len)` | Simple Moving Average |
| `ta.ema(src, len)` | Exponential MA |
| `ta.wma(src, len)` | Weighted MA |
| `ta.vwma(src, len)` | Volume Weighted MA |
| `ta.rma(src, len)` | Rolling MA |
| `ta.dema(src, len)` | Double EMA |
| `ta.tema(src, len)` | Triple EMA |
| `ta.swma(src)` | Symmetrically Weighted MA |
| `ta.alma(src, len, offset, sigma)` | Arnaud Legoux MA |

### Oscillators

| Function | Description |
|----------|-------------|
| `ta.rsi(src, len)` | Relative Strength Index |
| `ta.stoch(k, d, smooth)` | Stochastic |
| `ta.cci(src, len)` | Commodity Channel Index |
| `ta.mom(src, len)` | Momentum |
| `ta.rocp(src, len)` | Rate of Change |
| `ta.trix(src, len)` | TRIX |
| `ta.wpr(length)` | Williams %R |

### Volatility

| Function | Description |
|----------|-------------|
| `ta.atr(len)` | Average True Range |
| `ta.bb(src, len, mult)` | Bollinger Bands |
| `ta.kc(src, len, mult)` | Keltner Channel |

### Trend

| Function | Description |
|----------|-------------|
| `ta.adx(diLen)` | Average Directional Index |
| `ta.vortex(viLen)` | Vortex Indicator |
| `ta.supertrend(factor, ATRPeriod)` | Supertrend |

---

## Next Steps

- **[[tools/pine-script/basics/inputs]]** - User input handling
- **[[tools/pine-script/basics/plotting]]** - Advanced plotting
- **[[tools/pine-script/indicators/moving-averages]]** - Build complete indicators

---

## Quick Reference

```tools/pine-script
// Call built-in function
sma = ta.sma(close, 20)

// Create custom function
myFunc(param1, param2) =>
    result = param1 + param2
    result

// Multiple return values
getValues() =>
    [value1, value2]

[a, b] = getValues()
```

---

*Functions make your code reusable and maintainable.*
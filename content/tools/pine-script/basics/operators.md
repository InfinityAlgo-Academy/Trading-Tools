---
title: "Pine Script Operators"
description: "Learn mathematical, comparison, and logical operators in Pine Script for building trading indicators."
tags: [pine-script, basics, operators, programming]
slug: tools/pine-script-basics-operators
---

# Operators in Pine Script

Operators allow you to perform calculations, make comparisons, and combine conditions. This guide covers all operators in Pine Script.

---

## Arithmetic Operators

### Basic Math

```tools/pine-script
//@version=6
indicator("Arithmetic Operators")

// Addition
sum = 10 + 5  // 15

// Subtraction
diff = 10 - 5  // 5

// Multiplication
product = 10 * 5  // 50

// Division
quotient = 10 / 5  // 2

// Modulo (remainder)
remainder = 10 % 3  // 1

plot(sum)
plot(diff)
plot(product)
plot(quotient)
```

### Practical Example: Average Price

```tools/pine-script
//@version=6
indicator("Typical Price")

typicalPrice = (high + low + close) / 3
plot(typicalPrice, title="Typical Price", color=color.blue)
```

---

## Comparison Operators

Used to compare values:

```tools/pine-script
//@version=6
indicator("Comparison Operators")

price = close

// Greater than
isAbove = price > 100

// Less than
isBelow = price < 100

// Greater than or equal
isAboveOrEqual = price >= 100

// Less than or equal
isBelowOrEqual = price <= 100

// Equal
isEqual = price == 100

// Not equal
isNotEqual = price != 100

plot(close)
```

---

## Logical Operators

Combine multiple conditions:

### and

Returns true if both conditions are true:

```tools/pine-script
//@version=6
indicator("AND Operator")

uptrend = close > ta.sma(close, 50)
bullishMomentum = close > close[1]

// Both conditions must be true
buySignal = uptrend and bullishMomentum

plotshape(buySignal, shape=shape.labelup, location=location.belowbar, color=color.green)
```

### or

Returns true if either condition is true:

```tools/pine-script
//@version=6
indicator("OR Operator")

oversoldRSI = ta.rsi(close, 14) < 30
oversoldStochastic = ta.stoch(14, 3, 3) < 20

// Either condition can be true
buySignal = oversoldRSI or oversoldStochastic

plotshape(buySignal, shape=shape.labelup, location=location.belowbar, color=color.green)
```

### not

Negates a condition:

```tools/pine-script
//@version=6
indicator("NOT Operator")

isGreen = close > open
isRed = not isGreen

plot(close)
plotshape(isRed, shape=shape.labeldown, location=location.abovebar, color=color.red)
```

---

## Ternary Operator (?:)

Conditional value selection:

```tools/pine-script
//@version=6
indicator("Ternary Operator")

price = close

// If price > 100, use green; otherwise red
color condition = price > 100 ? color.green : color.red

plot(close, color=color)

// More complex example
sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)

trendColor = close > sma50 ? color.green : close > sma20 ? color.orange : color.red

plot(sma20, color=trendColor)
plot(sma50, color=color.gray)
```

---

## Comparison Functions

### ta.crossover()

Returns true when series A crosses above series B:

```tools/pine-script
//@version=6
indicator("Crossover")

fastMA = ta.sma(close, 12)
slowMA = ta.sma(close, 26)

goldenCross = ta.crossover(fastMA, slowMA)

plot(fastMA, color=color.green)
plot(slowMA, color=color.red)
plotshape(goldenCross, shape=shape.labelup, location=location.belowbar, color=color.green, text="GOLDEN CROSS")
```

### ta.crossunder()

Returns true when series A crosses below series B:

```tools/pine-script
//@version=6
indicator("Crossunder")

fastMA = ta.sma(close, 12)
slowMA = ta.sma(close, 26)

deathCross = ta.crossunder(fastMA, slowMA)

plotshape(deathCross, shape=shape.labeldown, location=location.abovebar, color=color.red, text="DEATH CROSS")
```

### ta.highest() / ta.lowest()

Find highest/lowest values:

```tools/pine-script
//@version=6
indicator("Highest/Lowest")

period = input.int(20, "Period")

highestPrice = ta.highest(high, period)
lowestPrice = ta.lowest(low, period)

plot(highestPrice, color=color.green)
plot(lowestPrice, color=color.red)
```

---

## Math Functions

```tools/pine-script
//@version=6
indicator("Math Functions")

price = close

// Absolute value
absValue = math.abs(-10)  // 10

// Square root
sqrtValue = math.sqrt(16)  // 4

// Power
powerValue = math.pow(2, 3)  // 8

// Round
roundValue = math.round(10.5)  // 11

// Floor (round down)
floorValue = math.floor(10.9)  // 10

// Ceiling (round up)
ceilValue = math.ceil(10.1)  // 11

// Min/Max
minValue = math.min(5, 10)  // 5
maxValue = math.max(5, 10)  // 10

plot(close)
```

---

## Practical Trading Examples

### Example 1: Bollinger Band Touch

```tools/pine-script
//@version=6
indicator("BB Touch")

length = input.int(20, "Length")
mult = input.float(2.0, "Multiplier")

basis = ta.sma(close, length)
dev = mult * ta.stdev(close, length)
upper = basis + dev
lower = basis - dev

touchUpper = high >= upper
touchLower = low <= lower

plot(upper, color=color.red)
plot(basis, color=color.orange)
plot(lower, color=color.green)

plotshape(touchUpper, location=location.abovebar, shape=shape.labeldown, color=color.red, text="SELL")
plotshape(touchLower, location=location.belowbar, shape=shape.labelup, color=color.green, text="BUY")
```

### Example 2: Moving Average Trend

```tools/pine-script
//@version=6
indicator("MA Trend")

sma20 = ta.sma(close, 20)
sma50 = ta.sma(close, 50)
sma200 = ta.sma(close, 200)

strongUptrend = close > sma200 and sma200 > sma200[1] and sma50 > sma50[1]
weakUptrend = close > sma200 and sma50 > sma50[1]

trend = strongUptrend ? "STRONG" : weakUptrend ? "WEAK" : "DOWNTREND"

plot(sma20, color=color.green)
plot(sma50, color=color.orange)
plot(sma200, color=color.red)

plotchar(strongUptrend, char="▲", color=color.lime, location=location.belowbar, size=size.tiny)
plotchar(weakUptrend and not strongUptrend, char="△", color=color.green, location=location.belowbar, size=size.tiny)
```

### Example 3: RSI Overbought/Oversold

```tools/pine-script
//@version=6
indicator("RSI Zones")

rsi = ta.rsi(close, 14)

oversold = rsi < 30
overbought = rsi > 70
neutral = rsi >= 30 and rsi <= 70

rsiColor = overbought ? color.red : oversold ? color.green : color.blue

plot(rsi, color=rsiColor, linewidth=2)
hline(70, color=color.red, linestyle=hline.style_dashed)
hline(30, color=color.green, linestyle=hline.style_dashed)
hline(50, color=color.gray, linestyle=hline.style_dashed)

bgcolor(overbought ? color.new(color.red, 90) : oversold ? color.new(color.green, 90) : na)
```

---

## Operator Precedence

Order of operations (highest to lowest):

1. `()` - Parentheses
2. `^` - Exponentiation
3. `*` `/` `%` - Multiplication/Division/Modulo
4. `+` `-` - Addition/Subtparison
5. `>` `<` `>=` `<=` - Comparison
6. `==` `!=` - Equality
7. `not` - Logical NOT
8. `and` - Logical AND
9. `or` - Logical OR

```tools/pine-script
// Without parentheses
result = 10 + 5 * 2  // 20 (multiplication first)

// With parentheses
result = (10 + 5) * 2  // 30 (addition first)
```

---

## Next Steps

- **[[tools/pine-script/basics/functions]]** - Learn to use and create functions
- **[[tools/pine-script/basics/inputs]]** - User input handling
- **[[tools/pine-script/indicators/moving-averages]]** - Build your first real indicator

---

## Quick Reference

| Operator | Symbol | Example |
|----------|--------|---------|
| Add | `+` | `a + b` |
| Subtract | `-` | `a - b` |
| Multiply | `*` | `a * b` |
| Divide | `/` | `a / b` |
| Modulo | `%` | `a % b` |
| Greater | `>` | `a > b` |
| Less | `<` | `a < b` |
| Equal | `==` | `a == b` |
| And | `and` | `a and b` |
| Or | `or` | `a or b` |
| Not | `not` | `not a` |
| Ternary | `? :` | `a ? b : c` |

---

*Operators are the building blocks of all Pine Script logic.*
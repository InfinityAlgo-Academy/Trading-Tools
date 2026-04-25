---
title: "Arrays in Pine Script"
description: "Master arrays in Pine Script for advanced data manipulation, rolling calculations, and custom indicators."
tags: [pine-script, advanced, arrays, programming]
slug: pinescript-advanced-arrays
---

# Arrays in Pine Script

Arrays allow you to store and manipulate collections of data. This guide covers all array operations in Pine Script.

---

## Why Use Arrays?

| Use Case | Description |
|----------|-------------|
| Rolling calculations | Keep history of values |
| Custom indicators | Build complex logic |
| Data structures | Store multiple values |
| Loops | Iterate through data |

---

## Basic Arrays

### Create Array

```pinescript
//@version=6
indicator("Basic Arrays")

// Create empty array
myArray = array.new_float()

// Create with values
numbers = array.new_float(0)
array.push(numbers, 10)
array.push(numbers, 20)
array.push(numbers, 30)

plot(close)
```

### Array with Initial Values

```pinescript
//@version=6
indicator("Initial Values")

// Create with size
arr = array.new_float(5, 0)

// Set values
array.set(arr, 0, 10)
array.set(arr, 1, 20)
array.set(arr, 2, 30)

firstValue = array.get(arr, 0)
plot(firstValue)
```

---

## Array Functions

### Adding/Getting Values

```pinescript
//@version=6
indicator("Array Functions")

arr = array.new_float(0)

// Push values
array.push(arr, 100)
array.push(arr, 200)
array.push(arr, 300)

// Get values
val0 = array.get(arr, 0)  // 100
val1 = array.get(arr, 1)  // 200
val2 = array.get(arr, 2)  // 300

// Array size
size = array.size(arr)  // 3

plot(val0)
```

### Modifying Arrays

```pinescript
//@version=6
indicator("Modify Array")

arr = array.new_float(0)

// Add values
array.push(arr, 10)
array.push(arr, 20)
array.push(arr, 30)

// Modify
array.set(arr, 1, 25)  // Change second element

// Remove last
lastVal = array.pop(arr)

// Clear
array.clear(arr)

plot(close)
```

---

## Practical Examples

### Rolling Maximum

```pinescript
//@version=6
indicator("Rolling Max")

var float[] priceHistory = array.new_float()

// Add current price to history
array.push(priceHistory, close)

// Keep only last 20
if array.size(priceHistory) > 20
    array.shift(priceHistory)

// Get max
maxPrice = array.max(priceHistory)

plot(maxPrice, color=color.red)
```

### Rolling Average

```pinescript
//@version=6
indicator("Rolling Avg")

var float[] prices = array.new_float()

// Add price
array.push(prices, close)

// Limit size
if array.size(prices) > 20
    array.shift(prices)

// Calculate average
avg = array.avg(prices)

plot(avg, color=color.blue)
```

### Standard Deviation

```pinescript
//@version=6
indicator("Std Dev")

var float[] prices = array.new_float()

array.push(prices, close)
if array.size(prices) > 20
    array.shift(prices)

mean = array.avg(prices)
variance = 0.0

for i = 0 to array.size(prices) - 1
    diff = array.get(prices, i) - mean
    variance := variance + diff * diff

stdDev = math.sqrt(variance / array.size(prices))

plot(stdDev, color=color.purple)
```

---

## Rolling Window Calculations

### Moving Average with Array

```pinescript
//@version=6
indicator("Array MA")

length = input.int(20, "Length")
var float[] data = array.new_float()

array.push(data, close)
if array.size(data) > length
    array.shift(data)

sum = 0.0
for i = 0 to array.size(data) - 1
    sum := sum + array.get(data, i)

ma = sum / array.size(data)

plot(ma, color=color.blue)
plot(ta.sma(close, length), color=color.red)
```

### Sum Over Period

```pinescript
//@version=6
indicator("Array Sum")

var float[] values = array.new_float()

array.push(values, volume)
if array.size(values) > 20
    array.shift(values)

totalVolume = array.sum(values)

plot(totalVolume, color=color.green)
```

---

## Custom Indicators with Arrays

### RSI with Arrays

```pinescript
//@version=6
indicator("Array RSI")

length = input.int(14, "Length")
var float[] gains = array.new_float()
var float[] losses = array.new_float()

change = close - close[1]

if change > 0
    array.push(gains, change)
    array.push(losses, 0)
else
    array.push(gains, 0)
    array.push(losses, math.abs(change))

if array.size(gains) > length
    array.shift(gains)
    array.shift(losses)

avgGain = array.avg(gains)
avgLoss = array.avg(losses)

rs = avgLoss == 0 ? 100 : avgGain / avgLoss
rsi = 100 - (100 / (1 + rs))

plot(rsi, title="RSI")
hline(70)
hline(30)
```

### Bollinger Bands with Arrays

```pinescript
//@version=6
indicator("Array BB")

length = input.int(20, "Length")
mult = input.float(2.0, "Multiplier")

var float[] prices = array.new_float()

array.push(prices, close)
if array.size(prices) > length
    array.shift(prices)

mean = array.avg(prices)
variance = 0.0

for i = 0 to array.size(prices) - 1
    diff = array.get(prices, i) - mean
    variance := variance + diff * diff

stdDev = math.sqrt(variance / array.size(prices))

upper = mean + mult * stdDev
lower = mean - mult * stdDev

plot(upper, color=color.red)
plot(mean, color=color.blue)
plot(lower, color=color.green)
```

---

## Historical Data with Arrays

### Price History

```pinescript
//@version=6
indicator("Price History")

lookback = input.int(50, "Lookback")
var float[] history = array.new_float()

array.push(history, close)
if array.size(history) > lookback
    array.shift(history)

// Highest in history
highestPrice = array.max(history)

// Lowest in history  
lowestPrice = array.min(history)

// Current vs range
position = (close - lowestPrice) / (highestPrice - lowestPrice)

plot(highestPrice, color=color.green, title="High")
plot(lowestPrice, color=color.red, title="Low")
```

---

## Multiple Arrays

```pinescript
//@version=6
indicator("Multiple Arrays")

var float[] highs = array.new_float()
var float[] lows = array.new_float()
var float[] closes = array.new_float()

array.push(highs, high)
array.push(lows, low)
array.push(closes, close)

if array.size(highs) > 20
    array.shift(highs)
    array.shift(lows)
    array.shift(closes)

avgHigh = array.avg(highs)
avgLow = array.avg(lows)
avgClose = array.avg(closes)

plot(avgHigh, color=color.green)
plot(avgLow, color=color.red)
plot(avgClose, color=color.blue)
```

---

## Complete Example

```pinescript
//@version=6
indicator("Complete Array Example", overlay=true)

// === INPUTS ===
length = input.int(20, "Length")
mult = input.float(2.0, "Multiplier")

// === ARRAYS ===
var float[] prices = array.new_float()
var float[] highsArr = array.new_float()
var float[] lowsArr = array.new_float()

// === ADD DATA ===
array.push(prices, close)
array.push(highsArr, high)
array.push(lowsArr, low)

// === LIMIT SIZE ===
if array.size(prices) > length
    array.shift(prices)
    array.shift(highsArr)
    array.shift(lowsArr)

// === CALCULATIONS ===
avgPrice = array.avg(prices)
maxHigh = array.max(highsArr)
minLow = array.min(lowsArr)

// Standard deviation
variance = 0.0
for i = 0 to array.size(prices) - 1
    diff = array.get(prices, i) - avgPrice
    variance := variance + diff * diff
stdDev = math.sqrt(variance / array.size(prices))

// Bands
upper = avgPrice + mult * stdDev
lower = avgPrice - mult * stdDev

// === PLOT ===
plot(upper, color=color.red, title="Upper")
plot(avgPrice, color=color.blue, title="MA")
plot(lower, color=color.green, title="Lower")

// Signal
buySignal = ta.crossover(close, lower)
sellSignal = ta.crossunder(close, upper)

plotshape(buySignal, location=location.belowbar, style=shape.labelup, color=color.lime)
plotshape(sellSignal, location=location.abovebar, style=shape.labeldown, color=color.red)
```

---

## Array Reference

| Function | Description |
|----------|-------------|
| `array.new_*()` | Create array |
| `array.push()` | Add to end |
| `array.pop()` | Remove from end |
| `array.shift()` | Remove from start |
| `array.get()` | Get value at index |
| `array.set()` | Set value at index |
| `array.size()` | Get array size |
| `array.avg()` | Calculate average |
| `array.sum()` | Calculate sum |
| `array.max()` | Find maximum |
| `array.min()` | Find minimum |
| `array.clear()` | Clear all values |

---

## Best Practices

1. **Initialize with var** - Keep array across bars
2. **Limit size** - Prevent memory issues
3. **Use shift()** - Remove old data
4. **Check size** - Before accessing elements
5. **Type consistency** - Use same type in array

---

## Next Steps

- **[[pinescript-advanced-optimization]]** - Optimize your code
- **[[pinescript-strategies-examples]]** - More strategies
- **[[pinescript-indicators-volume]]** - More indicators

---

*Arrays unlock advanced Pine Script capabilities.*
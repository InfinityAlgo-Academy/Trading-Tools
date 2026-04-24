---
title: "Complete Guide to Pivot Points"
tags:
  - technical-analysis
  - pivot-points
  - indicators
  - support-resistance
  - beginner
---

# Complete Guide to Pivot Points

Pivot points are technical indicators used to determine support/resistance levels and potential market turning points. They are calculated from previous period's high, low, and close prices.

## Types of Pivot Points

### 1. Classic Pivot (Standard)

The most common pivot point system. Uses the previous day's high, low, and close.

**Formulas:**
```
Pivot Point (PP) = (High + Low + Close) / 3

Support 1 (S1) = (PP × 2) - Previous High
Support 2 (S2) = PP - (Previous High - Previous Low)
Support 3 (S3) = S2 - (Previous High - Previous Low)

Resistance 1 (R1) = (PP × 2) - Previous Low
Resistance 2 (R2) = PP + (Previous High - Previous Low)
Resistance 3 (R3) = R2 + (Previous High - Previous Low)
```

### 2. Fibonacci Pivot

Combines classic pivot with Fibonacci ratios.

**Formulas:**
```
Pivot Point = (High + Low + Close) / 3

S1 = PP - ((High - Low) × 0.382)
S2 = PP - ((High - Low) × 0.618)
S3 = PP - ((High - Low) × 1.000)

R1 = PP + ((High - Low) × 0.382)
R2 = PP + ((High - Low) × 0.618)
R3 = PP + ((High - Low) × 1.000)
```

### 3. Camarilla Pivot

Developed by Nick Scott. Uses a different approach with closer levels.

**Formulas:**
```
Pivot Point = (High + Low + Close) / 3

S1 = Close - ((High - Low) × 0.0917)
S2 = Close - ((High - Low) × 0.1833)
S3 = Close - ((High - Low) × 0.2750)
S4 = Close - ((High - Low) × 0.3667)

R1 = Close + ((High - Low) × 0.0917)
R2 = Close + ((High - Low) × 0.1833)
R3 = Close + ((High - Low) × 0.2750)
R4 = Close + ((High - Low) × 0.3667)
```

### 4. DeMark Pivot (DM)

Developed by Tom DeMark. Uses a different calculation method based on the relationship between open and close.

**Formulas:**
```
If Close < Open:
  Demark Pivot = High + (Low × 2) + Close

If Close > Open:
  Demark Pivot = (High × 2) + Low + Close

If Close = Open:
  Demark Pivot = High + Low + (Close × 2)
```

### 5. Woodie Pivot

Similar to classic but gives more weight to the close price.

**Formulas:**
```
Pivot Point = (High + Low + (Close × 2)) / 4

S1 = (PP × 2) - High
S2 = PP - (High - Low)

R1 = (PP × 2) - Low
R2 = PP + (High - Low)
```

---

## Comparison Table

| Type | Formula Complexity | Support Levels | Best For |
|------|-------------------|---------------|----------|
| Classic | Medium | 3 | Daily trading |
| Fibonacci | Medium | 3 | Fibonacci traders |
| Camarilla | Low | 4 | Intraday scalping |
| DeMark | Low | 1 | Reversal signals |
| Woodie | Medium | 2 | Close-weighted |

---

## Trading with Pivot Points

### Support/Resistance Trading

1. **Bounce Trading:**
   - Price approaches S1/R1
   - Shows reversal candlesticks
   - Enter in direction of bounce

2. **Breakout Trading:**
   - Price breaks through S2/R2
   - Strong momentum confirmation
   - Target next support level

### Time Frames

- **Daily pivots:** 15min, 1hr, 4hr charts
- **Weekly pivots:** Daily, 4hr charts
- **Monthly pivots:** Daily, Weekly charts

### Confluence

For stronger signals, combine pivots with:
- Moving averages (50, 200)
- Trend lines
- Fibonacci retracements
- Volume zones

---

## Common Strategies

### Pivot Bounce

```python
def pivot_bounce_strategy(df):
    """
    Enter when price bounces from pivot level.
    """
    # Calculate pivots from previous day
    prev = df.iloc[-2]  # Previous day
    
    # Basic pivot
    pp = (prev['High'] + prev['Low'] + prev['Close']) / 3
    
    # Support levels
    s1 = (pp * 2) - prev['High']
    s2 = pp - (prev['High'] - prev['Low'])
    
    # Resistance levels  
    r1 = (pp * 2) - prev['Low']
    r2 = pp + (prev['High'] - prev['Low'])
    
    # Current candle
    current = df.iloc[-1]
    
    # Signals
    if current['Close'] < s1 and current['Close'] > s2:
        if shows_reversal(df):
            return 'BUY'  # Bounce from S1
            
    if current['Close'] > r1 and current['Close'] < r2:
        if shows_reversal(df):
            return 'SELL'  # Bounce from R1
```

### Pivot Breakout

```python
def pivot_breakout_strategy(df):
    """
    Enter when price breaks pivot levels.
    """
    prev = df.iloc[-2]
    pp = (prev['High'] + prev['Low'] + prev['Close']) / 3
    r1 = (pp * 2) - prev['Low']
    s1 = (pp * 2) - prev['High']
    
    current = df.iloc[-1]
    
    # Breakout signals
    if current['Close'] > r1 and current['Close'] > current['Open']:
        return 'BUY'
        
    if current['Close'] < s1 and current['Close'] < current['Open']:
        return 'SELL'
```

---

## Practical Tips

### Daily Pivot Trading

1. Calculate previous day's HLC
2. Plot pivot point and S1, S2, S3, R1, R2, R3
3. Watch price action near levels
4. Enter on reversal or breakout

### Time Frame Selection

- **Scalping:** Camarilla pivots on 5min
- **Day trading:** Classic pivots on 15min/1hr
- **Swing trading:** Weekly pivots on daily charts

### Important Notes

1. Pivots recalculate at each period close
2. Daily pivots work best for intraday
3. Higher time frame pivots = stronger levels
4. Combine with trend analysis

---

## Conclusion

Pivot points provide objective support/resistance levels:
- **Classic:** Most widely used
- **Fibonacci:** Good with Fibonacci tools
- **Camarilla:** Tight levels for scalping
- **DeMark:** Unique reversal signals
- **Woodie:** Close-weighted

Start with classic pivots and experiment with others. Find what works best for your trading style and market.

The key is consistency - use the same pivot system regularly and understand its behavior across different market conditions.
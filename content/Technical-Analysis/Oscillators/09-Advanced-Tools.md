---
title: "Advanced Technical Indicators"
tags:
  - technical-analysis
  - oscillators
  - ichimoku
  - parabolic-sar
  - advanced
---

# Advanced Tools - Ichimoku Cloud & Parabolic SAR

This article covers the Ichimoku Cloud and Parabolic SAR, two advanced technical analysis tools.

## Ichimoku Cloud

The Ichimoku Cloud is a comprehensive indicator providing support/resistance, trend direction, and momentum signals.

### Components

```
Tenkan-sen (Conversion Line) = (Highest High + Lowest Low) / 2 for 9 periods
Kijun-sen (Base Line) = (Highest High + Lowest Low) / 2 for 26 periods

Senkou Span A (Leading Span A) = (Tenkan-sen + Kijun-sen) / 2, plotted 26 periods ahead
Senkou Span B (Leading Span B) = (Highest High + Lowest Low) / 2 for 52 periods, plotted 26 periods ahead

Chikou Span (Lagging Span) = Close, plotted 26 periods behind
```

### Cloud Interpretation

- **Cloud above price**: Bearish trend
- **Cloud below price**: Bullish trend
- **Cloud thickness**: Strength of support/resistance
- **Tenkan above Kijun**: Bullish momentum
- **Tenkan below Kijun**: Bearish momentum

### Signals

1. **Tenkan/Kijun Cross**:
   - Tenkan crosses above Kijun → Bullish
   - Tenkan crosses below Kijun → Bearish

2. **Price/Cloud Cross**:
   - Price crosses above cloud → Bullish
   - Price crosses below cloud → Bearish

3. **Cloud Twist**:
   - Cloud changes direction → Trend reversal

4. **Chikou Confirmation**:
   - Chikou above price/below price confirms direction

---

## Parabolic SAR

The Parabolic SAR provides stop-and-reversal points.

### Formula

```
SAR = Prior SAR + Prior AF × (Prior EP - Prior SAR)

Where:
AF = Acceleration Factor (starts at 0.02, max 0.2)
EP = Extreme Price (highest high / lowest low)
```

### Interpretation

- **SAR below price**: Uptrend
- **SAR above price**: Downtrend
- **SAR touched**: Trend reversal
- **AF increases**: Accelerating trend

### Settings

- **Start (AF)**: 0.02 (sensitivity)
- **Increment**: 0.02
- **Maximum**: 0.2

Higher values = more sensitive

---

## Python Implementation

### Ichimoku Cloud

```python
def calculate_ichimoku(high, low, close, 
                   tenkan_period: int = 9,
                   kijun_period: int = 26,
                   senkou_period: int = 52) -> pd.DataFrame:
    """
    Calculate Ichimoku Cloud.
    
    Args:
        high: High prices
        low: Low prices
        close: Close prices
        tenkan_period: Tenkan-sen period
        kijun_period: Kijun-sen period
        senkou_period: Senkou Span B period
    
    Returns:
        DataFrame with Ichimoku components
    """
    # Tenkan-sen (Conversion Line)
    tenkan = (high.rolling(tenkan_period).max() + 
             low.rolling(tenkan_period).min()) / 2
    
    # Kijun-sen (Base Line)
    kijun = (high.rolling(kijun_period).max() + 
              low.rolling(kijun_period).min()) / 2
    
    # Senkou Span A (Leading Span A)
    senkou_a = ((tenkan + kijun) / 2).shift(kijun_period)
    
    # Senkou Span B (Leading Span B)
    senkou_b = ((high.rolling(senkou_period).max() + 
                low.rolling(senkou_period).min()) / 2).shift(kijun_period)
    
    # Chikou Span (Lagging Span)
    chikou = close.shift(kijun_period)
    
    result = pd.DataFrame(index=high.index)
    result['Tenkan'] = tenkan
    result['Kijun'] = kijun
    result['Senkou_A'] = senkou_a
    result['Senkou_B'] = senkou_b
    result['Chikou'] = chikou
    
    # Cloud
    result['Cloud_Upper'] = result[['Senkou_A', 'Senkou_B']].max(axis=1)
    result['Cloud_Lower'] = result[['Senkou_A', 'Senkou_B']].min(axis=1)
    
    return result
```

### Parabolic SAR

```python
def calculate_parabolic_sar(high, low, 
                      af_start: float = 0.02,
                      af_max: float = 0.2,
                      af_increment: float = 0.02) -> pd.Series:
    """
    Calculate Parabolic SAR.
    
    Args:
        high: High prices
        low: Low prices
        af_start: Starting acceleration factor
        af_max: Maximum acceleration factor
        af_increment: AF increment
    
    Returns:
        SAR series
    """
    sar = pd.Series(index=high.index, dtype=float)
    af = af_start
    ep = high.iloc[0]
    trend = 1  # 1 for up, -1 for down
    
    sar.iloc[0] = low.iloc[0]
    
    for i in range(1, len(high)):
        if trend == 1:  # Uptrend
            sar.iloc[i] = sar.iloc[i-1] + af * (ep - sar.iloc[i-1])
            
            if low.iloc[i] < sar.iloc[i]:
                trend = -1
                sar.iloc[i] = ep
                af = af_start
                ep = low.iloc[i]
            else:
                if high.iloc[i] > ep:
                    ep = high.iloc[i]
                    af = min(af + af_increment, af_max)
                    
        else:  # Downtrend
            sar.iloc[i] = sar.iloc[i-1] + af * (ep - sar.iloc[i-1])
            
            if high.iloc[i] > sar.iloc[i]:
                trend = 1
                sar.iloc[i] = ep
                af = af_start
                ep = high.iloc[i]
            else:
                if low.iloc[i] < ep:
                    ep = low.iloc[i]
                    af = min(af + af_increment, af_max)
    
    return sar
```

### Ichimoku Strategy

```python
def ichimoku_strategy(df) -> pd.DataFrame:
    """
    Ichimoku Cloud trading strategy.
    
    Args:
        df: DataFrame with OHLC
    
    Returns:
        DataFrame with signals
    """
    ichimoku = calculate_ichimoku(df['High'], df['Low'], df['Close'])
    
    result = pd.DataFrame(index=df.index)
    result['Price'] = df['Close']
    result['Tenkan'] = ichimoku['Tenkan']
    result['Kijun'] = ichimoku['Kijun']
    result['Cloud_Upper'] = ichimoku['Cloud_Upper']
    result['Cloud_Lower'] = ichimoku['Cloud_Lower']
    
    # Bullish: Price above cloud + Tenkan above Kijun
    bullish = (df['Close'] > result['Cloud_Upper']) & \
             (result['Tenkan'] > result['Kijun'])
    
    # Bearish: Price below cloud + Tenkan below Kijun
    bearish = (df['Close'] < result['Cloud_Lower']) & \
              (result['Tenkan'] < result['Kijun'])
    
    result['Signal'] = 0
    result.loc[bullish, 'Signal'] = 1
    result.loc[bearish, 'Signal'] = -1
    
    return result
```

---

## Pine Script v5 Implementation

### Ichimoku Cloud

```pinescript
//@version=5
indicator("Ichimoku Cloud", overlay=true)

tenkan = input.int(9, "Tenkan-sen")
kijun = input.int(26, "Kijun-sen")
senkou = input.int(52, "Senkou Span B")

// Tenkan-sen
tenkanSen = (ta.highest(high, tenkan) + ta.lowest(low, tenkan)) / 2

// Kijun-sen
kijunSen = (ta.highest(high, kijun) + ta.lowest(low, kijun)) / 2

// Senkou Span A
senkouA = (tenkanSen + kijunSen) / 2

// Senkou Span B
senkouB = (ta.highest(high, senkou) + ta.lowest(low, senkou)) / 2

// Cloud
senkouA_26 = senkouA[kijun]
senkouB_26 = senkouB[kijun]

upperCloud = math.max(senkouA_26, senkouB_26)
lowerCloud = math.min(senkouA_26, senkouB_26)

// Plot
plot(tenkanSen, "Tenkan-sen", color=color.red)
plot(kijunSen, "Kijun-sen", color=color.blue)

// Cloud fill
fill(plot(upperCloud), plot(lowerCloud), title="Cloud",
     color=color.new(color.green, 90))
```

### Parabolic SAR

```pinescript
//@version=5
indicator("Parabolic SAR", overlay=true)

start = input.float(0.02, "Start AF")
increment = input.float(0.02, "AF Increment")
maximum = input.float(0.20, "Maximum AF")

sar = ta.sar(start, increment, maximum)

plot(sar, "SAR", style=plot.style_cross, color=color.maroon, size=size.auto)
```

### Combined Strategy

```pinescript
//@version=5
strategy("Ichimoku + SAR", overlay=true,
         default_qty_type=strategy.percent_of_equity, default_qty_value=10)

tenkan = input.int(9, "Tenkan")
kijun = input.int(26, "Kijun")
senkou = input.int(52, "Senkou")

start = input.float(0.02, "SAR Start")

// Ichimoku
tenkanSen = (ta.highest(high, tenkan) + ta.lowest(low, tenkan)) / 2
kijunSen = (ta.highest(high, kijun) + ta.lowest(low, kijun)) / 2

// SAR
sar = ta.sar(start, 0.02, 0.20)

// Signals
longCondition = ta.crossover(tenkanSen, kijunSen) and close > close[kijun]
shortCondition = ta.crossunder(tenkanSen, kijunSen) and close < close[kijun]

if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Plot components
plot(tenkanSen, "Tenkan", color=color.red, display=display.none)
plot(kijunSen, "Kijun", color=color.blue, display=display.none)
plotshape(longCondition, "Buy", location.belowbar, color.green, 
        shape.triangleup, display=display.none)
plotshape(shortCondition, "Sell", location.abovebar, color.red,
        shape.triangledown, display=display.none)
```

---

## MQL4 Implementation

### Ichimoku Cloud

```mql4
//+------------------------------------------------------------------+
//| Ichimoku Cloud                                                   |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

#property indicator_chart_window

input int TenkanPeriod = 9;
input int KijunPeriod = 26;
input int SenkouPeriod = 52;

double TenkanBuffer[];
double KijunBuffer[];
double SenkouABuffer[];
double SenkouBBuffer[];

int OnInit()
{
   SetIndexBuffer(0, TenkanBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(1, KijunBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(2, SenkouABuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(3, SenkouBBuffer, INDICATOR_CALCULATIONS);
   
   return(INIT_SUCCEEDED);
}

int OnCalculate(const int rates_total,
              const int prev_calculated,
              const datetime &time[],
              const double &open[],
              const double &high[],
              const double &low[],
              const double &close[],
              const long &volume[],
              const int &spread[])
{
   double highest, lowest;
   
   // Tenkan-sen
   highest = high[rates_total-1];
   lowest = low[rates_total-1];
   for (int i = 0; i < TenkanPeriod; i++)
   {
      if (high[rates_total-1-i] > highest) highest = high[rates_total-1-i];
      if (low[rates_total-1-i] < lowest) lowest = low[rates_total-1-i];
   }
   TenkanBuffer[rates_total-1] = (highest + lowest) / 2;
   
   // Kijun-sen
   highest = high[rates_total-1];
   lowest = low[rates_total-1];
   for (int i = 0; i < KijunPeriod; i++)
   {
      if (high[rates_total-1-i] > highest) highest = high[rates_total-1-i];
      if (low[rates_total-1-i] < lowest) lowest = low[rates_total-1-i];
   }
   KijunBuffer[rates_total-1] = (highest + lowest) / 2;
   
   return(rates_total);
}
```

### Parabolic SAR

```mql4
//+------------------------------------------------------------------+
//| Parabolic SAR                                                    |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

#property indicator_chart_window

input double AFStart = 0.02;
input double AFIncrement = 0.02;
input double AFMaximum = 0.20;

double SARBuffer[];

int OnInit()
{
   SetIndexBuffer(0, SARBuffer, INDICATOR_CALCULATIONS);
   SetIndexStyle(0, DRAW_ARROW);
   SetIndexArrow(0, 170);
   
   return(INIT_SUCCEEDED);
}

int OnCalculate(const int rates_total,
              const int prev_calculated,
              const datetime &time[],
              const double &open[],
              const double &high[],
              const double &low[],
              const double &close[],
              const long &volume[],
              const int &spread[])
{
   static double af, ep;
   static int trend = 1;
   
   if (prev_calculated == 0)
   {
      af = AFStart;
      ep = high[rates_total-1];
      SARBuffer[rates_total-1] = low[rates_total-1];
      return(rates_total);
   }
   
   if (trend == 1)
   {
      SARBuffer[rates_total-1] = SARBuffer[rates_total-2] + 
                             af * (ep - SARBuffer[rates_total-2]);
      
      if (low[rates_total-1] < SARBuffer[rates_total-1])
      {
         trend = -1;
         SARBuffer[rates_total-1] = ep;
         af = AFStart;
         ep = low[rates_total-1];
      }
      else if (high[rates_total-1] > ep)
      {
         ep = high[rates_total-1];
         af = MathMin(af + AFIncrement, AFMaximum);
      }
   }
   else
   {
      SARBuffer[rates_total-1] = SARBuffer[rates_total-2] + 
                             af * (ep - SARBuffer[rates_total-2]);
      
      if (high[rates_total-1] > SARBuffer[rates_total-1])
      {
         trend = 1;
         SARBuffer[rates_total-1] = ep;
         af = AFStart;
         ep = high[rates_total-1];
      }
      else if (low[rates_total-1] < ep)
      {
         ep = low[rates_total-1];
         af = MathMin(af + AFIncrement, AFMaximum);
      }
   }
   
   return(rates_total);
}
```

---

## Trading Strategies

### Ichimoku + Parabolic SAR

```python
def combined_strategy(df) -> pd.DataFrame:
    """
    Combined Ichimoku and Parabolic SAR strategy.
    
    Args:
        df: DataFrame with OHLC
    
    Returns:
        DataFrame with signals
    """
    ichimoku = calculate_ichimoku(df['High'], df['Low'], df['Close'])
    sar = calculate_parabolic_sar(df['High'], df['Low'])
    
    result = pd.DataFrame(index=df.index)
    result['Price'] = df['Close']
    result['SAR'] = sar
    result['Cloud_Upper'] = ichimoku['Cloud_Upper']
    result['Cloud_Lower'] = ichimoku['Cloud_Lower']
    
    # Long: Price above cloud + SAR below price
    long = (df['Close'] > result['Cloud_Upper']) & (sar < df['Close'])
    
    # Short: Price below cloud + SAR above price  
    short = (df['Close'] < result['Cloud_Lower']) & (sar > df['Close'])
    
    result['Signal'] = 0
    result.loc[long, 'Signal'] = 1
    result.loc[short, 'Signal'] = -1
    
    return result
```

---

## Comparison

| Feature | Ichimoku Cloud | Parabolic SAR |
|--------|--------------|--------------|
| Purpose | Full trading system | Stop & reversal |
| Complexity | High | Low |
| Signals | Multiple | Trailing stop |
| Best For | Swing trading | Day trading |

---

## Conclusion

**Ichimoku Cloud:**
- Comprehensive system
- Multiple signal types
- Good for swing trading
- Requires practice

**Parabolic SAR:**
- Simple trailing stop
- Automatic trend detection
- Good for exit points
- Quick reversals

Common use:
- Ichimoku for entry direction
- Parabolic SAR for exit/stops
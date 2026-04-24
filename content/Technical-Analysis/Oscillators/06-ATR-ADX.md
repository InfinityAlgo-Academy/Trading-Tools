---
title: "ATR and ADX Indicators"
tags:
  - technical-analysis
  - oscillators
  - atr
  - adx
  - volatility
  - trend-strength
---

# ATR & ADX - Volatility & Trend Strength Indicators

This article covers Average True Range (ATR) and Average Directional Index (ADX), essential tools for measuring market volatility and trend strength.

## Average True Range (ATR)

The ATR measures market volatility by calculating the true range over a specified period. It reflects price volatility without indicating direction.

### Formula

```
True Range = Max of:
- |High - Low|
- |High - Previous Close|
- |Low - Previous Close|

ATR = Simple Moving Average of True Range
```

### Calculation Steps

1. Calculate True Range for each period:
   - High - Low
   - High - Previous Close (absolute)
   - Low - Previous Close (absolute)

2. Take the maximum of the three values

3. Calculate SMA of True Range over the period

### Interpretation

- **High ATR**: High volatility, larger price swings
- **Low ATR**: Low volatility, smaller price movements
- **Rising ATR**: Increasing volatility
- **Falling ATR**: Decreasing volatility

### Practical Applications

**Stop Loss Placement:**
- Stop = Entry Price - (Multiple × ATR)
- Example: Stop = Entry - 2 × ATR

**Position Sizing:**
- Max Risk = Account × Risk%
- Shares = Max Risk / (Multiple × ATR)

**Trend Confirmation:**
- Trending markets: Price moves more than 1 ATR in direction
- Ranging markets: Price confined to narrow range

---

## Average Directional Index (ADX)

The ADX measures trend strength without regard to direction. It combines two directional indicators: +DI and -DI.

### Formula

```
+DI = Smoothed +DM / ATR × 100
-DI = Smoothed -DM / ATR × 100

DX = |(+DI - -DI) / (+DI + -DI)| × 100

ADX = Smoothed DX
```

### Components

**Directional Movement (+DM / -DM):**
- +DM = Current High - Previous High
- -DM = Previous Low - Current Low
- Use only the larger value when both are positive

**Directional Indicators:**
- +DI: Measures upward momentum
- -DI: Measures downward momentum

### Interpretation

- **ADX > 25**: Strong trend
- **ADX < 20**: Weak trend / ranging
- **ADX rising**: Trend strengthening
- **ADX falling**: Trend weakening

**+DI > -DI**: Uptrend momentum
**-DI > +DI**: Downtrend momentum

### Crossover Signals

- **Long**: +DI crosses above -DI, ADX > 20
- **Short**: -DI crosses above +DI, ADX > 20
- **Weak**: ADX < 20

---

## Python Implementation

### ATR Function

```python
import pandas as pd
import numpy as np

def calculate_atr(high, low, close, period: int = 14) -> pd.Series:
    """
    Calculate Average True Range.
    
    Args:
        high: High prices
        low: Low prices
        close: Close prices
        period: ATR period
    
    Returns:
        ATR series
    """
    prev_close = close.shift(1)
    
    tr1 = high - low
    tr2 = (high - prev_close).abs()
    tr3 = (low - prev_close).abs()
    
    true_range = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
    atr = true_range.rolling(window=period).mean()
    
    return atr
```

### ADX Function

```python
def calculate_adx(high, low, close, period: int = 14) -> pd.DataFrame:
    """
    Calculate ADX, +DI, and -DI.
    
    Args:
        high: High prices
        low: Low prices
        close: Close prices
        period: ADX period
    
    Returns:
        DataFrame with ADX, +DI, -DI
    """
    prev_close = close.shift(1)
    
    plus_dm = high.diff()
    minus_dm = -low.diff()
    
    plus_dm[plus_dm < 0] = 0
    minus_dm[minus_dm < 0] = 0
    
    tr1 = high - low
    tr2 = (high - prev_close).abs()
    tr3 = (low - prev_close).abs()
    true_range = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
    
    atr = true_range.rolling(window=period).mean()
    
    plus_di = 100 * (plus_dm.rolling(window=period).mean() / atr)
    minus_di = 100 * (minus_dm.rolling(window=period).mean() / atr)
    
    dx = 100 * (plus_di - minus_di).abs() / (plus_di + minus_di)
    adx = dx.rolling(window=period).mean()
    
    result = pd.DataFrame(index=close.index)
    result['ADX'] = adx
    result['+DI'] = plus_di
    result['-DI'] = minus_di
    
    return result
```

### Complete Trading Strategy

```python
def adx_trading_strategy(df, adx_period: int = 14, 
                       min_adx: float = 25) -> pd.DataFrame:
    """
    ADX-based trading strategy.
    
    Args:
        df: DataFrame with OHLC
        adx_period: ADX period
        min_adx: Minimum ADX for trend
    
    Returns:
        DataFrame with signals
    """
    adx_data = calculate_adx(df['High'], df['Low'], df['Close'], adx_period)
    
    result = pd.DataFrame(index=df.index)
    result['Price'] = df['Close']
    result['ADX'] = adx_data['ADX']
    result['+DI'] = adx_data['+DI']
    result['-DI'] = adx_data['-DI']
    
    # Crossover signals
    plus_above = adx_data['+DI'] > adx_data['-DI']
    minus_above = adx_data['-DI'] > adx_data['+DI']
    
    golden_cross = (plus_above & ~plus_above.shift(1)) & (adx_data['ADX'] > min_adx)
    death_cross = (minus_above & ~minus_above.shift(1)) & (adx_data['ADX'] > min_adx)
    
    result['Signal'] = 0
    result.loc[golden_cross, 'Signal'] = 1   # Long
    result.loc[death_cross, 'Signal'] = -1  # Short
    
    return result
```

---

## Pine Script v5 Implementation

### ATR

```pinescript
//@version=5
indicator("ATR", overlay=false)

length = input.int(14, "ATR Period")

atr = ta.atr(length)

plot(atr, title="ATR", color=color.blue)
```

### ADX

```pinescript
//@version=5
indicator("ADX", overlay=false)

length = input.int(14, "ADX Period")

[diplus, diminus, adx] = ta.dmi(length, length)

plot(diplus, title="+DI", color=color.green)
plot(diminus, title="-DI", color=color.red)
plot(adx, title="ADX", color=color.blue, linewidth=2)

// ADX level
hline(25, "Trend Threshold", color=color.gray, linestyle=hline.style_dashed)

// Signals
plusCross = ta.crossover(diplus, diminus)
minusCross = ta.crossunder(diplus, diminus)

plotshape(plusCross and adx > 25, "Buy", location.bottom, color.green, 
          shape.triangleup, size=size.tiny)
plotshape(minusCross and adx > 25, "Sell", location.top, color.red,
          shape.triangledown, size=size.tiny)
```

### Complete ADX Strategy

```pinescript
//@version=5
strategy("ADX Trend Strategy", overlay=true, 
         default_qty_type=strategy.percent_of_equity, default_qty_value=10)

length = input.int(14, "ADX Period")
minADX = input.float(25, "Minimum ADX")

[diplus, diminus, adx] = ta.dmi(length, length)

// Entry conditions
longCondition = ta.crossover(diplus, diminus) and adx > minADX
shortCondition = ta.crossunder(diplus, diminus) and adx > minADX

// Plot DMI
plot(diplus, "+DI", color=color.green)
plot(diminus, "-DI", color=color.red)
plot(adx, "ADX", color=color.blue)

// Execute
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Alerts
alertcondition(longCondition, "Long Signal", "ADX: +DI crossed above -DI")
alertcondition(shortCondition, "Short Signal", "ADX: -DI crossed above +DI")
```

---

## MQL4 Implementation

### ATR

```mql4
//+------------------------------------------------------------------+
//| ATR Indicator                                                    |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

#property indicator_separate_window

input int ATRPeriod = 14;

double ATRBuffer[];

int OnInit()
{
   SetIndexBuffer(0, ATRBuffer, INDICATOR_CALCULATIONS);
   SetIndexStyle(0, DRAW_LINE);
   SetIndexLabel(0, "ATR");
   IndicatorDigits(5);
   
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
   if (rates_total < ATRPeriod)
      return(0);
   
   double tr;
   double sum = 0;
   
   for (int i = rates_total - ATRPeriod; i < rates_total; i++)
   {
      double high_low = high[i] - low[i];
      double high_prev = MathAbs(high[i] - close[i-1]);
      double low_prev = MathAbs(low[i] - close[i-1]);
      
      tr = high_low;
      if (high_prev > tr) tr = high_prev;
      if (low_prev > tr) tr = low_prev;
      
      sum += tr;
   }
   
   ATRBuffer[rates_total-1] = sum / ATRPeriod;
   
   return(rates_total);
}
```

### ADX

```mql4
//+------------------------------------------------------------------+
//| ADX Indicator                                                    |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

#property indicator_separate_window

input int ADXPeriod = 14;

double DIPlusBuffer[];
double DIMinusBuffer[];
double ADXBuffer[];

int OnInit()
{
   SetIndexBuffer(0, DIPlusBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(1, DIMinusBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(2, ADXBuffer, INDICATOR_CALCULATIONS);
   
   SetIndexStyle(0, DRAW_LINE);
   SetIndexStyle(1, DRAW_LINE);
   SetIndexStyle(2, DRAW_LINE);
   
   SetIndexLabel(0, "+DI");
   SetIndexLabel(1, "-DI");
   SetIndexLabel(2, "ADX");
   
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
   double DMPlus[], DMMinus[], TR;
   ArrayResize(DMPlus, rates_total);
   ArrayResize(DMMinus, rates_total);
   
   for (int i = 1; i < rates_total; i++)
   {
      DMPlus[i] = high[i] - high[i-1];
      DMMinus[i] = low[i-1] - low[i];
      
      if (DMPlus[i] < 0) DMPlus[i] = 0;
      if (DMMinus[i] < 0) DMMinus[i] = 0;
      
      if (DMPlus[i] > DMMinus[i])
         DMMinus[i] = 0;
      else if (DMMinus[i] > DMPlus[i])
         DMPlus[i] = 0;
   }
   
   double sumTR = 0, sumPlus = 0, sumMinus = 0;
   
   for (int i = rates_total - ADXPeriod; i < rates_total; i++)
   {
      sumTR += MathAbs(high[i] - low[i]);
      sumPlus += DMPlus[i];
      sumMinus += DMMinus[i];
   }
   
   if (sumTR > 0)
   {
      DIPlusBuffer[rates_total-1] = (sumPlus / sumTR) * 100;
      DIMinusBuffer[rates_total-1] = (sumMinus / sumTR) * 100;
   }
   
   double dx = MathAbs(DIPlusBuffer[rates_total-1] - DIMinusBuffer[rates_total-1]) / 
             (DIPlusBuffer[rates_total-1] + DIMinusBuffer[rates_total-1]) * 100;
   
   ADXBuffer[rates_total-1] = dx;
   
   return(rates_total);
}
```

---

## MQL5 Implementation

### ATR

```mql5
//+------------------------------------------------------------------+
//| ATR for MQL5                                                     |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property indicator_separate_window

#property indicator_plots 1
#property indicator_type1 DRAW_LINE
#property indicator_color1 Blue
#property indicator_width1 2

input int ATRPeriod = 14;

double ATRBuffer[];

int OnInit()
{
   SetIndexBuffer(0, ATRBuffer, INDICATOR_CALCULATIONS);
   PlotIndexSetString(0, PLOT_LABEL, "ATR(" + IntegerToString(ATRPeriod) + ")");
   IndicatorSetString(INDICATOR_SHORTNAME, "ATR");
   
   return(INIT_SUCCEEDED);
}

int OnCalculate(const int rates_total,
              const int prev_calculated,
              const datetime &time[],
              const double &open[],
              const double &high[],
              const double &low[],
              const double &close[],
              const long &tick_volume[],
              const long &volume[],
              const int &spread[])
{
   double tr, sum = 0;
   
   for (int i = rates_total - ATRPeriod; i < rates_total; i++)
   {
      double high_low = high[i] - low[i];
      double high_prev = MathAbs(high[i] - close[i-1]);
      double low_prev = MathAbs(low[i] - close[i-1]);
      
      tr = high_low;
      if (high_prev > tr) tr = high_prev;
      if (low_prev > tr) tr = low_prev;
      
      sum += tr;
   }
   
   ATRBuffer[rates_total-1] = sum / ATRPeriod;
   
   return(rates_total);
}
```

### ADX

```mql5
//+------------------------------------------------------------------+
//| ADX for MQL5                                                    |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property indicator_separate_window

#property indicator_plots 3
#property indicator_type1 DRAW_LINE
#property indicator_color1 Green
#property indicator_type2 DRAW_LINE
#property indicator_color2 Red
#property indicator_type3 DRAW_LINE
#property indicator_color3 Blue

input int ADXPeriod = 14;

double DIPlusBuffer[];
double DIMinusBuffer[];
double ADXBuffer[];

int OnInit()
{
   SetIndexBuffer(0, DIPlusBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(1, DIMinusBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(2, ADXBuffer, INDICATOR_CALCULATIONS);
   
   PlotIndexSetString(0, PLOT_LABEL, "+DI");
   PlotIndexSetString(1, PLOT_LABEL, "-DI");
   PlotIndexSetString(2, PLOT_LABEL, "ADX");
   
   IndicatorSetString(INDICATOR_SHORTNAME, "ADX");
   
   return(INIT_SUCCEEDED);
}

int OnCalculate(const int rates_total,
              const int prev_calculated,
              const datetime &time[],
              const double &open[],
              const double &high[],
              const double &low[],
              const double &close[],
              const long &tick_volume[],
              const long &volume[],
              const int &spread[])
{
   double sumTR = 0, sumPlus = 0, sumMinus = 0;
   
   for (int i = rates_total - ADXPeriod; i < rates_total; i++)
   {
      double tr = high[i] - low[i];
      double dmPlus = high[i] - high[i-1];
      double dmMinus = low[i-1] - low[i];
      
      if (dmPlus < 0) dmPlus = 0;
      if (dmMinus < 0) dmMinus = 0;
      
      sumTR += tr;
      sumPlus += dmPlus;
      sumMinus += dmMinus;
   }
   
   if (sumTR > 0)
   {
      DIPlusBuffer[rates_total-1] = (sumPlus / sumTR) * 100;
      DIMinusBuffer[rates_total-1] = (sumMinus / sumTR) * 100;
   }
   
   double dx = MathAbs(DIPlusBuffer[rates_total-1] - DIMinusBuffer[rates_total-1]) / 
             (DIPlusBuffer[rates_total-1] + DIMinusBuffer[rates_total-1]) * 100;
   
   ADXBuffer[rates_total-1] = dx;
   
   return(rates_total);
}
```

---

## Trading Strategies

### ATR-Based Position Sizing

```python
def calculate_position_size(account_balance: float, risk_pct: float,
                        entry_price: float, atr: float,
                        atr_multiplier: float = 2.0) -> float:
    """
    Calculate position size based on ATR.
    
    Args:
        account_balance: Account balance
        risk_pct: Risk percentage (e.g., 0.02 for 2%)
        entry_price: Entry price
        atr: Current ATR value
        atr_multiplier: ATR multiplier for stop
    
    Returns:
        Position size in shares
    """
    risk_amount = account_balance * risk_pct
    stop_distance = atr * atr_multiplier
    
    position_size = risk_amount / stop_distance
    
    return position_size
```

### ADX Trend Filter

```python
def adx_filter(df, min_adx: float = 25) -> pd.DataFrame:
    """
    Filter trades based on ADX trend strength.
    
    Args:
        df: DataFrame with ADX
        min_adx: Minimum ADX for trading
    
    Returns:
        DataFrame with filtered signals
    """
    adx_df = calculate_adx(df['High'], df['Low'], df['Close'])
    
    df['Trend'] = 'Weak'
    df.loc[adx_df['ADX'] > min_adx, 'Trend'] = 'Strong'
    
    return df
```

---

## Conclusion

Key points:

**ATR:**
- Measures volatility (not direction)
- Use for stops and position sizing
- Higher = more volatile

**ADX:**
- Measures trend strength (not direction)
- ADX > 25 = strong trend
- Use +DI/-DI for direction

Combined use:
- ADX confirms trend existence
- ATR sets stop distance
- Strong trend + proper sizing = successful trading
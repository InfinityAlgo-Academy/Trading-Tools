---
title: "Momentum Oscillators"
tags:
  - technical-analysis
  - oscillators
  - momentum
  - roc
  - awesome-oscillator
---

# Momentum Oscillators - Complete Guide

This article covers Momentum, Rate of Change (ROC), Awesome Oscillator, and other momentum-based indicators.

## Momentum

Momentum measures the rate of change in price over a specified period. It shows how fast prices are moving.

### Formula

```
Momentum = Current Price - Price n periods ago
```

Or alternatively:

```
Momentum = (Current Price / Price n periods ago) - 1
```

### Interpretation

- **Positive**: Price moving up (bullish momentum)
- **Negative**: Price moving down (bearish momentum)
- **Zero line**: Momentum shift
- **Rising from zero**: Momentum increasing
- **Falling toward zero**: Momentum weakening

---

## Rate of Change (ROC)

ROC measures the percentage change in price, making it easier to compare across different price levels.

### Formula

```
ROC = ((Current Price - Price n periods ago) / Price n periods ago) × 100
```

### Interpretation

- **Positive ROC**: Price increased
- **Negative ROC**: Price decreased
- **Zero line**: No change
- **Large positive**: Strong upward momentum
- **Large negative**: Strong downward momentum

---

## Awesome Oscillator (AO)

The AO is a momentum indicator that compares recent momentum to broader momentum.

### Formula

```
AO = SMA(Median Price, 5) - SMA(Median Price, 34)

Median Price = (High + Low) / 2
```

### Interpretation

- **AO > 0**: Bullish momentum
- **AO < 0**: Bearish momentum
- **AO crossing zero**: Momentum shift

### Signals

- **Saucer**: AO changes direction above/below zero
- **Twin Peaks**: Two peaks same direction, AO crosses between
- **Zero Line Cross**: AO crosses zero

---

## Python Implementation

### Momentum

```python
def calculate_momentum(close: pd.Series, period: int = 10) -> pd.Series:
    """
    Calculate Momentum.
    
    Args:
        close: Close prices
        period: Lookback period
    
    Returns:
        Momentum series
    """
    return close - close.shift(period)
```

### ROC

```python
def calculate_roc(close: pd.Series, period: int = 12) -> pd.Series:
    """
    Calculate Rate of Change.
    
    Args:
        close: Close prices
        period: Lookback period
    
    Returns:
        ROC series (percentage)
    """
    return ((close / close.shift(period)) - 1) * 100
```

### Awesome Oscillator

```python
def calculate_awesome_oscillator(high: pd.Series, low: pd.Series,
                                fast: int = 5, slow: int = 34) -> pd.Series:
    """
    Calculate Awesome Oscillator.
    
    Args:
        high: High prices
        low: Low prices
        fast: Fast period
        slow: Slow period
    
    Returns:
        AO series
    """
    median = (high + low) / 2
    
    fast_ma = median.rolling(window=fast).mean()
    slow_ma = median.rolling(window=slow).mean()
    
    return fast_ma - slow_ma
```

### Momentum Strategy

```python
def momentum_strategy(close: pd.Series, period: int = 14,
                    threshold: float = 0) -> pd.DataFrame:
    """
    Momentum-based strategy.
    
    Args:
        close: Close prices
        period: Momentum period
        threshold: Signal threshold
    
    Returns:
        DataFrame with signals
    """
    mom = calculate_momentum(close, period)
    
    result = pd.DataFrame(index=close.index)
    result['Price'] = close
    result['Momentum'] = mom
    
    # Signals
    result['Signal'] = 0
    result.loc[mom > threshold, 'Signal'] = 1
    result.loc[mom < -threshold, 'Signal'] = -1
    
    return result
```

---

## Pine Script v5 Implementation

### Momentum

```pinescript
//@version=5
indicator("Momentum", overlay=false)

length = input.int(10, "Period")

momentum = close - close[length]

plot(momentum, title="Momentum", color=color.blue)
hline(0, "Zero", color=color.gray)
```

### ROC

```pinescript
//@version=5
indicator("Rate of Change", overlay=false)

length = input.int(12, "Period")

roc = ((close / close[length]) - 1) * 100

plot(roc, title="ROC", color=color.green)
hline(0, "Zero", color=color.gray)
hline(5, "Overbought", color=color.red, linestyle=hline.style_dashed)
hline(-5, "Oversold", color=color.green, linestyle=hline.style_dashed)
```

### Awesome Oscillator

```pinescript
//@version=5
indicator("Awesome Oscillator", overlay=false)

fast = input.int(5, "Fast")
slow = input.int(34, "Slow")

median = (high + low) / 2
fastMA = ta.sma(median, fast)
slowMA = ta.sma(median, slow)

ao = fastMA - slowMA

plot(ao, title="AO", color=color.blue, histogram=0)

// Colors
plot(ao, title="AO", style=plot.style_histogram, color=ao >= 0 ? color.green : color.red)

// Zero line
hline(0, "Zero", color=color.gray)

// Saucer signal
saucer = (ao > 0 and ao[1] < 0) and (ao[2] > ao)

plotshape(saucer, "Saucer", location.bottom, color.green,
         shape.triangleup, size=size.tiny)
```

### Complete Momentum Strategy

```pinescript
//@version=5
strategy("Momentum Strategy", overlay=true,
         default_qty_type=strategy.percent_of_equity, default_qty_value=10)

length = input.int(14, "Momentum Period")
threshold = input.float(0, "Threshold")

momentum = close - close[length]

// Long when momentum crosses above threshold
longCondition = ta.crossover(momentum, threshold)

// Short when momentum crosses below -threshold  
shortCondition = ta.crossunder(momentum, -threshold)

if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

plot(momentum, "Momentum", color=color.blue, display=display.none)
```

---

## MQL4 Implementation

### Momentum

```mql4
//+------------------------------------------------------------------+
//| Momentum Indicator                                               |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

#property indicator_separate_window

input int MomentumPeriod = 10;

double MomentumBuffer[];

int OnInit()
{
   SetIndexBuffer(0, MomentumBuffer, INDICATOR_CALCULATIONS);
   SetIndexStyle(0, DRAW_LINE);
   SetIndexLabel(0, "Momentum");
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
   if (rates_total < MomentumPeriod)
      return(0);
   
   MomentumBuffer[rates_total-1] = close[rates_total-1] - close[rates_total-1-MomentumPeriod];
   
   return(rates_total);
}
```

### ROC

```mql4
//+------------------------------------------------------------------+
//| ROC Indicator                                                    |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

#property indicator_separate_window

input int ROCPeriod = 12;

double ROCBuffer[];

int OnInit()
{
   SetIndexBuffer(0, ROCBuffer, INDICATOR_CALCULATIONS);
   SetIndexStyle(0, DRAW_LINE);
   SetIndexLabel(0, "ROC");
   IndicatorDigits(2);
   
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
   if (rates_total < ROCPeriod)
      return(0);
   
   ROCBuffer[rates_total-1] = ((close[rates_total-1] / 
                                close[rates_total-1-ROCPeriod]) - 1) * 100;
   
   return(rates_total);
}
```

---

## MQL5 Implementation

### Momentum

```mql5
//+------------------------------------------------------------------+
//| Momentum for MQL5                                                |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property indicator_separate_window

#property indicator_plots 1
#property indicator_type1 DRAW_LINE
#property indicator_color1 Blue
#property indicator_width1 2

input int MomentumPeriod = 10;

double MomentumBuffer[];

int OnInit()
{
   SetIndexBuffer(0, MomentumBuffer, INDICATOR_CALCULATIONS);
   PlotIndexSetString(0, PLOT_LABEL, "Momentum(" + IntegerToString(MomentumPeriod) + ")");
   IndicatorSetString(INDICATOR_SHORTNAME, "Momentum");
   
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
   if (rates_total < MomentumPeriod)
      return(0);
   
   MomentumBuffer[rates_total-1] = close[rates_total-1] - close[rates_total-1-MomentumPeriod];
   
   return(rates_total);
}
```

### Awesome Oscillator

```mql5
//+------------------------------------------------------------------+
//| Awesome Oscillator for MQL5                                     |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property indicator_separate_window

#property indicator_plots 1
#property indicator_type1 DRAW_HISTOGRAM
#property indicator_color1 Green

input int FastMA = 5;
input int SlowMA = 34;

double AOBuffer[];

int OnInit()
{
   SetIndexBuffer(0, AOBuffer, INDICATOR_CALCULATIONS);
   PlotIndexSetString(0, PLOT_LABEL, "Awesome Oscillator");
   IndicatorSetString(INDICATOR_SHORTNAME, "AO");
   
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
   if (rates_total < SlowMA)
      return(0);
   
   double median, fastMA, slowMA;
   
   for (int i = 0; i < rates_total; i++)
   {
      median = (high[i] + low[i]) / 2;
      
      fastMA = 0;
      slowMA = 0;
      
      for (int j = 0; j < FastMA; j++)
         fastMA += median[i-j];
      fastMA /= FastMA;
      
      for (int j = 0; j < SlowMA; j++)
         slowMA += median[i-j];
      slowMA /= SlowMA;
      
      AOBuffer[i] = fastMA - slowMA;
   }
   
   return(rates_total);
}
```

---

## Trading Strategies

### Momentum Reversal Strategy

```python
def momentum_reversal(df, period: int = 20) -> pd.DataFrame:
    """
    Momentum reversal trading strategy.
    
    Args:
        df: DataFrame with prices
        period: Momentum period
    
    Returns:
        DataFrame with signals
    """
    mom = calculate_momentum(df['Close'], period)
    
    # Find extreme momentum
    mom_zscore = (mom - mom.rolling(20).mean()) / mom.rolling(20).std()
    
    result = pd.DataFrame(index=df.index)
    result['Price'] = df['Close']
    result['Momentum'] = mom
    result['ZScore'] = mom_zscore
    
    # Reversal signals
    result['Signal'] = 0
    result.loc[mom_zscore < -2, 'Signal'] = 1   # Oversold -> buy
    result.loc[mom_zscore > 2, 'Signal'] = -1   # Overbought -> sell
    
    return result
```

### Combined Momentum Strategy

```python
def combined_momentum_strategy(df) -> pd.DataFrame:
    """
    Combined momentum indicators.
    
    Args:
        df: DataFrame with OHLC
    
    Returns:
        DataFrame with signals
    """
    mom = calculate_momentum(df['Close'], 10)
    roc = calculate_roc(df['Close'], 12)
    ao = calculate_awesome_oscillator(df['High'], df['Low'])
    
    result = pd.DataFrame(index=df.index)
    result['Price'] = df['Close']
    result['Momentum'] = mom
    result['ROC'] = roc
    result['AO'] = ao
    
    # Combined signal: all bullish
    result['Signal'] = 0
    result.loc[(mom > 0) & (roc > 0) & (ao > 0), 'Signal'] = 1
    result.loc[(mom < 0) & (roc < 0) & (ao < 0), 'Signal'] = -1
    
    return result
```

---

## Comparison Table

| Indicator | Formula | Range | Best For |
|-----------|---------|-------|---------|
| Momentum | Price - Lagged Price | Unlimited | Direction |
| ROC | % Change | Unlimited | Percentage moves |
| AO | Fast SMA - Slow SMA | Unlimited | Trend changes |
| RSI | 100 - 100/(1+RS) | 0-100 | Overbought/oversold |
| Stochastic | %K vs %D | 0-100 | Entry timing |

---

## Conclusion

Momentum oscillators are essential tools:

- **Momentum**: Simple direction indicator
- **ROC**: Percentage-based comparison
- **AO**: Trend change detection

Best used with:
- Trend confirmation (ADX)
- Volatility context (ATR)
- Overbought/oversold (RSI)
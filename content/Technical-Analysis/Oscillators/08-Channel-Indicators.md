---
title: "Channel Indicators"
tags:
  - technical-analysis
  - oscillators
  - keltner
  - donchian
  - bollinger-bands
  - channels
---

# Channel Indicators - Keltner, Donchian, Bollinger Bands

This article covers channel-type indicators that create dynamic support/resistance zones.

## Keltner Channel

Keltner Channel is a volatility-based channel using ATR to create envelope around a moving average.

### Formula

```
Middle Line = EMA(Close, period)
Upper Line = EMA + (Multiplier × ATR)
Lower Line = EMA - (Multiplier × ATR)
```

### Interpretation

- **Price at upper band**: Overextended up
- **Price at lower band**: Overextended down
- **Band width**: Volatility measure
- **Price outside bands**: Strong move

---

## Donchian Channel

Donchian Channel uses highest high and lowest low over a period.

### Formula

```
Upper Band = Highest High over n periods
Middle Band = (Upper + Lower) / 2
Lower Band = Lowest Low over n periods
```

### Interpretation

- **Breakout above upper**: Bullish
- **Breakout below lower**: Bearish
- **Middle as pivot**: Trend reference

---

## Bollinger Bands

Bollinger Bands use standard deviation to create dynamic bands.

### Formula

```
Middle Band = SMA(Close, period)
Upper Band = Middle + (n × StdDev)
Lower Band = Middle - (n × StdDev)
```

### Interpretation

- **Bands expanding**: High volatility
- **Bands contracting**: Low volatility (potential breakout)
- **Price at upper**: Potentially overbought
- **Price at lower**: Potentially oversold

### Signals

- **Bollinger Bounce**: Price returns to middle
- **Bollinger Squeeze**: Low volatility, upcoming move
- **Band walking**: Price along band edge

---

## Envelopes

Envelopes are percentage-based bands around a moving average.

### Formula

```
Upper = MA × (1 + percentage)
Lower = MA × (1 - percentage)
```

### Interpretation

- **Touch upper**: Sell signal
- **Touch lower**: Buy signal
- **Useful in ranging markets**

---

## Python Implementation

### Keltner Channel

```python
def calculate_keltner_channel(high, low, close, period: int = 20,
                            multiplier: float = 2.0) -> pd.DataFrame:
    """
    Calculate Keltner Channel.
    
    Args:
        high: High prices
        low: Low prices
        close: Close prices
        period: EMA period
        multiplier: ATR multiplier
    
    Returns:
        DataFrame with Upper, Middle, Lower
    """
    prev_close = close.shift(1)
    
    tr1 = high - low
    tr2 = (high - prev_close).abs()
    tr3 = (low - prev_close).abs()
    true_range = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
    atr = true_range.rolling(window=period).mean()
    
    middle = close.ewm(span=period).mean()
    
    result = pd.DataFrame(index=close.index)
    result['Upper'] = middle + (multiplier * atr)
    result['Middle'] = middle
    result['Lower'] = middle - (multiplier * atr)
    
    return result
```

### Donchian Channel

```python
def calculate_donchian_channel(high, low, period: int = 20) -> pd.DataFrame:
    """
    Calculate Donchian Channel.
    
    Args:
        high: High prices
        low: Low prices
        period: Lookback period
    
    Returns:
        DataFrame with Upper, Middle, Lower
    """
    result = pd.DataFrame(index=high.index)
    result['Upper'] = high.rolling(window=period).max()
    result['Lower'] = low.rolling(window=period).min()
    result['Middle'] = (result['Upper'] + result['Lower']) / 2
    
    return result
```

### Bollinger Bands

```python
def calculate_bollinger_bands(close, period: int = 20,
                            std_dev: float = 2.0) -> pd.DataFrame:
    """
    Calculate Bollinger Bands.
    
    Args:
        close: Close prices
        period: SMA period
        std_dev: Standard deviation multiplier
    
    Returns:
        DataFrame with Upper, Middle, Lower
    """
    middle = close.rolling(window=period).mean()
    std = close.rolling(window=period).std()
    
    result = pd.DataFrame(index=close.index)
    result['Upper'] = middle + (std_dev * std)
    result['Middle'] = middle
    result['Lower'] = middle - (std_dev * std)
    
    return result
```

### Envelopes

```python
def calculate_envelope(close, period: int = 20,
                      percentage: float = 0.05) -> pd.DataFrame:
    """
    Calculate Envelope.
    
    Args:
        close: Close prices
        period: MA period
        percentage: Percentage for bands
    
    Returns:
        DataFrame with Upper, Middle, Lower
    """
    middle = close.rolling(window=period).mean()
    
    result = pd.DataFrame(index=close.index)
    result['Upper'] = middle * (1 + percentage)
    result['Middle'] = middle
    result['Lower'] = middle * (1 - percentage)
    
    return result
```

---

## Pine Script v5 Implementation

### Keltner Channel

```pinescript
//@version=5
indicator("Keltner Channel", overlay=true)

length = input.int(20, "Length")
multiplier = input.float(2.0, "Multiplier")

middle = ta.ema(close, length)
atr = ta.atr(length)

upper = middle + multiplier * atr
lower = middle - multiplier * atr

plot(upper, "Upper", color=color.red)
plot(middle, "Middle", color=color.gray)
plot(lower, "Lower", color=color.green)
```

### Donchian Channel

```pinescript
//@version=5
indicator("Donchian Channel", overlay=true)

length = input.int(20, "Length")

upper = ta.highest(high, length)
lower = ta.lowest(low, length)
middle = (upper + lower) / 2

plot(upper, "Upper", color=color.red)
plot(middle, "Middle", color=color.gray)
plot(lower, "Lower", color=color.green)

// Fill
fill(plot(upper), plot(lower), title="Channel", 
     color=color.new(color.blue, 90))
```

### Bollinger Bands

```pinescript
//@version=5
indicator("Bollinger Bands", overlay=true)

length = input.int(20, "Length")
mult = input.float(2.0, "StdDev")

[middle, upper, lower] = ta.bb(close, length, mult)

plot(upper, "Upper", color=color.red)
plot(middle, "Middle", color=color.gray)
plot(lower, "Lower", color=color.green)
```

### Envelope

```pinescript
//@version=5
indicator("Envelope", overlay=true)

length = input.int(20, "Length")
percent = input.float(5.0, "Percentage") / 100

ma = ta.sma(close, length)

upper = ma * (1 + percent)
lower = ma * (1 - percent)

plot(upper, "Upper", color=color.red)
plot(ma, "Middle", color=color.gray)
plot(lower, "Lower", color=color.green)
```

---

## Channel Trading Strategies

### Keltner Breakout Strategy

```python
def keltner_breakout_strategy(df) -> pd.DataFrame:
    """
    Keltner Channel breakout strategy.
    
    Args:
        df: DataFrame with OHLC
    
    Returns:
        DataFrame with signals
    """
    kc = calculate_keltner_channel(df['High'], df['Low'], df['Close'])
    
    result = pd.DataFrame(index=df.index)
    result['Price'] = df['Close']
    result['Upper'] = kc['Upper']
    result['Lower'] = kc['Lower']
    
    # Breakout signals
    result['Signal'] = 0
    result.loc[df['Close'] > kc['Upper'], 'Signal'] = 1   # Long
    result.loc[df['Close'] < kc['Lower'], 'Signal'] = -1  # Short
    
    return result
```

### Bollinger Squeeze Strategy

```python
def bollinger_squeeze_strategy(close, period: int = 20,
                          std_mult: float = 2.0) -> pd.DataFrame:
    """
    Bollinger Bands squeeze strategy.
    
    Args:
        close: Close prices
        period: BB period
        std_mult: StdDev multiplier
    
    Returns:
        DataFrame with signals
    """
    bb = calculate_bollinger_bands(close, period, std_mult)
    
    # Squeeze detection
    bandwidth = bb['Upper'] - bb['Lower']
    squeeze = bandwidth < bandwidth.rolling(20).min()
    
    result = pd.DataFrame(index=close.index)
    result['Price'] = close
    result['Squeeze'] = squeeze
    
    # Entry after squeeze
    result['Signal'] = 0
    
    if squeeze.any():
        last_squeeze = squeeze[squeeze].index[-1]
        after_squeeze = close.index > last_squeeze
        
        result.loc[after_squeeze & (close > bb['Upper']), 'Signal'] = 1
        result.loc[after_squeeze & (close < bb['Lower']), 'Signal'] = -1
    
    return result
```

### Donchian Breakout Strategy

```python
def donchian_breakout_strategy(df, period: int = 20) -> pd.DataFrame:
    """
    Donchian Channel breakout strategy.
    
    Args:
        df: DataFrame with OHLC
        period: Lookback period
    
    Returns:
        DataFrame with signals
    """
    dc = calculate_donchian_channel(df['High'], df['Low'], period)
    
    result = pd.DataFrame(index=df.index)
    result['Price'] = df['Close']
    result['Upper'] = dc['Upper']
    result['Lower'] = dc['Lower']
    
    result['Signal'] = 0
    
    # Long when price breaks above upper
    result.loc[df['Close'] > dc['Upper'], 'Signal'] = 1
    
    # Short when price breaks below lower
    result.loc[df['Close'] < dc['Lower'], 'Signal'] = -1
    
    return result
```

---

## MQL4 Implementation

### Bollinger Bands

```mql4
//+------------------------------------------------------------------+
//| Bollinger Bands                                                   |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

#property indicator_chart_window

input int BBPeriod = 20;
input double BBDeviation = 2.0;

int OnInit()
{
   SetIndexBuffer(0, ExtUpperBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(1, ExtMiddleBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(2, ExtLowerBuffer, INDICATOR_CALCULATIONS);
   
   SetIndexStyle(0, DRAW_LINE);
   SetIndexStyle(1, DRAW_LINE);
   SetIndexStyle(2, DRAW_LINE);
   
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
   // Calculate middle (SMA)
   double sum = 0;
   for (int i = rates_total - BBPeriod; i < rates_total; i++)
      sum += close[i];
   
   ExtMiddleBuffer[rates_total-1] = sum / BBPeriod;
   
   // Calculate standard deviation
   double sqsum = 0;
   for (int i = rates_total - BBPeriod; i < rates_total; i++)
      sqsum += MathPow(close[i] - ExtMiddleBuffer[rates_total-1], 2);
   
   double std = MathSqrt(sqsum / BBPeriod);
   
   // Upper and lower bands
   ExtUpperBuffer[rates_total-1] = ExtMiddleBuffer[rates_total-1] + BBDeviation * std;
   ExtLowerBuffer[rates_total-1] = ExtMiddleBuffer[rates_total-1] - BBDeviation * std;
   
   return(rates_total);
}
```

---

## MQL5 Implementation

### Bollinger Bands

```mql5
//+------------------------------------------------------------------+
//| Bollinger Bands for MQL5                                           |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property indicator_chart_window

#property indicator_plots 3

#property indicator_type1 DRAW_LINE
#property indicator_color1 Red

#property indicator_type2 DRAW_LINE
#property indicator_color2 Gray

#property indicator_type3 DRAW_LINE
#property indicator_color3 Green

input int BBPeriod = 20;
input double BBDeviation = 2.0;

double ExtUpperBuffer[];
double ExtMiddleBuffer[];
double ExtLowerBuffer[];

int OnInit()
{
   SetIndexBuffer(0, ExtUpperBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(1, ExtMiddleBuffer, INDICATOR_CALCULATIONS);
   SetIndexBuffer(2, ExtLowerBuffer, INDICATOR_CALCULATIONS);
   
   PlotIndexSetString(0, PLOT_LABEL, "Upper");
   PlotIndexSetString(1, PLOT_LABEL, "Middle");
   PlotIndexSetString(2, PLOT_LABEL, "Lower");
   
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
   double sum = 0;
   for (int i = rates_total - BBPeriod; i < rates_total; i++)
      sum += close[i];
   
   ExtMiddleBuffer[rates_total-1] = sum / BBPeriod;
   
   double sqsum = 0;
   for (int i = rates_total - BBPeriod; i < rates_total; i++)
      sqsum += MathPow(close[i] - ExtMiddleBuffer[rates_total-1], 2);
   
   double std = MathSqrt(sqsum / BBPeriod);
   
   ExtUpperBuffer[rates_total-1] = ExtMiddleBuffer[rates_total-1] + BBDeviation * std;
   ExtLowerBuffer[rates_total-1] = ExtMiddleBuffer[rates_total-1] - BBDeviation * std;
   
   return(rates_total);
}
```

---

## Conclusion

Channel indicators provide:

**Keltner Channel:**
- ATR-based volatility
- Good for trend following

**Donchian Channel:**
- Breakout signals
- Simple structure

**Bollinger Bands:**
- Dynamic standard deviation
- Multiple signal types

**Envelopes:**
- Fixed percentage
- Mean reversion

Best used with:
- Volatility indicators (ATR)
- Trend indicators (ADX)
- Momentum confirming signals
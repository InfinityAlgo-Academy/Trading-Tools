---
title: "Pivot Points Python Implementation"
tags:
  - technical-analysis
  - pivot-points
  - python
  - programming
  - code
---

# Pivot Points - Python Implementation

This article provides Python code for calculating all pivot point types using pandas.

## Prerequisites

```bash
pip install pandas numpy yfinance
```

```python
import pandas as pd
import numpy as np
import yfinance as yf
```

## Data Fetching

```python
def download_data(symbol: str, period: str = "1mo", interval: str = "1d") -> pd.DataFrame:
    """Download stock data."""
    ticker = yf.Ticker(symbol)
    df = ticker.history(period=period, interval=interval)
    df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    return df
```

---

## Classic Pivot Points

```python
def calculate_classic_pivot(high: pd.Series, low: pd.Series, 
                         close: pd.Series) -> pd.DataFrame:
    """
    Calculate Classic Pivot Points.
    
    Formulas:
        PP = (High + Low + Close) / 3
        S1 = (PP × 2) - Previous High
        S2 = PP - (High - Low)
        S3 = S2 - (High - Low)
        R1 = (PP × 2) - Previous Low
        R2 = PP + (High - Low)
        R3 = R2 + (High - Low)
    
    Args:
        high: High prices
        low: Low prices
        close: Close prices
    
    Returns:
        DataFrame with pivot levels
    """
    prev_high = high.shift(1)
    prev_low = low.shift(1)
    prev_close = close.shift(1)
    
    pp = (high + low + close) / 3
    
    result = pd.DataFrame(index=high.index)
    result['PP'] = pp
    result['R3'] = pp + (prev_high - prev_low)
    result['R2'] = pp + (prev_high - prev_low)
    result['R1'] = (pp * 2) - prev_low
    result['S1'] = (pp * 2) - prev_high
    result['S2'] = pp - (prev_high - prev_low)
    result['S3'] = pp - (prev_high - prev_low)
    
    return result
```

---

## Fibonacci Pivot Points

```python
def calculate_fibonacci_pivot(high: pd.Series, low: pd.Series,
                          close: pd.Series) -> pd.DataFrame:
    """
    Calculate Fibonacci Pivot Points.
    
    Formulas:
        PP = (High + Low + Close) / 3
        S1 = PP - ((High - Low) × 0.382)
        S2 = PP - ((High - Low) × 0.618)
        S3 = PP - ((High - Low) × 1.000)
        R1 = PP + ((High - Low) × 0.382)
        R2 = PP + ((High - Low) × 0.618)
        R3 = PP + ((High - Low) × 1.000)
    
    Args:
        high: High prices
        low: Low prices
        close: Close prices
    
    Returns:
        DataFrame with pivot levels
    """
    high_low = high - low
    
    pp = (high + low + close) / 3
    
    result = pd.DataFrame(index=high.index)
    result['PP'] = pp
    result['R3'] = pp + (high_low * 1.0)
    result['R2'] = pp + (high_low * 0.618)
    result['R1'] = pp + (high_low * 0.382)
    result['S1'] = pp - (high_low * 0.382)
    result['S2'] = pp - (high_low * 0.618)
    result['S3'] = pp - (high_low * 1.0)
    
    return result
```

---

## Camarilla Pivot Points

```python
def calculate_camarilla_pivot(high: pd.Series, low: pd.Series,
                         close: pd.Series) -> pd.DataFrame:
    """
    Calculate Camarilla Pivot Points.
    
    Formulas:
        PP = (High + Low + Close) / 3
        S1 = Close - ((High - Low) × 0.0917)
        S2 = Close - ((High - Low) × 0.1833)
        S3 = Close - ((High - Low) × 0.2750)
        S4 = Close - ((High - Low) × 0.3667)
        R1 = Close + ((High - Low) × 0.0917)
        R2 = Close + ((High - Low) × 0.1833)
        R3 = Close + ((High - Low) × 0.2750)
        R4 = Close + ((High - Low) × 0.3667)
    
    Args:
        high: High prices
        low: Low prices
        close: Close prices
    
    Returns:
        DataFrame with pivot levels
    """
    high_low = high - low
    
    pp = (high + low + close) / 3
    
    result = pd.DataFrame(index=high.index)
    result['PP'] = pp
    result['R4'] = close + (high_low * 0.3667)
    result['R3'] = close + (high_low * 0.2750)
    result['R2'] = close + (high_low * 0.1833)
    result['R1'] = close + (high_low * 0.0917)
    result['S1'] = close - (high_low * 0.0917)
    result['S2'] = close - (high_low * 0.1833)
    result['S3'] = close - (high_low * 0.2750)
    result['S4'] = close - (high_low * 0.3667)
    
    return result
```

---

## DeMark Pivot Points

```python
def calculate_demark_pivot(open_price: pd.Series, high: pd.Series,
                       low: pd.Series, close: pd.Series) -> pd.Series:
    """
    Calculate DeMark Pivot Points.
    
    Formulas:
        If Close < Open: DM = High + (Low × 2) + Close
        If Close > Open: DM = (High × 2) + Low + Close
        If Close = Open: DM = High + Low + (Close × 2)
    
    Args:
        open_price: Open prices
        high: High prices
        low: Low prices
        close: Close prices
    
    Returns:
        Series with DeMark pivot
    """
    demark = pd.Series(index=close.index, dtype=float)
    
    # Condition 1: Close < Open
    mask1 = close < open_price
    demark[mask1] = high[mask1] + (low[mask1] * 2) + close[mask1]
    
    # Condition 2: Close > Open
    mask2 = close > open_price
    demark[mask2] = (high[mask2] * 2) + low[mask2] + close[mask2]
    
    # Condition 3: Close = Open
    mask3 = close == open_price
    demark[mask3] = high[mask3] + low[mask3] + (close[mask3] * 2)
    
    return demark
```

---

## Woodie Pivot Points

```python
def calculate_woodie_pivot(high: pd.Series, low: pd.Series,
                        close: pd.Series) -> pd.DataFrame:
    """
    Calculate Woodie Pivot Points.
    
    Formulas:
        PP = (High + Low + (Close × 2)) / 4
        S1 = (PP × 2) - High
        S2 = PP - (High - Low)
        R1 = (PP × 2) - Low
        R2 = PP + (High - Low)
    
    Args:
        high: High prices
        low: Low prices
        close: Close prices
    
    Returns:
        DataFrame with pivot levels
    """
    prev_high = high.shift(1)
    prev_low = low.shift(1)
    
    pp = (high + low + (close * 2)) / 4
    
    result = pd.DataFrame(index=high.index)
    result['PP'] = pp
    result['R2'] = pp + (prev_high - prev_low)
    result['R1'] = (pp * 2) - prev_low
    result['S1'] = (pp * 2) - prev_high
    result['S2'] = pp - (prev_high - prev_low)
    
    return result
```

---

## All-In-One Pivot Calculator

```python
class PivotPoints:
    """Complete pivot points calculator."""
    
    def __init__(self, high: pd.Series, low: pd.Series, 
                 close: pd.Series, open_price: pd.Series = None):
        """
        Initialize with price data.
        
        Args:
            high: High prices
            low: Low prices
            close: Close prices
            open_price: Open prices (optional, needed for DeMark)
        """
        self.high = high
        self.low = low
        self.close = close
        self.open_price = open_price if open_price is not None else close.shift(1)
    
    def classic(self) -> pd.DataFrame:
        """Classic pivot points."""
        return calculate_classic_pivot(self.high, self.low, self.close)
    
    def fibonacci(self) -> pd.DataFrame:
        """Fibonacci pivot points."""
        return calculate_fibonacci_pivot(self.high, self.low, self.close)
    
    def camarilla(self) -> pd.DataFrame:
        """Camarilla pivot points."""
        return calculate_camarilla_pivot(self.high, self.low, self.close)
    
    def demark(self) -> pd.Series:
        """DeMark pivot points."""
        return calculate_demark_pivot(self.open_price, self.high, self.low, self.close)
    
    def woodie(self) -> pd.DataFrame:
        """Woodie pivot points."""
        return calculate_woodie_pivot(self.high, self.low, self.close)
    
    def all(self) -> pd.DataFrame:
        """Calculate all pivot types."""
        result = pd.DataFrame(index=self.close.index)
        
        classic = self.classic()
        fib = self.fibonacci()
        cam = self.camarilla()
        wood = self.woodie()
        
        # Add all levels
        result['Classic_PP'] = classic['PP']
        result['Classic_R1'] = classic['R1']
        result['Classic_S1'] = classic['S1']
        
        result['Fib_PP'] = fib['PP']
        result['Fib_R1'] = fib['R1']
        result['Fib_S1'] = fib['S1']
        
        result['Camarilla_PP'] = cam['PP']
        result['Camarilla_R1'] = cam['R1']
        result['Camarilla_S1'] = cam['S1']
        
        result['Woodie_PP'] = wood['PP']
        result['Woodie_R1'] = wood['R1']
        result['Woodie_S1'] = wood['S1']
        
        result['DeMark'] = self.demark()
        
        return result
```

---

## Usage Example

```python
# Download data
df = download_data('AAPL', '1mo')

# Create pivot calculator
pivots = PivotPoints(df['High'], df['Low'], df['Close'])

# Get all pivot points
all_pivots = pivots.all()

print("Latest Pivot Levels:")
print(all_pivots.tail())
```

---

## Trading Strategies

### Daily Pivot Level

```python
def get_daily_pivots(df: pd.DataFrame) -> dict:
    """
    Get current day's pivot levels.
    
    Args:
        df: DataFrame with OHLC
    
    Returns:
        Dictionary with pivot levels
    """
    # Use previous day for calculation
    prev = df.iloc[-2]
    
    high = prev['High']
    low = prev['Low']
    close = prev['Close']
    
    pp = (high + low + close) / 3
    
    levels = {
        'R3': pp + (high - low),
        'R2': pp + (high - low),
        'R1': (pp * 2) - low,
        'PP': pp,
        'S1': (pp * 2) - high,
        'S2': pp - (high - low),
        'S3': pp - (high - low),
    }
    
    return levels
```

### Pivot Bounce Strategy

```python
def pivot_bounce_strategy(df: pd.DataFrame) -> pd.DataFrame:
    """
    Strategy based on price bouncing off pivot levels.
    
    Args:
        df: DataFrame with OHLC
    
    Returns:
        DataFrame with signals
    """
    pivots = calculate_classic_pivot(df['High'], df['Low'], df['Close'])
    
    # Get previous pivot (current day pivot based on yesterday)
    prev_pivot = pivots.iloc[-2]
    
    close = df['Close'].iloc[-1]
    open_price = df['Open'].iloc[-1]
    low = df['Low'].iloc[-1]
    high = df['High'].iloc[-1]
    
    result = pd.DataFrame(index=[df.index[-1]])
    result['Close'] = close
    result['Signal'] = 'HOLD'
    
    # Check support levels
    if prev_pivot['S1'] < close < prev_pivot['S2']:
        if low <= prev_pivot['S1'] and close > prev_pivot['S1']:
            result['Signal'] = 'BUY'
    
    # Check resistance levels
    elif prev_pivot['R1'] > close > prev_pivot['R2']:
        if high >= prev_pivot['R1'] and close < prev_pivot['R1']:
            result['Signal'] = 'SELL'
    
    return result
```

### Pivot Breakout Strategy

```python
def pivot_breakout_strategy(df: pd.DataFrame) -> pd.DataFrame:
    """
    Strategy based on pivot level breakouts.
    
    Args:
        df: DataFrame with OHLC
    
    Returns:
        DataFrame with signals
    """
    pivots = calculate_classic_pivot(df['High'], df['Low'], df['Close'])
    
    prev_pivot = pivots.iloc[-2]
    
    close = df['Close'].iloc[-1]
    open_price = df['Open'].iloc[-1]
    
    result = pd.DataFrame(index=[df.index[-1]])
    result['Close'] = close
    result['Signal'] = 'HOLD'
    
    # Breakout above R1
    if close > prev_pivot['R1'] and open_price < prev_pivot['R1']:
        result['Signal'] = 'BUY'
    
    # Breakdown below S1
    elif close < prev_pivot['S1'] and open_price > prev_pivot['S1']:
        result['Signal'] = 'SELL'
    
    return result
```

---

## Plotting

```python
import matplotlib.pyplot as plt

def plot_pivots(df: pd.DataFrame, symbol: str):
    """
    Plot pivot points on chart.
    
    Args:
        df: DataFrame with OHLC and Pivot Points
        symbol: Stock symbol
    """
    pivots = calculate_classic_pivot(df['High'], df['Low'], df['Close'])
    
    # Get current pivot level (yesterday's calculation for today)
    current = pivots.iloc[-1]
    
    fig, ax = plt.subplots(figsize=(12, 6))
    
    # Price
    ax.plot(df.index, df['Close'], label='Price', linewidth=1.5)
    
    # Pivot levels
    ax.axhline(y=current['R3'], color='red', linestyle=':', alpha=0.3, label='R3')
    ax.axhline(y=current['R2'], color='red', linestyle='--', alpha=0.4, label='R2')
    ax.axhline(y=current['R1'], color='red', linestyle='-', alpha=0.5, label='R1')
    ax.axhline(y=current['PP'], color='gray', linestyle='-', alpha=0.8, label='PP')
    ax.axhline(y=current['S1'], color='green', linestyle='-', alpha=0.5, label='S1')
    ax.axhline(y=current['S2'], color='green', linestyle='--', alpha=0.4, label='S2')
    ax.axhline(y=current['S3'], color='green', linestyle=':', alpha=0.3, label='S3')
    
    ax.set_title(f'{symbol} - Classic Pivot Points')
    ax.legend(loc='upper left', fontsize=8)
    ax.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()

# Usage
df = download_data('AAPL', '1mo')
plot_pivots(df, 'AAPL')
```

---

## Conclusion

Python provides efficient pivot point calculations:
- **Classic:** Standard support/resistance
- **Fibonacci:** Uses Fibonacci ratios
- **Camarilla:** Tight levels for scalping
- **DeMark:** Unique calculation method
- **Woodie:** Close-weighted

Key implementations:
- Shift previous day data for calculation
- Combine multiple pivot types
- Use for support/resistance identification
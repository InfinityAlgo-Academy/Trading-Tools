---
title: "Moving Averages Python Implementation"
tags:
  - technical-analysis
  - moving-average
  - python
  - programming
  - code
---

# Moving Averages - Python Implementation

This article provides Python code for calculating all major moving average types. We'll use pandas and numpy for efficient calculation.

## Prerequisites

### Installation
```bash
pip install pandas numpy yfinance
```

### Imports
```python
import pandas as pd
import numpy as np
import yfinance as yf
```

## Data Fetching

### Download Stock Data
```python
def download_data(symbol: str, period: str = "1y") -> pd.DataFrame:
    """
    Download historical stock data.
    
    Args:
        symbol: Stock ticker symbol
        period: Data period (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)
    
    Returns:
        DataFrame with OHLC data
    """
    ticker = yf.Ticker(symbol)
    df = ticker.history(period=period)
    df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    return df
```

## Simple Moving Average (SMA)

### SMA Function
```python
def calculate_sma(data: pd.Series, period: int) -> pd.Series:
    """
    Calculate Simple Moving Average.
    
    Formula: SMA = (P1 + P2 + ... + Pn) / n
    
    Args:
        data: Price series (typically Close)
        period: Number of periods
    
    Returns:
        SMA series
    """
    return data.rolling(window=period).mean()
```

### SMA with Custom Price Type
```python
def calculate_sma_ohlc(df: pd.DataFrame, period: int, price: str = 'Close') -> pd.Series:
    """
    Calculate SMA for specific OHLC component.
    
    Args:
        df: DataFrame with OHLC data
        period: Number of periods
        price: Price type ('Open', 'High', 'Low', 'Close')
    
    Returns:
        SMA series
    """
    return df[price].rolling(window=period).mean()
```

### Usage Example
```python
# Download data
df = download_data('AAPL', '1y')

# Calculate 20-period SMA
df['SMA_20'] = calculate_sma(df['Close'], 20)

# Calculate SMA on different prices
df['SMA_Close'] = calculate_sma_ohlc(df, 20, 'Close')
df['SMA_High'] = calculate_sma_ohlc(df, 20, 'High')
df['SMA_Low'] = calculate_sma_ohlc(df, 20, 'Low')
```

## Exponential Moving Average (EMA)

### EMA Function
```python
def calculate_ema(data: pd.Series, period: int) -> pd.Series:
    """
    Calculate Exponential Moving Average.
    
    Formula: EMA = (Price × k) + (Previous EMA × (1 - k))
            where k = 2 / (period + 1)
    
    Args:
        data: Price series
        period: Number of periods
    
    Returns:
        EMA series
    """
    return data.ewm(span=period, adjust=False).mean()
```

### Manual EMA Calculation (Educational)
```python
def calculate_ema_manual(data: pd.Series, period: int) -> pd.Series:
    """
    Calculate EMA manually - shows the actual calculation.
    
    Args:
        data: Price series
        period: Number of periods
    
    Returns:
        EMA series
    """
    k = 2 / (period + 1)
    
    # Initialize with SMA for first value
    ema = pd.Series(index=data.index, dtype=float)
    ema.iloc[period-1] = data.iloc[:period].mean()
    
    # Calculate EMA for remaining values
    for i in range(period, len(data)):
        ema.iloc[i] = data.iloc[i] * k + ema.iloc[i-1] * (1 - k)
    
    return ema
```

### Multi-Period EMA
```python
def calculate_multi_ema(data: pd.Series, periods: list) -> pd.DataFrame:
    """
    Calculate multiple EMA periods at once.
    
    Args:
        data: Price series
        periods: List of periods [9, 21, 50, 200]
    
    Returns:
        DataFrame with multiple EMA columns
    """
    result = pd.DataFrame(index=data.index)
    for period in periods:
        result[f'EMA_{period}'] = calculate_ema(data, period)
    return result
```

### Usage Example
```python
# Single EMA
df['EMA_20'] = calculate_ema(df['Close'], 20)

# Multiple EMAs
ema_df = calculate_multi_ema(df['Close'], [9, 21, 50, 200])
for col in ema_df.columns:
    df[col] = ema_df[col]
```

## Weighted Moving Average (WMA)

### WMA Function
```python
def calculate_wma(data: pd.Series, period: int) -> pd.Series:
    """
    Calculate Weighted Moving Average.
    
    Formula: WMA = Σ(Price × Weight) / Σ(Weights)
            Weights: 1, 2, 3, ..., n
    
    Args:
        data: Price series
        period: Number of periods
    
    Returns:
        WMA series
    """
    weights = np.arange(1, period + 1)
    
    def weighted_avg(x):
        return np.sum(weights * x) / weights.sum()
    
    return data.rolling(window=period).apply(weighted_avg, raw=True)
```

### Alternative WMA (More Efficient)
```python
def calculate_wma_efficient(data: pd.Series, period: int) -> pd.Series:
    """
    More efficient WMA calculation.
    
    Args:
        data: Price series
        period: Number of periods
    
    Returns:
        WMA series
    """
    weights = np.arange(1, period + 1)
    weights_sum = weights.sum()
    
    num = data.rolling(window=period).apply(
        lambda x: np.sum(weights * x), raw=True
    )
    
    return num / weights_sum
```

### Usage Example
```python
df['WMA_20'] = calculate_wma(df['Close'], 20)
```

## Smoothed Moving Average (SMMA)

### SMMA Function
```python
def calculate_smma(data: pd.Series, period: int) -> pd.Series:
    """
    Calculate Smoothed Moving Average.
    
    Formula: SMMA = ((Previous SMMA × (n-1)) + Current Price) / n
    
    Args:
        data: Price series
        period: Number of periods
    
    Returns:
        SMMA series
    """
    smma = pd.Series(index=data.index, dtype=float)
    
    # Initialize with SMA
    smma.iloc[period-1] = data.iloc[:period].mean()
    
    # Calculate SMMA
    for i in range(period, len(data)):
        smma.iloc[i] = (smma.iloc[i-1] * (period - 1) + data.iloc[i]) / period
    
    return smma
```

### Usage Example
```python
df['SMMA_20'] = calculate_smma(df['Close'], 20)
```

## Volume-Weighted Moving Average (VWMA)

### VWMA Function
```python
def calculate_vwma(data: pd.Series, volume: pd.Series, period: int) -> pd.Series:
    """
    Calculate Volume-Weighted Moving Average.
    
    Formula: VWMA = Σ(Price × Volume) / Σ(Volume)
    
    Args:
        data: Price series (typically Close)
        volume: Volume series
        period: Number of periods
    
    Returns:
        VWMA series
    """
    result = pd.Series(index=data.index, dtype=float)
    
    for i in range(period - 1, len(data)):
        price_window = data.iloc[i - period + 1:i + 1]
        volume_window = volume.iloc[i - period + 1:i + 1]
        result.iloc[i] = np.sum(price_window * volume_window) / np.sum(volume_window)
    
    return result
```

### Alternative VWMA (Vectorized)
```python
def calculate_vwma_vectorized(close: pd.Series, volume: pd.Series, period: int) -> pd.Series:
    """
    Vectorized VWMA calculation.
    
    Args:
        close: Closing price series
        volume: Volume series
        period: Number of periods
    
    Returns:
        VWMA series
    """
    pv = close * volume
    
    pv_sum = pv.rolling(window=period).sum()
    vol_sum = volume.rolling(window=period).sum()
    
    return pv_sum / vol_sum
```

### Usage Example
```python
df['VWMA_20'] = calculate_vwma_vectorized(df['Close'], df['Volume'], 20)
```

## Triple EMA (TEMA)

### TEMA Function
```python
def calculate_tema(data: pd.Series, period: int) -> pd.Series:
    """
    Calculate Triple Exponential Moving Average.
    
    Formula: TEMA = 3×EMA1 - 3×EMA2 + EMA3
    
    Where:
        EMA1 = EMA of price
        EMA2 = EMA of EMA1
        EMA3 = EMA of EMA2
    
    Args:
        data: Price series
        period: Number of periods
    
    Returns:
        TEMA series
    """
    ema1 = calculate_ema(data, period)
    ema2 = calculate_ema(ema1, period)
    ema3 = calculate_ema(ema2, period)
    
    return 3 * ema1 - 3 * ema2 + ema3
```

### Usage Example
```python
df['TEMA_20'] = calculate_tema(df['Close'], 20)
```

## Hull Moving Average (HMA)

### HMA Function
```python
def calculate_hma(data: pd.Series, period: int) -> pd.Series:
    """
    Calculate Hull Moving Average.
    
    Formula: HMA = WMA(2 × WMA(n/2) - WMA(n)), period = sqrt(n)
    
    Args:
        data: Price series
        period: Number of periods
    
    Returns:
        HMA series
    """
    half_period = period // 2
    
    # Calculate WMA with half period (2x)
    wma_half = calculate_wma(data, half_period) * 2
    
    # Calculate WMA with full period
    wma_full = calculate_wma(data, period)
    
    # Calculate difference
    diff = wma_half - wma_full
    
    # Calculate final WMA with sqrt(period)
    hma_period = int(np.sqrt(period))
    hma = calculate_wma(diff, hma_period)
    
    return hma
```

### Alternative HMA (More Efficient)
```python
def calculate_hma_efficient(data: pd.Series, period: int) -> pd.Series:
    """
    Efficient HMA calculation.
    
    Args:
        data: Price series
        period: Number of periods
    
    Returns:
        HMA series
    """
    import math
    
    half_period = period // 2
    sqrt_period = int(math.sqrt(period))
    
    wma_half = data.rolling(half_period).apply(
        lambda x: np.sum(np.arange(1, half_period + 1) * x) / 
                 np.arange(1, half_period + 1).sum(), 
        raw=True
    ) * 2
    
    wma_full = data.rolling(period).apply(
        lambda x: np.sum(np.arange(1, period + 1) * x) / 
                 np.arange(1, period + 1).sum(), 
        raw=True
    )
    
    hma = (wma_half - wma_full).rolling(sqrt_period).apply(
        lambda x: np.sum(np.arange(1, sqrt_period + 1) * x) / 
                 np.arange(1, sqrt_period + 1).sum(), 
        raw=True
    )
    
    return hma
```

### Usage Example
```python
df['HMA_20'] = calculate_hma(df['Close'], 20)
```

## Complete Moving Average Calculator

### Class Implementation
```python
class MovingAverages:
    """
    Complete moving average calculator.
    """
    
    def __init__(self, data: pd.DataFrame):
        """
        Initialize with OHLC data.
        
        Args:
            data: DataFrame with Close and Volume columns
        """
        self.data = data
        self.close = data['Close']
        self.volume = data['Volume'] if 'Volume' in data.columns else None
    
    def sma(self, period: int) -> pd.Series:
        """Simple Moving Average"""
        return self.close.rolling(window=period).mean()
    
    def ema(self, period: int) -> pd.Series:
        """Exponential Moving Average"""
        return self.close.ewm(span=period, adjust=False).mean()
    
    def wma(self, period: int) -> pd.Series:
        """Weighted Moving Average"""
        weights = np.arange(1, period + 1)
        return self.close.rolling(window=period).apply(
            lambda x: np.sum(weights * x) / weights.sum(), raw=True
        )
    
    def smma(self, period: int) -> pd.Series:
        """Smoothed Moving Average"""
        smma = pd.Series(index=self.close.index, dtype=float)
        smma.iloc[period-1] = self.close.iloc[:period].mean()
        for i in range(period, len(self.close)):
            smma.iloc[i] = (smma.iloc[i-1] * (period - 1) + self.close.iloc[i]) / period
        return smma
    
    def vwma(self, period: int) -> pd.Series:
        """Volume-Weighted Moving Average"""
        pv = self.close * self.volume
        return pv.rolling(window=period).sum() / self.volume.rolling(window=period).sum()
    
    def tema(self, period: int) -> pd.Series:
        """Triple Exponential Moving Average"""
        ema1 = self.ema(period)
        ema2 = self.ema(ema1)
        ema3 = self.ema(ema2)
        return 3 * ema1 - 3 * ema2 + ema3
    
    def hma(self, period: int) -> pd.Series:
        """Hull Moving Average"""
        half = period // 2
        sqrt_period = int(np.sqrt(period))
        
        wma_half = self.wma(half) * 2
        wma_full = self.wma(period)
        diff = wma_half - wma_full
        
        return self.wma(diff.dropna(), sqrt_period).reindex(diff.index).dropna()
    
    def all(self, period: int = 20) -> pd.DataFrame:
        """Calculate all moving averages"""
        result = pd.DataFrame(index=self.close.index)
        result['SMA'] = self.sma(period)
        result['EMA'] = self.ema(period)
        result['WMA'] = self.wma(period)
        result['SMMA'] = self.smma(period)
        result['VWMA'] = self.vwma(period)
        result['TEMA'] = self.tema(period)
        result['HMA'] = self.hma(period)
        return result
```

### Usage Example
```python
# Download data
df = download_data('AAPL', '1y')

# Calculate all moving averages
ma = MovingAverages(df)
all_ma = ma.all(period=20)

print(all_ma.tail())
```

## Complete Trading Strategy Example

### Moving Average Crossover Strategy
```python
def moving_average_crossover(df: pd.DataFrame, short_period: int = 20, 
                          long_period: int = 50) -> pd.DataFrame:
    """
    Moving average crossover strategy.
    
    Args:
        df: DataFrame with Close price
        short_period: Short MA period
        long_period: Long MA period
    
    Returns:
        DataFrame with signals
    """
    result = df.copy()
    
    # Calculate MAs
    result['SMA_Short'] = calculate_sma(df['Close'], short_period)
    result['SMA_Long'] = calculate_sma(df['Close'], long_period)
    
    # Generate signals
    result['Signal'] = 0
    result.loc[result['SMA_Short'] > result['SMA_Long'], 'Signal'] = 1  # Long
    result.loc[result['SMA_Short'] < result['SMA_Long'], 'Signal'] = -1  # Short
    
    # Position changes
    result['Position'] = result['Signal'].diff()
    
    return result
```

## Plotting

### Matplotlib Example
```python
import matplotlib.pyplot as plt

def plot_moving_averages(df: pd.DataFrame, symbol: str):
    """
    Plot moving averages.
    
    Args:
        df: DataFrame with Close and MA columns
        symbol: Symbol for title
    """
    fig, ax = plt.subplots(figsize=(12, 6))
    
    ax.plot(df.index, df['Close'], label='Price', linewidth=1)
    ax.plot(df.index, df['SMA_20'], label='SMA 20', linewidth=1)
    ax.plot(df.index, df['EMA_20'], label='EMA 20', linewidth=1)
    ax.plot(df.index, df['WMA_20'], label='WMA 20', linewidth=1)
    ax.plot(df.index, df['HMA_20'], label='HMA 20', linewidth=1)
    
    ax.set_title(f'{symbol} - Moving Averages')
    ax.legend()
    ax.grid(True, alpha=0.3)
    
    plt.show()

# Usage
df = download_data('MSFT', '6mo')
ma = MovingAverages(df)
df['SMA_20'] = ma.sma(20)
df['EMA_20'] = ma.ema(20)
df['WMA_20'] = ma.wma(20)
df['HMA_20'] = ma.hma(20)

plot_moving_averages(df, 'MSFT')
```

## Conclusion

Python provides efficient tools for calculating all moving average types. The pandas library handles most calculations elegantly, while custom functions enable understanding the mathematics behind each indicator.

Key takeaways:
- Use pandas `.rolling()` for SMA, WMA
- Use `.ewm()` for EMA
- Custom functions needed for SMMA, TEMA, HMA
- VWMA requires volume data
- Always verify calculations match your expectations
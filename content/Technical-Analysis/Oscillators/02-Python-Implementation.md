---
title: "Oscillators Python Implementation"
tags:
  - technical-analysis
  - oscillators
  - python
  - programming
  - code
---

# Oscillators - Python Implementation

This article provides Python code for calculating all major trading oscillators using pandas and numpy.

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
def download_data(symbol: str, period: str = "1y", interval: str = "1d") -> pd.DataFrame:
    """
    Download historical stock data.
    
    Args:
        symbol: Stock ticker symbol
        period: Data period (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)
        interval: Data interval (1m, 5m, 15m, 30m, 1h, 1d, 1wk, 1mo)
    
    Returns:
        DataFrame with OHLCV data
    """
    ticker = yf.Ticker(symbol)
    df = ticker.history(period=period, interval=interval)
    df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    return df
```

---

## RSI (Relative Strength Index)

### Basic RSI

```python
def calculate_rsi(data: pd.Series, period: int = 14) -> pd.Series:
    """
    Calculate RSI (Relative Strength Index).
    
    Formula: RSI = 100 - (100 / (1 + RS))
            RS = Average Gain / Average Loss
    
    Args:
        data: Price series (typically Close)
        period: RSI period
    
    Returns:
        RSI series (0-100)
    """
    delta = data.diff()
    
    gains = delta.where(delta > 0, 0)
    losses = (-delta).where(delta < 0, 0)
    
    avg_gain = gains.ewm(alpha=1/period, min_periods=period).mean()
    avg_loss = losses.ewm(alpha=1/period, min_periods=period).mean()
    
    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    
    return rsi
```

### Manual RSI (Wilder's Smoothing)

```python
def calculate_rsi_wilder(data: pd.Series, period: int = 14) -> pd.Series:
    """
    Calculate RSI using Wilder's smoothing method.
    
    Args:
        data: Price series
        period: RSI period
    
    Returns:
        RSI series
    """
    delta = data.diff()
    gains = delta.where(delta > 0, 0.0)
    losses = (-delta).where(delta < 0, 0.0)
    
    avg_gain = pd.Series(index=data.index, dtype=float)
    avg_loss = pd.Series(index=data.index, dtype=float)
    
    avg_gain.iloc[period] = gains.iloc[1:period+1].mean()
    avg_loss.iloc[period] = losses.iloc[1:period+1].mean()
    
    for i in range(period + 1, len(data)):
        avg_gain.iloc[i] = (avg_gain.iloc[i-1] * (period - 1) + gains.iloc[i]) / period
        avg_loss.iloc[i] = (avg_loss.iloc[i-1] * (period - 1) + losses.iloc[i]) / period
    
    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    
    return rsi
```

### RSI with Signal

```python
def calculate_rsi_signals(data: pd.Series, period: int = 14, 
                        overbought: float = 70, 
                        oversold: float = 30) -> pd.DataFrame:
    """
    Calculate RSI with signals.
    
    Args:
        data: Price series
        period: RSI period
        overbought: Overbought threshold
        oversold: Oversold threshold
    
    Returns:
        DataFrame with RSI and signals
    """
    rsi = calculate_rsi(data, period)
    
    result = pd.DataFrame(index=data.index)
    result['RSI'] = rsi
    
    result['Signal'] = 0
    
    # Crossing above oversold
    result.loc[(rsi > oversold) & (rsi.shift(1) <= oversold), 'Signal'] = 1
    
    # Crossing below overbought
    result.loc[(rsi < overbought) & (rsi.shift(1) >= overbought), 'Signal'] = -1
    
    result['Condition'] = 'Neutral'
    result.loc[rsi > overbought, 'Condition'] = 'Overbought'
    result.loc[rsi < oversold, 'Condition'] = 'Oversold'
    
    return result
```

---

## CCI (Commodity Channel Index)

### Basic CCI

```python
def calculate_cci(data: pd.DataFrame, period: int = 20) -> pd.Series:
    """
    Calculate CCI (Commodity Channel Index).
    
    Formula: CCI = (TP - SMA(TP)) / (0.015 × Mean Deviation)
            TP = (High + Low + Close) / 3
    
    Args:
        data: DataFrame with High, Low, Close
        period: CCI period
    
    Returns:
        CCI series
    """
    tp = (data['High'] + data['Low'] + data['Close']) / 3
    
    sma_tp = tp.rolling(window=period).mean()
    
    mean_dev = tp.rolling(window=period).apply(
        lambda x: np.abs(x - x.mean()).mean(), raw=True
    )
    
    cci = (tp - sma_tp) / (0.015 * mean_dev)
    
    return cci
```

### CCI with Signals

```python
def calculate_cci_signals(data: pd.DataFrame, period: int = 20,
                        overbought: float = 100,
                        oversold: float = -100) -> pd.DataFrame:
    """
    Calculate CCI with signals.
    
    Args:
        data: DataFrame with OHLC
        period: CCI period
        overbought: Overbought threshold
        oversold: Oversold threshold
    
    Returns:
        DataFrame with CCI and signals
    """
    cci = calculate_cci(data, period)
    
    result = pd.DataFrame(index=data.index)
    result['CCI'] = cci
    
    result['Signal'] = 0
    result.loc[(cci > oversold) & (cci.shift(1) <= oversold), 'Signal'] = 1
    result.loc[(cci < overbought) & (cci.shift(1) >= overbought), 'Signal'] = -1
    
    result['Condition'] = 'Neutral'
    result.loc[cci > overbought, 'Condition'] = 'Overbought'
    result.loc[cci < oversold, 'Condition'] = 'Oversold'
    
    return result
```

---

## MACD

### Basic MACD

```python
def calculate_macd(data: pd.Series, fast: int = 12, slow: int = 26, 
                  signal: int = 9) -> pd.DataFrame:
    """
    Calculate MACD (Moving Average Convergence Divergence).
    
    Formula:
        MACD Line = EMA(Fast) - EMA(Slow)
        Signal Line = EMA(MACD Line)
        Histogram = MACD Line - Signal Line
    
    Args:
        data: Price series (typically Close)
        fast: Fast EMA period
        slow: Slow EMA period
        signal: Signal line period
    
    Returns:
        DataFrame with MACD, Signal, and Histogram
    """
    ema_fast = data.ewm(span=fast, adjust=False).mean()
    ema_slow = data.ewm(span=slow, adjust=False).mean()
    
    macd_line = ema_fast - ema_slow
    signal_line = macd_line.ewm(span=signal, adjust=False).mean()
    histogram = macd_line - signal_line
    
    result = pd.DataFrame(index=data.index)
    result['MACD'] = macd_line
    result['Signal'] = signal_line
    result['Histogram'] = histogram
    
    return result
```

### MACD with Signals

```python
def calculate_macd_signals(data: pd.Series, fast: int = 12, 
                          slow: int = 26, signal: int = 9) -> pd.DataFrame:
    """
    Calculate MACD with trading signals.
    
    Args:
        data: Price series
        fast: Fast EMA period
        slow: Slow EMA period
        signal: Signal period
    
    Returns:
        DataFrame with MACD components and signals
    """
    macd_df = calculate_macd(data, fast, slow, signal)
    
    result = pd.DataFrame(index=data.index)
    result['MACD'] = macd_df['MACD']
    result['Signal'] = macd_df['Signal']
    result['Histogram'] = macd_df['Histogram']
    
    # MACD crosses above Signal line
    gold_cross = (macd_df['MACD'] > macd_df['Signal']) & \
                (macd_df['MACD'].shift(1) <= macd_df['Signal'].shift(1))
    
    # MACD crosses below Signal line
    death_cross = (macd_df['MACD'] < macd_df['Signal']) & \
                 (macd_df['MACD'].shift(1) >= macd_df['Signal'].shift(1))
    
    # MACD crosses zero line
    zero_cross_up = (macd_df['MACD'] > 0) & (macd_df['MACD'].shift(1) <= 0)
    zero_cross_down = (macd_df['MACD'] < 0) & (macd_df['MACD'].shift(1) >= 0)
    
    result['Signal'] = 0
    result.loc[gold_cross, 'Signal'] = 1
    result.loc[death_cross, 'Signal'] = -1
    
    result['Zero_Signal'] = 0
    result.loc[zero_cross_up, 'Zero_Signal'] = 1
    result.loc[zero_cross_down, 'Zero_Signal'] = -1
    
    # Histogram colors (positive = green, negative = red)
    result['Histogram_Color'] = 'green'
    result.loc[macd_df['Histogram'] < 0, 'Histogram_Color'] = 'red'
    
    return result
```

---

## Stochastic Oscillator

### Basic Stochastic

```python
def calculate_stochastic(data: pd.DataFrame, k_period: int = 14, 
                       d_period: int = 3, slowing: int = 3) -> pd.DataFrame:
    """
    Calculate Stochastic Oscillator.
    
    Formula:
        %K = 100 × (Close - Lowest Low) / (Highest High - Lowest Low)
        %D = SMA of %K
    
    Args:
        data: DataFrame with High, Low, Close
        k_period: %K lookback period
        d_period: %D period
        slowing: Slowing period
    
    Returns:
        DataFrame with %K and %D
    """
    lowest_low = data['Low'].rolling(window=k_period).min()
    highest_high = data['High'].rolling(window=k_period).max()
    
    k_raw = 100 * (data['Close'] - lowest_low) / (highest_high - lowest_low)
    
    if slowing > 1:
        k = k_raw.rolling(window=slowing).mean()
    else:
        k = k_raw
    
    d = k.rolling(window=d_period).mean()
    
    result = pd.DataFrame(index=data.index)
    result['%K'] = k
    result['%D'] = d
    
    return result
```

### Stochastic with Signals

```python
def calculate_stochastic_signals(data: pd.DataFrame, k_period: int = 14,
                           d_period: int = 3, slowing: int = 3,
                           overbought: float = 80,
                           oversold: float = 20) -> pd.DataFrame:
    """
    Calculate Stochastic with signals.
    
    Args:
        data: DataFrame with OHLC
        k_period: %K period
        d_period: %D period
        slowing: Slowing period
        overbought: Overbought threshold
        oversold: Oversold threshold
    
    Returns:
        DataFrame with %K, %D and signals
    """
    stoch = calculate_stochastic(data, k_period, d_period, slowing)
    
    result = pd.DataFrame(index=data.index)
    result['%K'] = stoch['%K']
    result['%D'] = stoch['%D']
    
    # Crossover signals
    k_above_d = stoch['%K'] > stoch['%D']
    k_below_d = stoch['%K'] < stoch['%D']
    
    result['Signal'] = 0
    
    # Long: %K crosses above %D in oversold zone
    long_signal = (k_above_d & ~k_above_d.shift(1)) & (stoch['%K'] < oversold)
    result.loc[long_signal, 'Signal'] = 1
    
    # Short: %K crosses below %D in overbought zone
    short_signal = (k_below_d & ~k_below_d.shift(1)) & (stoch['%K'] > overbought)
    result.loc[short_signal, 'Signal'] = -1
    
    result['Condition'] = 'Neutral'
    result.loc[stoch['%K'] > overbought, 'Condition'] = 'Overbought'
    result.loc[stoch['%K'] < oversold, 'Condition'] = 'Oversold'
    
    return result
```

---

## Williams %R

### Williams %R

```python
def calculate_williams_r(data: pd.DataFrame, period: int = 14) -> pd.Series:
    """
    Calculate Williams %R.
    
    Formula: %R = -100 × (Highest High - Close) / (Highest High - Lowest Low)
    
    Args:
        data: DataFrame with High, Low, Close
        period: Lookback period
    
    Returns:
        Williams %R series (-100 to 0)
    """
    highest_high = data['High'].rolling(window=period).max()
    lowest_low = data['Low'].rolling(window=period).min()
    
    wr = -100 * (highest_high - data['Close']) / (highest_high - lowest_low)
    
    return wr
```

---

## ROC (Rate of Change)

### ROC

```python
def calculate_roc(data: pd.Series, period: int = 12) -> pd.Series:
    """
    Calculate Rate of Change (ROC).
    
    Formula: ROC = ((Current - Previous) / Previous) × 100
    
    Args:
        data: Price series
        period: ROC period
    
    Returns:
        ROC series (percentage)
    """
    roc = ((data - data.shift(period)) / data.shift(period)) * 100
    
    return roc
```

---

## Momentum

### Momentum

```python
def calculate_momentum(data: pd.Series, period: int = 10) -> pd.Series:
    """
    Calculate Momentum.
    
    Formula: Momentum = Current Price - Price n periods ago
    
    Args:
        data: Price series
        period: Momentum period
    
    Returns:
        Momentum series
    """
    momentum = data - data.shift(period)
    
    return momentum
```

---

## All-In-One Oscillator Calculator

### Oscillator Class

```python
class Oscillators:
    """
    Complete oscillator calculator.
    """
    
    def __init__(self, data: pd.DataFrame):
        """
        Initialize with OHLC data.
        
        Args:
            data: DataFrame with High, Low, Close, Volume
        """
        self.data = data
        self.close = data['Close']
        self.high = data['High']
        self.low = data['Low']
        self.volume = data['Volume'] if 'Volume' in data.columns else None
    
    def rsi(self, period: int = 14) -> pd.Series:
        """RSI oscillator"""
        return calculate_rsi(self.close, period)
    
    def cci(self, period: int = 20) -> pd.Series:
        """CCI oscillator"""
        return calculate_cci(self.data, period)
    
    def macd(self, fast: int = 12, slow: int = 26, 
            signal: int = 9) -> pd.DataFrame:
        """MACD oscillator"""
        return calculate_macd(self.close, fast, slow, signal)
    
    def stochastic(self, k_period: int = 14, d_period: int = 3,
                 slowing: int = 3) -> pd.DataFrame:
        """Stochastic oscillator"""
        return calculate_stochastic(self.data, k_period, d_period, slowing)
    
    def williams_r(self, period: int = 14) -> pd.Series:
        """Williams %R"""
        return calculate_williams_r(self.data, period)
    
    def roc(self, period: int = 12) -> pd.Series:
        """Rate of Change"""
        return calculate_roc(self.close, period)
    
    def momentum(self, period: int = 10) -> pd.Series:
        """Momentum"""
        return calculate_momentum(self.close, period)
    
    def all(self, rsi_period: int = 14, cci_period: int = 20,
           macd_fast: int = 12, macd_slow: int = 26, macd_signal: int = 9,
           stoch_k: int = 14, stoch_d: int = 3, stoch_slow: int = 3) -> pd.DataFrame:
        """Calculate all oscillators"""
        result = pd.DataFrame(index=self.close.index)
        
        result['RSI'] = self.rsi(rsi_period)
        result['CCI'] = self.cci(cci_period)
        
        macd = self.macd(macd_fast, macd_slow, macd_signal)
        result['MACD'] = macd['MACD']
        result['MACD_Signal'] = macd['Signal']
        result['MACD_Histogram'] = macd['Histogram']
        
        stoch = self.stochastic(stoch_k, stoch_d, stoch_slow)
        result['Stoch_K'] = stoch['%K']
        result['Stoch_D'] = stoch['%D']
        
        result['Williams_R'] = self.williams_r()
        result['ROC'] = self.roc()
        result['Momentum'] = self.momentum()
        
        return result
```

### Usage

```python
# Download data
df = download_data('AAPL', '1y')

# Calculate all oscillators
osc = Oscillators(df)
all_osc = osc.all()

print(all_osc.tail())
```

---

## Trading Strategy Examples

### RSI Strategy

```python
def rsi_strategy(data: pd.Series, period: int = 14,
                oversold: float = 30, overbought: float = 70):
    """
    Simple RSI trading strategy.
    
    Args:
        data: Price series
        period: RSI period
        oversold: Oversold threshold
        overbought: Overbought threshold
    
    Returns:
        DataFrame with signals
    """
    rsi = calculate_rsi(data, period)
    
    result = pd.DataFrame(index=data.index)
    result['Price'] = data
    result['RSI'] = rsi
    result['Signal'] = 0
    
    # Buy when RSI exits oversold
    result.loc[(rsi > oversold) & (rsi.shift(1) <= oversold), 'Signal'] = 1
    
    # Sell when RSI exits overbought
    result.loc[(rsi < overbought) & (rsi.shift(1) >= overbought), 'Signal'] = -1
    
    return result
```

### MACD Strategy

```python
def macd_strategy(data: pd.Series, fast: int = 12, slow: int = 26,
                signal: int = 9):
    """
    MACD crossover strategy.
    
    Args:
        data: Price series
        fast: Fast EMA period
        slow: Slow EMA period
        signal: Signal period
    
    Returns:
        DataFrame with signals
    """
    macd = calculate_macd(data, fast, slow, signal)
    
    result = pd.DataFrame(index=data.index)
    result['Price'] = data
    result['MACD'] = macd['MACD']
    result['Signal_Line'] = macd['Signal']
    result['Histogram'] = macd['Histogram']
    result['Signal'] = 0
    
    # Golden Cross - MACD crosses above Signal
    result.loc[(macd['MACD'] > macd['Signal']) & 
             (macd['MACD'].shift(1) <= macd['Signal'].shift(1)), 'Signal'] = 1
    
    # Death Cross - MACD crosses below Signal
    result.loc[(macd['MACD'] < macd['Signal']) & 
             (macd['MACD'].shift(1) >= macd['Signal'].shift(1)), 'Signal'] = -1
    
    return result
```

### Combined Strategy

```python
def combined_oscillator_strategy(data: pd.DataFrame):
    """
    Combined oscillator strategy.
    
    Uses RSI for entry timing and MACD for trend.
    
    Args:
        data: DataFrame with Close
    
    Returns:
        DataFrame with signals
    """
    close = data['Close']
    rsi = calculate_rsi(close, 14)
    macd = calculate_macd(close, 12, 26, 9)
    
    result = pd.DataFrame(index=data.index)
    result['Price'] = close
    result['RSI'] = rsi
    result['MACD'] = macd['MACD']
    result['MACD_Signal'] = macd['Signal']
    result['Signal'] = 0
    
    # Long: RSI oversold to normal + MACD bullish
    long_condition = (rsi > 30) & (rsi.shift(1) <= 30) & (macd['MACD'] > macd['Signal'])
    result.loc[long_condition, 'Signal'] = 1
    
    # Short: RSI overbought to normal + MACD bearish
    short_condition = (rsi < 70) & (rsi.shift(1) >= 70) & (macd['MACD'] < macd['Signal'])
    result.loc[short_condition, 'Signal'] = -1
    
    return result
```

---

## Plotting

### Matplotlib Example

```python
import matplotlib.pyplot as plt

def plot_rsi(data: pd.Series, period: int = 14):
    """Plot RSI with overbought/oversold zones."""
    rsi = calculate_rsi(data, period)
    
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8), 
                                   gridspec_kw={'height_ratios': [3, 1]})
    
    # Price chart
    ax1.plot(data.index, data, label='Price', linewidth=1)
    ax1.set_title('Price')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # RSI chart
    ax2.plot(data.index, rsi, label='RSI', linewidth=1, color='purple')
    ax2.axhline(y=70, color='red', linestyle='--', alpha=0.5)
    ax2.axhline(y=30, color='green', linestyle='--', alpha=0.5)
    ax2.fill_between(data.index, 70, 100, alpha=0.1, color='red')
    ax2.fill_between(data.index, 0, 30, alpha=0.1, color='green')
    ax2.set_ylim(0, 100)
    ax2.set_title('RSI')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()

def plot_macd(data: pd.Series):
    """Plot MACD."""
    macd = calculate_macd(data)
    
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8),
                                   gridspec_kw={'height_ratios': [3, 1]})
    
    # Price chart
    ax1.plot(data.index, data, label='Price', linewidth=1)
    ax1.set_title('Price')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # MACD chart
    ax2.plot(data.index, macd['MACD'], label='MACD', linewidth=1)
    ax2.plot(data.index, macd['Signal'], label='Signal', linewidth=1)
    
    # Histogram
    colors = ['green' if x >= 0 else 'red' for x in macd['Histogram']]
    ax2.bar(data.index, macd['Histogram'], label='Histogram', color=colors, alpha=0.5)
    
    ax2.axhline(y=0, color='black', linestyle='-', alpha=0.3)
    ax2.set_title('MACD')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()
```

## Conclusion

Python provides efficient tools for calculating all major oscillators. The pandas library handles most calculations elegantly, while custom functions enable understanding the mathematics behind each indicator.

Key implementations:
- RSI: Uses exponential smoothing for average gains/losses
- CCI: Uses Typical Price and Mean Deviation
- MACD: Uses EMA differences
- Stochastic: Uses highest high/lowest low
- Williams %R: Similar to Stochastic, inverted

Always verify calculations match expected values, and test thoroughly before trading live.
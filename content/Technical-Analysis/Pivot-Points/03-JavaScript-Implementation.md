---
title: "Pivot Points JavaScript Implementation"
tags:
  - technical-analysis
  - pivot-points
  - javascript
  - typescript
  - programming
  - code
---

# Pivot Points - JavaScript Implementation

This article provides JavaScript/TypeScript code for calculating all pivot point types for web applications and trading bots.

## Prerequisites

```javascript
// Using npm
npm install axios

// Or use in browser with data from API
```

---

## Classic Pivot Points

```javascript
/**
 * Calculate Classic Pivot Points
 * 
 * Formulas:
 *   PP = (High + Low + Close) / 3
 *   S1 = (PP × 2) - Previous High
 *   S2 = PP - (High - Low)
 *   R1 = (PP × 2) - Previous Low
 *   R2 = PP + (High - Low)
 */
function calculateClassicPivot(high, low, close, prevHigh, prevLow) {
    const pp = (high + low + close) / 3;
    const range = high - low;
    
    return {
        pp: pp,
        r3: pp + range * 2,
        r2: pp + range,
        r1: (pp * 2) - prevLow,
        s1: (pp * 2) - prevHigh,
        s2: pp - range,
        s3: pp - range * 2
    };
}

// Example usage:
const data = {
    high: 150.50,
    low: 148.00,
    close: 149.25,
    prevHigh: 152.00,
    prevLow: 147.50
};

const classicPivots = calculateClassicPivot(
    data.high, 
    data.low, 
    data.close, 
    data.prevHigh, 
    data.prevLow
);

console.log(classicPivots);
// { pp: 149.25, r3: 151.25, r2: 150.25, r1: 149.00, s1: 148.50, s2: 147.50, s3: 146.50 }
```

---

## Fibonacci Pivot Points

```javascript
/**
 * Calculate Fibonacci Pivot Points
 * 
 * Formulas:
 *   PP = (High + Low + Close) / 3
 *   S1, S2, S3 = PP - (Range × Fibonacci Levels)
 *   R1, R2, R3 = PP + (Range × Fibonacci Levels)
 */
function calculateFibonacciPivot(high, low, close) {
    const pp = (high + low + close) / 3;
    const range = high - low;
    
    const fibLevels = {
        r3: 1.000,
        r2: 0.618,
        r1: 0.382,
        s1: 0.382,
        s2: 0.618,
        s3: 1.000
    };
    
    return {
        pp: pp,
        r3: pp + (range * fibLevels.r3),
        r2: pp + (range * fibLevels.r2),
        r1: pp + (range * fibLevels.r1),
        s1: pp - (range * fibLevels.s1),
        s2: pp - (range * fibLevels.s2),
        s3: pp - (range * fibLevels.s3)
    };
}
```

---

## Camarilla Pivot Points

```javascript
/**
 * Calculate Camarilla Pivot Points
 * 
 * Formulas:
 *   PP = (High + Low + Close) / 3
 *   S1-S4 = Close - (Range × Camarilla Levels)
 *   R1-R4 = Close + (Range × Camarilla Levels)
 */
function calculateCamarillaPivot(high, low, close) {
    const pp = (high + low + close) / 3;
    const range = high - low;
    
    const camLevels = {
        r4: 0.3667,
        r3: 0.2750,
        r2: 0.1833,
        r1: 0.0917,
        s1: 0.0917,
        s2: 0.1833,
        s3: 0.2750,
        s4: 0.3667
    };
    
    return {
        pp: pp,
        r4: close + (range * camLevels.r4),
        r3: close + (range * camLevels.r3),
        r2: close + (range * camLevels.r2),
        r1: close + (range * camLevels.r1),
        s1: close - (range * camLevels.s1),
        s2: close - (range * camLevels.s2),
        s3: close - (range * camLevels.s3),
        s4: close - (range * camLevels.s4)
    };
}
```

---

## DeMark Pivot Points

```javascript
/**
 * Calculate DeMark Pivot Points
 * 
 * Formulas:
 *   If Close < Open:  DM = High + (Low × 2) + Close
 *   If Close > Open:  DM = (High × 2) + Low + Close  
 *   If Close = Open:  DM = High + Low + (Close × 2)
 */
function calculateDeMarkPivot(open, high, low, close) {
    let dm;
    
    if (close < open) {
        dm = high + (low * 2) + close;
    } else if (close > open) {
        dm = (high * 2) + low + close;
    } else {
        dm = high + low + (close * 2);
    }
    
    return {
        demark: dm
    };
}
```

---

## Woodie Pivot Points

```javascript
/**
 * Calculate Woodie Pivot Points
 * 
 * Formulas:
 *   PP = (High + Low + (Close × 2)) / 4
 *   S1 = (PP × 2) - Previous High
 *   S2 = PP - (High - Low)
 *   R1 = (PP × 2) - Previous Low
 *   R2 = PP + (High - Low)
 */
function calculateWoodiePivot(high, low, close, prevHigh, prevLow) {
    const pp = (high + low + (close * 2)) / 4;
    const range = high - low;
    
    return {
        pp: pp,
        r2: pp + range,
        r1: (pp * 2) - prevLow,
        s1: (pp * 2) - prevHigh,
        s2: pp - range
    };
}
```

---

## All-in-One Pivot Calculator Class

```javascript
class PivotCalculator {
    /**
     * Calculate all pivot point types
     * 
     * @param {Object} data - OHLC data
     * @param {number} data.high - Current high
     * @param {number} data.low - Current low
     * @param {number} data.close - Current close
     * @param {number} data.open - Current open
     * @param {number} data.prevHigh - Previous high
     * @param {number} data.prevLow - Previous low
     */
    constructor(data) {
        this.data = data;
    }
    
    classic() {
        const { high, low, close, prevHigh, prevLow } = this.data;
        const pp = (high + low + close) / 3;
        const range = high - low;
        
        return {
            pp: pp,
            r3: pp + range * 2,
            r2: pp + range,
            r1: (pp * 2) - prevLow,
            s1: (pp * 2) - prevHigh,
            s2: pp - range,
            s3: pp - range * 2
        };
    }
    
    fibonacci() {
        const { high, low, close } = this.data;
        const pp = (high + low + close) / 3;
        const range = high - low;
        
        return {
            pp: pp,
            r3: pp + range * 1.000,
            r2: pp + range * 0.618,
            r1: pp + range * 0.382,
            s1: pp - range * 0.382,
            s2: pp - range * 0.618,
            s3: pp - range * 1.000
        };
    }
    
    camarilla() {
        const { high, low, close } = this.data;
        const pp = (high + low + close) / 3;
        const range = high - low;
        
        return {
            pp: pp,
            r4: close + range * 0.3667,
            r3: close + range * 0.2750,
            r2: close + range * 0.1833,
            r1: close + range * 0.0917,
            s1: close - range * 0.0917,
            s2: close - range * 0.1833,
            s3: close - range * 0.2750,
            s4: close - range * 0.3667
        };
    }
    
    demark() {
        const { open, high, low, close } = this.data;
        let dm;
        
        if (close < open) {
            dm = high + (low * 2) + close;
        } else if (close > open) {
            dm = (high * 2) + low + close;
        } else {
            dm = high + low + (close * 2);
        }
        
        return { demark: dm };
    }
    
    woodie() {
        const { high, low, close, prevHigh, prevLow } = this.data;
        const pp = (high + low + (close * 2)) / 4;
        const range = high - low;
        
        return {
            pp: pp,
            r2: pp + range,
            r1: (pp * 2) - prevLow,
            s1: (pp * 2) - prevHigh,
            s2: pp - range
        };
    }
    
    all() {
        return {
            classic: this.classic(),
            fibonacci: this.fibonacci(),
            camarilla: this.camarilla(),
            demark: this.demark(),
            woodie: this.woodie()
        };
    }
}
```

---

## Usage Example

```javascript
// Test data
const candle = {
    high: 150.50,
    low: 148.00,
    close: 149.25,
    open: 148.75,
    prevHigh: 152.00,
    prevLow: 147.50
};

// Calculate pivots
const pivots = new PivotCalculator(candle);

// Get specific pivot type
const classic = pivots.classic();
console.log('Classic:', classic);

// Get all pivots
const allPivots = pivots.all();
console.log('All Pivots:', allPivots);

// Access specific levels
console.log('Classic R1:', classic.r1);
console.log('Classic S1:', classic.s1);
```

---

## Trading Strategies

### Pivot Bounce Strategy

```javascript
function pivotBounceStrategy(currentPrice, pivots) {
    const { r1, s1, r2, s2 } = pivots;
    
    // Check for bounce off support
    if (currentPrice <= s1 && currentPrice >= s2) {
        return 'BUY';
    }
    
    // Check for bounce off resistance
    if (currentPrice >= r1 && currentPrice <= r2) {
        return 'SELL';
    }
    
    return 'HOLD';
}
```

### Pivot Breakout Strategy

```javascript
function pivotBreakoutStrategy(currentPrice, openPrice, pivots) {
    const { r1, s1 } = pivots;
    
    // Bullish breakout
    if (currentPrice > r1 && openPrice < r1) {
        return 'BUY';
    }
    
    // Bearish breakout
    if (currentPrice < s1 && openPrice > s1) {
        return 'SELL';
    }
    
    return 'HOLD';
}
```

### Multi-Timeframe Pivot Strategy

```javascript
class MultiTimeframePivots {
    constructor(dailyData, weeklyData) {
        this.daily = new PivotCalculator(dailyData);
        this.weekly = new PivotCalculator(weeklyData);
    }
    
    getConfluence() {
        const dailyPP = this.daily.classic().pp;
        const weeklyPP = this.weekly.classic().pp;
        
        // Calculate distance from weekly pivot
        const distance = Math.abs(dailyPP - weeklyPP);
        
        // Strong confluence when levels are close
        if (distance < 5) {
            return 'STRONG';
        } else if (distance < 15) {
            return 'MODERATE';
        }
        
        return 'WEAK';
    }
}
```

---

## Node.js / Express API Example

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/pivots/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        
        // Fetch data from your data source
        const response = await axios.get(
            `https://api.example.com/quote/${symbol}`
        );
        
        const data = response.data;
        
        const pivots = new PivotCalculator({
            high: data.high,
            low: data.low,
            close: data.close,
            open: data.open,
            prevHigh: data.prevHigh,
            prevLow: data.prevLow
        });
        
        res.json({
            symbol: symbol,
            pivots: pivots.all(),
            timestamp: new Date()
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

## React Component Example

```jsx
import React, { useState, useEffect } from 'react';

const PivotPoints = ({ symbol }) => {
    const [pivots, setPivots] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Fetch and calculate pivots
        const fetchPivots = async () => {
            setLoading(true);
            // Your fetch logic here
            setLoading(false);
        };
        
        fetchPivots();
    }, [symbol]);
    
    if (loading) return <div>Loading...</div>;
    
    return (
        <div className="pivot-display">
            <h3>{symbol} Pivot Points</h3>
            <div className="levels">
                <div className="resistance">
                    <span>R3:</span> ${pivots?.classic.r3.toFixed(2)}
                    <span>R2:</span> ${pivots?.classic.r2.toFixed(2)}
                    <span>R1:</span> ${pivots?.classic.r1.toFixed(2)}
                </div>
                <div className="pivot">
                    <span>PP:</span> ${pivots?.classic.pp.toFixed(2)}
                </div>
                <div className="support">
                    <span>S1:</span> ${pivots?.classic.s1.toFixed(2)}
                    <span>S2:</span> ${pivots?.classic.s2.toFixed(2)}
                    <span>S3:</span> ${pivots?.classic.s3.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default PivotPoints;
```

---

## Conclusion

JavaScript provides flexible pivot point calculations:
- **ES6 functions:** Simple and reusable
- **Class-based:** Organized and extensible
- **Node.js compatible:** Server-side calculations
- **React ready:** Frontend display

Key implementations:
- Classic for standard trading
- Fibonacci for Fibonacci traders
- Camarilla for scalping
- DeMark for unique signals
- Woodie for close-weighted
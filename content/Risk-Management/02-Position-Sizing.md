---
title: "Position Sizing"
tags:
  - trading
  - risk-management
  - position-sizing
  - calculator
---

# Position Sizing in Trading

Position sizing determines how much capital to allocate to each trade. It is the most critical element of risk management, directly controlling the risk per trade and overall account drawdown.

## The Core Formula

Position size calculates by dividing the amount at risk by the risk per unit:

**Position Size = Amount at Risk ÷ Risk per Share**

For example, with a $10,000 account, 2% maximum risk ($200), and a 50-cent stop:
- Position Size = $200 ÷ $0.50 = 400 shares

This calculation ensures the exact dollar risk regardless of position size or stop distance.

## Methods of Position Sizing

### Fixed Fractional

The simplest method risks a fixed percentage of account equity per trade. Using 1-2% per trade provides survival through extended losing streaks.

With a $100,000 account and 2% risk:
- Risk per trade = $2,000

This method increases risk proportionally as the account grows, decreasing risk as the account shrinks. It naturally adjusts position sizes to account performance.

### Fixed Ratio

Fixed ratio sizing increases position sizes after reaching profit targets. The fixed ratio equals the account increase required before position size increases.

For example, a $10,000 account with a $5,000 fixed ratio:
- Increase position by one contract for every $5,000 profit
- Starting with one contract, increase to two contracts at $15,000

This method grows positions only after proving profitability.

### Volatility-Based

Volatility-based sizing adjusts positions based on market volatility, ensuring consistent risk regardless of market conditions.

**ATR Method**: Use a multiple of the Average True Range for stop placement:

- Daily ATR (20-day) = $2.00
- Desired risk = $200
- Risk per share = 2 × ATR = $4.00
- Position Size = $200 ÷ $4.00 = 50 shares

This method produces smaller positions in volatile markets and larger positions in calm markets, maintaining consistent dollar risk.

### Kelly Criterion

The Kelly Criterion mathematically determines optimal position sizing based on edge and win rate:

**Position % = W - (1-W)/R**

Where:
- W = Win rate (decimal)
- R = Win/Loss ratio

With a 50% win rate and 2:1 win/loss ratio:
- Position % = 0.50 - (0.50/2) = 0.50 - 0.25 = 0.25 or 25%

Many traders use half-Kelly (half the calculated percentage) to reduce volatility while retaining most of the mathematical edge.

## Practical Implementation

### Step-by-Step Calculation

1. **Determine account size**: Current total equity
2. **Set risk percentage**: Typically 1-2%
3. **Calculate dollar risk**: Account × Risk %
4. **Identify technical stop**: Based on analysis
5. **Calculate risk per share**: Entry price - Stop price
6. **Calculate position size**: Dollar risk ÷ Risk per share
7. **Round down**: Use conservative whole numbers

### Adjusting for Commissions

Always factor commissions into the risk calculation. Include both entry and exit commissions when calculating true risk per trade.

### Minimum Position Sizes

Some calculated positions may be too small to trade practically. In these cases:
- Widen the stop slightly to reach viable position sizes
- Wait for higher-conviction setups
- Accept missing the trade

## Common Mistakes

### Over-sizing

The most common mistake is trading positions too large. Greed leads to oversized positions that destroy accounts during losing streaks. Always calculate position sizes objectively.

### Ignoring Correlation

Trading multiple correlated positions multiplies effective risk. Ten positions in the same direction on correlated assets effectively equals one large position.

### Failing to Adjust

Traders often set position sizes once and never adjust. Account changes require recalculation. Regular review ensures appropriate sizing.

### Emotional Adjustment

Increasing position sizes after wins or decreasing after losses represents emotional trading. Stick to the systematic approach.

## Advanced Considerations

### Scaling In and Out

Adding to positions (scaling in) or taking partial profits (scaling out) affects overall position sizing. Calculate the total exposure when using these approaches.

Scaling in example:
- Initial position: 50% of planned size
- Add 25% on first signal confirmation
- Final position: 75% of planned size

### Portfolio-Level Sizing

Individual position sizing must consider overall portfolio risk:
- Total portfolio risk across all positions
- Correlation between positions
- Sector or market concentration

### Maximum Drawdown Consideration

After significant drawdowns, position sizes may need temporary reduction. A 30% drawdown requires 43% gain just to break even; overly aggressive sizing after losses extends recovery time.

## Conclusion

Position sizing is the mechanism that translates trading edge into account growth while protecting against drawdowns. Proper sizing ensures survival through losing periods while maximizing profit potential during winning periods.

Every trader should calculate position sizes systematically before every trade. This discipline separates professional traders from amateurs and ensures long-term trading success.
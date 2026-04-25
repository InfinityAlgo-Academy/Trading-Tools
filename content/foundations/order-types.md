---
title: "Order Types"
tags:
  - foundations
  - order-types
  - execution
---

# Order Types

Your strategy is worthless if your execution fails. The right order type at the right time can mean the difference between profit and loss.

---

## What Are Order Types?

Order types determine how your trade gets executed. Different situations require different orders.

**Simple definition:** Instructions for entering or exiting a trade.

---

## Types of Orders

### Market Order

Execute immediately at the current market price.

**How it works:**
```
You: Buy 1 lot at market
Broker: Filled at current price immediately
```

**Pros:**
- Guaranteed execution
- Fastest entry

**Cons:**
- No price guarantee
- Slippage possible in volatile markets

**Best for:**
- Fast-moving breakout trades
- When speed matters
- In stable liquidity conditions

---

### Limit Order

Execute only at your specified price or better.

**How it works:**
```
You: Buy at 1.1000 or better
Price: Currently 1.1020
Filled: When/if price drops to 1.1000
```

**Pros:**
- Price control
- Avoids slippage
- Can get better fill

**Cons:**
- May not execute
- Missed opportunities

**Best for:**
- Entries at specific levels
- Range trading
- When price has to reach your level

---

### Stop Order (Stop-Loss Order)

Execute when price passes your specified level.

**How it works:**
```
You: Stop buy at 1.1050
Price: Currently 1.1020
Filled: When price rises to 1.1050
```

**Pros:**
- Automatic execution
- Catches momentum
- Catches breakouts

**Cons:**
- May execute at worse price
- False breakout risk

**Best for:**
- Breakout entries
- Stop-loss exits
- After-hours trading

---

### Stop-Limit Order

Stop order that becomes a limit order once triggered.

**How it works:**
```
You: Stop limit buy at 1.1050
Trigger: Price reaches 1.1050
Then: Limit order activates at 1.1050
```

**Pros:**
- Price control after trigger
- Maximum fill price guaranteed

**Cons:**
- May not fill
- More complex

**Best for:**
- Precise entries
- Reducing slippage risk on stops

---

## Order Execution

### Instant Market (Fill or Kill)

全部成交否则取消 — Execute entirely now or cancel.

**Use for:** When you must enter exactly this size

---

### Partial Fills

Your order fills in multiple pieces.

**Use for:** Large orders in thin liquidity

---

## Common Mistakes

### 1. Using Market Orders in Low Liquidity

**Mistake:** Market order when few counterparties exist.

**Result:** Terrible fills, massive slippage.

**Fix:** Use limit orders in low liquidity.

---

### 2. Using Limit Orders on Breakouts

**Missed setup when price doesn't reach your level.

Fix: Use stop orders for breakouts.

---

### 3. Not Using Stop-Loss Orders

**Mistake:** Holding and hoping.

**Result:** Large losses, blown accounts.

**Fix:** Always use stop-loss orders.

---

## Order Type Summary

| Situation | Best Order Type |
|-----------|-----------------|
| Fast breakout | Market or Stop |
| Specific level entry | Limit |
| Protecting against loss | Stop |
| Precise breakout | Stop-Limit |
| Guaranteed entry | Market |

---

# Key Takeaways

1. **Market orders** = Fast but no price guarantee
2. **Limit orders** = Price control but may not fill
3. **Stop orders** = Catch momentum but slippage risk
4. **Match order type to situation** = Don't use one size fits all
5. **Always use stops** = Protect your capital

---

# Connect to Other Sections

Now you understand order types:

- [[market-structure]] — How structure affects execution
- [[liquidity]] — How liquidity affects fills
- [[05-strategies]] — Strategy-specific order types

*Execute smart. Trade safe.*
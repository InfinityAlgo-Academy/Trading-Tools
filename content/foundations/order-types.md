---
title: "Order Types: Complete Guide"
tags:
  - foundations
  - order-types
  - execution
  - trading
  - broker
description: "Master order types - market, limit, stop, and OCO orders. Learn when to use each and how to execute properly."
slug: order-types
---

# Order Types: Complete Guide

Your trading success depends not just on analysis, but on execution. Understanding order types is critical for getting in and out at the right prices.

---

## Order Types Overview

### 1. Market Order

**Definition:** Execute immediately at current market price.

```
You: BUY at market
Filled: Current price (instant)
```

**Use for:**
- Fast-moving markets
- Breakout entries
- When execution speed matters

**Pros:**
- Guaranteed execution
- Fast entry
- Simple

**Cons:**
- No price guarantee
- Slippage possible in volatile markets

---

### 2. Limit Order

**Definition:** Execute only at your specified price or better.

```
You: BUY at 1.1000
Price: Currently 1.1050
Filled: When/if price reaches 1.1000
```

**Use for:**
- Entries at specific levels
- Better fill prices
- Range trading

**Pros:**
- Price control
- No slippage
- Better pricing

**Cons:**
- May not execute
- Missed opportunities

---

### 3. Stop Order (Stop-Loss Order)

**Definition:** Execute when price passes your specified level.

```
You: BUY stop at 1.1050
Price: Currently 1.1000
Filled: When price rises to 1.1050
```

**Use for:**
- Breakout entries
- Protections (stop-loss)
- After-hours trading

**Pros:**
- Automatic execution
- Catches momentum
- Professional exits

**Cons:**
- May execute at worse price
- False breakout risk

---

### 4. Stop-Limit Order

**Definition:** Stop order that becomes a limit order once triggered.

```
You: BUY stop limit at 1.1050 limit 1.1055
Trigger: Price reaches 1.1050
Then: Limit order activates at 1.1050-1.1055
```

**Use for:**
- Precise breakout entry
- Reducing slippage risk
- Controlled entries

**Pros:**
- Price control
- Slippage prevention

**Cons:**
- May not fill
- Complex

---

### 5. Take Profit Order (T/P)

**Definition:** Close position automatically at profit target.

```
You: Long at 1.1000, T/P at 1.1100
Price: Reaches 1.1100
Filled: Automatically at profit
```

**Use for:**
- Locking profits
- No monitoring needed
- Systematic exits

---

### 6. OCO Order (One Cancels the Other)

**Definition:** Two orders; one fills, the other cancels.

```
You: Long at 1.1000
OCO: Stop at 1.0900, T/P at 1.1200

Either:
- Price hits T/P (1.1200) = PROFIT, stop cancelled
- Price hits stop (1.0900) = LOSS, T/P cancelled
```

**Use for:**
- Managing risk/reward
- No monitoring
- Professional exits

---

## Order Execution Types

### Fill or Kill (FOK)

Execute ENTIRE order immediately or cancel completely.

**Use for:** When you must enter EXACTLY this size

---

### Immediate or Cancel (IOC)

Execute what is possible NOW, cancel rest.

**Use for:** Partial fills acceptable

---

### Good Till Cancel (GTC)

Order stays active until executed or manually cancelled.

**Use for:** Swing trades, pending setups

---

## When to Use Each Order Type

### Market Order

| Situation | Why |
|-----------|-----|
| Breaking out | Need in NOW |
| News event | Fast entry |
| Panic selling | Exit immediately |

### Limit Order

| Situation | Why |
|-----------|-----|
| At support level | Better entry |
| Range trading | Entry at edge |
| Retest entry | More precise |

### Stop Order

| Situation | Why |
|-----------|-----|
| Breakout entry | Catch momentum |
| Stop-loss | Protect capital |
| Trailing stops | Lock profits |

---

## Order Execution in Different Markets

### Forex

| Order Type | Availability |
|------------|--------------|
| Market | Yes |
| Limit | Yes |
| Stop | Yes |
| OCO | Yes |

### Crypto

| Order Type | Availability |
|------------|--------------|
| Market | Yes |
| Limit | Yes |
| Stop | Yes |
| OCO | Exchange dependent |

### Stocks

| Order Type | Availability |
|------------|--------------|
| Market | Yes |
| Limit | Yes |
| Stop | Yes |

---

## Common Mistakes

### 1. Market Orders in Low Liquidity

**Problem:** Using market order in illiquid market.

**Result:** Huge slippage.

**Solution:** Use limit orders in thinly traded markets.

---

### 2. Using Limit Orders on Breakouts

**Problem:** Waiting for limit when breakout happens.

**Result:** Missed moves.

**Solution:** Use stop orders for breakouts.

---

### 3. No Stop-Loss Orders

**Problem:** Not using stop-losses.

**Result:** Blows account.

**Solution:** Always use stop-loss orders.

---

### 4. Moving Stops

**Problem:** Moving stop to avoid loss.

**Result:** Larger loss.

**Solution:** Set and forget.

---

## Professional Tips

### Tip 1: Order Stacking

```
Place:
1. Entry limit order
2. Stop order
3. Take profit order

All three work together automatically.
```

### Tip 2: Order Confirmation

```
Before placing order:
✓ Check spread
✓ Check volume
✓ Check time
✓ Confirm analysis
```

### Tip 3: Demo Testing

```
Test all order types on demo before live.
Know how your broker fills orders.
```

---

## Quick Reference Table

| Situation | Use Order |
|----------|-----------|
| Fast breakout | Market |
| At support | Limit |
| Confirming break | Stop |
| Protecting loss | Stop-loss |
| Locking profit | Take profit |
| Two-way exit | OCO |

---

## Related Topics

- [[foundations/Market-Structure]] — Order flow
- [[tools/Platforms]] — Trading execution
- [[risk-management/Stop-Loss]] — Protect capital

---

*Execute smart. Trade safe.*
---
title: "Order Flow"
tags:
  - advanced
  - order-flow
  - dom
  - volume
  - auction
---

# Order Flow

Order flow is the study of actual buying and selling. Don't trade charts — trade the orders.

---

## What Is Order Flow?

```
Chart shows: Price
DOM shows: Who is buying/selling
Order flow shows: What the market is doing
```

---

## Order Flow Basics

### The DOM (Depth of Market)

| Side | What Shows |
|------|----------|
| Bids | Buy limit orders |
| Asks | Sell limit orders |
| Spikes | Large orders |
| Pulling | Orders removed |

### Reading the DOM

```
Asks (sellers):                 Bids (buyers):
100 lots @ 1.1100            50 lots @ 1.1080
50 lots @ 1.1095             100 lots @ 1.1075
25 lots @ 1.1090             200 lots @ 1.1070
```

**Reading:**
- Large asks above = Resistance
- Large bids below = Support

---

## Order Flow Patterns

### Absorption

```
Price falls to bids
Bids keep appearing
Price doesn't fall
→ Go long
```

### Exhaustion

```
Price rises to asks
Asks exhausted
No more buying
→ Go short
```

### Emptying

```
Bids suddenly removed
No support
→ Price drops
```

---

## Volume Analysis

### Volume at Levels

| Volume | Meaning |
|--------|---------|
| High at resistance | Selling pressure |
| High at support | Buying pressure |
| Low on breakout | False breakout |
| High breakout | Real breakout |

### Volume Types

| Type | Signal |
|------|--------|
| High + up | Strong buying |
| High + down | Strong selling |
| Low + price move | Weak move |

---

## Order Flow Trading

### Step 1: Find Key Level

```
Support, resistance, or order block
```

### Step 2: Watch DOM

```
Approaching level
See order absorption?
```

### Step 3: Confirm Price Action

```
Bounce or break
```

### Step 4: Enter

```
With confirmation
```

---

## Common Mistakes

### 1. Fake DOM Data

**Problem:** Not from exchange.

**Solution:** Use exchange direct data.

---

### 2. No Confirmation

**Problem:** Trading DOM alone.

**Solution:** Confirm with price action.

---

### 3. Ignoring Time

**Problem:** Not considering overnight.

**Solution:** Trade liquid hours.

---

# Key Takeaways

1. **DOM shows orders** — See actual flow
2. **Absorption** — Buying pressure stops fall
3. **Exhaustion** — Selling finished
4. **Confirm first** — Price action before trade
5. **Volume confirms** — High = real

---

# Related

>>> [smart-money-concepts.md](./smart-money-concepts.md) >>>

>>> [liquidity-zones.md](./liquidity-zones.md) >>>

>>> [algorithmic-trading.md](./algorithmic-trading.md) >>>

*Trade the orders, not just price.*
---
title: "Pivot Channel Map - AGPro Series"
description: "Comprehensive guide to the Pivot Channel Map indicator - a pivot-based channel mapping engine for technical analysis"
tags:
  - pine-script
  - indicators
  - channels
  - trading-tools
  - agpro
slug: pivot-channel-map
---

# Pivot Channel Map [AGPro Series]

A sophisticated pivot-based channel mapping engine that auto-detects structural channels from swing pivots, qualifies them with ATR-normalized filters, and visualizes the active market structure.

## Overview

This indicator automatically identifies **8 distinct channel types** from price pivots:

| Channel Type | Class | Description |
|--------------|-------|-------------|
| Major External Up | Major | Structural Higher Highs in bullish trend |
| Major External Down | Major | Structural Lower Lows in bearish trend |
| Major Internal Up | Major | Higher Lows inside broader bullish structure |
| Major Internal Down | Major | Lower Highs inside broader bearish structure |
| Minor External Up | Minor | Local Lower Lows in short-term bullish moves |
| Minor External Down | Minor | Local Higher Highs in short-term bearish moves |
| Minor Internal Up | Minor | Higher Lows in micro bullish structure |
| Minor Internal Down | Minor | Lower Highs in micro bearish structure |

---

## Core Concepts

### 1. Pivot Detection Engine

```pine
agp_PivotPeriod = input.int(5, 'Pivot Period', minval = 2, maxval = 50)

// Pivot high/low detection
agp_HighPivot = ta.pivothigh(pivotPeriod, pivotPeriod)
agp_LowPivot  = ta.pivotlow(pivotPeriod, pivotPeriod)
```

- **Pivot Period**: Number of bars on each side to confirm a pivot
- Higher values = fewer, more structural pivots
- Lower values = more, noise-sensitive pivots

### 2. Channel Classification

The indicator classifies each pivot point into categories:

| Symbol | Meaning |
|--------|---------|
| `HH` | Higher High (bullish) |
| `HL` | Higher Low (bullish continuation) |
| `LH` | Lower High (bearish) |
| `LL` | Lower Low (bearish) |
| `H` | Generic High |
| `L` | Generic Low |

### 3. Major vs Minor Structure

```
Major Structure:  Larger timeframe swings, institutional levels
Minor Structure:   Smaller timeframe swings, retail trading zones

Major channels use:
- Wider ATR width requirements
- Longer span minimums
- Stronger visual emphasis
```

---

## Key Features

### Channel Qualification Engine

Filters structurally weak channels before drawing:

```pine
// Modes
'Off'      // Show all valid channels (default)
'Balanced' // Filter noise, keep healthy structures
'Strict'   // Only wide, persistent structures

// ATR-based filtering
agp_QualMode   = 'Balanced'
agp_QualAtrLen = 14
```

**Qualification Parameters:**

| Mode | Major Min Span | Minor Min Span | Min Width (ATR) |
|------|----------------|----------------|-----------------|
| Off | 0 | 0 | 0 |
| Balanced | 8 bars | 5 bars | 0.20 |
| Strict | 16 bars | 10 bars | 0.60 |

### Broken Channel Memory

Preserves invalidated channels as faded historical context:

```pine
agp_BrokenMemoryScope = 'Major Only'  // 'Off', 'All'
agp_BrokenMemoryKeep  = 'Last 1'        // 'Last 2'
agp_BrokenMemoryStyle = line.style_dashed
```

### Interaction Zones

Right-edge pockets showing where price interacts with channel rails:

```pine
agp_ShowInteractionZones  = true
agp_InteractionWidthAtr  = 0.18      // Zone width
agp_InteractionExtendBars = 25       // Forward projection
```

### Post-Break Retest/Reclaim Signals

Tracks valid retests or reclaims after channel breaks:

```pine
agp_ShowPostBreakSignals = true
agp_PostBreakWindow      = 20        // Bars to watch after break
agp_PostBreakOffsetAtr   = 0.38      // Label vertical offset
```

**Signal Types:**
- **RECLAIM**: Price returned above/below broken level
- **RETEST**: Price touched but didn't reclaim broken level

---

## Visual Settings

### Line Emphasis Modes

Controls visual contrast between active channels:

```pine
agp_EmphasisMode = 'Balanced'  // 'Off', 'Balanced', 'Strong'

// Balanced: Major base lines slightly more prominent
// Strong:   Clear separation between channel rails
```

### Event Markers

Compact markers on confirmed break/react events:

```pine
agp_ShowEventMarkers    = true
agp_ReactCooldownBars   = 20       // Min bars between React markers
agp_ReactMinPriceAtr    = 0.75     // Min ATR distance for new React
```

### Channel Quick Tags

Compact labels showing channel family:

| Tag | Meaning |
|-----|---------|
| `MEX UP` | Major External Up |
| `MEX DN` | Major External Down |
| `MIN UP` | Major Internal Up |
| `MIN DN` | Major Internal Down |
| `mEX UP` | Minor External Up |
| `mIN DN` | Minor Internal Down |

---

## Info Panel

Real-time dashboard showing:

```
AG Pro Pivot Channel Map
─────────────────────────────────
Major Live      : 1 Up | 0 Down
Minor Live      : 2 Up | 1 Down
Nearest Channel : M.Ext Up | 0.45 ATR | Near
Qualification   : Balanced | All
Interaction      : Major Only | Both
Post-Break       : Major Only | 20 bars | Bullish Major Tilt
```

---

## Alert System

### Alert Types

| Alert | Trigger | Default |
|-------|--------|---------|
| Break Alert | Channel origin broken | On (Major) / Off (Minor) |
| React Alert | Price touched origin after break | On (Major) / Off (Minor) |

### Alert Configuration

```pine
agp_AlertName      = 'Pivot Channel Map [AGPro] Alerts'
agp_AlertFrequency = 'Once Per Bar'   // 'All', 'Once Per Bar', 'Per Bar Close'
agp_AlertTimezone  = 'UTC'
```

---

## Usage Tips

### Best Timeframes

| Timeframe | Recommended Settings |
|-----------|---------------------|
| Daily/Weekly | Pivot Period 5-10, Balanced qualification |
| 4H | Pivot Period 5-8, Balanced/Strict |
| 1H | Pivot Period 5, Balanced |
| 15m | Pivot Period 3-5, Strict recommended |

### Chart Clarity Settings

If chart feels too busy:
1. Enable **Strict** qualification mode
2. Set **Midline Scope** to **Major Only**
3. Reduce **Pivot Period** for fewer pivots
4. Use **React Cooldown** to reduce overlapping markers

### Trading Applications

**Trend Identification:**
- Parallel Major channels indicate strong trends
- Channel width increasing = trend acceleration
- Multiple Minor channels inside Major = trend consolidation

**Breakout Trading:**
- Break of Major External channel = potential trend reversal
- Break of Minor channel = potential pullback entry

**Range Trading:**
- Multiple intersecting channels = range-bound market
- Price bouncing between channels = mean reversion setup

---

## Pine Script Architecture

### State Containers

```pine
// Channel state arrays (8 slots for 8 channel types)
var agp_ActiveOriginNow   = array.new_float(8, na)
var agp_ActiveChannelNow  = array.new_float(8, na)
var agp_ActiveIsLive      = array.new_bool(8, false)
var agp_ChannelTypeStore  = array.new_string(8, '')
var agp_ChannelClassStore = array.new_string(8, '')

// Break tracking
var agp_BreakLevelStore   = array.new_float(8, na)
var agp_BreakBarStore     = array.new_int(8, na)
var agp_BreakModeStore    = array.new_string(8, '')
```

### Main Execution Flow

```
1. Calculate pivots (agp_calculatePivots)
   ↓
2. Find channel points (agp_findChannelPoints)
   ↓
3. Draw and alert (agp_drawAndAlert) for each channel type
   ↓
4. Render interaction zones
   ↓
5. Update post-break signals
   ↓
6. Render info panel
   ↓
7. Fire alerts
```

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Bull Green | `#22C5A6` | Bullish channels |
| Bear Pink | `#F472B6` | Bearish channels |
| Neutral | `#F5BD5C` | Neutral/warning |
| Accent | `#818CF8` | UI highlights |
| Header BG | `#2563EB` | Panel header |

---

## Related Indicators

- [[tools/pine-script/indicators/moving-averages|Moving Averages]] - Trend confirmation
- [[tools/pine-script/indicators/atr|ATR]] - Volatility measurement
- [[tools/pine-script/indicators/rsi|RSI]] - Momentum confirmation
- [[analysis/price-action|Price Action]] - Manual chart analysis

---

*Part of the AGPro Series - Professional Trading Tools*
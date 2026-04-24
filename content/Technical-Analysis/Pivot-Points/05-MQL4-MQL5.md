---
title: "Pivot Points MQL4 MQL5"
tags:
  - technical-analysis
  - pivot-points
  - mql4
  - mql5
  - metatrader
  - code
---

# Pivot Points - MQL4 & MQL5 Implementation

This article provides MQL4 and MQL5 code for calculating pivot points in MetaTrader.

## MQL4 Implementation

### Classic Pivot Points

```mql4
//+------------------------------------------------------------------+
//| Classic Pivot Points                                           |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

#property indicator_chart_window

int OnInit()
{
   IndicatorSetString(INDICATOR_SHORTNAME, "Classic Pivot");
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
   if (rates_total < 2)
      return(0);
   
   // Get previous day's data
   double prevHigh = high[rates_total - 2];
   double prevLow = low[rates_total - 2];
   double prevClose = close[rates_total - 2];
   
   // Calculate pivot point
   double pp = (prevHigh + prevLow + prevClose) / 3.0;
   double range = prevHigh - prevLow;
   
   // Resistance levels
   double r1 = (pp * 2) - prevLow;
   double r2 = pp + range;
   double r3 = pp + range * 2;
   
   // Support levels
   double s1 = (pp * 2) - prevHigh;
   double s2 = pp - range;
   double s3 = pp - range * 2;
   
   // Print values (or use in trading)
   Print("Classic Pivots:");
   Print("R3: ", r3, " R2: ", r2, " R1: ", r1);
   Print("PP: ", pp);
   Print("S1: ", s1, " S2: ", s2, " S3: ", s3);
   
   return(rates_total);
}
```

### Fibonacci Pivot Points

```mql4
//+------------------------------------------------------------------+
//| Fibonacci Pivot Points                                         |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

double FibR3, FibR2, FibR1, FibPP, FibS1, FibS2, FibS3;

int OnInit()
{
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
   if (rates_total < 2)
      return(0);
   
   double prevHigh = high[rates_total - 2];
   double prevLow = low[rates_total - 2];
   double prevClose = close[rates_total - 2];
   
   FibPP = (prevHigh + prevLow + prevClose) / 3.0;
   double range = prevHigh - prevLow;
   
   FibR3 = FibPP + range * 1.000;
   FibR2 = FibPP + range * 0.618;
   FibR1 = FibPP + range * 0.382;
   FibS1 = FibPP - range * 0.382;
   FibS2 = FibPP - range * 0.618;
   FibS3 = FibPP - range * 1.000;
   
   return(rates_total);
}
```

### Camarilla Pivot Points

```mql4
//+------------------------------------------------------------------+
//| Camarilla Pivot Points                                          |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

double CamR4, CamR3, CamR2, CamR1, CamPP, CamS1, CamS2, CamS3, CamS4;

int OnInit()
{
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
   if (rates_total < 2)
      return(0);
   
   double prevHigh = high[rates_total - 2];
   double prevLow = low[rates_total - 2];
   double prevClose = close[rates_total - 2];
   
   CamPP = (prevHigh + prevLow + prevClose) / 3.0;
   double range = prevHigh - prevLow;
   
   CamR4 = prevClose + range * 0.3667;
   CamR3 = prevClose + range * 0.2750;
   CamR2 = prevClose + range * 0.1833;
   CamR1 = prevClose + range * 0.0917;
   CamS1 = prevClose - range * 0.0917;
   CamS2 = prevClose - range * 0.1833;
   CamS3 = prevClose - range * 0.2750;
   CamS4 = prevClose - range * 0.3667;
   
   return(rates_total);
}
```

### DeMark Pivot Points

```mql4
//+------------------------------------------------------------------+
//| DeMark Pivot Points                                            |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

double DeMark;

int OnInit()
{
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
   if (rates_total < 2)
      return(0);
   
   double prevOpen = open[rates_total - 2];
   double prevHigh = high[rates_total - 2];
   double prevLow = low[rates_total - 2];
   double prevClose = close[rates_total - 2];
   
   if (prevClose < prevOpen)
      DeMark = prevHigh + (prevLow * 2) + prevClose;
   else if (prevClose > prevOpen)
      DeMark = (prevHigh * 2) + prevLow + prevClose;
   else
      DeMark = prevHigh + prevLow + (prevClose * 2);
   
   return(rates_total);
}
```

### All-in-One Indicator (MQL4)

```mql4
//+------------------------------------------------------------------+
//| All Pivot Points - MQL4                                         |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

input string PivotType = "Classic";  // Classic, Fibonacci, Camarilla, DeMark, Woodie

double R4, R3, R2, R1, PP, S1, S2, S3, S4, DM;

int OnInit()
{
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
   if (rates_total < 2)
      return(0);
   
   double prevHigh = high[rates_total - 2];
   double prevLow = low[rates_total - 2];
   double prevClose = close[rates_total - 2];
   double range = prevHigh - prevLow;
   
   if (PivotType == "Classic")
   {
      PP = (prevHigh + prevLow + prevClose) / 3.0;
      R3 = PP + range * 2;
      R2 = PP + range;
      R1 = (PP * 2) - prevLow;
      S1 = (PP * 2) - prevHigh;
      S2 = PP - range;
      S3 = PP - range * 2;
   }
   else if (PivotType == "Fibonacci")
   {
      PP = (prevHigh + prevLow + prevClose) / 3.0;
      R3 = PP + range * 1.000;
      R2 = PP + range * 0.618;
      R1 = PP + range * 0.382;
      S1 = PP - range * 0.382;
      S2 = PP - range * 0.618;
      S3 = PP - range * 1.000;
   }
   else if (PivotType == "Camarilla")
   {
      PP = (prevHigh + prevLow + prevClose) / 3.0;
      R4 = prevClose + range * 0.3667;
      R3 = prevClose + range * 0.2750;
      R2 = prevClose + range * 0.1833;
      R1 = prevClose + range * 0.0917;
      S1 = prevClose - range * 0.0917;
      S2 = prevClose - range * 0.1833;
      S3 = prevClose - range * 0.2750;
      S4 = prevClose - range * 0.3667;
   }
   else if (PivotType == "DeMark")
   {
      double prevOpen = open[rates_total - 2];
      if (prevClose < prevOpen)
         DM = prevHigh + (prevLow * 2) + prevClose;
      else if (prevClose > prevOpen)
         DM = (prevHigh * 2) + prevLow + prevClose;
      else
         DM = prevHigh + prevLow + (prevClose * 2);
   }
   else if (PivotType == "Woodie")
   {
      PP = (prevHigh + prevLow + (prevClose * 2)) / 4.0;
      R2 = PP + range;
      R1 = (PP * 2) - prevLow;
      S1 = (PP * 2) - prevHigh;
      S2 = PP - range;
   }
   
   return(rates_total);
}
```

---

## MQL5 Implementation

### Classic Pivot (MQL5)

```mql5
//+------------------------------------------------------------------+
//| Classic Pivot - MQL5                                           |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property indicator_chart_window
#property indicator_plots 0

input string PivotType = "Classic";

double R3_Buffer[], R2_Buffer[], R1_Buffer[], PP_Buffer[];
double S1_Buffer[], S2_Buffer[], S3_Buffer[];

int OnInit()
{
   string short_name = "Pivot " + PivotType;
   IndicatorSetString(INDICATOR_SHORTNAME, short_name);
   
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
   if (rates_total < 2)
      return(0);
   
   ArraySetAsSeries(high, true);
   ArraySetAsSeries(low, true);
   ArraySetAsSeries(close, true);
   ArraySetAsSeries(open, true);
   
   double prevHigh = high[rates_total - 2];
   double prevLow = low[rates_total - 2];
   double prevClose = close[rates_total - 2];
   double range = prevHigh - prevLow;
   
   if (PivotType == "Classic")
   {
      PP_Buffer[rates_total - 1] = (prevHigh + prevLow + prevClose) / 3.0;
      double pp = PP_Buffer[rates_total - 1];
      
      R3_Buffer[rates_total - 1] = pp + range * 2;
      R2_Buffer[rates_total - 1] = pp + range;
      R1_Buffer[rates_total - 1] = (pp * 2) - prevLow;
      S1_Buffer[rates_total - 1] = (pp * 2) - prevHigh;
      S2_Buffer[rates_total - 1] = pp - range;
      S3_Buffer[rates_total - 1] = pp - range * 2;
   }
   
   return(rates_total);
}
```

### All Pivot Types (MQL5)

```mql5
//+------------------------------------------------------------------+
//| All Pivot Points - MQL5                                        |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property indicator_chart_window

input ENUM_TIMEFRAME Timeframe = PERIOD_D1;
input string PivotType = "Classic";  // Classic, Fibonacci, Camarilla, DeMark, Woodie

double R4[], R3[], R2[], R1[], PP[], S1[], S2[], S3[], S4[], DM[];

int OnInit()
{
   string name = "Pivot Points " + PivotType;
   IndicatorSetString(INDICATOR_SHORTNAME, name);
   IndicatorSetInteger(INDICATOR_DIGITS, _Digits);
   
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
   MqlRates rates[];
   ArraySetAsSeries(rates, true);
   
   int copied = CopyRates(_Symbol, Timeframe, 0, 2, rates);
   if (copied < 2)
      return(0);
   
   double prevHigh = rates[1].high;
   double prevLow = rates[1].low;
   double prevClose = rates[1].close;
   double prevOpen = rates[1].open;
   double range = prevHigh - prevLow;
   
   if (PivotType == "Classic")
   {
      PP[rates_total - 1] = (prevHigh + prevLow + prevClose) / 3.0;
      double pp = PP[rates_total - 1];
      
      R3[rates_total - 1] = pp + range * 2;
      R2[rates_total - 1] = pp + range;
      R1[rates_total - 1] = (pp * 2) - prevLow;
      S1[rates_total - 1] = (pp * 2) - prevHigh;
      S2[rates_total - 1] = pp - range;
      S3[rates_total - 1] = pp - range * 2;
   }
   else if (PivotType == "Fibonacci")
   {
      PP[rates_total - 1] = (prevHigh + prevLow + prevClose) / 3.0;
      double pp = PP[rates_total - 1];
      
      R3[rates_total - 1] = pp + range * 1.000;
      R2[rates_total - 1] = pp + range * 0.618;
      R1[rates_total - 1] = pp + range * 0.382;
      S1[rates_total - 1] = pp - range * 0.382;
      S2[rates_total - 1] = pp - range * 0.618;
      S3[rates_total - 1] = pp - range * 1.000;
   }
   else if (PivotType == "Camarilla")
   {
      PP[rates_total - 1] = (prevHigh + prevLow + prevClose) / 3.0;
      
      R4[rates_total - 1] = prevClose + range * 0.3667;
      R3[rates_total - 1] = prevClose + range * 0.2750;
      R2[rates_total - 1] = prevClose + range * 0.1833;
      R1[rates_total - 1] = prevClose + range * 0.0917;
      S1[rates_total - 1] = prevClose - range * 0.0917;
      S2[rates_total - 1] = prevClose - range * 0.1833;
      S3[rates_total - 1] = prevClose - range * 0.2750;
      S4[rates_total - 1] = prevClose - range * 0.3667;
   }
   else if (PivotType == "DeMark")
   {
      if (prevClose < prevOpen)
         DM[rates_total - 1] = prevHigh + (prevLow * 2) + prevClose;
      else if (prevClose > prevOpen)
         DM[rates_total - 1] = (prevHigh * 2) + prevLow + prevClose;
      else
         DM[rates_total - 1] = prevHigh + prevLow + (prevClose * 2);
   }
   else if (PivotType == "Woodie")
   {
      PP[rates_total - 1] = (prevHigh + prevLow + (prevClose * 2)) / 4.0;
      double pp = PP[rates_total - 1];
      
      R2[rates_total - 1] = pp + range;
      R1[rates_total - 1] = (pp * 2) - prevLow;
      S1[rates_total - 1] = (pp * 2) - prevHigh;
      S2[rates_total - 1] = pp - range;
   }
   
   return(rates_total);
}
```

---

## EA Using Pivot Points (MQL5)

```mql5
//+------------------------------------------------------------------+
//| Pivot Point EA - MQL5                                           |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property link      "https://yoursite.com"
#property version   "1.00"
#property strict

input double Lots = 0.1;
input int Slippage = 3;
input ulong EA_Magic = 12345000;

double R1, S1, PP;

int OnInit()
{
   Print("Pivot EA Initialized");
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
}

void OnTick()
{
   if (!IsNewBar())
      return;
   
   CalculatePivots();
   
   double price = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   
   // Buy at support bounce
   if (price <= S1 && price > S1 - SymbolInfoDouble(_Symbol, SYMBOL_POINT) * 10)
   {
      OpenBuy();
   }
   
   // Sell at resistance bounce  
   if (price >= R1 && price < R1 + SymbolInfoDouble(_symbol, SYMBOL_POINT) * 10)
   {
      OpenSell();
   }
}

void CalculatePivots()
{
   MqlRates rates[];
   ArraySetAsSeries(rates, true);
   
   int copied = CopyRates(_Symbol, PERIOD_D1, 0, 2, rates);
   if (copied < 2)
      return;
   
   double prevHigh = rates[1].high;
   double prevLow = rates[1].low;
   double prevClose = rates[1].close;
   
   PP = (prevHigh + prevLow + prevClose) / 3.0;
   double range = prevHigh - prevLow;
   
   R1 = (PP * 2) - prevLow;
   S1 = (PP * 2) - prevHigh;
}

bool IsNewBar()
{
   static datetime lastBar = 0;
   datetime currentBar = (datetime)SeriesInfoInteger(_Symbol, SERIES_LASTBAR_DATE);
   
   if (lastBar != currentBar)
   {
      lastBar = currentBar;
      return true;
   }
   return false;
}

void OpenBuy()
{
   MqlTradeRequest request = {};
   MqlTradeResult result = {};
   
   request.action = TRADE_ACTION_DEAL;
   request.symbol = _Symbol;
   request.volume = Lots;
   request.type = ORDER_TYPE_BUY;
   request.price = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   request.deviation = Slippage;
   request.magic = EA_Magic;
   
   bool sent = OrderSend(request, result);
   
   if (sent && result.retcode == TRADE_RETCODE_DONE)
      Print("Buy opened at ", result.price);
}

void OpenSell()
{
   MqlTradeRequest request = {};
   MqlTradeResult result = {};
   
   request.action = TRADE_ACTION_DEAL;
   request.symbol = _Symbol;
   request.volume = Lots;
   request.type = ORDER_TYPE_SELL;
   request.price = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   request.deviation = Slippage;
   request.magic = EA_Magic;
   
   bool sent = OrderSend(request, result);
   
   if (sent && result.retcode == TRADE_RETCODE_DONE)
      Print("Sell opened at ", result.price);
}
```

---

## Conclusion

Key implementations:

**MQL4:**
- Simple indicator structure
- Direct price access
- Easy to modify
- Single calculation per bar

**MQL5:**
- Uses MqlRates for OHLC
- Supports multiple timeframes
- Better error handling
- Trade functions available

Both support:
- Classic pivot calculation
- Fibonacci ratios
- Camarilla method
- DeMark formula
- Woodie formula
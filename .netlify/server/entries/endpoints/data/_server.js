import { j as json } from "../../../chunks/index.js";
import Alpaca from "@alpacahq/alpaca-trade-api";
import yahooFinance from "yahoo-finance2";
import chowdown from "chowdown";
const K1Json = [
  {
    assetName: "Alliance Resource Partners LP",
    ticker: "ARLP"
  },
  {
    assetName: "AllianceBernstein Holding L.P.",
    ticker: "AB"
  },
  {
    assetName: "Belpointe PREP, LLC",
    ticker: "OZ"
  },
  {
    assetName: "Bitwise 10 Crypto Index Fund",
    ticker: "BITW"
  },
  {
    assetName: "Black Stone Minerals, L.P. (Common Units)",
    ticker: "BSM"
  },
  {
    assetName: "BP Midstream Partners LP",
    ticker: ""
  },
  {
    assetName: "Brookfield Business Partners, L.P.",
    ticker: "BBU-UN.TO"
  },
  {
    assetName: "Brookfield Infrastructure Partners, L.P.",
    ticker: "BIP"
  },
  {
    assetName: "Brookfield Infrastructure Partners, L.P. Series 13 Preferred",
    ticker: "BIP"
  },
  {
    assetName: "Brookfield Infrastructure Partners, L.P. Series 14 Preferred",
    ticker: "BIP"
  },
  {
    assetName: "Brookfield Property Partners, L.P.",
    ticker: "BPYPP"
  },
  {
    assetName: "Brookfield Property Partners, L.P. - Series 1 Preferred",
    ticker: "BPYPP"
  },
  {
    assetName: "Brookfield Property Partners, L.P. - Series 2 Preferred",
    ticker: "BPYPP"
  },
  {
    assetName: "Brookfield Property Partners, L.P. - Series 3 Preferred",
    ticker: "BPYPP"
  },
  {
    assetName: "Brookfield Property Preferred, L.P.",
    ticker: "BPYPM"
  },
  {
    assetName: "Brookfield Renewable Partners, L.P.",
    ticker: "BEP"
  },
  {
    assetName: "Brookfield Renewable Partners, L.P. Series 17 Preferred",
    ticker: "BEP"
  },
  {
    assetName: "Calumet Specialty Products Partners, L.P.",
    ticker: "CLMT"
  },
  {
    assetName: "Cedar Fair LP",
    ticker: "FUN"
  },
  {
    assetName: "Cheniere Energy Partners, LP",
    ticker: "CQP"
  },
  {
    assetName: "Chesapeake Granite Wash Trust",
    ticker: "CHKR"
  },
  {
    assetName: "COFINA Class 2 Trust, 2047 Units",
    ticker: ""
  },
  {
    assetName: "COFINA Class 2 Trust, 2054 Units",
    ticker: ""
  },
  {
    assetName: "Compass Diversified Holdings",
    ticker: "CODI"
  },
  {
    assetName: "Compass Diversified Holdings (7.25% Series A Preferred)",
    ticker: ""
  },
  {
    assetName: "Compass Diversified Holdings (7.875% Series B Preferred)",
    ticker: ""
  },
  {
    assetName: "Compass Diversified Holdings (7.875% Series C Preferred)",
    ticker: ""
  },
  {
    assetName: "ConvexityShares 1.5x SPIKES Futures ETF",
    ticker: ""
  },
  {
    assetName: "ConvexityShares 1x SPIKES Futures ETF",
    ticker: ""
  },
  {
    assetName: "Crestwood Equity Partners LP",
    ticker: ""
  },
  {
    assetName: "Crestwood Equity Partners LP (9.25% Preferred Units)",
    ticker: ""
  },
  {
    assetName: "CSI Compressco LP",
    ticker: ""
  },
  {
    assetName: "CVR Partners, LP",
    ticker: "UAN"
  },
  {
    assetName: "DCP Midstream, LP",
    ticker: "ET"
  },
  {
    assetName: "DCP Midstream, LP - Series A Preferred Units"
  },
  {
    assetName: "DCP Midstream, LP - Series B Preferred Units"
  },
  {
    assetName: "DCP Midstream, LP - Series C Preferred Units"
  },
  {
    assetName: "Delek Logistics Partners, LP",
    ticker: "DKL"
  },
  {
    assetName: "Dorchester Minerals, L.P.",
    ticker: "DMLP"
  },
  {
    assetName: "Dynamic Short Short-Term Volatility Futures ETF",
    ticker: "WEIX"
  },
  {
    assetName: "ECA Marcellus Trust I",
    ticker: "ECTM"
  },
  {
    assetName: "Empire State Realty OP, L.P. Private Preferred (2014)",
    ticker: "ESBA"
  },
  {
    assetName: "Empire State Realty OP, L.P. Private Preferred (2019)",
    ticker: "ESBA"
  },
  {
    assetName: "Empire State Realty OP, L.P. Series 60",
    ticker: "ESBA"
  },
  {
    assetName: "Empire State Realty OP, L.P. Series 250",
    ticker: "ESBA"
  },
  {
    assetName: "Empire State Realty OP, L.P. Series ES",
    ticker: "ESBA"
  },
  {
    assetName: "Empire State Realty OP, L.P. Series PR",
    ticker: "ESBA"
  },
  {
    assetName: "Enable Midstream Partners, LP",
    ticker: "ET"
  },
  {
    assetName: "Energy 11, L.P.",
    ticker: "EPD"
  },
  {
    assetName: "Energy Resources 12, L.P.",
    ticker: "EPD"
  },
  {
    assetName: "Energy Transfer LP",
    ticker: "ET"
  },
  {
    assetName: "Energy Transfer LP Series A",
    ticker: ""
  },
  {
    assetName: "Energy Transfer LP Series B",
    ticker: ""
  },
  {
    assetName: "Energy Transfer LP Series C",
    ticker: ""
  },
  {
    assetName: "Energy Transfer LP Series D",
    ticker: ""
  },
  {
    assetName: "Energy Transfer LP Series E",
    ticker: ""
  },
  {
    assetName: "Energy Transfer LP Series F",
    ticker: ""
  },
  {
    assetName: "Energy Transfer LP Series G",
    ticker: ""
  },
  {
    assetName: "Energy Transfer LP Series H",
    ticker: ""
  },
  {
    assetName: "Energy Transfer LP Series I",
    ticker: ""
  },
  {
    assetName: "Energy Transfer Operating LP Series A",
    ticker: ""
  },
  {
    assetName: "Energy Transfer Operating LP Series B",
    ticker: ""
  },
  {
    assetName: "Energy Transfer Operating LP Series C",
    ticker: ""
  },
  {
    assetName: "Energy Transfer Operating LP Series D",
    ticker: ""
  },
  {
    assetName: "Energy Transfer Operating LP Series E",
    ticker: ""
  },
  {
    assetName: "Energy Transfer Operating LP Series F",
    ticker: ""
  },
  {
    assetName: "Energy Transfer Operating LP Series G",
    ticker: ""
  },
  {
    assetName: "EnLink Midstream Partners, LP (Series C Preferred)",
    ticker: ""
  },
  {
    assetName: "Enterprise Products Partners L.P.",
    ticker: "EPD"
  },
  {
    assetName: "Evolve Transition Infrastructure LP",
    ticker: ""
  },
  {
    assetName: "Ferrellgas Partners, L.P.",
    ticker: "FGPR"
  },
  {
    assetName: "Ferrellgas Partners, LP - Class B Units",
    ticker: "FGPR"
  },
  {
    assetName: "Fortress Transportation & Infrastructure Investors",
    ticker: ""
  },
  {
    assetName: "Fortress Transportation & Infrastructure Investors Series A",
    ticker: ""
  },
  {
    assetName: "Fortress Transportation & Infrastructure Investors Series B",
    ticker: ""
  },
  {
    assetName: "Fortress Transportation & Infrastructure Investors Series C",
    ticker: ""
  },
  {
    assetName: "Genesis Energy LP",
    ticker: "GEL"
  },
  {
    assetName: "Global Indemnity Group LLC",
    ticker: "GBLI"
  },
  {
    assetName: "Global Partners",
    ticker: "GLP"
  },
  {
    assetName: "Global Partners LP Series A Preferred",
    ticker: ""
  },
  {
    assetName: "Global Partners LP Series B Preferred",
    ticker: ""
  },
  {
    assetName: "Green Plains Partners LP",
    ticker: "GPRE"
  },
  {
    assetName: "Greystone Housing Impact Investors LP (fka America First)",
    ticker: "GHI"
  },
  {
    assetName: "Hashdex Bitcoin Futures ETF",
    ticker: "DEFI"
  },
  {
    assetName: "Hawaiian Macadamia Nut Orchards LP (fka Royal Hawaiian Orchards LP)",
    ticker: ""
  },
  {
    assetName: "Holly Energy Partners, L.P.",
    ticker: "EPD"
  },
  {
    assetName: "Icahn Enterprises L.P.",
    ticker: "IEP"
  },
  {
    assetName: "Invesco DB Agriculture Fund",
    ticker: "DBA"
  },
  {
    assetName: "Invesco DB Base Metals Fund",
    ticker: "DBB"
  },
  {
    assetName: "Invesco DB Commodity Index Tracking Fund",
    ticker: "DBC"
  },
  {
    assetName: "Invesco DB Energy Fund",
    ticker: "DBE"
  },
  {
    assetName: "Invesco DB G10 Currency Harvest Fund",
    ticker: "DBV"
  },
  {
    assetName: "Invesco DB Gold Fund",
    ticker: "DGL"
  },
  {
    assetName: "Invesco DB Oil Fund",
    ticker: "DBO"
  },
  {
    assetName: "Invesco DB Precious Metals Fund",
    ticker: "^DBP-NV"
  },
  {
    assetName: "Invesco DB Silver Fund",
    ticker: ""
  },
  {
    assetName: "Invesco DB US Dollar Index Bearish Fund",
    ticker: "UDN"
  },
  {
    assetName: "Invesco DB US Dollar Index Bullish Fund",
    ticker: "UUP"
  },
  {
    assetName: "iShares S&P GSCI Commodity-Indexed Trust",
    ticker: "GSG"
  },
  {
    assetName: "Lazard Ltd",
    ticker: ""
  },
  {
    assetName: "Mach Natural Resources LP",
    ticker: "MNR"
  },
  {
    assetName: "Macquarie Infrastructure Holdings, LLC",
    ticker: "VRT"
  },
  {
    assetName: "Magellan Midstream Partners, L.P.",
    ticker: "EPD"
  },
  {
    assetName: "Martin Midstream Partners L.P.",
    ticker: "MMLP"
  },
  {
    assetName: "MDB Capital Holdings, LLC",
    ticker: "MDBH"
  },
  {
    assetName: "MPLX LP",
    ticker: "MPLX"
  },
  {
    assetName: "MPLX LP Series B Preferred",
    ticker: ""
  },
  {
    assetName: "MYT Holding LLC",
    ticker: ""
  },
  {
    assetName: "MYT Holding LLC Preferred Units",
    ticker: ""
  },
  {
    assetName: "Natural Resource Partners L.P.",
    ticker: "NRP"
  },
  {
    assetName: "New York REIT Liquidating LLC",
    ticker: ""
  },
  {
    assetName: "NGL Energy Partners L.P.",
    ticker: ""
  },
  {
    assetName: "NGL Energy Partners L.P. - Class B Preferred",
    ticker: ""
  },
  {
    assetName: "NGL Energy Partners LP - Class C Preferred",
    ticker: ""
  },
  {
    assetName: "NuStar Energy, LP (NS)",
    ticker: "NS"
  },
  {
    assetName: "NuStar Energy, LP Series A Preferred Units",
    ticker: "NS"
  },
  {
    assetName: "NuStar Energy, LP Series B Preferred Units",
    ticker: "NS"
  },
  {
    assetName: "NuStar Energy, LP Series C Preferred Units",
    ticker: "NS"
  },
  {
    assetName: "Oaktree Capital Group, LLC Series A Preferred Units",
    ticker: "OAK-PB"
  },
  {
    assetName: "Oaktree Capital Group, LLC Series B Preferred Units",
    ticker: "OAK-PB"
  },
  {
    assetName: "Oasis Midstream Partners LP"
  },
  {
    assetName: "Plains All American Pipeline, L.P.",
    ticker: "PAA"
  },
  {
    assetName: "Plains All American Pipeline, L.P. Series B",
    ticker: "PAA"
  },
  {
    assetName: "Volatility Shares -1x Short VIX Futures ETF",
    ticker: "SVIX"
  },
  {
    assetName: "ProShares Short Euro (EUFX)",
    ticker: "EUFX"
  },
  {
    assetName: "ProShares Short VIX Short-Term Futures ETF (SVXY)",
    ticker: "SVXY"
  },
  {
    assetName: "ProShares Ultra Bloomberg Crude Oil (UCO)",
    ticker: "UCO"
  },
  {
    assetName: "ProShares Ultra Bloomberg Natural Gas (BOIL)",
    ticker: "BOIL"
  },
  {
    assetName: "ProShares Ultra Euro (ULE)",
    ticker: "ULE"
  },
  {
    assetName: "ProShares Ultra Gold (UGL)",
    ticker: "UGL"
  },
  {
    assetName: "ProShares Ultra Silver (AGQ)",
    ticker: "AGQ"
  },
  {
    assetName: "ProShares Ultra VIX Short-Term Futures ETF (UVXY)",
    ticker: "UVXY"
  },
  {
    assetName: "ProShares Ultra Yen (YCL)",
    ticker: "YCL"
  },
  {
    assetName: "ProShares UltraShort Australian Dollar (CROC)",
    ticker: "CROC"
  },
  {
    assetName: "ProShares UltraShort Bloomberg Crude Oil (SCO)",
    ticker: "SCO"
  },
  {
    assetName: "ProShares UltraShort Bloomberg Natural Gas (KOLD)",
    ticker: "KOLD"
  },
  {
    assetName: "ProShares UltraShort Euro (EUO)",
    ticker: "EUO"
  },
  {
    assetName: "ProShares UltraShort Gold (GLL)",
    ticker: "GLL"
  },
  {
    assetName: "ProShares UltraShort Silver (ZSL)",
    ticker: "ZSL"
  },
  {
    assetName: "ProShares UltraShort Yen (YCS)",
    ticker: "YCS"
  },
  {
    assetName: "ProShares VIX Mid-Term Futures ETF (VIXM)",
    ticker: "VIXM"
  },
  {
    assetName: "ProShares VIX Short-Term Futures ETF (VIXY)",
    ticker: "VIXY"
  },
  {
    assetName: "Restaurant Brands International LP",
    ticker: ""
  },
  {
    assetName: "Riverstone Energy Limited",
    ticker: "RSE.L"
  },
  {
    assetName: "SandRidge Mississippian Trust I",
    ticker: "SDTTU"
  },
  {
    assetName: "SandRidge Mississippian Trust II",
    ticker: ""
  },
  {
    assetName: "SandRidge Permian Trust",
    ticker: ""
  },
  {
    assetName: "Suburban Propane Partners, L.P.",
    ticker: "SPH"
  },
  {
    assetName: "Sunoco LP",
    ticker: "SUN"
  },
  {
    assetName: "TC PipeLines, LP",
    ticker: "ET"
  },
  {
    assetName: "Teucrium Agricultural Fund",
    ticker: "^TTAGS"
  },
  {
    assetName: "Teucrium Corn Fund",
    ticker: "CORN"
  },
  {
    assetName: "Teucrium Soybean Fund",
    ticker: "SOYB"
  },
  {
    assetName: "Teucrium Sugar Fund",
    ticker: "^CANE-NV"
  },
  {
    assetName: "Teucrium Wheat Fund",
    ticker: "WEAT"
  },
  {
    assetName: "TXO Partners, L.P.",
    ticker: "TXO"
  },
  {
    assetName: "United States 12 Month Natural Gas Fund, LP (UNL)",
    ticker: "UNL"
  },
  {
    assetName: "United States 12 Month Oil Fund, LP (USL)",
    ticker: "USL"
  },
  {
    assetName: "United States Brent Oil Fund, LP (BNO)",
    ticker: "BNO"
  },
  {
    assetName: "United States Commodity Index Fund (USCI)",
    ticker: "USCI"
  },
  {
    assetName: "United States Copper Index Fund (CPER)",
    ticker: "CPER"
  },
  {
    assetName: "United States Gasoline Fund, LP (UGA)",
    ticker: "UGA"
  },
  {
    assetName: "United States Natural Gas Fund, LP (UNG)",
    ticker: "UNG"
  },
  {
    assetName: "United States Oil Fund, LP (USO)",
    ticker: "USO"
  },
  {
    assetName: "US Equity Cumulative Dividends Fund Series 2027",
    ticker: ""
  },
  {
    assetName: "US Equity Ex Dividend Fund Series 2027",
    ticker: ""
  },
  {
    assetName: "USA Compression Partners, LP",
    ticker: "USAC"
  },
  {
    assetName: "USD Partners LP",
    ticker: "USDP"
  },
  {
    assetName: "Vantage Drilling International",
    ticker: "VTDRF"
  },
  {
    assetName: "Volatility Shares -1x Short VIX Futures ETF",
    ticker: "VIXY"
  },
  {
    assetName: "Volatility Shares 2x Long VIX Futures ETF",
    ticker: "UVIX"
  },
  {
    assetName: "Western Midstream Partners LP",
    ticker: "WES"
  },
  {
    assetName: "Westlake Chemical Partners, LP",
    ticker: "WLKP"
  }
];
const AGG = {
  ticker: "AGG",
  tradable: true,
  inceptionDate: "2003-09-22T00:00:00.000Z",
  correlatedTickers: [
    "BND",
    "SCHZ",
    "EAGG",
    "SPAB",
    "BKAG",
    "AVIG",
    "IUSB",
    "BIV",
    "FLCB",
    "BBAG",
    "LQD",
    "BLV",
    "FLOT",
    "GBF",
    "GVI",
    "IEF",
    "TLT",
    "BSV",
    "MINT",
    "GSY"
  ],
  correlationValues: [
    0.9962,
    0.9937,
    0.9902,
    0.9865,
    0.986,
    0.9854,
    0.9828,
    0.9821,
    0.9821,
    0.9812,
    0.4452,
    0.2946,
    0.2634,
    0.2583,
    0.2072,
    0.1737,
    0.1609,
    0.1561,
    0.1154,
    0.0134
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const QQQ = {
  ticker: "QQQ",
  tradable: true,
  inceptionDate: "1999-03-10T00:00:00.000Z",
  correlatedTickers: [
    "QLD",
    "TQQQ",
    "QQQM",
    "MGK",
    "ONEQ",
    "SCHG",
    "VUG",
    "IWY",
    "IWF",
    "VONG",
    "SPY",
    "IVV",
    "DIA",
    "IWM",
    "NAPR",
    "NJUL",
    "NOCT",
    "NJAN",
    "QCLR",
    "QRMI"
  ],
  correlationValues: [
    0.9997,
    0.9997,
    0.9996,
    0.9933,
    0.9924,
    0.9916,
    0.9913,
    0.9908,
    0.9884,
    0.9878,
    0.9567,
    0.9565,
    0.9544,
    0.8754,
    0.8443,
    0.8406,
    0.8334,
    0.8257,
    0.7145,
    0.6978
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const PSQ = {
  ticker: "PSQ",
  tradable: true,
  inceptionDate: "2006-06-19T00:00:00.000Z",
  correlatedTickers: [
    "SQQQ",
    "QID",
    "TECS",
    "BERZ",
    "SPXS",
    "SDS",
    "SPDN",
    "SPXU",
    "SH",
    "FNGD",
    "SSO",
    "SPXL",
    "TNA",
    "NAPR",
    "NJUL",
    "NOCT",
    "NJAN",
    "QCLR",
    "QRMI"
  ],
  correlationValues: [
    0.9988,
    0.9987,
    0.9708,
    0.9704,
    0.942,
    0.9418,
    0.9415,
    0.9414,
    0.9398,
    0.9368,
    0.9564,
    0.9564,
    0.8715,
    0.8443,
    0.8406,
    0.8334,
    0.8257,
    0.7145,
    0.6978
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DOG = {
  ticker: "DOG",
  tradable: true,
  inceptionDate: "2006-06-19T00:00:00.000Z",
  correlatedTickers: [
    "SDOW",
    "DXD",
    "SH",
    "SDS",
    "SPXS",
    "SPXU",
    "SPDN",
    "FAZ",
    "TWM",
    "RWM",
    "SSO",
    "SPXL",
    "TNA",
    "QLD"
  ],
  correlationValues: [
    0.9992,
    0.9955,
    0.9271,
    0.9269,
    0.9268,
    0.9263,
    0.9262,
    0.8781,
    0.8525,
    0.8514,
    0.9564,
    0.9564,
    0.8715,
    0.83
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SH = {
  ticker: "SH",
  tradable: true,
  inceptionDate: "2006-06-19T00:00:00.000Z",
  correlatedTickers: [
    "SDS",
    "SPXS",
    "SPXU",
    "SPDN",
    "PSQ",
    "QID",
    "SQQQ",
    "HIBS",
    "DOG",
    "SDOW",
    "SPUU",
    "BSEP",
    "POCT",
    "PJUL",
    "PAUG",
    "PSEP",
    "PAPR",
    "UAUG",
    "ACIO",
    "UAPR"
  ],
  correlationValues: [
    0.9986,
    0.9986,
    0.9982,
    0.9979,
    0.9398,
    0.9397,
    0.9396,
    0.9277,
    0.9271,
    0.9259,
    0.9549,
    0.9425,
    0.9339,
    0.933,
    0.9322,
    0.9295,
    0.9205,
    0.9036,
    0.9004,
    0.8182
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const RWM = {
  ticker: "RWM",
  tradable: true,
  inceptionDate: "2007-01-23T00:00:00.000Z",
  correlatedTickers: [
    "TZA",
    "TWM",
    "SRTY",
    "HIBS",
    "HDGE",
    "SDS",
    "SH",
    "SPXU",
    "SPXS",
    "SPDN",
    "SSO",
    "SPXL",
    "IWML",
    "KJAN",
    "KAPR",
    "QLD",
    "KJUL",
    "KOCT"
  ],
  correlationValues: [
    0.9993,
    0.9992,
    0.9991,
    0.8969,
    0.8863,
    0.8836,
    0.8832,
    0.8831,
    0.8825,
    0.881,
    0.9564,
    0.9564,
    0.8664,
    0.8606,
    0.8466,
    0.83,
    0.8173,
    0.8123
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TBF = {
  ticker: "TBF",
  tradable: true,
  inceptionDate: "2009-08-18T00:00:00.000Z",
  correlatedTickers: [
    "TBT",
    "TMV",
    "TTT",
    "TBX",
    "PST",
    "PFIX",
    "DBMF",
    "KMLM",
    "SJB",
    "GLL",
    "UJB",
    "TYD",
    "UST",
    "BBLB"
  ],
  correlationValues: [
    0.9985,
    0.998,
    0.9979,
    0.9025,
    0.9014,
    0.8207,
    0.6451,
    0.5359,
    0.4688,
    0.4271,
    0.7623,
    0.1654,
    0.1565,
    0.054
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TECL = {
  ticker: "TECL",
  tradable: true,
  inceptionDate: "2008-12-17T00:00:00.000Z",
  correlatedTickers: [
    "XLK",
    "VGT",
    "FTEC",
    "IXN",
    "ROM",
    "IYW",
    "IGM",
    "TQQQ",
    "QQQ",
    "QLD",
    "SSO",
    "SPXL",
    "UPRO",
    "FAS",
    "TNA",
    "SOXL",
    "ERX"
  ],
  correlationValues: [
    0.9998,
    0.9968,
    0.9967,
    0.9944,
    0.9903,
    0.986,
    0.9748,
    0.9727,
    0.9726,
    0.9725,
    0.9564,
    0.9564,
    0.9563,
    0.8902,
    0.8715,
    0.7171,
    0.5785
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TQQQ = {
  ticker: "TQQQ",
  tradable: true,
  inceptionDate: "2010-02-09T00:00:00.000Z",
  correlatedTickers: [
    "QLD",
    "QQQ",
    "QQQM",
    "MGK",
    "ONEQ",
    "SCHG",
    "VUG",
    "IWY",
    "IWF",
    "VONG",
    "SSO",
    "SPXL",
    "TNA",
    "NAPR",
    "NJUL",
    "NOCT",
    "NJAN",
    "QCLR",
    "QRMI"
  ],
  correlationValues: [
    0.9997,
    0.9997,
    0.9995,
    0.9934,
    0.9924,
    0.9918,
    0.9916,
    0.9908,
    0.9887,
    0.9881,
    0.9564,
    0.9564,
    0.8715,
    0.8443,
    0.8406,
    0.8334,
    0.8257,
    0.7145,
    0.6978
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DRN = {
  ticker: "DRN",
  tradable: true,
  inceptionDate: "2009-07-16T00:00:00.000Z",
  correlatedTickers: [
    "XLRE",
    "ICF",
    "IYR",
    "FREL",
    "VNQ",
    "DFAR",
    "SCHH",
    "RWR",
    "USRT",
    "BBRE",
    "SSO",
    "SPXL",
    "TNA",
    "QLD",
    "URE",
    "SOXL"
  ],
  correlationValues: [
    0.9979,
    0.9954,
    0.9945,
    0.9936,
    0.9935,
    0.993,
    0.993,
    0.9806,
    0.9801,
    0.9793,
    0.9564,
    0.9564,
    0.8715,
    0.83,
    0.7957,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const URTY = {
  ticker: "URTY",
  tradable: true,
  inceptionDate: "2010-02-09T00:00:00.000Z",
  correlatedTickers: [
    "TNA",
    "VTWO",
    "IWM",
    "UWM",
    "SCHA",
    "ESML",
    "BBSC",
    "PRFZ",
    "NUSC",
    "SMMD",
    "SSO",
    "SPXL",
    "IWML",
    "KJAN",
    "KAPR",
    "QLD",
    "KJUL",
    "KOCT"
  ],
  correlationValues: [
    0.9995,
    0.9993,
    0.9992,
    0.9992,
    0.9957,
    0.9934,
    0.9924,
    0.9898,
    0.9894,
    0.9892,
    0.9564,
    0.9564,
    0.8664,
    0.8606,
    0.8466,
    0.83,
    0.8173,
    0.8123
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SOXL = {
  ticker: "SOXL",
  tradable: true,
  inceptionDate: "2010-03-11T00:00:00.000Z",
  correlatedTickers: [
    "SOXX",
    "SOXQ",
    "SMH",
    "PSI",
    "FTXL",
    "USD",
    "XSD",
    "QTUM",
    "QTEC",
    "RSPT",
    "SSO",
    "SPXL",
    "FAS",
    "TNA",
    "QLD",
    "TECL",
    "ERX"
  ],
  correlationValues: [
    0.9991,
    0.9969,
    0.991,
    0.9801,
    0.9768,
    0.974,
    0.9666,
    0.9482,
    0.939,
    0.937,
    0.9564,
    0.9564,
    0.8902,
    0.8715,
    0.83,
    0.8229,
    0.5785
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const EDC = {
  ticker: "EDC",
  tradable: true,
  inceptionDate: "2008-12-17T00:00:00.000Z",
  correlatedTickers: [
    "EEM",
    "IEMG",
    "ESGE",
    "DFAE",
    "VWO",
    "SPEM",
    "XSOE",
    "SCHE",
    "AVEM",
    "GEM",
    "SSO",
    "QLD",
    "EET",
    "EJAN",
    "EJUL"
  ],
  correlationValues: [
    0.9975,
    0.9965,
    0.9925,
    0.9912,
    0.9907,
    0.9902,
    0.9902,
    0.9895,
    0.9865,
    0.9862,
    0.9564,
    0.83,
    0.6126,
    0.6068,
    0.5937
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const XLK = {
  ticker: "XLK",
  tradable: true,
  inceptionDate: "1998-12-16T00:00:00.000Z",
  correlatedTickers: [
    "TECL",
    "FTEC",
    "VGT",
    "IXN",
    "ROM",
    "IYW",
    "IGM",
    "QQQ",
    "TQQQ",
    "QLD",
    "XLI",
    "XLF",
    "XLB",
    "XLV",
    "XLP",
    "XLY",
    "XLU",
    "XBI",
    "XLE"
  ],
  correlationValues: [
    0.9998,
    0.9968,
    0.9968,
    0.9948,
    0.9903,
    0.9863,
    0.9749,
    0.9732,
    0.9732,
    0.973,
    0.8964,
    0.8915,
    0.8819,
    0.7962,
    0.7838,
    0.7742,
    0.6933,
    0.6096,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const XLRE = {
  ticker: "XLRE",
  tradable: true,
  inceptionDate: "2015-10-07T00:00:00.000Z",
  correlatedTickers: [
    "DRN",
    "ICF",
    "IYR",
    "FREL",
    "VNQ",
    "DFAR",
    "SCHH",
    "RWR",
    "USRT",
    "BBRE",
    "XLI",
    "XLF",
    "XLK",
    "XLV",
    "URE",
    "XLP",
    "XLY",
    "XLU",
    "XLE"
  ],
  correlationValues: [
    0.9979,
    0.9963,
    0.9955,
    0.9946,
    0.9944,
    0.9943,
    0.9941,
    0.982,
    0.9818,
    0.9805,
    0.8964,
    0.8915,
    0.8242,
    0.7962,
    0.7957,
    0.7838,
    0.7742,
    0.6933,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const IWM = {
  ticker: "IWM",
  tradable: true,
  inceptionDate: "2000-05-22T00:00:00.000Z",
  correlatedTickers: [
    "TNA",
    "URTY",
    "VTWO",
    "UWM",
    "SCHA",
    "ESML",
    "BBSC",
    "SMMD",
    "NUSC",
    "PRFZ",
    "SPY",
    "IVV",
    "DIA",
    "MDY",
    "IWML",
    "KJAN",
    "KAPR",
    "QQQ",
    "KJUL",
    "KOCT"
  ],
  correlationValues: [
    0.9994,
    0.9992,
    0.9992,
    0.999,
    0.9962,
    0.9938,
    0.9921,
    0.9898,
    0.9896,
    0.9896,
    0.9567,
    0.9565,
    0.9544,
    0.8996,
    0.8664,
    0.8606,
    0.8466,
    0.8296,
    0.8173,
    0.8123
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SOXX = {
  ticker: "SOXX",
  tradable: true,
  inceptionDate: "2001-07-10T00:00:00.000Z",
  correlatedTickers: [
    "SOXL",
    "SOXQ",
    "SMH",
    "PSI",
    "FTXL",
    "USD",
    "XSD",
    "QTUM",
    "QTEC",
    "RSPT",
    "XLI",
    "XLF",
    "XLK",
    "XLV",
    "IYW",
    "XLY",
    "IBB",
    "ITB",
    "XLU",
    "XLE"
  ],
  correlationValues: [
    0.9991,
    0.997,
    0.9913,
    0.98,
    0.9776,
    0.9747,
    0.9675,
    0.9497,
    0.9404,
    0.9383,
    0.8964,
    0.8915,
    0.8242,
    0.7962,
    0.795,
    0.7742,
    0.7269,
    0.7179,
    0.6933,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const EEM = {
  ticker: "EEM",
  tradable: true,
  inceptionDate: "2003-04-07T00:00:00.000Z",
  correlatedTickers: [
    "IEMG",
    "EDC",
    "ESGE",
    "DFAE",
    "VWO",
    "XSOE",
    "SPEM",
    "SCHE",
    "GEM",
    "AVEM",
    "VEA",
    "EFA",
    "VGK",
    "EZU",
    "FEZ",
    "EET",
    "EJAN",
    "EJUL"
  ],
  correlationValues: [
    0.9976,
    0.9975,
    0.9935,
    0.9925,
    0.9919,
    0.9916,
    0.991,
    0.9904,
    0.987,
    0.9867,
    0.846,
    0.8332,
    0.8264,
    0.8121,
    0.8112,
    0.6126,
    0.6068,
    0.5937
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TECS = {
  ticker: "TECS",
  tradable: true,
  inceptionDate: "2008-12-17T00:00:00.000Z",
  correlatedTickers: [
    "SQQQ",
    "QID",
    "PSQ",
    "BERZ",
    "SPXS",
    "SPDN",
    "SDS",
    "SPXU",
    "SH",
    "SOXS",
    "SSO",
    "SPXL",
    "UPRO",
    "FAS",
    "TNA",
    "QLD",
    "SOXL",
    "ERX"
  ],
  correlationValues: [
    0.9721,
    0.9718,
    0.9708,
    0.9449,
    0.9234,
    0.9231,
    0.9229,
    0.9221,
    0.9218,
    0.9068,
    0.9564,
    0.9564,
    0.9563,
    0.8902,
    0.8715,
    0.83,
    0.7171,
    0.5785
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SQQQ = {
  ticker: "SQQQ",
  tradable: true,
  inceptionDate: "2010-02-09T00:00:00.000Z",
  correlatedTickers: [
    "QID",
    "PSQ",
    "BERZ",
    "TECS",
    "SPXS",
    "SDS",
    "SPXU",
    "SPDN",
    "SH",
    "FNGD",
    "SSO",
    "SPXL",
    "TNA",
    "NAPR",
    "NJUL",
    "NOCT",
    "NJAN",
    "QCLR",
    "QRMI"
  ],
  correlationValues: [
    0.9997,
    0.9988,
    0.9721,
    0.9721,
    0.9424,
    0.942,
    0.9417,
    0.9415,
    0.9396,
    0.9374,
    0.9564,
    0.9564,
    0.8715,
    0.8443,
    0.8406,
    0.8334,
    0.8257,
    0.7145,
    0.6978
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DRV = {
  ticker: "DRV",
  tradable: true,
  inceptionDate: "2009-07-16T00:00:00.000Z",
  correlatedTickers: [
    "SRS",
    "RWM",
    "TZA",
    "SRTY",
    "TWM",
    "SPXU",
    "SPXS",
    "SDS",
    "SPDN",
    "SH",
    "SSO",
    "SPXL",
    "TNA",
    "QLD",
    "TQQQ",
    "URE",
    "SOXL"
  ],
  correlationValues: [
    0.9961,
    0.7662,
    0.7646,
    0.7641,
    0.7632,
    0.7631,
    0.7617,
    0.7609,
    0.7588,
    0.7568,
    0.9564,
    0.9564,
    0.8715,
    0.83,
    0.8288,
    0.7957,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SRTY = {
  ticker: "SRTY",
  tradable: true,
  inceptionDate: "2010-02-09T00:00:00.000Z",
  correlatedTickers: [
    "TZA",
    "TWM",
    "RWM",
    "HIBS",
    "HDGE",
    "SDS",
    "SPXU",
    "SH",
    "SPXS",
    "SPDN",
    "SSO",
    "SPXL",
    "IWML",
    "KJAN",
    "KAPR",
    "QLD",
    "KJUL",
    "KOCT"
  ],
  correlationValues: [
    0.9995,
    0.9993,
    0.9991,
    0.8983,
    0.8866,
    0.8845,
    0.884,
    0.8839,
    0.8834,
    0.882,
    0.9564,
    0.9564,
    0.8664,
    0.8606,
    0.8466,
    0.83,
    0.8173,
    0.8123
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TMV = {
  ticker: "TMV",
  tradable: true,
  inceptionDate: "2009-04-16T00:00:00.000Z",
  correlatedTickers: [
    "TBT",
    "TTT",
    "TBF",
    "TBX",
    "PST",
    "PFIX",
    "DBMF",
    "KMLM",
    "SJB",
    "GLL",
    "UJB",
    "TYD",
    "UST",
    "BBLB"
  ],
  correlationValues: [
    0.9987,
    0.9981,
    0.998,
    0.9012,
    0.9006,
    0.8233,
    0.6481,
    0.5385,
    0.4647,
    0.4267,
    0.7623,
    0.1654,
    0.1565,
    0.054
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DIA = {
  ticker: "DIA",
  tradable: true,
  inceptionDate: "1998-01-14T00:00:00.000Z",
  correlatedTickers: [
    "UDOW",
    "DDM",
    "EDOW",
    "DLN",
    "DGRO",
    "VIG",
    "MGV",
    "DTD",
    "VTV",
    "IWX",
    "SPTM",
    "SPY",
    "IVV",
    "SPLG",
    "SPMD",
    "MDY",
    "IJH",
    "IWM",
    "IJR",
    "QQQ"
  ],
  correlationValues: [
    0.9997,
    0.9968,
    0.9773,
    0.9709,
    0.969,
    0.9666,
    0.9664,
    0.9643,
    0.9639,
    0.9608,
    0.9568,
    0.9567,
    0.9565,
    0.956,
    0.9003,
    0.8996,
    0.8995,
    0.8754,
    0.8568,
    0.8296
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SPLV = {
  ticker: "SPLV",
  tradable: true,
  inceptionDate: "2011-05-05T00:00:00.000Z",
  correlatedTickers: [
    "FVD",
    "USMV",
    "LGLV",
    "LVHD",
    "FXU",
    "FSTA",
    "FTCS",
    "VDC",
    "IYK",
    "IDU",
    "PRF",
    "SUSA",
    "SPHQ",
    "DSI",
    "QUAL",
    "PDP",
    "XMLV",
    "SPHB",
    "MTUM",
    "DWAS"
  ],
  correlationValues: [
    0.9456,
    0.9386,
    0.9379,
    0.9337,
    0.9099,
    0.9064,
    0.906,
    0.9058,
    0.9047,
    0.9027,
    0.9674,
    0.953,
    0.9468,
    0.9332,
    0.9325,
    0.9085,
    0.8669,
    0.8562,
    0.8185,
    0.8134
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SHV = {
  ticker: "SHV",
  tradable: true,
  inceptionDate: "2007-01-05T00:00:00.000Z",
  correlatedTickers: [
    "XBIL",
    "OBIL",
    "SHY",
    "GBIL",
    "BILS",
    "XONE",
    "ISTB",
    "TBLL",
    "SLQD",
    "TUA",
    "EMB",
    "LQD",
    "TIP",
    "AGG",
    "IEF",
    "TLT",
    "SPTL",
    "TLH",
    "IEI"
  ],
  correlationValues: [
    0.8336,
    0.4721,
    0.4691,
    0.4397,
    0.4238,
    0.4129,
    0.4049,
    0.397,
    0.3927,
    0.3897,
    0.5655,
    0.4452,
    0.2961,
    0.2807,
    0.1737,
    0.1609,
    0.1608,
    0.1588,
    0.1404
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TLT = {
  ticker: "TLT",
  tradable: true,
  inceptionDate: "2002-07-22T00:00:00.000Z",
  correlatedTickers: [
    "TMF",
    "SPTL",
    "VGLT",
    "UBT",
    "EDV",
    "SCHQ",
    "ZROZ",
    "TLH",
    "GOVI",
    "BLV",
    "EMB",
    "LQD",
    "AGG",
    "IEF",
    "SPTI",
    "IEI",
    "SHY",
    "BBLB"
  ],
  correlationValues: [
    0.9981,
    0.9976,
    0.9974,
    0.9946,
    0.9931,
    0.9919,
    0.9896,
    0.9845,
    0.9756,
    0.9725,
    0.5655,
    0.4452,
    0.2807,
    0.1737,
    0.1425,
    0.1404,
    0.0631,
    0.054
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const HYG = {
  ticker: "HYG",
  tradable: true,
  inceptionDate: "2007-04-04T00:00:00.000Z",
  correlatedTickers: [
    "JNK",
    "HYLB",
    "USHY",
    "UJB",
    "HYBB",
    "HYDW",
    "BBHY",
    "HYDB",
    "SHYG",
    "HYGV",
    "LQD",
    "USIG",
    "VCIT",
    "IGIB",
    "VCSH",
    "SPIB",
    "IGSB",
    "AGG",
    "IEF",
    "TLT"
  ],
  correlationValues: [
    0.9952,
    0.9947,
    0.9903,
    0.9891,
    0.9873,
    0.9867,
    0.9864,
    0.9838,
    0.9823,
    0.9799,
    0.4452,
    0.423,
    0.4183,
    0.4171,
    0.388,
    0.3874,
    0.3566,
    0.2807,
    0.1737,
    0.1609
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BIL = {
  ticker: "BIL",
  tradable: true,
  inceptionDate: "2007-05-25T00:00:00.000Z",
  correlatedTickers: [
    "BILS",
    "GBIL",
    "TBLL",
    "XBIL",
    "USFR",
    "SGOV",
    "TFLO",
    "XHLF",
    "TBIL",
    "PAAA",
    "JNK",
    "EMB",
    "IEF",
    "TLT",
    "SPTL",
    "TLH",
    "SPTI",
    "IEI",
    "SHY"
  ],
  correlationValues: [
    0.5062,
    0.4993,
    0.4885,
    0.4339,
    0.4329,
    0.4085,
    0.395,
    0.3933,
    0.3783,
    0.3676,
    0.7596,
    0.5655,
    0.1737,
    0.1609,
    0.1608,
    0.1588,
    0.1425,
    0.1404,
    0.0631
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DBMF = {
  ticker: "DBMF",
  tradable: true,
  inceptionDate: "2019-05-08T00:00:00.000Z",
  correlatedTickers: [
    "TBX",
    "PST",
    "KMLM",
    "TMV",
    "TBT",
    "TTT",
    "TBF",
    "CTA",
    "GLL",
    "DUST",
    "BDVG",
    "IRBA",
    "PFXF",
    "DBEH",
    "PFF",
    "AMJ",
    "AMLP",
    "PGX",
    "PGF",
    "FPE"
  ],
  correlationValues: [
    0.7473,
    0.7438,
    0.6836,
    0.6481,
    0.6464,
    0.6452,
    0.6451,
    0.5527,
    0.5483,
    0.4708,
    0.9016,
    0.8522,
    0.7202,
    0.6578,
    0.6471,
    0.6317,
    0.5923,
    0.5429,
    0.5288,
    0.4885
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const VIXY = {
  ticker: "VIXY",
  tradable: true,
  inceptionDate: "2011-01-03T00:00:00.000Z",
  correlatedTickers: [
    "UVIX",
    "UVXY",
    "VXX",
    "VIXM",
    "FAZ",
    "SRTY",
    "RWM",
    "TWM",
    "TZA",
    "SH",
    "JEPI",
    "DIVO",
    "PKW",
    "MOAT",
    "XYLD",
    "QYLD",
    "PTLC"
  ],
  correlationValues: [
    0.9971,
    0.997,
    0.9967,
    0.9272,
    0.6764,
    0.6709,
    0.6708,
    0.6699,
    0.6699,
    0.6658,
    0.9306,
    0.9276,
    0.9137,
    0.904,
    0.8265,
    0.8225,
    0.5544
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const VTV = {
  ticker: "VTV",
  tradable: true,
  inceptionDate: "2004-01-26T00:00:00.000Z",
  correlatedTickers: [
    "MGV",
    "VYM",
    "SCHV",
    "DLN",
    "IWX",
    "DTD",
    "JAVA",
    "NULV",
    "IWD",
    "DGRO",
    "IVE",
    "VOE",
    "IVW",
    "SPYG",
    "VBR",
    "IWF",
    "IWO",
    "VBK",
    "VUG",
    "IWN"
  ],
  correlationValues: [
    0.9959,
    0.9938,
    0.9905,
    0.9869,
    0.9863,
    0.9859,
    0.9859,
    0.9855,
    0.9847,
    0.9838,
    0.959,
    0.9363,
    0.9046,
    0.9039,
    0.8835,
    0.875,
    0.8652,
    0.8605,
    0.857,
    0.8548
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const VOX = {
  ticker: "VOX",
  tradable: true,
  inceptionDate: "2004-09-23T00:00:00.000Z",
  correlatedTickers: [
    "FCOM",
    "XLC",
    "PNQI",
    "GAUG",
    "AUGW",
    "ONEQ",
    "QQQ",
    "QQQM",
    "TQQQ",
    "VUG",
    "XLI",
    "XLF",
    "VGT",
    "XLK",
    "VNQ",
    "XLV",
    "XLY",
    "XLU",
    "VDE",
    "XLE"
  ],
  correlationValues: [
    0.998,
    0.9889,
    0.9237,
    0.9236,
    0.9116,
    0.9055,
    0.9002,
    0.9001,
    0.8996,
    0.8993,
    0.8964,
    0.8915,
    0.8292,
    0.8242,
    0.7963,
    0.7962,
    0.7742,
    0.6933,
    0.588,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const XLY = {
  ticker: "XLY",
  tradable: true,
  inceptionDate: "1998-12-16T00:00:00.000Z",
  correlatedTickers: [
    "FDIS",
    "VCR",
    "IYC",
    "CGGR",
    "ARKQ",
    "SFY",
    "FBCG",
    "JGRO",
    "ONEQ",
    "VUG",
    "XLI",
    "XLF",
    "XLK",
    "UCC",
    "XLV",
    "XLP",
    "WANT",
    "XLU",
    "XLE"
  ],
  correlationValues: [
    0.9947,
    0.9946,
    0.9786,
    0.9204,
    0.9094,
    0.9027,
    0.9016,
    0.8988,
    0.8969,
    0.8967,
    0.8964,
    0.8915,
    0.8242,
    0.8015,
    0.7962,
    0.7838,
    0.7734,
    0.6933,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SPY = {
  ticker: "SPY",
  tradable: true,
  inceptionDate: "1993-01-22T00:00:00.000Z",
  correlatedTickers: [
    "SSO",
    "IVV",
    "SPXL",
    "VOO",
    "UPRO",
    "SPLG",
    "VV",
    "SCHX",
    "ESGU",
    "IWB",
    "SPUU",
    "BSEP",
    "POCT",
    "PJUL",
    "PAUG",
    "PSEP",
    "PAPR",
    "UAUG",
    "ACIO",
    "UAPR"
  ],
  correlationValues: [
    0.9998,
    0.9997,
    0.9997,
    0.9997,
    0.9996,
    0.9995,
    0.9987,
    0.9986,
    0.9985,
    0.9984,
    0.9549,
    0.9425,
    0.9339,
    0.933,
    0.9322,
    0.9295,
    0.9205,
    0.9036,
    0.9004,
    0.8182
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const XLP = {
  ticker: "XLP",
  tradable: true,
  inceptionDate: "1998-12-16T00:00:00.000Z",
  correlatedTickers: [
    "VDC",
    "FSTA",
    "RSPS",
    "IYK",
    "KXI",
    "SPLV",
    "FTXG",
    "PBJ",
    "FXG",
    "USMV",
    "XLI",
    "XLF",
    "XLB",
    "XLK",
    "UGE",
    "XLV",
    "XLY",
    "XLU",
    "XLE"
  ],
  correlationValues: [
    0.993,
    0.9929,
    0.9733,
    0.973,
    0.931,
    0.8972,
    0.8896,
    0.8831,
    0.8762,
    0.8704,
    0.8964,
    0.8915,
    0.8819,
    0.8242,
    0.8024,
    0.7962,
    0.7742,
    0.6933,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const KMLM = {
  ticker: "KMLM",
  tradable: true,
  inceptionDate: "2020-12-02T00:00:00.000Z",
  correlatedTickers: [
    "DBMF",
    "TBX",
    "PST",
    "TTT",
    "TMV",
    "TBF",
    "USDU",
    "TBT",
    "CTA",
    "UUP",
    "PFXF",
    "PFF",
    "AMJ",
    "AMLP",
    "PGX",
    "PGF",
    "FPE",
    "KWEB",
    "KBA"
  ],
  correlationValues: [
    0.6836,
    0.6176,
    0.6002,
    0.5389,
    0.5385,
    0.5359,
    0.5355,
    0.5332,
    0.5274,
    0.519,
    0.7202,
    0.6471,
    0.6317,
    0.5923,
    0.5429,
    0.5288,
    0.4885,
    0.3666,
    0.3243
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const FMF = {
  ticker: "FMF",
  tradable: true,
  inceptionDate: "2013-08-01T00:00:00.000Z",
  correlatedTickers: [
    "KMLM",
    "DBMF",
    "TSLR",
    "BILZ",
    "TBX",
    "PST",
    "CTA",
    "STXE",
    "GLL",
    "TMV",
    "PFXF",
    "PFF",
    "FTSL",
    "AMJ",
    "AMLP",
    "PGX",
    "PGF",
    "FPE",
    "FTSM",
    "LMBS"
  ],
  correlationValues: [
    0.5073,
    0.4842,
    0.4036,
    0.3663,
    0.3309,
    0.3198,
    0.3129,
    0.302,
    0.2854,
    0.2774,
    0.7202,
    0.6471,
    0.6349,
    0.6317,
    0.5923,
    0.5429,
    0.5288,
    0.4885,
    0.0928,
    0.0873
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const WTMF = {
  ticker: "WTMF",
  tradable: true,
  inceptionDate: "2011-01-05T00:00:00.000Z",
  correlatedTickers: [
    "XAUG",
    "GAUG",
    "CVRD",
    "GJUL",
    "GJUN",
    "LGRO",
    "CONY",
    "PUTW",
    "PFXF",
    "PFF",
    "AMJ",
    "AMLP",
    "PGX",
    "PGF",
    "GCC",
    "FPE",
    "MTGP"
  ],
  correlationValues: [
    0.6975,
    0.6714,
    0.6356,
    0.6251,
    0.6132,
    0.5879,
    0.5716,
    0.8109,
    0.7202,
    0.6471,
    0.6317,
    0.5923,
    0.5429,
    0.5288,
    0.494,
    0.4885,
    0.0482
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BSV = {
  ticker: "BSV",
  tradable: true,
  inceptionDate: "2007-04-03T00:00:00.000Z",
  correlatedTickers: [
    "IEI",
    "IBTH",
    "IBTG",
    "SPTI",
    "VGIT",
    "IBTI",
    "SCHR",
    "ISTB",
    "GVI",
    "IBTJ",
    "VCLT",
    "VCIT",
    "VCSH",
    "BLV",
    "SPAB",
    "AGG",
    "BND",
    "BIV",
    "GBF",
    "MINT"
  ],
  correlationValues: [
    0.9777,
    0.9747,
    0.973,
    0.9685,
    0.9685,
    0.9676,
    0.9674,
    0.9649,
    0.9605,
    0.958,
    0.4281,
    0.4183,
    0.388,
    0.2946,
    0.2858,
    0.2807,
    0.2729,
    0.2693,
    0.2583,
    0.1154
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const GLD = {
  ticker: "GLD",
  tradable: true,
  inceptionDate: "2004-11-18T00:00:00.000Z",
  correlatedTickers: [
    "GLDM",
    "IAU",
    "UGL",
    "BAR",
    "IAUM",
    "SGOL",
    "OUNZ",
    "AAAU",
    "GLTR",
    "GDX",
    "PPLT",
    "DBB",
    "SLV",
    "CPER",
    "SIVR",
    "DBP",
    "PALL",
    "SESG"
  ],
  correlationValues: [
    0.9994,
    0.9993,
    0.9986,
    0.9983,
    0.9983,
    0.998,
    0.9978,
    0.9955,
    0.9262,
    0.8359,
    0.3811,
    0.3711,
    0.3675,
    0.3661,
    0.3653,
    0.3265,
    0.3129,
    0.2576
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const QLD = {
  ticker: "QLD",
  tradable: true,
  inceptionDate: "2006-06-19T00:00:00.000Z",
  correlatedTickers: [
    "QQQ",
    "TQQQ",
    "QQQM",
    "MGK",
    "ONEQ",
    "SCHG",
    "VUG",
    "IWY",
    "IWF",
    "VONG",
    "SSO",
    "SPXL",
    "TNA",
    "NAPR",
    "NJUL",
    "NOCT",
    "NJAN",
    "QCLR",
    "QRMI"
  ],
  correlationValues: [
    0.9997,
    0.9997,
    0.9996,
    0.9932,
    0.9923,
    0.9916,
    0.9915,
    0.9909,
    0.9888,
    0.988,
    0.9564,
    0.9564,
    0.8715,
    0.8443,
    0.8406,
    0.8334,
    0.8257,
    0.7145,
    0.6978
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const IEF = {
  ticker: "IEF",
  tradable: true,
  inceptionDate: "2002-07-22T00:00:00.000Z",
  correlatedTickers: [
    "TYD",
    "UTEN",
    "IBTK",
    "GOVT",
    "BIV",
    "IBTJ",
    "SCHR",
    "VGIT",
    "SPTI",
    "BND",
    "EMB",
    "LQD",
    "TLT",
    "TLH",
    "UST",
    "IEI",
    "SHY"
  ],
  correlationValues: [
    0.9951,
    0.9945,
    0.9892,
    0.989,
    0.984,
    0.9834,
    0.9825,
    0.9821,
    0.9802,
    0.9791,
    0.5655,
    0.4452,
    0.1609,
    0.1588,
    0.1565,
    0.1404,
    0.0631
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const QID = {
  ticker: "QID",
  tradable: true,
  inceptionDate: "2006-07-11T00:00:00.000Z",
  correlatedTickers: [
    "SQQQ",
    "PSQ",
    "BERZ",
    "TECS",
    "SPXS",
    "SDS",
    "SPXU",
    "SPDN",
    "SH",
    "FNGD",
    "SSO",
    "SPXL",
    "TNA",
    "NAPR",
    "NJUL",
    "NOCT",
    "NJAN",
    "QCLR",
    "QRMI"
  ],
  correlationValues: [
    0.9997,
    0.9987,
    0.972,
    0.9718,
    0.9425,
    0.942,
    0.9417,
    0.9415,
    0.9397,
    0.9376,
    0.9564,
    0.9564,
    0.8715,
    0.8443,
    0.8406,
    0.8334,
    0.8257,
    0.7145,
    0.6978
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SMH = {
  ticker: "SMH",
  tradable: true,
  inceptionDate: "2011-12-20T00:00:00.000Z",
  correlatedTickers: [
    "SOXX",
    "SOXL",
    "SOXQ",
    "USD",
    "PSI",
    "FTXL",
    "XSD",
    "QTUM",
    "QTEC",
    "RSPT",
    "MOAT",
    "IXN",
    "IXJ",
    "PPH",
    "URA",
    "IXC",
    "OIH",
    "GDXJ",
    "GDX",
    "KWEB"
  ],
  correlationValues: [
    0.9913,
    0.991,
    0.9898,
    0.9855,
    0.9667,
    0.9612,
    0.9464,
    0.9381,
    0.9326,
    0.9266,
    0.904,
    0.826,
    0.8097,
    0.6971,
    0.6335,
    0.599,
    0.5432,
    0.4518,
    0.4466,
    0.3666
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const USD = {
  ticker: "USD",
  tradable: true,
  inceptionDate: "2007-01-30T00:00:00.000Z",
  correlatedTickers: [
    "SMH",
    "SOXQ",
    "SOXX",
    "SOXL",
    "PSI",
    "FTXL",
    "XSD",
    "QTUM",
    "QTEC",
    "IXN",
    "SSO",
    "SPXL",
    "UPRO",
    "QLD",
    "TQQQ"
  ],
  correlationValues: [
    0.9855,
    0.9748,
    0.9747,
    0.974,
    0.9459,
    0.9326,
    0.9289,
    0.9142,
    0.9136,
    0.9117,
    0.9564,
    0.9564,
    0.9563,
    0.83,
    0.8288
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const EMB = {
  ticker: "EMB",
  tradable: true,
  inceptionDate: "2007-12-17T00:00:00.000Z",
  correlatedTickers: [
    "VWOB",
    "PCY",
    "JPMB",
    "EMHY",
    "DIAL",
    "IBDY",
    "PYLD",
    "CEMB",
    "IGIB",
    "VCEB",
    "LQD",
    "TIP",
    "AGG",
    "IEF",
    "TLT",
    "TLH",
    "IEI",
    "SHY"
  ],
  correlationValues: [
    0.9834,
    0.9806,
    0.9747,
    0.9572,
    0.9068,
    0.8784,
    0.8748,
    0.8721,
    0.8673,
    0.8618,
    0.4452,
    0.2961,
    0.2807,
    0.1737,
    0.1609,
    0.1588,
    0.1404,
    0.0631
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BWZ = {
  ticker: "BWZ",
  tradable: true,
  inceptionDate: "2009-01-15T00:00:00.000Z",
  correlatedTickers: [
    "UDN",
    "BWX",
    "IGOV",
    "IBND",
    "FXE",
    "EBND",
    "FXY",
    "EMLC",
    "GLTR",
    "IAUM",
    "JNK",
    "EMB",
    "IEF",
    "TLT",
    "SPTL",
    "TLH",
    "SPTI",
    "IEI",
    "SHY"
  ],
  correlationValues: [
    0.8463,
    0.8437,
    0.8203,
    0.7962,
    0.7893,
    0.7662,
    0.7495,
    0.7464,
    0.7392,
    0.7352,
    0.7596,
    0.5655,
    0.1737,
    0.1609,
    0.1608,
    0.1588,
    0.1425,
    0.1404,
    0.0631
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const EDZ = {
  ticker: "EDZ",
  tradable: true,
  inceptionDate: "2008-12-17T00:00:00.000Z",
  correlatedTickers: [
    "YANG",
    "EFZ",
    "EPV",
    "HIBS",
    "USDU",
    "SOXS",
    "SPXU",
    "SH",
    "SDS",
    "SPXS",
    "SSO",
    "SPXL",
    "QLD",
    "EET",
    "EJAN",
    "EJUL"
  ],
  correlationValues: [
    0.8988,
    0.7774,
    0.7409,
    0.6926,
    0.6776,
    0.6384,
    0.6295,
    0.6293,
    0.6289,
    0.6288,
    0.9564,
    0.9564,
    0.83,
    0.6126,
    0.6068,
    0.5937
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const EEMV = {
  ticker: "EEMV",
  tradable: true,
  inceptionDate: "2011-10-18T00:00:00.000Z",
  correlatedTickers: [
    "DFAE",
    "GEM",
    "EEM",
    "IEMG",
    "EDC",
    "DFEM",
    "AVEM",
    "ESGE",
    "EMGF",
    "SPEM",
    "ACWI",
    "IGF",
    "EFA",
    "IEV",
    "EFG",
    "EFV",
    "ICLN",
    "PBW",
    "ARKK",
    "TAN"
  ],
  correlationValues: [
    0.93,
    0.9288,
    0.9239,
    0.923,
    0.9219,
    0.9213,
    0.9204,
    0.9186,
    0.9176,
    0.9174,
    0.9435,
    0.8664,
    0.8332,
    0.8226,
    0.8178,
    0.8054,
    0.7114,
    0.7019,
    0.6654,
    0.6298
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const VIXM = {
  ticker: "VIXM",
  tradable: true,
  inceptionDate: "2011-01-03T00:00:00.000Z",
  correlatedTickers: [
    "UVXY",
    "UVIX",
    "VIXY",
    "VXX",
    "FAZ",
    "SRTY",
    "RWM",
    "TZA",
    "TWM",
    "SH",
    "JEPI",
    "DIVO",
    "PKW",
    "MOAT",
    "XYLD",
    "QYLD",
    "PTLC"
  ],
  correlationValues: [
    0.9313,
    0.9307,
    0.9272,
    0.9227,
    0.6681,
    0.6551,
    0.6546,
    0.6539,
    0.6535,
    0.6505,
    0.9306,
    0.9276,
    0.9137,
    0.904,
    0.8265,
    0.8225,
    0.5544
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const IYY = {
  ticker: "IYY",
  tradable: true,
  inceptionDate: "2000-06-12T00:00:00.000Z",
  correlatedTickers: [
    "IWB",
    "SCHX",
    "SCHK",
    "ITOT",
    "IWV",
    "SCHB",
    "GSUS",
    "DFUS",
    "VV",
    "BBUS",
    "SPY",
    "IVV",
    "DIA",
    "IWR",
    "OEF",
    "MDY",
    "IJH",
    "IWM",
    "IJR",
    "QQQ"
  ],
  correlationValues: [
    0.9986,
    0.9985,
    0.9984,
    0.9982,
    0.9979,
    0.9979,
    0.9978,
    0.9977,
    0.9976,
    0.9973,
    0.9567,
    0.9565,
    0.9544,
    0.9355,
    0.9218,
    0.8996,
    0.8995,
    0.8754,
    0.8568,
    0.8296
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const MSFT = {
  ticker: "MSFT",
  tradable: true,
  inceptionDate: "1986-03-13T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const AAPL = {
  ticker: "AAPL",
  tradable: true,
  inceptionDate: "1980-12-12T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const NVDA = {
  ticker: "NVDA",
  tradable: true,
  inceptionDate: "1999-01-22T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const AMZN = {
  ticker: "AMZN",
  tradable: true,
  inceptionDate: "1997-05-15T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const GOOG = {
  ticker: "GOOG",
  tradable: true,
  inceptionDate: "2004-08-19T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const META = {
  ticker: "META",
  tradable: true,
  inceptionDate: "2012-05-18T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const LLY = {
  ticker: "LLY",
  tradable: true,
  inceptionDate: "1972-06-01T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const AVGO = {
  ticker: "AVGO",
  tradable: true,
  inceptionDate: "2009-08-06T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const TSLA = {
  ticker: "TSLA",
  tradable: true,
  inceptionDate: "2010-06-29T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const AMD = {
  ticker: "AMD",
  tradable: true,
  inceptionDate: "1980-03-17T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const NFLX = {
  ticker: "NFLX",
  tradable: true,
  inceptionDate: "2002-05-23T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const ADBE = {
  ticker: "ADBE",
  tradable: true,
  inceptionDate: "1986-08-13T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const TMF = {
  ticker: "TMF",
  tradable: true,
  inceptionDate: "2009-04-16T00:00:00.000Z",
  correlatedTickers: [
    "TLT",
    "SPTL",
    "VGLT",
    "UBT",
    "EDV",
    "SCHQ",
    "ZROZ",
    "TLH",
    "GOVI",
    "BLV",
    "UJB",
    "TYD",
    "UST",
    "BBLB"
  ],
  correlationValues: [
    0.9981,
    0.997,
    0.9963,
    0.9946,
    0.9928,
    0.9919,
    0.9898,
    0.9842,
    0.9743,
    0.9721,
    0.7623,
    0.1654,
    0.1565,
    0.054
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const UPRO = {
  ticker: "UPRO",
  tradable: true,
  inceptionDate: "2009-06-23T00:00:00.000Z",
  correlatedTickers: [
    "SPXL",
    "SSO",
    "IVV",
    "SPY",
    "VOO",
    "SPLG",
    "SCHX",
    "VV",
    "SPUU",
    "ESGU",
    "BSEP",
    "POCT",
    "PJUL",
    "PAUG",
    "PSEP",
    "PAPR",
    "USEP",
    "UAUG",
    "ACIO",
    "UAPR"
  ],
  correlationValues: [
    0.9997,
    0.9997,
    0.9996,
    0.9996,
    0.9996,
    0.9993,
    0.9985,
    0.9985,
    0.9984,
    0.9983,
    0.9425,
    0.9339,
    0.933,
    0.9322,
    0.9295,
    0.9205,
    0.9146,
    0.9036,
    0.9004,
    0.8182
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const UVXY = {
  ticker: "UVXY",
  tradable: true,
  inceptionDate: "2011-10-03T00:00:00.000Z",
  correlatedTickers: [
    "VIXY",
    "UVIX",
    "VXX",
    "VIXM",
    "FAZ",
    "SH",
    "SRTY",
    "SPDN",
    "SDS",
    "RWM",
    "SSO",
    "SPXL",
    "QLD"
  ],
  correlationValues: [
    0.997,
    0.9967,
    0.9955,
    0.9313,
    0.6795,
    0.6721,
    0.6714,
    0.6713,
    0.6712,
    0.6711,
    0.9564,
    0.9564,
    0.83
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const SVXY = {
  ticker: "SVXY",
  tradable: true,
  inceptionDate: "2011-10-03T00:00:00.000Z",
  correlatedTickers: [
    "SVIX",
    "LGRO",
    "XAUG",
    "AUGW",
    "GAUG",
    "SVOL",
    "GJUL",
    "TJUL",
    "CVRD",
    "SSO",
    "SPXL",
    "QLD"
  ],
  correlationValues: [
    0.9963,
    0.9067,
    0.8934,
    0.878,
    0.8722,
    0.8567,
    0.8496,
    0.7863,
    0.7861,
    0.9564,
    0.9564,
    0.83
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const SPXU = {
  ticker: "SPXU",
  tradable: true,
  inceptionDate: "2009-06-23T00:00:00.000Z",
  correlatedTickers: [
    "SDS",
    "SPXS",
    "SPDN",
    "SH",
    "QID",
    "SQQQ",
    "PSQ",
    "HIBS",
    "DOG",
    "SDOW",
    "SPUU",
    "BSEP",
    "POCT",
    "PJUL",
    "PAUG",
    "PSEP",
    "PAPR",
    "UAUG",
    "ACIO",
    "UAPR"
  ],
  correlationValues: [
    0.9993,
    0.9993,
    0.9983,
    0.9982,
    0.9417,
    0.9417,
    0.9414,
    0.9275,
    0.9263,
    0.9251,
    0.9549,
    0.9425,
    0.9339,
    0.933,
    0.9322,
    0.9295,
    0.9205,
    0.9036,
    0.9004,
    0.8182
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SOXS = {
  ticker: "SOXS",
  tradable: true,
  inceptionDate: "2010-03-11T00:00:00.000Z",
  correlatedTickers: [
    "TECS",
    "BERZ",
    "HIBS",
    "QID",
    "SQQQ",
    "PSQ",
    "FNGD",
    "NVDS",
    "SPDN",
    "SDS",
    "SSO",
    "SPXL",
    "FAS",
    "TNA",
    "QLD",
    "TECL",
    "ERX"
  ],
  correlationValues: [
    0.9068,
    0.9039,
    0.8868,
    0.8776,
    0.8773,
    0.8771,
    0.8256,
    0.8226,
    0.8185,
    0.8182,
    0.9564,
    0.9564,
    0.8902,
    0.8715,
    0.83,
    0.8229,
    0.5785
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BND = {
  ticker: "BND",
  tradable: true,
  inceptionDate: "2007-04-03T00:00:00.000Z",
  correlatedTickers: [
    "AGG",
    "SCHZ",
    "EAGG",
    "SPAB",
    "AVIG",
    "BKAG",
    "BIV",
    "FLCB",
    "IUSB",
    "NUBD",
    "VCLT",
    "VCIT",
    "VCSH",
    "BLV",
    "FLOT",
    "GBF",
    "GVI",
    "BSV",
    "MINT",
    "GSY"
  ],
  correlationValues: [
    0.9962,
    0.9946,
    0.9898,
    0.9878,
    0.9867,
    0.9867,
    0.9852,
    0.9842,
    0.9825,
    0.982,
    0.4281,
    0.4183,
    0.388,
    0.2946,
    0.2634,
    0.2583,
    0.2072,
    0.1561,
    0.1154,
    0.0134
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const FAS = {
  ticker: "FAS",
  tradable: true,
  inceptionDate: "2008-11-06T00:00:00.000Z",
  correlatedTickers: [
    "XLF",
    "IYF",
    "VFH",
    "FNCL",
    "IYG",
    "DFUV",
    "JAVA",
    "RDVY",
    "IWD",
    "PRF",
    "SSO",
    "SPXL",
    "QLD",
    "TECL",
    "SOXL"
  ],
  correlationValues: [
    0.9988,
    0.9921,
    0.9921,
    0.992,
    0.9774,
    0.9306,
    0.9303,
    0.9298,
    0.9272,
    0.9268,
    0.9564,
    0.9564,
    0.83,
    0.8229,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const XLU = {
  ticker: "XLU",
  tradable: true,
  inceptionDate: "1998-12-16T00:00:00.000Z",
  correlatedTickers: [
    "UTSL",
    "FUTY",
    "VPU",
    "IDU",
    "RSPU",
    "FXU",
    "SPLV",
    "LVHD",
    "FVD",
    "LGLV",
    "XLI",
    "XLF",
    "XLB",
    "XLK",
    "XLV",
    "XLP",
    "XLY",
    "UPW",
    "XLE"
  ],
  correlationValues: [
    0.9992,
    0.9976,
    0.997,
    0.9952,
    0.9903,
    0.9593,
    0.886,
    0.8457,
    0.8282,
    0.7968,
    0.8964,
    0.8915,
    0.8819,
    0.8242,
    0.7962,
    0.7838,
    0.7742,
    0.7014,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BTAL = {
  ticker: "BTAL",
  tradable: true,
  inceptionDate: "2011-09-13T00:00:00.000Z",
  correlatedTickers: [
    "SARK",
    "WEBS",
    "HIBS",
    "HDGE",
    "FNGD",
    "BERZ",
    "SQQQ",
    "QID",
    "PSQ",
    "SOXS",
    "PRF",
    "SUSA",
    "SPHQ",
    "USMV",
    "DSI",
    "QUAL",
    "SPLV"
  ],
  correlationValues: [
    0.8577,
    0.8299,
    0.8012,
    0.7792,
    0.7553,
    0.7452,
    0.7191,
    0.7182,
    0.713,
    0.6865,
    0.9674,
    0.953,
    0.9468,
    0.94,
    0.9332,
    0.9325,
    0.855
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const USDU = {
  ticker: "USDU",
  tradable: true,
  inceptionDate: "2013-12-18T00:00:00.000Z",
  correlatedTickers: [
    "UUP",
    "EUO",
    "EFZ",
    "EPV",
    "JDST",
    "GDXD",
    "DUST",
    "GLL",
    "EDZ",
    "ZSL",
    "FXC",
    "FXA",
    "CEW",
    "CYB",
    "FXY"
  ],
  correlationValues: [
    0.923,
    0.8819,
    0.7403,
    0.7238,
    0.691,
    0.6898,
    0.6895,
    0.6864,
    0.6776,
    0.6227,
    0.6802,
    0.6051,
    0.5017,
    0.2867,
    0.1787
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const VTI = {
  ticker: "VTI",
  tradable: true,
  inceptionDate: "2001-05-24T00:00:00.000Z",
  correlatedTickers: [
    "IWV",
    "ITOT",
    "SCHB",
    "IWB",
    "SCHX",
    "SCHK",
    "DFUS",
    "SPTM",
    "IYY",
    "ESGU",
    "SPY",
    "IVV",
    "DIA",
    "VO",
    "MDY",
    "VB",
    "VXF",
    "IWM",
    "IJR",
    "QQQ"
  ],
  correlationValues: [
    0.9984,
    0.9983,
    0.9983,
    0.9974,
    0.9972,
    0.9971,
    0.9967,
    0.9967,
    0.9964,
    0.9964,
    0.9567,
    0.9565,
    0.9544,
    0.9407,
    0.8996,
    0.8939,
    0.8842,
    0.8754,
    0.8568,
    0.8296
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const UGL = {
  ticker: "UGL",
  tradable: true,
  inceptionDate: "2008-12-01T00:00:00.000Z",
  correlatedTickers: [
    "GLD",
    "GLDM",
    "IAU",
    "IAUM",
    "SGOL",
    "BAR",
    "OUNZ",
    "AAAU",
    "GLTR",
    "GDX",
    "SSO",
    "QLD",
    "TQQQ",
    "AGQ",
    "UCO",
    "BOIL",
    "DGP"
  ],
  correlationValues: [
    0.9986,
    0.9983,
    0.9981,
    0.9978,
    0.9976,
    0.9974,
    0.9972,
    0.9968,
    0.9259,
    0.8354,
    0.9564,
    0.83,
    0.8288,
    0.3698,
    0.3603,
    0.2835,
    0.2769
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const SPXS = {
  ticker: "SPXS",
  tradable: true,
  inceptionDate: "2008-11-05T00:00:00.000Z",
  correlatedTickers: [
    "SDS",
    "SPXU",
    "SH",
    "SPDN",
    "QID",
    "SQQQ",
    "PSQ",
    "HIBS",
    "DOG",
    "SDOW",
    "SPUU",
    "BSEP",
    "POCT",
    "PJUL",
    "PAUG",
    "PSEP",
    "PAPR",
    "UAUG",
    "ACIO",
    "UAPR"
  ],
  correlationValues: [
    0.9997,
    0.9993,
    0.9986,
    0.9986,
    0.9425,
    0.9424,
    0.942,
    0.9288,
    0.9268,
    0.9257,
    0.9549,
    0.9425,
    0.9339,
    0.933,
    0.9322,
    0.9295,
    0.9205,
    0.9036,
    0.9004,
    0.8182
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TYO = {
  ticker: "TYO",
  tradable: true,
  inceptionDate: "2009-04-16T00:00:00.000Z",
  correlatedTickers: [
    "PST",
    "TBX",
    "TTT",
    "TMV",
    "TBF",
    "TBT",
    "DBMF",
    "PFIX",
    "KMLM",
    "GLL",
    "UJB",
    "TMF",
    "UST",
    "UBT"
  ],
  correlationValues: [
    0.99,
    0.9861,
    0.901,
    0.8983,
    0.8982,
    0.8979,
    0.7462,
    0.668,
    0.6055,
    0.587,
    0.7623,
    0.1622,
    0.1565,
    0.1499
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const GBTC = {
  ticker: "GBTC",
  tradable: true,
  inceptionDate: "2015-05-11T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const BITO = {
  ticker: "BITO",
  tradable: true,
  inceptionDate: "2021-10-19T00:00:00.000Z",
  correlatedTickers: [
    "BITX",
    "BTF",
    "WGMI",
    "BKCH",
    "BLOK",
    "CONY",
    "FDIG",
    "CONL",
    "ARKW",
    "GAUG",
    "ANEW",
    "PFXF",
    "CTEX",
    "PFF",
    "AMJ",
    "AMLP",
    "PGX",
    "PGF",
    "FPE"
  ],
  correlationValues: [
    0.9987,
    0.9986,
    0.7289,
    0.6941,
    0.692,
    0.664,
    0.6525,
    0.497,
    0.4395,
    0.405,
    0.8814,
    0.7202,
    0.6792,
    0.6471,
    0.6317,
    0.5923,
    0.5429,
    0.5288,
    0.4885
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const WGMI = {
  ticker: "WGMI",
  tradable: true,
  inceptionDate: "2022-02-08T00:00:00.000Z",
  correlatedTickers: [
    "BKCH",
    "FDIG",
    "BLOK",
    "CONY",
    "BITX",
    "BITO",
    "BTF",
    "CONL",
    "ARKW",
    "ARKF",
    "IGF",
    "EFG",
    "EFV",
    "ICLN",
    "PBW",
    "ARKK",
    "TAN"
  ],
  correlationValues: [
    0.9393,
    0.9252,
    0.8919,
    0.8069,
    0.7805,
    0.7289,
    0.7227,
    0.721,
    0.6698,
    0.6494,
    0.8664,
    0.8178,
    0.8054,
    0.7114,
    0.7019,
    0.6654,
    0.6298
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const MSTR = {
  ticker: "MSTR",
  tradable: true,
  inceptionDate: "1998-06-11T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const COIN = {
  ticker: "COIN",
  tradable: true,
  inceptionDate: "2021-04-14T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const MARA = {
  ticker: "MARA",
  tradable: true,
  inceptionDate: "2012-05-04T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const CLSK = {
  ticker: "CLSK",
  tradable: true,
  inceptionDate: "2016-11-16T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const RIOT = {
  ticker: "RIOT",
  tradable: true,
  inceptionDate: "2016-03-31T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const BITF = {
  ticker: "BITF",
  tradable: true,
  inceptionDate: "2019-08-16T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const HUT = {
  ticker: "HUT",
  tradable: true,
  inceptionDate: "2018-03-08T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const WULF = {
  ticker: "WULF",
  tradable: true,
  inceptionDate: "1994-04-05T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const CIFR = {
  ticker: "CIFR",
  tradable: true,
  inceptionDate: "2020-10-20T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const IREN = {
  ticker: "IREN",
  tradable: true,
  inceptionDate: "2021-11-17T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const CAN = {
  ticker: "CAN",
  tradable: true,
  inceptionDate: "2019-11-20T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const UVIX = {
  ticker: "UVIX",
  tradable: true,
  inceptionDate: "2022-03-30T00:00:00.000Z",
  correlatedTickers: [
    "VIXY",
    "UVXY",
    "VXX",
    "VIXM",
    "FAZ",
    "SRTY",
    "RWM",
    "TZA",
    "TWM",
    "SH",
    "SSO",
    "SPXL",
    "QLD",
    "ZIVB",
    "BITX"
  ],
  correlationValues: [
    0.9971,
    0.9967,
    0.9952,
    0.9307,
    0.6822,
    0.6731,
    0.673,
    0.672,
    0.6716,
    0.6699,
    0.9564,
    0.9564,
    0.83,
    0.6444,
    0.3043
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const SVIX = {
  ticker: "SVIX",
  tradable: true,
  inceptionDate: "2022-03-30T00:00:00.000Z",
  correlatedTickers: [
    "SVXY",
    "LGRO",
    "XAUG",
    "AUGW",
    "GAUG",
    "SVOL",
    "GJUL",
    "CVRD",
    "TJUL",
    "SSO",
    "SPXL",
    "QLD",
    "ZIVB",
    "BITX"
  ],
  correlationValues: [
    0.9963,
    0.898,
    0.8906,
    0.8797,
    0.8621,
    0.8556,
    0.8471,
    0.7811,
    0.7785,
    0.9564,
    0.9564,
    0.83,
    0.6444,
    0.3043
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const LABU = {
  ticker: "LABU",
  tradable: true,
  inceptionDate: "2015-05-28T00:00:00.000Z",
  correlatedTickers: [
    "XBI",
    "GNOM",
    "IBB",
    "FBT",
    "ARKG",
    "IWC",
    "XPH",
    "IWO",
    "VTWG",
    "VBK",
    "SSO",
    "SPXL",
    "QLD",
    "GUSH",
    "CHAU"
  ],
  correlationValues: [
    0.9979,
    0.8922,
    0.8666,
    0.8502,
    0.8466,
    0.7937,
    0.7838,
    0.7792,
    0.7778,
    0.7748,
    0.9564,
    0.9564,
    0.83,
    0.6044,
    0.3212
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const LABD = {
  ticker: "LABD",
  tradable: true,
  inceptionDate: "2015-05-28T00:00:00.000Z",
  correlatedTickers: [
    "SRTY",
    "TZA",
    "TWM",
    "RWM",
    "SARK",
    "HDGE",
    "HIBS",
    "SDS",
    "SPDN",
    "SPXS",
    "SSO",
    "SPXL",
    "TNA",
    "QLD",
    "GUSH",
    "CHAU"
  ],
  correlationValues: [
    0.7502,
    0.7456,
    0.7455,
    0.7448,
    0.7188,
    0.6714,
    0.6681,
    0.6467,
    0.6463,
    0.6461,
    0.9564,
    0.9564,
    0.8715,
    0.83,
    0.6044,
    0.3212
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const KLAC = {
  ticker: "KLAC",
  tradable: true,
  inceptionDate: "1980-10-08T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const NVO = {
  ticker: "NVO",
  tradable: true,
  inceptionDate: "1981-04-30T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const FNGU = {
  ticker: "FNGU",
  tradable: true,
  inceptionDate: "2018-01-22T00:00:00.000Z",
  correlatedTickers: [
    "FNGO",
    "FNGS",
    "BULZ",
    "QQQ",
    "TQQQ",
    "QQQM",
    "QLD",
    "FBCG",
    "XNTK",
    "IGM",
    "SSO",
    "SPXL",
    "TNA",
    "BNKU",
    "SOXL",
    "FNGG",
    "NRGU"
  ],
  correlationValues: [
    0.9967,
    0.9966,
    0.9497,
    0.9363,
    0.9362,
    0.9361,
    0.9356,
    0.9329,
    0.9291,
    0.9285,
    0.9564,
    0.9564,
    0.8715,
    0.7518,
    0.7171,
    0.6816,
    0.5282
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const UDOW = {
  ticker: "UDOW",
  tradable: true,
  inceptionDate: "2010-02-09T00:00:00.000Z",
  correlatedTickers: [
    "DIA",
    "DDM",
    "EDOW",
    "DLN",
    "DGRO",
    "MGV",
    "VIG",
    "VTV",
    "DTD",
    "IWX",
    "SSO",
    "SPXL",
    "UPRO",
    "TNA",
    "QLD",
    "TQQQ",
    "UCO"
  ],
  correlationValues: [
    0.9997,
    0.9967,
    0.9774,
    0.9709,
    0.9692,
    0.9672,
    0.9666,
    0.9647,
    0.9643,
    0.961,
    0.9564,
    0.9564,
    0.9563,
    0.8715,
    0.83,
    0.8288,
    0.3603
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SPXL = {
  ticker: "SPXL",
  tradable: true,
  inceptionDate: "2008-11-05T00:00:00.000Z",
  correlatedTickers: [
    "SPY",
    "SSO",
    "UPRO",
    "IVV",
    "VOO",
    "SPLG",
    "SCHX",
    "VV",
    "ESGU",
    "SPUU",
    "BSEP",
    "POCT",
    "PJUL",
    "PAUG",
    "PSEP",
    "PAPR",
    "USEP",
    "UAUG",
    "ACIO",
    "UAPR"
  ],
  correlationValues: [
    0.9997,
    0.9997,
    0.9997,
    0.9996,
    0.9996,
    0.9993,
    0.9986,
    0.9985,
    0.9985,
    0.9984,
    0.9425,
    0.9339,
    0.933,
    0.9322,
    0.9295,
    0.9205,
    0.9146,
    0.9036,
    0.9004,
    0.8182
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const NUGT = {
  ticker: "NUGT",
  tradable: true,
  inceptionDate: "2010-12-08T00:00:00.000Z",
  correlatedTickers: [
    "GDX",
    "GDXU",
    "RING",
    "JNUG",
    "GDXJ",
    "SIL",
    "SILJ",
    "GLTR",
    "GLD",
    "UGL",
    "SSO",
    "SPXL",
    "QLD",
    "TECL",
    "SOXL"
  ],
  correlationValues: [
    0.9979,
    0.992,
    0.9871,
    0.9785,
    0.9783,
    0.9586,
    0.9368,
    0.8509,
    0.8342,
    0.8342,
    0.9564,
    0.9564,
    0.83,
    0.8229,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const GUSH = {
  ticker: "GUSH",
  tradable: true,
  inceptionDate: "2015-05-28T00:00:00.000Z",
  correlatedTickers: [
    "XOP",
    "PXE",
    "FCG",
    "FXN",
    "IEO",
    "FTXN",
    "PXI",
    "RSPG",
    "OILU",
    "FENY",
    "SSO",
    "SPXL",
    "QLD",
    "LABU",
    "CHAU"
  ],
  correlationValues: [
    0.9993,
    0.9897,
    0.9875,
    0.9861,
    0.9785,
    0.9773,
    0.972,
    0.9719,
    0.9603,
    0.9586,
    0.9564,
    0.9564,
    0.83,
    0.6083,
    0.3212
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const WEBL = {
  ticker: "WEBL",
  tradable: true,
  inceptionDate: "2019-11-07T00:00:00.000Z",
  correlatedTickers: [
    "FDN",
    "PNQI",
    "SKYY",
    "THNQ",
    "CLOU",
    "TIME",
    "IGM",
    "IGV",
    "XSW",
    "VUG",
    "SSO",
    "SPXL",
    "MIDU",
    "TNA",
    "QLD"
  ],
  correlationValues: [
    0.9992,
    0.966,
    0.9544,
    0.9381,
    0.9375,
    0.936,
    0.9299,
    0.9284,
    0.9277,
    0.9255,
    0.9564,
    0.9564,
    0.9,
    0.8715,
    0.83
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TNA = {
  ticker: "TNA",
  tradable: true,
  inceptionDate: "2008-11-05T00:00:00.000Z",
  correlatedTickers: [
    "VTWO",
    "URTY",
    "IWM",
    "UWM",
    "SCHA",
    "ESML",
    "BBSC",
    "PRFZ",
    "NUSC",
    "SMMD",
    "SSO",
    "SPXL",
    "IWML",
    "KJAN",
    "KAPR",
    "QLD",
    "KJUL",
    "KOCT"
  ],
  correlationValues: [
    0.9996,
    0.9995,
    0.9994,
    0.9994,
    0.9963,
    0.9939,
    0.9928,
    0.99,
    0.9899,
    0.9896,
    0.9564,
    0.9564,
    0.8664,
    0.8606,
    0.8466,
    0.83,
    0.8173,
    0.8123
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const FAZ = {
  ticker: "FAZ",
  tradable: true,
  inceptionDate: "2008-11-06T00:00:00.000Z",
  correlatedTickers: [
    "BNKD",
    "DOG",
    "SDOW",
    "DXD",
    "TWM",
    "RWM",
    "TZA",
    "SRTY",
    "SH",
    "SDS",
    "SSO",
    "SPXL",
    "TNA",
    "QLD",
    "TECL",
    "SOXL"
  ],
  correlationValues: [
    0.9134,
    0.8781,
    0.8776,
    0.8775,
    0.8578,
    0.8572,
    0.8572,
    0.8554,
    0.8544,
    0.8503,
    0.9564,
    0.9564,
    0.8715,
    0.83,
    0.8229,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const ERX = {
  ticker: "ERX",
  tradable: true,
  inceptionDate: "2008-11-06T00:00:00.000Z",
  correlatedTickers: [
    "XLE",
    "DIG",
    "VDE",
    "FENY",
    "IYE",
    "OILU",
    "RSPG",
    "IXC",
    "NRGU",
    "IGE",
    "SSO",
    "SPXL",
    "QLD",
    "TECL",
    "SOXL"
  ],
  correlationValues: [
    0.9991,
    0.9981,
    0.9975,
    0.9972,
    0.9966,
    0.9947,
    0.9844,
    0.9836,
    0.9783,
    0.9739,
    0.9564,
    0.9564,
    0.83,
    0.8229,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const YINN = {
  ticker: "YINN",
  tradable: true,
  inceptionDate: "2009-12-03T00:00:00.000Z",
  correlatedTickers: [
    "FXI",
    "MCHI",
    "GXC",
    "CXSE",
    "KWEB",
    "CWEB",
    "CHIQ",
    "EMQQ",
    "AIA",
    "CQQQ",
    "SSO",
    "SPXL",
    "QLD",
    "XPP"
  ],
  correlationValues: [
    0.9992,
    0.9924,
    0.9871,
    0.9694,
    0.9596,
    0.9595,
    0.9531,
    0.9418,
    0.9359,
    0.9352,
    0.9564,
    0.9564,
    0.83,
    0.3887
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const USRT = {
  ticker: "USRT",
  tradable: true,
  inceptionDate: "2007-05-01T00:00:00.000Z",
  correlatedTickers: [
    "BBRE",
    "RWR",
    "SCHH",
    "DFAR",
    "VNQ",
    "FREL",
    "IYR",
    "REET",
    "ICF",
    "XLRE",
    "XLI",
    "XLF",
    "XLK",
    "XLV",
    "XLY",
    "REM",
    "REZ",
    "XLU",
    "IFGL",
    "XLE"
  ],
  correlationValues: [
    0.9978,
    0.9977,
    0.9909,
    0.9907,
    0.9907,
    0.9902,
    0.9881,
    0.9839,
    0.983,
    0.9818,
    0.8964,
    0.8915,
    0.8242,
    0.7962,
    0.7742,
    0.7386,
    0.7294,
    0.6933,
    0.6446,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const NAIL = {
  ticker: "NAIL",
  tradable: true,
  inceptionDate: "2015-08-19T00:00:00.000Z",
  correlatedTickers: [
    "ITB",
    "XHB",
    "PKB",
    "RSPD",
    "FXD",
    "FXR",
    "JSMD",
    "FLQM",
    "IJK",
    "MDYG",
    "SSO",
    "SPXL",
    "TNA",
    "QLD",
    "TQQQ",
    "TECL",
    "SOXL"
  ],
  correlationValues: [
    0.9993,
    0.9677,
    0.9613,
    0.8376,
    0.8211,
    0.8203,
    0.8102,
    0.81,
    0.8077,
    0.8059,
    0.9564,
    0.9564,
    0.8715,
    0.83,
    0.8288,
    0.8229,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BA = {
  ticker: "BA",
  tradable: true,
  inceptionDate: "1970-01-02T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const CSX = {
  ticker: "CSX",
  tradable: true,
  inceptionDate: "1980-11-03T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const WFC = {
  ticker: "WFC",
  tradable: true,
  inceptionDate: "1972-06-01T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const C = {
  ticker: "C",
  tradable: true,
  inceptionDate: "1977-01-03T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const JPM = {
  ticker: "JPM",
  tradable: true,
  inceptionDate: "1980-03-17T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const ERY = {
  ticker: "ERY",
  tradable: true,
  inceptionDate: "2008-11-06T00:00:00.000Z",
  correlatedTickers: [
    "DUG",
    "OILD",
    "NRGD",
    "DRIP",
    "SCO",
    "DOG",
    "DXD",
    "SDOW",
    "FAZ",
    "TZA",
    "SSO",
    "SPXL",
    "QLD",
    "TECL",
    "SOXL"
  ],
  correlationValues: [
    0.9977,
    0.9944,
    0.9808,
    0.9429,
    0.6872,
    0.6108,
    0.6106,
    0.6106,
    0.6072,
    0.5893,
    0.9564,
    0.9564,
    0.83,
    0.8229,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DPST = {
  ticker: "DPST",
  tradable: true,
  inceptionDate: "2015-08-19T00:00:00.000Z",
  correlatedTickers: [
    "KRE",
    "KBE",
    "IAT",
    "FXO",
    "KBWB",
    "BSVO",
    "BNKU",
    "XSLV",
    "DFSV",
    "VFH",
    "SSO",
    "SPXL",
    "QLD",
    "TECL",
    "SOXL"
  ],
  correlationValues: [
    0.9989,
    0.9913,
    0.9731,
    0.9332,
    0.9331,
    0.8971,
    0.8811,
    0.8575,
    0.8512,
    0.8509,
    0.9564,
    0.9564,
    0.83,
    0.8229,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const WDC = {
  ticker: "WDC",
  tradable: true,
  inceptionDate: "1978-10-31T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const STX = {
  ticker: "STX",
  tradable: true,
  inceptionDate: "2002-12-11T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const IBM = {
  ticker: "IBM",
  tradable: true,
  inceptionDate: "1970-01-02T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const GE = {
  ticker: "GE",
  tradable: true,
  inceptionDate: "1970-01-02T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const UPS = {
  ticker: "UPS",
  tradable: true,
  inceptionDate: "1999-11-10T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const UCO = {
  ticker: "UCO",
  tradable: true,
  inceptionDate: "2008-11-24T00:00:00.000Z",
  correlatedTickers: [
    "OILK",
    "USO",
    "DBO",
    "BNO",
    "USOI",
    "GSG",
    "COMT",
    "PDBC",
    "DBC",
    "CMDT",
    "SSO",
    "QLD",
    "TQQQ",
    "AGQ",
    "BOIL",
    "DGP",
    "UGL"
  ],
  correlationValues: [
    0.9976,
    0.9968,
    0.9863,
    0.9859,
    0.9687,
    0.9504,
    0.9483,
    0.908,
    0.907,
    0.8795,
    0.9564,
    0.83,
    0.8288,
    0.3698,
    0.2835,
    0.2769,
    0.2673
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const YANG = {
  ticker: "YANG",
  tradable: true,
  inceptionDate: "2009-12-03T00:00:00.000Z",
  correlatedTickers: [
    "EDZ",
    "EFZ",
    "EPV",
    "USDU",
    "HIBS",
    "DUST",
    "GDXD",
    "JDST",
    "FNGD",
    "SOXS",
    "SSO",
    "SPXL",
    "QLD",
    "XPP"
  ],
  correlationValues: [
    0.8988,
    0.5744,
    0.5413,
    0.5194,
    0.4875,
    0.4768,
    0.4678,
    0.457,
    0.4413,
    0.438,
    0.9564,
    0.9564,
    0.83,
    0.3887
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const MDB = {
  ticker: "MDB",
  tradable: true,
  inceptionDate: "2017-10-19T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const WANT = {
  ticker: "WANT",
  tradable: true,
  inceptionDate: "2018-11-29T00:00:00.000Z",
  correlatedTickers: [
    "XLY",
    "FDIS",
    "VCR",
    "IYC",
    "CGGR",
    "ARKQ",
    "SFY",
    "FBCG",
    "JGRO",
    "VUG",
    "SSO",
    "SPXL",
    "TNA",
    "QLD",
    "TQQQ",
    "UCC",
    "SOXL"
  ],
  correlationValues: [
    0.9992,
    0.9945,
    0.9944,
    0.9777,
    0.9183,
    0.9073,
    0.9011,
    0.8988,
    0.8962,
    0.8946,
    0.9564,
    0.9564,
    0.8715,
    0.83,
    0.8288,
    0.8015,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const INTC = {
  ticker: "INTC",
  tradable: true,
  inceptionDate: "1980-03-17T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const SDS = {
  ticker: "SDS",
  tradable: true,
  inceptionDate: "2006-07-11T00:00:00.000Z",
  correlatedTickers: [
    "SPXS",
    "SPXU",
    "SH",
    "SPDN",
    "QID",
    "SQQQ",
    "PSQ",
    "HIBS",
    "DOG",
    "SDOW",
    "SPUU",
    "BSEP",
    "POCT",
    "PJUL",
    "PAUG",
    "PSEP",
    "PAPR",
    "UAUG",
    "ACIO",
    "UAPR"
  ],
  correlationValues: [
    0.9997,
    0.9993,
    0.9986,
    0.9986,
    0.942,
    0.942,
    0.9418,
    0.9287,
    0.9269,
    0.9258,
    0.9549,
    0.9425,
    0.9339,
    0.933,
    0.9322,
    0.9295,
    0.9205,
    0.9036,
    0.9004,
    0.8182
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const USO = {
  ticker: "USO",
  tradable: true,
  inceptionDate: "2006-04-10T00:00:00.000Z",
  correlatedTickers: [
    "UCO",
    "OILK",
    "BNO",
    "DBO",
    "USOI",
    "GSG",
    "COMT",
    "PDBC",
    "DBC",
    "CMDT",
    "UMI",
    "USCI",
    "DBE",
    "USL",
    "CPER",
    "UGA",
    "UNG",
    "UNL",
    "RENW",
    "AMPD"
  ],
  correlationValues: [
    0.9968,
    0.9941,
    0.9906,
    0.9892,
    0.973,
    0.9504,
    0.9455,
    0.9041,
    0.9031,
    0.8783,
    0.7468,
    0.4426,
    0.3941,
    0.3688,
    0.3661,
    0.3455,
    0.2741,
    0.2735,
    0.2466,
    0.1041
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const DRIP = {
  ticker: "DRIP",
  tradable: true,
  inceptionDate: "2015-05-28T00:00:00.000Z",
  correlatedTickers: [
    "OILD",
    "DUG",
    "ERY",
    "NRGD",
    "SCO",
    "TZA",
    "RWM",
    "TWM",
    "SRTY",
    "FAZ",
    "SSO",
    "SPXL",
    "QLD",
    "LABU",
    "CHAU"
  ],
  correlationValues: [
    0.9574,
    0.9464,
    0.9429,
    0.9363,
    0.6795,
    0.6608,
    0.6601,
    0.6596,
    0.6595,
    0.6254,
    0.9564,
    0.9564,
    0.83,
    0.6083,
    0.3212
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TBX = {
  ticker: "TBX",
  tradable: true,
  inceptionDate: "2011-04-04T00:00:00.000Z",
  correlatedTickers: [
    "PST",
    "TTT",
    "TBF",
    "TMV",
    "TBT",
    "DBMF",
    "PFIX",
    "KMLM",
    "GLL",
    "CTA",
    "UJB",
    "TMF",
    "UST",
    "UBT"
  ],
  correlationValues: [
    0.991,
    0.9042,
    0.9025,
    0.9012,
    0.9003,
    0.7473,
    0.6755,
    0.6176,
    0.5961,
    0.5522,
    0.7623,
    0.1622,
    0.1565,
    0.1499
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DBC = {
  ticker: "DBC",
  tradable: true,
  inceptionDate: "2006-02-03T00:00:00.000Z",
  correlatedTickers: [
    "PDBC",
    "COMT",
    "GSG",
    "CMDT",
    "FTGC",
    "BCD",
    "DJP",
    "BCI",
    "UCO",
    "DBO",
    "COMB",
    "GCC",
    "CMDY",
    "NBCM",
    "USCI",
    "DBE",
    "DBB",
    "DBA",
    "COM"
  ],
  correlationValues: [
    0.995,
    0.9791,
    0.9732,
    0.9648,
    0.9211,
    0.917,
    0.9149,
    0.9109,
    0.907,
    0.9066,
    0.518,
    0.494,
    0.4936,
    0.4721,
    0.4426,
    0.3941,
    0.3711,
    0.2784,
    0.2011
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const BITI = {
  ticker: "BITI",
  tradable: true,
  inceptionDate: "2022-06-21T00:00:00.000Z",
  correlatedTickers: [
    "SARK",
    "FNGD",
    "QID",
    "PSQ",
    "SQQQ",
    "HDGE",
    "BERZ",
    "HIBS",
    "SRS",
    "SPXS",
    "VERS",
    "CEFD",
    "MLPR",
    "PFFL"
  ],
  correlationValues: [
    0.3788,
    0.3534,
    0.3464,
    0.346,
    0.3456,
    0.3391,
    0.3389,
    0.3365,
    0.3347,
    0.334,
    0.7608,
    0.7397,
    0.6554,
    0.5394
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const GOOGL = {
  ticker: "GOOGL",
  tradable: true,
  inceptionDate: "2004-08-19T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const PG = {
  ticker: "PG",
  tradable: true,
  inceptionDate: "1970-01-02T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const COST = {
  ticker: "COST",
  tradable: true,
  inceptionDate: "1986-07-09T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const MRK = {
  ticker: "MRK",
  tradable: true,
  inceptionDate: "1970-01-02T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const ABBV = {
  ticker: "ABBV",
  tradable: true,
  inceptionDate: "2013-01-02T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const UUP = {
  ticker: "UUP",
  tradable: true,
  inceptionDate: "2007-02-20T00:00:00.000Z",
  correlatedTickers: [
    "EUO",
    "USDU",
    "EFZ",
    "EPV",
    "JDST",
    "GDXD",
    "GLL",
    "DUST",
    "ZSL",
    "EDZ",
    "FXC",
    "FXA",
    "CEW",
    "CYB",
    "FXY"
  ],
  correlationValues: [
    0.9586,
    0.923,
    0.6988,
    0.6978,
    0.6856,
    0.6831,
    0.6818,
    0.6801,
    0.6195,
    0.574,
    0.6802,
    0.6051,
    0.5017,
    0.2867,
    0.1787
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const VWO = {
  ticker: "VWO",
  tradable: true,
  inceptionDate: "2005-03-04T00:00:00.000Z",
  correlatedTickers: [
    "SPEM",
    "SCHE",
    "IEMG",
    "EEM",
    "EDC",
    "DFAE",
    "ESGE",
    "XSOE",
    "AVEM",
    "DFEM",
    "VT",
    "VEA",
    "EFA",
    "VGK",
    "VEU",
    "VXUS",
    "EZU",
    "FEZ",
    "VPL",
    "ILF"
  ],
  correlationValues: [
    0.9971,
    0.9954,
    0.9924,
    0.9919,
    0.9907,
    0.9874,
    0.9848,
    0.9841,
    0.9826,
    0.9794,
    0.9434,
    0.846,
    0.8332,
    0.8264,
    0.8149,
    0.8142,
    0.8121,
    0.8112,
    0.7552,
    0.4063
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SSG = {
  ticker: "SSG",
  tradable: true,
  inceptionDate: "2007-01-30T00:00:00.000Z",
  correlatedTickers: [
    "SOXS",
    "NVDS",
    "TECS",
    "BERZ",
    "QID",
    "PSQ",
    "SQQQ",
    "HIBS",
    "FNGD",
    "SPDN",
    "SSO",
    "SPXL",
    "QLD"
  ],
  correlationValues: [
    0.9695,
    0.9143,
    0.8961,
    0.89,
    0.8658,
    0.8656,
    0.8655,
    0.8493,
    0.823,
    0.7928,
    0.9564,
    0.9564,
    0.83
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const VUG = {
  ticker: "VUG",
  tradable: true,
  inceptionDate: "2004-01-26T00:00:00.000Z",
  correlatedTickers: [
    "MGK",
    "SCHG",
    "IWF",
    "VONG",
    "ILCG",
    "IWY",
    "ONEQ",
    "TQQQ",
    "QLD",
    "QQQ",
    "IWD",
    "VTV",
    "IVE",
    "VOE",
    "IVW",
    "SPYG",
    "VBR",
    "IWO",
    "VBK",
    "IWN"
  ],
  correlationValues: [
    0.9973,
    0.9968,
    0.996,
    0.9947,
    0.994,
    0.993,
    0.9928,
    0.9916,
    0.9915,
    0.9913,
    0.9691,
    0.9598,
    0.959,
    0.9363,
    0.9046,
    0.9039,
    0.8835,
    0.8652,
    0.8605,
    0.8548
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const TECB = {
  ticker: "TECB",
  tradable: true,
  inceptionDate: "2020-01-08T00:00:00.000Z",
  correlatedTickers: [
    "IGM",
    "TQQQ",
    "QQQ",
    "IYW",
    "QLD",
    "QQQM",
    "VUG",
    "ONEQ",
    "SCHG",
    "VGT",
    "XLI",
    "XLF",
    "XLK",
    "XLV",
    "XLY",
    "IBB",
    "SOXX",
    "ITB",
    "XLU",
    "XLE"
  ],
  correlationValues: [
    0.985,
    0.975,
    0.9744,
    0.9743,
    0.9743,
    0.9739,
    0.9737,
    0.9733,
    0.9716,
    0.9709,
    0.8964,
    0.8915,
    0.8242,
    0.7962,
    0.7742,
    0.7269,
    0.719,
    0.7179,
    0.6933,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const NRGU = {
  ticker: "NRGU",
  tradable: true,
  inceptionDate: "2019-04-10T00:00:00.000Z",
  correlatedTickers: [
    "OILU",
    "ERX",
    "XLE",
    "FENY",
    "IEO",
    "VDE",
    "DIG",
    "FTXN",
    "IYE",
    "RSPG",
    "SSO",
    "SPXL",
    "QLD",
    "BNKU",
    "FNGU"
  ],
  correlationValues: [
    0.9825,
    0.9783,
    0.9782,
    0.9762,
    0.9761,
    0.976,
    0.9758,
    0.9736,
    0.9735,
    0.9724,
    0.9564,
    0.9564,
    0.83,
    0.7518,
    0.6704
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BOIL = {
  ticker: "BOIL",
  tradable: true,
  inceptionDate: "2011-10-04T00:00:00.000Z",
  correlatedTickers: [
    "UNG",
    "DJP",
    "BCI",
    "BCD",
    "FXN",
    "FCG",
    "GUSH",
    "XOP",
    "FTGC",
    "PXE",
    "SSO",
    "QLD",
    "TQQQ",
    "AGQ",
    "UCO",
    "DGP",
    "UGL"
  ],
  correlationValues: [
    0.9865,
    0.5058,
    0.4933,
    0.4133,
    0.4029,
    0.3989,
    0.3805,
    0.3785,
    0.3696,
    0.3664,
    0.9564,
    0.83,
    0.8288,
    0.3698,
    0.3603,
    0.2769,
    0.2673
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const VPU = {
  ticker: "VPU",
  tradable: true,
  inceptionDate: "2004-01-26T00:00:00.000Z",
  correlatedTickers: [
    "FUTY",
    "XLU",
    "UTSL",
    "IDU",
    "RSPU",
    "FXU",
    "SPLV",
    "LVHD",
    "FVD",
    "LGLV",
    "XLI",
    "XLF",
    "VGT",
    "XLK",
    "VNQ",
    "XLV",
    "XLP",
    "XLY",
    "VDE",
    "XLE"
  ],
  correlationValues: [
    0.9987,
    0.997,
    0.9968,
    0.996,
    0.9918,
    0.968,
    0.8947,
    0.8593,
    0.8446,
    0.8108,
    0.8964,
    0.8915,
    0.8292,
    0.8242,
    0.7963,
    0.7962,
    0.7838,
    0.7742,
    0.588,
    0.5812
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const CORP = {
  ticker: "CORP",
  tradable: true,
  inceptionDate: "2010-09-20T00:00:00.000Z",
  correlatedTickers: [
    "GIGB",
    "VCEB",
    "IGIB",
    "LQD",
    "SUSC",
    "QLTA",
    "VCIT",
    "VTC",
    "SCHI",
    "BSCU",
    "HYG",
    "JNK",
    "BKLN",
    "VCLT",
    "USIG",
    "VCSH",
    "SPIB",
    "IGSB",
    "LTPZ",
    "ZROZ"
  ],
  correlationValues: [
    0.9708,
    0.9662,
    0.9647,
    0.9637,
    0.9616,
    0.9615,
    0.9613,
    0.9586,
    0.9584,
    0.9563,
    0.7675,
    0.7596,
    0.6402,
    0.4281,
    0.423,
    0.388,
    0.3874,
    0.3566,
    0.2565,
    0.1459
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const STIP = {
  ticker: "STIP",
  tradable: true,
  inceptionDate: "2010-12-01T00:00:00.000Z",
  correlatedTickers: [
    "TDTT",
    "STPZ",
    "VTIP",
    "TIPX",
    "TDTF",
    "DFIP",
    "TIP",
    "SCHP",
    "SPIP",
    "ISTB",
    "LQD",
    "WIP",
    "GTIP",
    "PBTP",
    "TIPZ",
    "LTPZ",
    "IEF",
    "TLT",
    "RINF"
  ],
  correlationValues: [
    0.9698,
    0.9696,
    0.9666,
    0.9617,
    0.9448,
    0.938,
    0.9214,
    0.9179,
    0.8941,
    0.8349,
    0.4452,
    0.4162,
    0.2876,
    0.2826,
    0.2677,
    0.2565,
    0.1737,
    0.1609,
    0.1265
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const VOOG = {
  ticker: "VOOG",
  tradable: true,
  inceptionDate: "2010-09-07T00:00:00.000Z",
  correlatedTickers: [
    "SPYG",
    "IVW",
    "IUSG",
    "ILCG",
    "IWL",
    "XLG",
    "OEF",
    "MGC",
    "IQSU",
    "IWF",
    "IWD",
    "VTV",
    "IVE",
    "SPYV",
    "VOE",
    "VBR",
    "IWO",
    "VBK",
    "VUG",
    "IWN"
  ],
  correlationValues: [
    0.9995,
    0.9994,
    0.9984,
    0.9843,
    0.9829,
    0.9824,
    0.982,
    0.9818,
    0.9816,
    0.9813,
    0.9691,
    0.9598,
    0.959,
    0.9583,
    0.9363,
    0.8835,
    0.8652,
    0.8605,
    0.857,
    0.8548
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const VOOV = {
  ticker: "VOOV",
  tradable: true,
  inceptionDate: "2010-09-07T00:00:00.000Z",
  correlatedTickers: [
    "IVE",
    "SPYV",
    "IUSV",
    "FNDB",
    "FNDX",
    "EQWL",
    "ILCV",
    "JHML",
    "PRF",
    "RSP",
    "IWD",
    "VTV",
    "VOE",
    "IVW",
    "VBR",
    "IWF",
    "IWO",
    "VBK",
    "VUG",
    "IWN"
  ],
  correlationValues: [
    0.9992,
    0.9988,
    0.9977,
    0.9793,
    0.9791,
    0.9776,
    0.9775,
    0.9752,
    0.9744,
    0.9732,
    0.9691,
    0.9598,
    0.9363,
    0.9046,
    0.8835,
    0.875,
    0.8652,
    0.8605,
    0.857,
    0.8548
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SHY = {
  ticker: "SHY",
  tradable: true,
  inceptionDate: "2002-07-22T00:00:00.000Z",
  correlatedTickers: [
    "VGSH",
    "SCHO",
    "TUA",
    "UTWO",
    "SPTS",
    "IBTF",
    "IBTG",
    "BSV",
    "IBTH",
    "IEI",
    "EMB",
    "LQD",
    "TIP",
    "AGG",
    "IEF",
    "TLT",
    "SPTL",
    "TLH"
  ],
  correlationValues: [
    0.9827,
    0.9805,
    0.9775,
    0.9761,
    0.9745,
    0.9645,
    0.9601,
    0.9539,
    0.9438,
    0.9398,
    0.5655,
    0.4452,
    0.2961,
    0.2807,
    0.1737,
    0.1609,
    0.1608,
    0.1588
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const E = {
  ticker: "E",
  tradable: true,
  inceptionDate: "1995-11-28T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const SCHD = {
  ticker: "SCHD",
  tradable: true,
  inceptionDate: "2011-10-20T00:00:00.000Z",
  correlatedTickers: [
    "VYM",
    "SCHV",
    "DTD",
    "VTV",
    "DIVB",
    "DGRO",
    "NULV",
    "DLN",
    "ILCV",
    "PRF",
    "VIG",
    "SCHX",
    "SCDL",
    "FVD",
    "SDY",
    "DVY",
    "FDL",
    "DFAS",
    "DFAT",
    "SCHG"
  ],
  correlationValues: [
    0.9786,
    0.9765,
    0.9762,
    0.9754,
    0.974,
    0.9737,
    0.9734,
    0.9731,
    0.9721,
    0.9698,
    0.9801,
    0.9536,
    0.9418,
    0.9316,
    0.9242,
    0.9062,
    0.8798,
    0.8762,
    0.8489,
    0.8486
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const A = {
  ticker: "A",
  tradable: true,
  inceptionDate: "1999-11-18T00:00:00.000Z",
  correlatedTickers: [],
  correlationValues: [],
  isIndividualAsset: true,
  isK1Ticker: false
};
const CTA = {
  ticker: "CTA",
  tradable: true,
  inceptionDate: "2022-03-08T00:00:00.000Z",
  correlatedTickers: [
    "PST",
    "DBMF",
    "TBX",
    "KMLM",
    "VRIG",
    "FLTR",
    "FLRN",
    "FLOT",
    "GLL",
    "ZSL",
    "AOA",
    "AOR",
    "AOM",
    "PINK",
    "RLY",
    "AOK",
    "SVOL",
    "DRSK",
    "FPEI"
  ],
  correlationValues: [
    0.5532,
    0.5527,
    0.5522,
    0.5274,
    0.5136,
    0.4873,
    0.4662,
    0.4537,
    0.4397,
    0.4362,
    0.9367,
    0.8799,
    0.8226,
    0.7976,
    0.7887,
    0.7438,
    0.6784,
    0.3602,
    0.3593
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const VXX = {
  ticker: "VXX",
  tradable: true,
  inceptionDate: "2018-01-17T00:00:00.000Z",
  correlatedTickers: [
    "VIXY",
    "UVXY",
    "UVIX",
    "VIXM",
    "FAZ",
    "SRTY",
    "RWM",
    "TWM",
    "TZA",
    "SH",
    "JEPI",
    "DIVO",
    "PKW",
    "MOAT",
    "XYLD",
    "QYLD",
    "PTLC",
    "GRN"
  ],
  correlationValues: [
    0.9967,
    0.9955,
    0.9952,
    0.9227,
    0.6784,
    0.6745,
    0.6742,
    0.6734,
    0.6734,
    0.6716,
    0.9306,
    0.9276,
    0.9137,
    0.904,
    0.8265,
    0.8225,
    0.5544,
    0.0889
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SPHB = {
  ticker: "SPHB",
  tradable: true,
  inceptionDate: "2011-05-05T00:00:00.000Z",
  correlatedTickers: [
    "HIBL",
    "IWP",
    "QQQE",
    "QQEW",
    "VOT",
    "QQQJ",
    "XT",
    "MOAT",
    "IMCG",
    "FXL",
    "PRF",
    "SUSA",
    "SPHQ",
    "USMV",
    "DSI",
    "QUAL",
    "PDP",
    "XMLV",
    "SPLV",
    "DWAS"
  ],
  correlationValues: [
    0.9989,
    0.9581,
    0.9578,
    0.9575,
    0.9567,
    0.9567,
    0.955,
    0.954,
    0.9539,
    0.9529,
    0.9674,
    0.953,
    0.9468,
    0.94,
    0.9332,
    0.9325,
    0.9085,
    0.8669,
    0.855,
    0.8134
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const XLE = {
  ticker: "XLE",
  tradable: true,
  inceptionDate: "1998-12-16T00:00:00.000Z",
  correlatedTickers: [
    "ERX",
    "DIG",
    "VDE",
    "FENY",
    "IYE",
    "OILU",
    "RSPG",
    "IXC",
    "NRGU",
    "IGE",
    "XLI",
    "XLF",
    "XLB",
    "XLK",
    "XLV",
    "XHB",
    "XLP",
    "XLY",
    "XLU",
    "XBI"
  ],
  correlationValues: [
    0.9991,
    0.9976,
    0.9972,
    0.9968,
    0.996,
    0.9948,
    0.9846,
    0.9832,
    0.9782,
    0.9738,
    0.8964,
    0.8915,
    0.8819,
    0.8242,
    0.7962,
    0.7846,
    0.7838,
    0.7742,
    0.6933,
    0.6096
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const COM = {
  ticker: "COM",
  tradable: true,
  inceptionDate: "2017-03-30T00:00:00.000Z",
  correlatedTickers: [
    "FTGC",
    "USCI",
    "GLTR",
    "CANE",
    "CMDT",
    "SIVR",
    "SLV",
    "AGQ",
    "BCI",
    "BCD",
    "QQQE",
    "DJP",
    "GCC",
    "NBCM",
    "DBC",
    "PDBC",
    "GSG",
    "COMT"
  ],
  correlationValues: [
    0.523,
    0.5228,
    0.5023,
    0.5006,
    0.495,
    0.4922,
    0.4914,
    0.4881,
    0.4876,
    0.4843,
    0.8759,
    0.5128,
    0.494,
    0.4721,
    0.458,
    0.4553,
    0.4336,
    0.4323
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DIG = {
  ticker: "DIG",
  tradable: true,
  inceptionDate: "2007-01-30T00:00:00.000Z",
  correlatedTickers: [
    "ERX",
    "VDE",
    "FENY",
    "XLE",
    "IYE",
    "OILU",
    "RSPG",
    "IXC",
    "NRGU",
    "FTXN",
    "SSO",
    "SPXL",
    "UPRO",
    "QLD",
    "TQQQ",
    "UCO"
  ],
  correlationValues: [
    0.9981,
    0.9979,
    0.9978,
    0.9976,
    0.9973,
    0.9947,
    0.985,
    0.9819,
    0.9758,
    0.9756,
    0.9564,
    0.9564,
    0.9563,
    0.83,
    0.8288,
    0.3603
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SMN = {
  ticker: "SMN",
  tradable: true,
  inceptionDate: "2007-01-30T00:00:00.000Z",
  correlatedTickers: [
    "TZA",
    "RWM",
    "TWM",
    "SRTY",
    "EFZ",
    "SH",
    "SDS",
    "SPXU",
    "DOG",
    "SPXS",
    "SSO",
    "SPXL",
    "TNA",
    "UYM",
    "QLD",
    "TQQQ"
  ],
  correlationValues: [
    0.8285,
    0.8281,
    0.8272,
    0.8268,
    0.8127,
    0.8041,
    0.8026,
    0.8021,
    0.802,
    0.8013,
    0.9564,
    0.9564,
    0.8715,
    0.8517,
    0.83,
    0.8288
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const UNG = {
  ticker: "UNG",
  tradable: true,
  inceptionDate: "2007-04-18T00:00:00.000Z",
  correlatedTickers: [
    "BOIL",
    "DJP",
    "BCI",
    "BCD",
    "FXN",
    "FCG",
    "GUSH",
    "XOP",
    "FTGC",
    "PXE",
    "USCI",
    "DBE",
    "USL",
    "OILK",
    "DBO",
    "USO",
    "USOI",
    "BNO",
    "UGA",
    "UNL"
  ],
  correlationValues: [
    0.9865,
    0.5018,
    0.4871,
    0.4143,
    0.4001,
    0.3973,
    0.3789,
    0.3769,
    0.3656,
    0.3645,
    0.4426,
    0.3941,
    0.3688,
    0.3634,
    0.3586,
    0.3552,
    0.3492,
    0.3475,
    0.3455,
    0.2735
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const KOLD = {
  ticker: "KOLD",
  tradable: true,
  inceptionDate: "2011-10-04T00:00:00.000Z",
  correlatedTickers: [
    "DRIP",
    "OILD",
    "DUG",
    "ERY",
    "BILZ",
    "NRGD",
    "FAZ",
    "KMLM",
    "DOG",
    "SDOW",
    "AGQ",
    "UCO",
    "DGP",
    "UGL"
  ],
  correlationValues: [
    0.3823,
    0.3077,
    0.2964,
    0.2839,
    0.2821,
    0.2617,
    0.2485,
    0.2481,
    0.2459,
    0.2447,
    0.3698,
    0.3603,
    0.2769,
    0.2673
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const DBE = {
  ticker: "DBE",
  tradable: true,
  inceptionDate: "2007-01-05T00:00:00.000Z",
  correlatedTickers: [
    "GSG",
    "COMT",
    "UCO",
    "OILK",
    "USO",
    "DBO",
    "BNO",
    "DBC",
    "PDBC",
    "USOI",
    "DBB",
    "USL",
    "UGA",
    "DBP",
    "DBA",
    "UNG",
    "UNL",
    "RENW",
    "USE",
    "AMPD"
  ],
  correlationValues: [
    0.9667,
    0.9633,
    0.961,
    0.9603,
    0.9565,
    0.9542,
    0.9535,
    0.9413,
    0.9398,
    0.9287,
    0.3711,
    0.3688,
    0.3455,
    0.3265,
    0.2784,
    0.2741,
    0.2735,
    0.2466,
    0.2402,
    0.1041
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const FCG = {
  ticker: "FCG",
  tradable: true,
  inceptionDate: "2007-05-08T00:00:00.000Z",
  correlatedTickers: [
    "XOP",
    "GUSH",
    "FXN",
    "PXE",
    "IEO",
    "RSPG",
    "PXI",
    "FTXN",
    "OILU",
    "FENY",
    "IXJ",
    "FXG",
    "QTEC",
    "FDN",
    "SMH",
    "URA",
    "IXC",
    "GDXJ",
    "GDX",
    "KWEB"
  ],
  correlationValues: [
    0.9878,
    0.9875,
    0.9837,
    0.9733,
    0.9686,
    0.9683,
    0.9632,
    0.9603,
    0.9541,
    0.9506,
    0.8097,
    0.794,
    0.7549,
    0.727,
    0.7067,
    0.6335,
    0.599,
    0.4518,
    0.4466,
    0.3666
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DUG = {
  ticker: "DUG",
  tradable: true,
  inceptionDate: "2007-01-30T00:00:00.000Z",
  correlatedTickers: [
    "ERY",
    "OILD",
    "NRGD",
    "DRIP",
    "SCO",
    "DOG",
    "DXD",
    "SDOW",
    "FAZ",
    "TZA",
    "SSO",
    "SPXL",
    "QLD"
  ],
  correlationValues: [
    0.9977,
    0.9941,
    0.9782,
    0.9464,
    0.6854,
    0.6129,
    0.6128,
    0.6126,
    0.6075,
    0.5928,
    0.9564,
    0.9564,
    0.83
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const NRGD = {
  ticker: "NRGD",
  tradable: true,
  inceptionDate: "2019-04-10T00:00:00.000Z",
  correlatedTickers: [
    "OILD",
    "ERY",
    "DUG",
    "DRIP",
    "SCO",
    "DXD",
    "DOG",
    "FAZ",
    "SDOW",
    "TZA",
    "SSO",
    "SPXL",
    "QLD",
    "BNKU",
    "FNGU"
  ],
  correlationValues: [
    0.9835,
    0.9808,
    0.9782,
    0.9363,
    0.664,
    0.5678,
    0.5675,
    0.5672,
    0.567,
    0.5478,
    0.9564,
    0.9564,
    0.83,
    0.7518,
    0.6704
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SVOL = {
  ticker: "SVOL",
  tradable: true,
  inceptionDate: "2021-05-13T00:00:00.000Z",
  correlatedTickers: [
    "SVXY",
    "SVIX",
    "AUGW",
    "GJUL",
    "XBJL",
    "XAUG",
    "LGRO",
    "SSO",
    "SPXL",
    "QLD",
    "PINK"
  ],
  correlationValues: [
    0.8567,
    0.8556,
    0.7458,
    0.726,
    0.7126,
    0.7119,
    0.7022,
    0.9564,
    0.9564,
    0.83,
    0.7976
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const OILU = {
  ticker: "OILU",
  tradable: true,
  inceptionDate: "2021-11-09T00:00:00.000Z",
  correlatedTickers: [
    "FENY",
    "VDE",
    "XLE",
    "DIG",
    "ERX",
    "IYE",
    "RSPG",
    "FTXN",
    "NRGU",
    "IEO",
    "SSO",
    "SPXL",
    "QLD",
    "BNKU",
    "FNGU"
  ],
  correlationValues: [
    0.9961,
    0.9961,
    0.9948,
    0.9947,
    0.9947,
    0.9943,
    0.991,
    0.9835,
    0.9825,
    0.9819,
    0.9564,
    0.9564,
    0.83,
    0.7518,
    0.6704
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DBO = {
  ticker: "DBO",
  tradable: true,
  inceptionDate: "2007-01-05T00:00:00.000Z",
  correlatedTickers: [
    "USO",
    "UCO",
    "OILK",
    "BNO",
    "USOI",
    "COMT",
    "GSG",
    "DBC",
    "PDBC",
    "CMDT",
    "DBE",
    "DBB",
    "USL",
    "UGA",
    "DBP",
    "DBA",
    "UNG",
    "UNL",
    "RENW",
    "AMPD"
  ],
  correlationValues: [
    0.9892,
    0.9863,
    0.9833,
    0.9768,
    0.963,
    0.9473,
    0.9435,
    0.9066,
    0.9053,
    0.8744,
    0.3941,
    0.3711,
    0.3688,
    0.3455,
    0.3265,
    0.2784,
    0.2741,
    0.2735,
    0.2466,
    0.1041
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const URA = {
  ticker: "URA",
  tradable: true,
  inceptionDate: "2010-11-04T00:00:00.000Z",
  correlatedTickers: [
    "URNM",
    "URNJ",
    "NLR",
    "GWX",
    "GUNR",
    "INFL",
    "GNR",
    "VSS",
    "EWC",
    "XME",
    "IXN",
    "IXJ",
    "SMH",
    "COPX",
    "IXC",
    "SIL",
    "GOEX",
    "GDXJ",
    "GDX",
    "KWEB"
  ],
  correlationValues: [
    0.9725,
    0.945,
    0.904,
    0.7197,
    0.715,
    0.7144,
    0.7098,
    0.7085,
    0.708,
    0.7065,
    0.826,
    0.8097,
    0.7067,
    0.6055,
    0.599,
    0.4754,
    0.46,
    0.4518,
    0.4466,
    0.3666
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const DBA = {
  ticker: "DBA",
  tradable: true,
  inceptionDate: "2007-01-05T00:00:00.000Z",
  correlatedTickers: [
    "FTGC",
    "WEAT",
    "CORN",
    "BCD",
    "USCI",
    "DJP",
    "BCI",
    "CANE",
    "CMDT",
    "PDBC",
    "DBC",
    "DBE",
    "DBB",
    "DBO",
    "DBP",
    "PDBA",
    "SOYB",
    "TILL",
    "TAGS",
    "OAIA"
  ],
  correlationValues: [
    0.6552,
    0.6279,
    0.6102,
    0.6073,
    0.6063,
    0.5967,
    0.5949,
    0.5341,
    0.5314,
    0.5264,
    0.458,
    0.3941,
    0.3711,
    0.3586,
    0.3265,
    0.2488,
    0.1741,
    0.1558,
    0.1498,
    0.1415
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const DBB = {
  ticker: "DBB",
  tradable: true,
  inceptionDate: "2007-01-05T00:00:00.000Z",
  correlatedTickers: [
    "CPER",
    "COPX",
    "PICK",
    "EMC",
    "KBA",
    "ASHR",
    "CHAU",
    "EMGF",
    "BBAX",
    "GEM",
    "DBC",
    "PPLT",
    "SLV",
    "SIVR",
    "DBO",
    "DBA",
    "GLD",
    "IAU",
    "SGOL",
    "OUNZ"
  ],
  correlationValues: [
    0.8592,
    0.749,
    0.7399,
    0.683,
    0.6339,
    0.6317,
    0.6301,
    0.628,
    0.6271,
    0.6258,
    0.458,
    0.3811,
    0.3675,
    0.3653,
    0.3586,
    0.2784,
    0.27,
    0.2677,
    0.2628,
    0.2585
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const OILD = {
  ticker: "OILD",
  tradable: true,
  inceptionDate: "2021-11-09T00:00:00.000Z",
  correlatedTickers: [
    "ERY",
    "DUG",
    "NRGD",
    "DRIP",
    "SCO",
    "FAZ",
    "DOG",
    "DXD",
    "SDOW",
    "TZA",
    "SSO",
    "SPXL",
    "QLD",
    "BNKU",
    "FNGU"
  ],
  correlationValues: [
    0.9944,
    0.9941,
    0.9835,
    0.9574,
    0.6867,
    0.6019,
    0.5985,
    0.5984,
    0.5983,
    0.594,
    0.9564,
    0.9564,
    0.83,
    0.7518,
    0.6704
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const JDST = {
  ticker: "JDST",
  tradable: true,
  inceptionDate: "2013-10-03T00:00:00.000Z",
  correlatedTickers: [
    "GDXD",
    "DUST",
    "GLL",
    "ZSL",
    "USDU",
    "UUP",
    "EUO",
    "EFZ",
    "EDZ",
    "EPV",
    "SSO",
    "SPXL",
    "QLD",
    "TECL",
    "SOXL"
  ],
  correlationValues: [
    0.988,
    0.9783,
    0.8286,
    0.7938,
    0.691,
    0.6856,
    0.6105,
    0.5817,
    0.5796,
    0.5711,
    0.9564,
    0.9564,
    0.83,
    0.8229,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const GDX = {
  ticker: "GDX",
  tradable: true,
  inceptionDate: "2006-05-16T00:00:00.000Z",
  correlatedTickers: [
    "NUGT",
    "GDXU",
    "RING",
    "GDXJ",
    "JNUG",
    "SIL",
    "SILJ",
    "GLTR",
    "GLD",
    "UGL",
    "IXN",
    "MOO",
    "IXJ",
    "NLR",
    "SMH",
    "REMX",
    "URA",
    "FCG",
    "IXC",
    "KWEB"
  ],
  correlationValues: [
    0.9979,
    0.9925,
    0.9867,
    0.9813,
    0.9802,
    0.9585,
    0.937,
    0.8513,
    0.8359,
    0.8354,
    0.826,
    0.8152,
    0.8097,
    0.7266,
    0.7067,
    0.6577,
    0.6335,
    0.6153,
    0.599,
    0.3666
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const GLL = {
  ticker: "GLL",
  tradable: true,
  inceptionDate: "2008-12-01T00:00:00.000Z",
  correlatedTickers: [
    "GDXD",
    "DUST",
    "JDST",
    "ZSL",
    "USDU",
    "UUP",
    "TBX",
    "PST",
    "EUO",
    "DBMF",
    "AGQ",
    "UCO",
    "BOIL",
    "DGP"
  ],
  correlationValues: [
    0.8358,
    0.8355,
    0.8286,
    0.798,
    0.6864,
    0.6818,
    0.5961,
    0.5874,
    0.5852,
    0.5483,
    0.3698,
    0.3603,
    0.2835,
    0.2769
  ],
  isIndividualAsset: false,
  isK1Ticker: true
};
const DUST = {
  ticker: "DUST",
  tradable: true,
  inceptionDate: "2010-12-08T00:00:00.000Z",
  correlatedTickers: [
    "GDXD",
    "JDST",
    "GLL",
    "ZSL",
    "USDU",
    "UUP",
    "EUO",
    "EDZ",
    "EFZ",
    "EPV",
    "SSO",
    "SPXL",
    "QLD",
    "TECL",
    "SOXL"
  ],
  correlationValues: [
    0.9955,
    0.9783,
    0.8355,
    0.7827,
    0.6895,
    0.6801,
    0.6054,
    0.5875,
    0.5783,
    0.5651,
    0.9564,
    0.9564,
    0.83,
    0.8229,
    0.7171
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SPYV = {
  ticker: "SPYV",
  tradable: true,
  inceptionDate: "2000-09-25T00:00:00.000Z",
  correlatedTickers: [
    "IVE",
    "VOOV",
    "IUSV",
    "FNDB",
    "FNDX",
    "EQWL",
    "ILCV",
    "JHML",
    "PRF",
    "RSP",
    "IWD",
    "VTV",
    "IVW",
    "SPYG",
    "IWF",
    "IWO",
    "SLYG",
    "VUG",
    "IWN",
    "SLYV"
  ],
  correlationValues: [
    0.9993,
    0.9988,
    0.9979,
    0.9792,
    0.979,
    0.9787,
    0.978,
    0.975,
    0.9748,
    0.9735,
    0.9691,
    0.9598,
    0.9046,
    0.9039,
    0.875,
    0.8652,
    0.8615,
    0.857,
    0.8548,
    0.8328
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const UBT = {
  ticker: "UBT",
  tradable: true,
  inceptionDate: "2010-01-19T00:00:00.000Z",
  correlatedTickers: [
    "TMF",
    "TLT",
    "SPTL",
    "SCHQ",
    "VGLT",
    "EDV",
    "ZROZ",
    "TLH",
    "GOVI",
    "BLV",
    "SSO",
    "UPRO",
    "QLD",
    "TQQQ",
    "UJB",
    "UCO",
    "TYD",
    "UST",
    "BBLB"
  ],
  correlationValues: [
    0.9946,
    0.9946,
    0.9941,
    0.9931,
    0.9928,
    0.9901,
    0.9853,
    0.9824,
    0.9778,
    0.9674,
    0.9564,
    0.9563,
    0.83,
    0.8288,
    0.7623,
    0.3603,
    0.1654,
    0.1565,
    0.054
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BITX = {
  inceptionDate: "2023-06-27T00:00:00.000Z",
  correlatedTickers: [
    "BITO",
    "BTF",
    "WGMI",
    "BKCH",
    "FDIG",
    "BLOK",
    "CONY",
    "CONL",
    "KOMP",
    "ARKW",
    "CEFD",
    "SVIX",
    "MLPR",
    "ZIVB",
    "PFFL"
  ],
  correlationValues: [
    0.9987,
    0.9981,
    0.7805,
    0.7585,
    0.7507,
    0.7166,
    0.6604,
    0.6302,
    0.4443,
    0.4395,
    0.7397,
    0.6639,
    0.6554,
    0.6444,
    0.5394
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BTF = {
  inceptionDate: "2021-10-22T00:00:00.000Z",
  correlatedTickers: [
    "BITO",
    "BITX",
    "WGMI",
    "BKCH",
    "BLOK",
    "CONY",
    "FDIG",
    "CONL",
    "ARKW",
    "GAUG",
    "PFXF",
    "PFF",
    "AMJ",
    "AMLP",
    "PGX",
    "PGF",
    "FPE"
  ],
  correlationValues: [
    0.9986,
    0.9981,
    0.7227,
    0.6888,
    0.6887,
    0.6758,
    0.6483,
    0.4912,
    0.4397,
    0.4255,
    0.7202,
    0.6471,
    0.6317,
    0.5923,
    0.5429,
    0.5288,
    0.4885
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BKCH = {
  inceptionDate: "2021-07-14T00:00:00.000Z",
  correlatedTickers: [
    "FDIG",
    "WGMI",
    "BLOK",
    "CONY",
    "CONL",
    "BITX",
    "ARKW",
    "ARKF",
    "ARKK",
    "BITO",
    "IGF",
    "XYLD",
    "QYLD",
    "EFG",
    "EFV",
    "BOTZ",
    "ICLN",
    "PBW",
    "LIT",
    "TAN"
  ],
  correlationValues: [
    0.9601,
    0.9393,
    0.9254,
    0.8436,
    0.8215,
    0.7585,
    0.7362,
    0.7253,
    0.6942,
    0.6941,
    0.8664,
    0.8265,
    0.8225,
    0.8178,
    0.8054,
    0.7949,
    0.7114,
    0.7019,
    0.6521,
    0.6298
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const BLOK = {
  inceptionDate: "2018-01-17T00:00:00.000Z",
  correlatedTickers: [
    "FDIG",
    "BKCH",
    "WGMI",
    "CONY",
    "ARKW",
    "ARKF",
    "CONL",
    "KOMP",
    "FINX",
    "ARKK",
    "DIVO",
    "IGF",
    "EFG",
    "EFV",
    "YYY",
    "IBUY",
    "ICLN",
    "PBW",
    "LIT",
    "TAN"
  ],
  correlationValues: [
    0.9438,
    0.9254,
    0.8919,
    0.8409,
    0.8187,
    0.8127,
    0.8027,
    0.8026,
    0.7967,
    0.781,
    0.9276,
    0.8664,
    0.8178,
    0.8054,
    0.7181,
    0.7152,
    0.7114,
    0.7019,
    0.6521,
    0.6298
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const FDIG = {
  inceptionDate: "2022-04-21T00:00:00.000Z",
  correlatedTickers: [
    "BKCH",
    "BLOK",
    "WGMI",
    "CONY",
    "CONL",
    "ARKW",
    "ARKF",
    "ARKK",
    "FINX",
    "TARK",
    "IGF",
    "EFG",
    "EFV",
    "ICLN",
    "PBW",
    "LIT",
    "TAN"
  ],
  correlationValues: [
    0.9601,
    0.9438,
    0.9252,
    0.8462,
    0.8407,
    0.7918,
    0.7908,
    0.7561,
    0.7545,
    0.7534,
    0.8664,
    0.8178,
    0.8054,
    0.7114,
    0.7019,
    0.6521,
    0.6298
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const SARK = {
  inceptionDate: "2021-11-09T00:00:00.000Z",
  correlatedTickers: [
    "WEBS",
    "BTAL",
    "HIBS",
    "HDGE",
    "BERZ",
    "FNGD",
    "QID",
    "SQQQ",
    "PSQ",
    "SRTY",
    "SSO",
    "SPXL",
    "CHGX",
    "QLD",
    "WUGI",
    "THCX"
  ],
  correlationValues: [
    0.8866,
    0.8577,
    0.8445,
    0.8372,
    0.8092,
    0.8065,
    0.8028,
    0.8028,
    0.8009,
    0.7734,
    0.9564,
    0.9564,
    0.9408,
    0.83,
    0.6734,
    0.5047
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const FNGD = {
  inceptionDate: "2018-01-22T00:00:00.000Z",
  correlatedTickers: [
    "BERZ",
    "QID",
    "SQQQ",
    "PSQ",
    "WEBS",
    "TECS",
    "HIBS",
    "SOXS",
    "SPXS",
    "SPXU",
    "SSO",
    "SPXL",
    "TNA",
    "BNKU",
    "SOXL",
    "FNGG",
    "NRGU"
  ],
  correlationValues: [
    0.9511,
    0.9376,
    0.9374,
    0.9368,
    0.9059,
    0.8832,
    0.8419,
    0.8256,
    0.8188,
    0.8186,
    0.9564,
    0.9564,
    0.8715,
    0.7518,
    0.7171,
    0.6816,
    0.5282
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const PST = {
  inceptionDate: "2008-04-29T00:00:00.000Z",
  correlatedTickers: [
    "TBX",
    "TTT",
    "TBF",
    "TBT",
    "TMV",
    "DBMF",
    "PFIX",
    "KMLM",
    "GLL",
    "CTA",
    "UJB",
    "TMF",
    "UST",
    "UBT"
  ],
  correlationValues: [
    0.991,
    0.9037,
    0.9014,
    0.9011,
    0.9006,
    0.7438,
    0.6761,
    0.6002,
    0.5874,
    0.5532,
    0.7623,
    0.1622,
    0.1565,
    0.1499
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const FENY = {
  inceptionDate: "2013-10-24T00:00:00.000Z",
  correlatedTickers: [
    "VDE",
    "DIG",
    "ERX",
    "IYE",
    "XLE",
    "OILU",
    "RSPG",
    "IXC",
    "FTXN",
    "IGE",
    "XLI",
    "XLF",
    "ONEQ",
    "FTEC",
    "XLK",
    "XLV",
    "XLP",
    "XLY",
    "XLU",
    "FBND"
  ],
  correlationValues: [
    0.9993,
    0.9978,
    0.9972,
    0.997,
    0.9968,
    0.9961,
    0.9881,
    0.9841,
    0.9803,
    0.9791,
    0.8964,
    0.8915,
    0.8505,
    0.8287,
    0.8242,
    0.7962,
    0.7838,
    0.7742,
    0.6933,
    0.3671
  ],
  isIndividualAsset: false,
  isK1Ticker: false
};
const cacheData = {
  AGG,
  QQQ,
  PSQ,
  DOG,
  SH,
  RWM,
  TBF,
  TECL,
  TQQQ,
  DRN,
  URTY,
  SOXL,
  EDC,
  XLK,
  XLRE,
  IWM,
  SOXX,
  EEM,
  TECS,
  SQQQ,
  DRV,
  SRTY,
  TMV,
  DIA,
  SPLV,
  SHV,
  TLT,
  HYG,
  BIL,
  DBMF,
  VIXY,
  VTV,
  VOX,
  XLY,
  SPY,
  XLP,
  KMLM,
  FMF,
  WTMF,
  BSV,
  GLD,
  QLD,
  IEF,
  QID,
  SMH,
  USD,
  EMB,
  BWZ,
  EDZ,
  EEMV,
  VIXM,
  IYY,
  MSFT,
  AAPL,
  NVDA,
  AMZN,
  GOOG,
  META,
  LLY,
  AVGO,
  TSLA,
  AMD,
  NFLX,
  ADBE,
  TMF,
  UPRO,
  UVXY,
  SVXY,
  SPXU,
  SOXS,
  BND,
  FAS,
  XLU,
  BTAL,
  USDU,
  VTI,
  UGL,
  SPXS,
  TYO,
  GBTC,
  BITO,
  WGMI,
  MSTR,
  COIN,
  MARA,
  CLSK,
  RIOT,
  BITF,
  HUT,
  WULF,
  CIFR,
  IREN,
  CAN,
  UVIX,
  SVIX,
  LABU,
  LABD,
  KLAC,
  NVO,
  FNGU,
  UDOW,
  SPXL,
  NUGT,
  GUSH,
  WEBL,
  TNA,
  FAZ,
  ERX,
  YINN,
  USRT,
  NAIL,
  BA,
  CSX,
  WFC,
  C,
  JPM,
  ERY,
  DPST,
  WDC,
  STX,
  IBM,
  GE,
  UPS,
  UCO,
  YANG,
  MDB,
  WANT,
  INTC,
  SDS,
  USO,
  DRIP,
  TBX,
  DBC,
  BITI,
  GOOGL,
  PG,
  COST,
  MRK,
  ABBV,
  UUP,
  VWO,
  SSG,
  VUG,
  TECB,
  NRGU,
  BOIL,
  VPU,
  CORP,
  STIP,
  VOOG,
  VOOV,
  SHY,
  E,
  SCHD,
  A,
  CTA,
  VXX,
  SPHB,
  XLE,
  COM,
  DIG,
  SMN,
  UNG,
  KOLD,
  DBE,
  FCG,
  DUG,
  NRGD,
  SVOL,
  OILU,
  DBO,
  URA,
  DBA,
  DBB,
  OILD,
  JDST,
  GDX,
  GLL,
  DUST,
  SPYV,
  UBT,
  BITX,
  BTF,
  BKCH,
  BLOK,
  FDIG,
  SARK,
  FNGD,
  PST,
  FENY
};
const SECRET_KEY_ALPACA = "30g6kg2wrjXFP73bYZIQdymqptM8b1vkdfVdHkQc";
const PAPER_API_KEY_ALPACA = "PK170M59PISEYURNRCYA";
class TickerReplacer {
  /**
   * @param {string} composerCode - The composer code to process.
   * @param {boolean} allowK1 - Whether to allow K1 tickers (default: false).
   * @param {Date} date - The date to use for comparisons (default: current date).
   */
  constructor(composerCode, allowK1 = false, date = /* @__PURE__ */ new Date(), shouldReplaceStocks = false, replacementTicker = "") {
    this.composerCode_ = composerCode;
    this.alpaca_ = new Alpaca({
      keyId: PAPER_API_KEY_ALPACA,
      secretKey: SECRET_KEY_ALPACA,
      paper: true
    });
    this.cache_ = /* @__PURE__ */ new Map();
    this.date_ = date;
    this.allowK1_ = allowK1;
    this.validTickers_ = [];
    this.individualTickers_ = [];
    this.replacedTickers_ = [];
    this.k1Tickers_ = [];
    this.shouldReplaceStocks = shouldReplaceStocks;
    this.replacementTicker = replacementTicker;
  }
  /**
   * Initializes the TickerReplacer.
   * @return {Promise<void>}
   */
  async init() {
    await this.loadCache_();
    await this.initK1Tickers_();
    await this.initValidTickers_();
  }
  /**
   * Initializes the valid tickers.
   * @private
   * @return {Promise<void>}
   */
  async initValidTickers_() {
    const extractedTickers = this.extractTickersFromCode_();
    this.validTickers_ = await this.validateTickers_(extractedTickers);
  }
  /**
   * Extracts tickers from the composer code.
   * @private
   * @return {Array<string>}
   */
  extractTickersFromCode_() {
    const tickerRegex = /\s+"[A-Z]+"/gm;
    const tickers = /* @__PURE__ */ new Set();
    let match;
    while ((match = tickerRegex.exec(this.composerCode_)) !== null) {
      tickers.add(match[0].replace(/"/g, "").trim());
    }
    return Array.from(tickers);
  }
  /**
   * Validates the given tickers.
   * @private
   * @param {Array<string>} tickers - The tickers to validate.
   * @return {Promise<Array<string>>} - The validated tickers.
   */
  async validateTickers_(tickers) {
    const validTickers = [];
    for (const ticker of tickers) {
      if (this.isValidTickerFormat_(ticker)) {
        const cachedData = this.cache_.get(ticker);
        if (cachedData && cachedData.tradable) {
          validTickers.push(ticker);
        } else {
          try {
            const asset = await this.alpaca_.getAsset(ticker);
            const tradable = asset.tradable;
            if (tradable) {
              validTickers.push(ticker);
              this.cache_.set(ticker, { ticker, tradable });
            }
          } catch (error) {
            console.error(`Error validating ticker ${ticker}:`, error.message);
          }
        }
      } else {
        console.warn(`Invalid ticker format: ${ticker}`);
      }
    }
    return validTickers;
  }
  /**
   * Initializes the K1 tickers.
   * @private 
   * @return {Promise<void>}
   */
  async initK1Tickers_() {
    const k1Json = JSON.stringify(K1Json);
    this.k1Tickers_ = JSON.parse(k1Json).map((item) => item.ticker);
  }
  /**
   * Loads the cache from file.
   * @private
   * @return {Promise<void>}
   */
  async loadCache_() {
    try {
      this.cache_ = new Map(Object.entries(cacheData || {}));
    } catch (err) {
      if (err.code !== "ENOENT") {
        console.error("Error reading cache file:", err);
      }
    }
  }
  /**
   * Fetches data for the given ticker and caches it if not already cached or if the existing data is invalid.
   * @param {string} ticker - The ticker symbol to fetch data for.
   * @return {Promise<Object|undefined>} - The fetched data or undefined if an error occurs.
   */
  async fetchAndCacheData_(ticker) {
    const cachedData = this.cache_.get(ticker);
    console.log(cachedData);
    if (this.isDataValid_(cachedData)) {
      console.log(`Using cached data for ${ticker}:`, cachedData);
      return cachedData;
    }
    try {
      const data = await this.fetchData_(ticker);
      const existingData = this.cache_.get(ticker) || {};
      this.cache_.set(ticker, { ...existingData, ...data });
      console.log(`Fetched data for ${ticker}:`, data);
      return data;
    } catch (error) {
      return void 0;
    }
  }
  /**
   * Checks if the given data is valid.
   * @private
   * @param {Object} data - The data to validate.
   * @return {boolean} - True if the data is valid, false otherwise.
   */
  isDataValid_(data) {
    return data && data.inceptionDate !== void 0 && data.correlatedTickers !== void 0 && data.isIndividualAsset !== void 0 && data.isK1Ticker !== void 0;
  }
  /**
   * Scrapes composer ETF data for the given ticker.
   * @private
   * @param {string} ticker - The ticker symbol to scrape data for.
   * @return {Promise<Object|undefined>} - The scraped data or undefined if an error occurs.
   */
  async scrapeComposerEtfData_(ticker) {
    try {
      const scope = await chowdown(`https://www.composer.trade/etf/${ticker}`);
      if (scope.error) {
        console.error(`Error fetching data for ${ticker}:`);
        return void 0;
      }
      const scriptContent = await scope.string("script#__NEXT_DATA__");
      return this.processScriptContent_(scriptContent);
    } catch (error) {
      console.error(`Error fetching data for ${ticker}:`, error);
      return void 0;
    }
  }
  /**
   * Processes the script content and extracts relevant data.
   * @private
   * @param {string} scriptContent - The script content to process.
   * @return {Object} - The processed data.
   */
  processScriptContent_(scriptContent) {
    const json2 = JSON.parse(scriptContent);
    const listingDate = json2.props.pageProps.data.characteristics.ListingDate;
    console.log(listingDate);
    const correlatedEtfs = json2.props.pageProps.data.relations.correlated.sort((a, b) => b.correlation_1y - a.correlation_1y).filter((etf) => etf.correlation_1y > 0);
    console.log(correlatedEtfs);
    const relatedEtfs = json2.props.pageProps.data.relations.related.sort((a, b) => b.correlation_1y - a.correlation_1y).filter((etf) => etf.correlation_1y > 0);
    console.log(relatedEtfs);
    const mergedEtfs = [
      ...this.mapEtfData_(correlatedEtfs),
      ...this.mapEtfData_(relatedEtfs)
    ];
    return {
      inceptionDate: listingDate,
      data: mergedEtfs
    };
  }
  /**
   * Maps ETF data to a simplified format.
   * @private
   * @param {Array<Object>} etfs - The ETFs to map.
   * @return {Array<Object>} - The mapped ETF data.
   */
  mapEtfData_(etfs) {
    return etfs.map((etf) => ({
      ticker: etf.ticker,
      correlation: etf.correlation_1y
    }));
  }
  /**
   * Fetches data for the given ticker.
   * @private
   * @param {string} ticker - The ticker symbol to fetch data for.
   * @return {Promise<Object>} - The fetched data.
   */
  async fetchData_(ticker) {
    const response = await this.scrapeComposerEtfData_(ticker);
    let inceptionDate;
    let isIndividualAsset;
    let correlatedTickers = [];
    let correlationValues = [];
    if (response === void 0) {
      const queryOptions = { period1: "1970-01-01" };
      const historicalData = await yahooFinance.historical(ticker, queryOptions);
      const minDate = historicalData.reduce(
        (min, item) => item.date < min ? item.date : min,
        historicalData[0].date
      );
      inceptionDate = new Date(minDate);
      isIndividualAsset = true;
    } else {
      inceptionDate = new Date(response.inceptionDate);
      isIndividualAsset = false;
      correlatedTickers = response.data.map((item) => item.ticker) || [];
      correlationValues = response.data.map((item) => item.correlation) || [];
    }
    const result = {
      inceptionDate,
      correlatedTickers,
      correlationValues,
      isIndividualAsset,
      isK1Ticker: this.k1Tickers_.includes(ticker)
    };
    console.log(result);
    return result;
  }
  /**
   * Finds a suitable historical ticker based on the given parameters.
   * @param {string} targetTicker - The target ticker to find a historical match for.
   * @param {Date} backtestDate - The backtest date to compare against.
   * @param {boolean} [allowK1Tickers=false] - Whether to allow K1 tickers.
   * @param {Set<string>} [visitedTickers=new Set()] - Set of visited tickers.
   * @return {Promise<string|null>} - The suitable historical ticker or null if not found.
   */
  async findHistoricalTicker_(targetTicker, backtestDate, allowK1Tickers = false, visitedTickers = /* @__PURE__ */ new Set()) {
    if (visitedTickers.has(targetTicker)) {
      return null;
    }
    visitedTickers.add(targetTicker);
    const {
      inceptionDate: targetTickerInceptionString,
      correlatedTickers: targetCorrelatedTickers,
      isIndividualAsset: isTargetTickerIndividualAsset,
      isK1Ticker: isTargetTickerK1
    } = await this.fetchAndCacheData_(targetTicker);
    const targetTickerInceptionDate = new Date(targetTickerInceptionString);
    if (isTargetTickerIndividualAsset) {
      this.individualTickers_.push(targetTicker);
    }
    if (this.isUnsuitableHistoricalTicker_(
      targetTickerInceptionDate,
      backtestDate,
      isTargetTickerK1,
      allowK1Tickers
    )) {
      for (const correlatedTicker of targetCorrelatedTickers) {
        if (visitedTickers.has(correlatedTicker)) {
          continue;
        }
        const {
          inceptionDate: correlatedTickerInceptionString,
          isK1Ticker: isCorrelatedTickerK1
        } = await this.fetchAndCacheData_(correlatedTicker);
        const correlatedTickerInceptionDate = new Date(
          correlatedTickerInceptionString
        );
        if (this.isSuitableCorrelatedTicker_(
          allowK1Tickers,
          isCorrelatedTickerK1,
          backtestDate,
          correlatedTickerInceptionDate
        )) {
          return correlatedTicker;
        }
      }
      const nextUnvisitedTicker = this.findNextUnvisitedTicker_(
        targetCorrelatedTickers,
        visitedTickers
      );
      if (nextUnvisitedTicker) {
        const foundTicker = await this.findHistoricalTicker_(
          nextUnvisitedTicker,
          backtestDate,
          allowK1Tickers,
          visitedTickers
        );
        if (foundTicker) {
          return foundTicker;
        }
      }
    }
    return targetTicker;
  }
  /**
   * Checks if a ticker is unsuitable as a historical ticker based on the given parameters.
   * @private
   * @param {Date} inceptionDate - The inception date of the ticker.
   * @param {Date} backtestDate - The backtest date to compare against.
   * @param {boolean} isK1Ticker - Whether the ticker is a K1 ticker.
   * @param {boolean} allowK1 - Whether to allow K1 tickers.
   * @return {boolean} - True if the ticker is unsuitable, false otherwise.
   */
  isUnsuitableHistoricalTicker_(inceptionDate, backtestDate, isK1Ticker, allowK1) {
    return inceptionDate > backtestDate || !allowK1 && isK1Ticker;
  }
  /**
   * Checks if a correlated ticker is suitable based on the given parameters.
   * @private
   * @param {boolean} allowK1 - Whether to allow K1 tickers.
   * @param {boolean} isK1Ticker - Whether the ticker is a K1 ticker.
   * @param {Date} backtestDate - The backtest date to compare against.
   * @param {Date} inceptionDate - The inception date of the correlated ticker.
   * @return {boolean} - True if the correlated ticker is suitable, false otherwise.
   */
  isSuitableCorrelatedTicker_(allowK1, isK1Ticker, backtestDate, inceptionDate) {
    return (allowK1 || !isK1Ticker) && backtestDate > inceptionDate;
  }
  /**
   * Finds the next unvisited ticker from the given list of tickers.
   * @private
   * @param {Array<string>} tickers - The list of tickers to search from.
   * @param {Set<string>} visitedTickers - Set of visited tickers.
   * @return {string|undefined} - The next unvisited ticker or undefined if not found.
   */
  findNextUnvisitedTicker_(tickers, visitedTickers) {
    return tickers.find((ticker) => !visitedTickers.has(ticker));
  }
  /**
   * Checks if a ticker has a valid format.
   * @private
   * @param {string} ticker - The ticker symbol to validate.
   * @return {boolean} - True if the ticker has a valid format, false otherwise.
   */
  isValidTickerFormat_(ticker) {
    const tickerFormatRegex = /^([A-Za-z]{1,5})(-[A-Za-z]{1,2})?$/;
    return tickerFormatRegex.test(ticker);
  }
  /**
   * 
   * @param {*} composerCode 
   * @param {*} ticker 
   * @param {*} newTicker 
   * @param {*} replaceConditional 
   */
  async replaceTickerInComposerCode(composerCode, ticker, newTicker, replaceConditional = false) {
    const escapedTicker = ticker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let replacedCode = "";
    if (replaceConditional) {
      const regex = new RegExp(`"${escapedTicker}"`, "g");
      replacedCode = composerCode.replace(regex, `"${newTicker}"`);
    } else {
      const regex = new RegExp(`asset\\s+"${ticker}"`, "g");
      replacedCode = composerCode.replace(regex, `asset "${newTicker}"`);
    }
    this.composerCode_ = replacedCode;
  }
  /**
   * 
   * @returns 
   */
  async replaceTickersInComposerCode() {
    for (const ticker of this.validTickers_) {
      const historicalTicker = await this.findHistoricalTicker_(
        ticker,
        this.date_,
        this.allowK1_
      );
      if (this.shouldReplaceStocks && this.replacementTicker !== "") {
        console.log("Replacing stocks for", this.replacementTicker);
        if (this.cache_.get(historicalTicker).isIndividualAsset) {
          await this.replaceTickerInComposerCode(
            this.composerCode_,
            ticker,
            this.replacementTicker
          );
        }
      }
      if (historicalTicker !== ticker) {
        const tickerData = this.cache_.get(ticker);
        const correlationIndex = tickerData.correlatedTickers.indexOf(historicalTicker);
        const correlation = tickerData.correlationValues[correlationIndex];
        this.replacedTickers_.push({
          originalTicker: ticker,
          replacementTicker: historicalTicker,
          correlation
        });
        await this.replaceTickerInComposerCode(
          this.composerCode_,
          ticker,
          historicalTicker
        );
      }
    }
    return this.replaceStackedQuotesInComposerCode(this.composerCode_);
  }
  /**
   * 
   * @param {string} inputString 
   * @returns Composer Code
   */
  replaceStackedQuotesInComposerCode(inputString) {
    const stackedQuotePattern = /\[\(group\s+((?:(?!\[).)*)\s+/gm;
    const stackedQuoteMatches = inputString.match(stackedQuotePattern);
    if (!stackedQuoteMatches) {
      return inputString;
    }
    for (const stackedQuoteMatch of stackedQuoteMatches) {
      if (stackedQuoteMatch.split('"').length > 3) {
        const strippedStackedQuote = stackedQuoteMatch.replace(/"/g, "");
        const updatedStackedQuote = strippedStackedQuote.replace(
          `[(group`,
          `[(group "`
        );
        const finalStackedQuote = updatedStackedQuote + '"';
        inputString = inputString.replace(stackedQuoteMatch, finalStackedQuote);
      }
    }
    return inputString;
  }
  // async saveCache() {
  //   const cacheFilePath = path.join(__dirname, "cache.json");
  //   const cacheData = JSON.stringify(Object.fromEntries(this.cache));
  //   try {
  //     await fs.writeFile(cacheFilePath, cacheData);
  //   } catch (err) {
  //     console.error("Error writing cache file:", err);
  //   }
  // }
}
async function POST({ request }) {
  const { date, allow_k1, inputtedComposerCode, shouldReplaceStocks, replacementTicker } = await request.json();
  const composerCodeProcessor = new TickerReplacer(inputtedComposerCode, allow_k1, new Date(date), shouldReplaceStocks, replacementTicker);
  await composerCodeProcessor.init();
  console.log(composerCodeProcessor.validTickers);
  const NEW_COMPOSER_CODE = await composerCodeProcessor.replaceTickersInComposerCode();
  const OBJ = { NEW_COMPOSER_CODE, INDIVIDUAL_TICKERS: composerCodeProcessor.individualTickers_, REPLACED_TICKERS: composerCodeProcessor.replacedTickers_ };
  return json(OBJ);
}
export {
  POST
};

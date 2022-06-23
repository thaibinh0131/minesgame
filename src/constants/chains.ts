import type { ChainInfo } from "@/types/chain.type";
import { CHAIN } from "@/types/chain.type";

export const CHAIN_INFO: ChainInfo = {
  [CHAIN.FANTOM_MAINNET]: {
    explorer: "https://ftmscan.com",
    name: "Fantom Opera",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
      coingeckoId: "fantom",
    },
    rpcUrl: "https://rpc.ftm.tools",
  },
  [CHAIN.FANTOM_TESTNET]: {
    explorer: "https://testnet.ftmscan.com/",
    name: "Fantom Testnet",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
      coingeckoId: "fantom",
    },
    rpcUrl: "https://xapi.testnet.fantom.network/lachesis",
  },

  [CHAIN.FUSE_MAINNET]: {
    explorer: "https://explorer.fuse.io/",
    name: "Fuse Mainnet",
    nativeCurrency: {
      name: "Fuse",
      symbol: "FUSE",
      decimals: 18,
      coingeckoId: "fuse-network-token",
    },
    rpcUrl: "https://rpc.fuse.io/",
  },
  [CHAIN.FUSE_TESTNET]: {
    explorer: "https://explorer.fusespark.io/",
    name: "Fuse Testnet",
    nativeCurrency: {
      name: "Fuse",
      symbol: "FUSE",
      decimals: 18,
      coingeckoId: "fuse-network-token",
    },
    rpcUrl: "https://explorernode.fusespark.io/",
  },
  [CHAIN.AVAX_MAINNET]: {
    explorer: "https://snowtrace.io/",
    name: "Avalanche Network",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
      coingeckoId: "avalanche-2",
    },
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  },
  [CHAIN.AVAX_TESTNET]: {
    explorer: "https://testnet.snowtrace.io/",
    name: "Avalanche Fuji Testnet",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
      coingeckoId: "avalanche-2",
    },
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  },
  [CHAIN.HUOBI_TESTNET]: {
    explorer: "https://scan-testnet.hecochain.com/",
    name: "Heco Testnet",
    nativeCurrency: {
      name: "HT",
      symbol: "HTT",
      decimals: 18,
      coingeckoId: "huobi-token",
    },
    rpcUrl: "https://http-testnet.hecochain.com",
  },
  [CHAIN.HUOBI_MAINNET]: {
    explorer: "https://scan.hecochain.com/",
    name: "Heco Mainnet",
    nativeCurrency: {
      name: "HT",
      symbol: "HT",
      decimals: 18,
      coingeckoId: "huobi-token",
    },
    rpcUrl: "https://http-mainnet.hecochain.com/",
  },
};

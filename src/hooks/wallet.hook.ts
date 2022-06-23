import { useStorage } from "@vueuse/core";
import type { CHAIN } from "@/types/chain.type";
import { SAVED_CONNECTOR_KEY } from "@/constants/common";

const cachedConnector = useStorage(SAVED_CONNECTOR_KEY, "");
const address = ref("");
const provider = ref<any>(null);
const chainId = ref<CHAIN | null>(null);
const showModalConnect = ref(false);
const connectFunc = ref<Function | null>(null);

export const useConnectWallet = () => {
  const resetState = () => {
    if (provider.value) {
      if (provider.value.close) {
        provider.value.close();
      }
      if (provider.value.removeAllListeners) {
        provider.value.removeAllListeners();
      }
    }
    address.value = "";
    provider.value = null;
    chainId.value = null;
    connectFunc.value = null;
    window.localStorage.removeItem(SAVED_CONNECTOR_KEY);
    if (window.localStorage.getItem("walletconnect")) {
      window.localStorage.removeItem("walletconnect");
    }
    if (window.localStorage.getItem("WALLETCONNECT_DEEPLINK_CHOICE")) {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  };

  const subscribe = () => {
    if (provider.value) {
      provider.value.on("accountsChanged", (accounts: string[]) => {
        if (accounts && accounts.length !== 0) {
          if (address.value === accounts[0]) return;
          return (address.value = accounts[0]);
        }
        resetState();
      });
      provider.value.on("chainChanged", (networkId: string) => {
        if (Number(networkId) === Number(chainId.value)) return;
        chainId.value = Number(networkId);
      });

      provider.value.on("disconnect", (error: Error) => {
        if (cachedConnector.value === "metamask") return;
        console.error(error);
        resetState();
      });
    }
  };
  const updateState = ({
    connectedAddress,
    connectedProvider,
    connectedChainId,
    connector,
    connectorFunc,
  }: {
    connectedAddress: string;
    connectedProvider: any;
    connectedChainId: number;
    connector: string;
    connectorFunc: Function;
  }) => {
    address.value = connectedAddress;
    provider.value = connectedProvider;
    chainId.value = connectedChainId;
    connectFunc.value = connectorFunc;
    cachedConnector.value = connector;
    window.localStorage.setItem(SAVED_CONNECTOR_KEY, connector);
    subscribe();
  };
  const setModalConnectState = (show: boolean) => {
    showModalConnect.value = show;
  };

  return {
    updateState,
    address,
    provider,
    chainId,
    resetState,
    cachedConnector,
    showModalConnect,
    setModalConnectState,
    connectFunc,
  };
};

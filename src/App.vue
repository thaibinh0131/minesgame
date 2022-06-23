<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useInterval } from "@vueuse/core";
import {
  DEFAULT_CHAIN_ID,
  CONTRACT_INTERVAL,
  APP_TITLE,
} from "@/constants/common";

import { useConnectWallet } from "@/hooks";
import type { ConnectorResponse } from "@/types/connector.type";

const loadingInit = ref(false);
const counter = useInterval(CONTRACT_INTERVAL);

const { showModalConnect, cachedConnector, updateState, resetState, address } =
  useConnectWallet();

const toast = useToast();
const { t } = useI18n();

const onConnectResponse = (data: ConnectorResponse) => {
  const { account, chainId, id: connectorId, provider, connect } = data;
  updateState({
    connectedAddress: account,
    connectedProvider: provider,
    connectedChainId: chainId,
    connector: connectorId,
    connectorFunc: connect,
  });
};

const onConnectError = (error: any) => {
  console.error(error);
  resetState();
  if (error?.code === 4001) {
    toast.error(t("message.connect-wallet-rejected-error"));
  } else if (error.message) {
    toast.error(error.message);
  } else if (error) {
    toast.error(error);
  }
};
</script>

<template>
  <div class="app__wrapper">
    <div class="w-full">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
.app-content {
  color: white !important;
}
.main-container {
  @apply px-4 py-13 max-w-full;
  @apply overflow-x-hidden overflow-y-auto;
  @apply flex-1;
  @apply flex flex-col;
  min-height: calc(100vh - 141px);
  @apply mx-auto;
  @screen laptop {
    @apply w-[1200px];
  }
}

#app {
  @apply relative;
  @apply bg-cover bg-no-repeat;
  font-family: "Inter", sans-serif;
}

.app__wrapper {
  @apply z-10;
  // background: linear-gradient(
  //     0deg,
  //     rgba(44, 31, 80, 0.2),
  //     rgba(44, 31, 80, 0.2)
  //   ),
  //   #281e47;
}

// .app__layer {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(5, 5, 16, 0.8);
//   @apply -z-10;
// }
</style>

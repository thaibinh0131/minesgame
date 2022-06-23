<script lang="ts" setup>
import DefaultCoinIcon from "@/assets/images/icons/default.svg";

const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  symbol: {
    type: String,
    default: "",
  },
});

const src = ref("");
const defaultIcon = DefaultCoinIcon;
const onImageError = (e: any) => {
  e.target.src = defaultIcon;
};
const getImageUrl = async () => {
  if (props.url) {
    src.value = props.url;
  } else if (props.symbol) {
    try {
      src.value = (
        await import(
          `../../assets/images/icons/${props.symbol.toLowerCase()}.png`
        )
      ).default;
    } catch (error) {
      console.error(error);
      src.value = DefaultCoinIcon;
    }
  }
};

getImageUrl();

watch([() => props.symbol], () => {
  getImageUrl();
});
</script>

<template>
  <div class="currency-icon">
    <img class="" @error="onImageError" :src="src" :alt="alt" />
  </div>
</template>

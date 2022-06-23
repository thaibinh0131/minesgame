<template>
  <a-spin :indicator="indicator" />
</template>
<script lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue";
import { defineComponent, h } from "vue";
export default defineComponent({
  props: {
    size: {
      type: String,
      default: "24px",
    },
  },
  setup(props) {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: props.size,
      },
      spin: true,
    });
    return {
      indicator,
    };
  },
});
</script>

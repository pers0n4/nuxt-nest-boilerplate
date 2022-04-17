<template>
  <Tutorial />
</template>

<script lang="ts">
  import { Context } from "@nuxt/types";
  import { Component, Vue } from "nuxt-property-decorator";

  @Component({
    name: "IndexPage",
  })
  export default class IndexPage extends Vue {
    private data: string;

    async asyncData({ $axios }: Context) {
      try {
        const data = await $axios.$get("");
        return { data };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
</script>

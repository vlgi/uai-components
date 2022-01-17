<script lang="ts">
  export let label = "";
  export let type = "text";
  // ...
</script>

<ion-item fill="outline" shape="round">
  <ion-label position="floating">{ label }</ion-label>
  <ion-input { type }></ion-input>
</ion-item>

<style lang="scss">
</style>

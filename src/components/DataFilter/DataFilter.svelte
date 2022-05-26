<script lang="ts">
    import FilterEngine from "./helpers/FilterEngine";
    import SortEngine from "./helpers/SortEngine";

    import FilterFields from "./components/FilterFields/FilterFields.svelte";
    import SortFields from "./components/SortFields/SortFields.svelte";
    import Modal from "./components/Modal/Modal.svelte";

    import mockLargeData from "./helpers/record-collection/mock-large-data";

    // TODO - user the engine to filter getted data from the form
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filter = new FilterEngine(mockLargeData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sort = new SortEngine(mockLargeData);
</script>

<Modal>
    <FilterFields/>
    <SortFields/>
</Modal>

<style lang="scss">

</style>

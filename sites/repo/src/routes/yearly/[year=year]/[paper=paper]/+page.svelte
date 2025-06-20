<script lang="ts">
  import StackedExam from "$lib/components/StackedExam.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const solns = $derived(data.qns.map((qn) => qn.data[0]));
  const ans = $derived(data.qns.map((qn) => qn.data[1]));
</script>

<h1>20{data.year} Paper {data.paper}</h1>
<StackedExam
  qns={data.qns}
  columnMajor={{ headings: ["Short answers", "Full solutions"] }}
/>

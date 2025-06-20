<script lang="ts">
  import { type StackedQns, StackedQn } from "$lib/classes/stacked.js";
  import Exam from "./Exam.svelte";
  import StackedQuestion from "./StackedQuestion.svelte";

  let {
    qns,
    contentHandler = (x) => x,
    ariaNames,
    columnMajor,
  }: {
    qns: StackedQns | StackedQn[];
    contentHandler?: (x: string) => string;
    ariaNames?: string[];
    columnMajor?: boolean | { headings?: string[] };
  } = $props();
  const qnsArr = $derived(Array.isArray(qns) ? qns : qns.data);

  function transpose<T>(matrix: T[][]): T[][] {
    if (matrix.length === 0) return [];

    const rowCount = matrix.length;
    const colCount = Math.max(...matrix.map((row) => row.length));

    const result: T[][] = [];

    for (let col = 0; col < colCount; col++) {
      const newRow: T[] = [];

      for (let row = 0; row < rowCount; row++) {
        newRow.push(matrix[row][col]);
      }

      result.push(newRow);
    }

    return result;
  }
</script>

{#if columnMajor}
  {@const arr = transpose(
    qnsArr.map((qn) => (qn instanceof StackedQn ? qn.data : qn)),
  )}
  <!-- 1a,2a,3a, ..., 1b, ..., 1c, ... -->
  {#each arr as qns, i}
    {@const link = ariaNames?.[i + 1]}
    {#if typeof columnMajor !== "boolean"}
      <h2>{columnMajor.headings?.[i]}</h2>
    {/if}
    <Exam {qns} {contentHandler} ariaName={ariaNames?.[i]} {link} />
  {/each}
{:else}
  <section aria-label={"stacked-exam"} class="stacked-exam">
    {#each qnsArr as qn, i}
      <StackedQuestion qnNo={i + 1} {qn} {contentHandler} {ariaNames} subgrid />
    {/each}
  </section>
{/if}

<style>
  section.stacked-exam {
    display: grid;
    grid-template-columns: [qn-label] auto [part-label] auto [subpart-label] auto [main-start] 1fr [main-end] auto [marks-end];
    max-width: var(--qn-max-width, 75ch);
    column-gap: var(--qn-column-gap, 0.5rem);
    row-gap: var(--qn-row-gap, 0.5rem);
  }
</style>

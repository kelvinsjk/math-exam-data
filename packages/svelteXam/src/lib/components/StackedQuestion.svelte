<script lang="ts">
  import { Qn } from "$lib/classes/qn.js";
  import type { StackedQn } from "$lib/classes/stacked.js";
  import type { QnObject } from "$lib/classes/types.js";
  import Question from "./Question.svelte";

  let {
    qnNo = 1,
    qn,
    contentHandler = (x) => x,
    subgrid,
    ariaNames = ["q", "ans"],
  }: {
    qnNo?: number | undefined;
    contentHandler?: (x: string) => string;
    subgrid?: boolean;
    qn: StackedQn | (Qn | QnObject)[];
    ariaNames?: string[];
  } = $props();
  const qnArr = $derived.by(() => {
    const qnArr = Array.isArray(qn) ? qn : qn.data;
    return qnArr.map((qn) => (qn instanceof Qn ? qn.qn : qn));
  });
</script>

<section aria-label={"stacked-question"} class="stacked-question" class:subgrid>
  {#each qnArr as qn, i}
    {@const ariaName = ariaNames[i] ?? "q"}
    {@const link =
      i === qnArr.length - 1 ? undefined : (ariaNames[i + 1] ?? `q${i}`)}
    <Question {qnNo} {qn} {contentHandler} subgrid={true} {ariaName} {link} />
  {/each}
</section>

<style>
  section.stacked-question {
    display: grid;
    grid-template-columns: [qn-label] auto [part-label] auto [subpart-label] auto [main-start] 1fr [main-end] auto [marks-end];
    max-width: var(--qn-max-width, 75ch);
    column-gap: var(--qn-column-gap, 0.5rem);
    row-gap: var(--qn-row-gap, 0.5rem);
  }
  section.stacked-question.subgrid {
    grid-column: qn-label / marks-end;
    grid-template-columns: subgrid;
  }
</style>

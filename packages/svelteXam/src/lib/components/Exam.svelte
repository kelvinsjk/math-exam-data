<script lang="ts">
  import { Qn, type Qns } from "$lib/classes/qn.js";
  import type { QnObject } from "$lib/classes/types.js";
  import Question from "./Question.svelte";

  let {
    qns,
    contentHandler = (x) => x,
    ariaName = "q",
    link = undefined,
  }: {
    qns: Qns | Qn[] | QnObject[];
    contentHandler?: (x: string) => string;
    ariaName?: string;
    link?: string;
  } = $props();
  const questions = $derived.by(() => {
    const qnArr = Array.isArray(qns) ? qns : qns.qns;
    return qnArr.map((qn) => (qn instanceof Qn ? qn.qn : qn));
  });
</script>

<section aria-label={ariaName} class="exam">
  {#each questions as qn, i}
    <Question qnNo={i + 1} {qn} {contentHandler} {ariaName} subgrid {link} />
  {/each}
</section>

<style>
  section.exam {
    display: grid;
    grid-template-columns: [qn-label] auto [part-label] auto [subpart-label] auto [main-start] 1fr [main-end] auto [marks-end];
    max-width: var(--qn-max-width, 75ch);
    column-gap: var(--qn-column-gap, 0.5rem);
    row-gap: var(--qn-row-gap, 0.5rem);
  }
</style>

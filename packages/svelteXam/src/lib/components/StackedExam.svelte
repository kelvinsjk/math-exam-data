<script lang="ts">
  import type { QnObject } from "$lib/classes/types.js";
  import { Qns, Qn } from "$lib/classes/qn.js";
  import Question from "./Question.svelte";
  import type { StackedQns } from "$lib/classes/stacked.js";
  import StackedQuestion from "./StackedQuestion.svelte";

  let { 
    qns, 
    contentHandler=(x)=>x,
    ariaNames
  }
    : { 
      qns: StackedQns,
      contentHandler?: (x: string) => string,
      ariaNames?: string[]
    } 
      = $props();
  //const questions = $derived.by(()=>{
  //  const qnArr = Array.isArray(qns) ? qns : qns.qns;
  //  return qnArr.map((qn) => qn instanceof Qn ? qn.qn : qn)
  //});
</script>

<section aria-label={"stacked-exam"} class="stacked-exam">
  {#each qns.data as qn, i}
    <StackedQuestion qnNo={i+1} {qn} {contentHandler} {ariaNames} subgrid />
  {/each}
</section>

<style>
  section.stacked-exam {
    display: grid;
    grid-template-columns: [qn-label] auto [part-label] auto [subpart-label] auto [main-start] 1fr [main-end] auto [marks-end];
    max-width: var(--qn-max-width, 75ch);
    column-gap: var(--qn-column-gap, 0.5rem);
    row-gap: var(--qn-row-gap, 0.5rem);
  }
</style>
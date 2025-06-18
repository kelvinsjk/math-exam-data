<script lang="ts">
  import type { QnObject } from "$lib/classes/types.js";
  import { Qn } from "$lib/classes/qn.js";

  let { qnNo=1, qn, contentHandler=(x)=>x, subgrid, link=undefined, ariaName='q' }
    : {
      qn: Qn|QnObject,
      qnNo?: number|undefined,
      contentHandler?: (x: string) => string,
      subgrid?: boolean,
      link?: string,
      ariaName?: string
    } 
      = $props();
  const question = $derived(qn instanceof Qn ? qn.qn : qn);
  
  function toRoman(i: number): string {
    const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii','viii','ix','x'];
    if (i < 10) return roman[i];
    if (i < 20) return `x${toRoman(i-10)}`;
    console.warn('roman function only supported until 20');
    return (i-1).toString();
  }
</script>

<section aria-label={`${ariaName}${qnNo ?? 0}`} id={`${ariaName}${qnNo}`} class="qn" class:subgrid>
  <!--qn label-->
  {#if qnNo}
    {#if link}
    <a class="qn-label" href={`#${link}${qnNo}`}>{qnNo}.</a>
    {:else}
    <div class="qn-label">{qnNo}.</div>
    {/if}
  {/if}
  <!--qn body-->
  {#if question.body}
  <div class="content" class:noMarks={!question.marks}>{@html contentHandler(question.body)}</div>
  {/if}
  {#if question.marks}
  <div class="marks">[{question.marks}]</div>
  {/if}
  {#each question.parts??[] as part,i}
    {@const partLabel = String.fromCharCode(97+i)}
    {@const id = `${ariaName}${qnNo}${partLabel}`}
    {#if part.uplevel}
    <div class="uplevel">{@html contentHandler(part.uplevel)}</div>
    {/if}
    <section class="part" aria-label={id} {id} >
      {#if link}
      <a class="part-label" href={`#${link}${qnNo}${partLabel}`}>({partLabel})</a>
      {:else}
      <div class="part-label">({partLabel})</div>
      {/if}
      {#if part.body}
      <div class="content" class:noMarks={!part.marks}>{@html contentHandler(part.body)}</div>
      {/if}
      {#if part.marks}
      <div class="marks">[{part.marks}]</div>
      {/if}
      {#each part.parts??[] as subpart,j}
        {@const subpartLabel = toRoman(j)}
        {@const id = `${ariaName}${qnNo}${partLabel}${subpartLabel}`}
        {#if subpart.uplevel}
        <div class="uplevel">{@html contentHandler(subpart.uplevel)}</div>
        {/if}
        <section class="subpart" aria-label={id} {id}>
          {#if link}
          <a class="subpart-label" href={`#${link}${qnNo}${partLabel}${subpartLabel}`}>({subpartLabel})</a>
          {:else}
          <div class="subpart-label">({subpartLabel})</div>
          {/if}
          {#if subpart.body}
          <div class="content" class:noMarks={!subpart.marks}>{@html contentHandler(subpart.body)}</div>
          {/if}
          {#if subpart.marks}
          <div class="marks">[{subpart.marks}]</div>
          {/if}
        </section>
      {/each}
    </section>
  {/each}
</section>

<style>
  section.qn {
    display: grid;
    grid-template-columns: [qn-label] auto [part-label] auto [subpart-label] auto [main-start] 1fr [main-end] auto [marks-end];
    max-width: var(--qn-max-width, 75ch);
    column-gap: var(--qn-column-gap, 0.5rem);
    row-gap: var(--qn-row-gap, 0.5rem);
  }
  section.qn.subgrid {
    grid-column: qn-label / marks-end;
    grid-template-columns: subgrid;
  }
  section.part {
    grid-column: part-label / marks-end;
    display: grid;
    grid-template-columns: [part-label] auto [subpart-label] auto [main-start] 1fr [main-end] auto [marks-end];
    grid-template-columns: subgrid;
  }
  section.subpart {
    grid-column: subpart-label / marks-end;
    display: grid;
    grid-template-columns: [subpart-label] auto [main-start] 1fr [main-end] auto [marks-end];
    grid-template-columns: subgrid;
  }
  .qn-label {
    grid-column: qn-label / part-label;
  }
  .part-label {
    grid-column: part-label / subpart-label;
  }
  .subpart-label {
    grid-column: subpart-label / main-start;
  }
  .qn > .uplevel {
    grid-column: qn-label / main-end;
  }
  .qn > .part > .uplevel {
    grid-column: part-label / main-end;
  }
  .qn > .content {
    grid-column: part-label / main-end;
  }
  .part > .content {
    grid-column: subpart-label / main-end;
  }
  .qn .noMarks {
    grid-column-end: marks-end;
  }
  .marks {
    grid-column: main-end / marks-end;
    display: flex;
    justify-content: flex-end;
  }
  .content>:global(*:first-child), 
  .uplevel>:global(*:first-child) {
    margin-block-start: var(--qn-first-content-margin, 0);
  }
  .content>:global(*:last-child), 
  .uplevel>:global(*:last-child) {
    margin-block-end: var(--qn-last-content-margin, 0);
  }
</style>
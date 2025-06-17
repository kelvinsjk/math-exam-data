<script lang="ts">
  import type { QnObject } from "$lib/classes/types.js";
  import { Qn } from "$lib/classes/qn.js";

  let { qnNo = 1, qn }: {qnNo?: number, qn: Qn|QnObject} = $props();
  const question = qn instanceof Qn ? qn.qn : qn;
  
  function toRoman(i: number): string {
    const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii','viii','ix','x'];
    if (i < 10) return roman[i];
    if (i < 20) return `x${toRoman(i-10)}`;
    console.warn('roman function only supported until 20');
    return (i-1).toString();
  }
</script>

<section aria-label={`q${qnNo}`} class="qn">
  <!--qn label-->
  <div class="qn-label">
    {qnNo}{#if qn.body}.{/if}
  </div>
  <!--qn body-->
  {#if question.body}
  <div class="content" class:noMarks={!question.marks}>{@html qn.body}</div>
  {/if}
  {#if question.marks}
  <div class="marks">[{question.marks}]</div>
  {/if}
  {#each question.parts??[] as part,i}
    {#if part.uplevel}
    <div class="uplevel">{@html part.uplevel}</div>
    {/if}
    <section class="part" aria-label={`q${qnNo}${String.fromCharCode(97+i)}`}>
      <div class="part-label">({String.fromCharCode(97+i)})</div>
      {#if part.body}
      <div class="content" class:noMarks={!part.marks}>{@html part.body}</div>
      {/if}
      {#if part.marks}
      <div class="marks">[{part.marks}]</div>
      {/if}
      {#each part.parts??[] as subpart,j}
        {#if subpart.uplevel}
        <div class="uplevel">{@html subpart.uplevel}</div>
        {/if}
        <section class="subpart" aria-label={`q${qnNo}${String.fromCharCode(97+i)}${toRoman(j)}`}>
          <div class="subpart-label">({toRoman(j)})</div>
          {#if subpart.body}
          <div class="content" class:noMarks={!subpart.marks}>{@html subpart.body}</div>
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
  .content {
    margin-inline: var(--content-margin, 0.5rem);
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
    margin-inline-end: 0;
  }
  .marks {
    grid-column: main-end / marks-end;
    display: flex;
    justify-content: flex-end;
  }
</style>
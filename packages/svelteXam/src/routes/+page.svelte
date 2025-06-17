<script lang="ts">
  import {Qn} from '$lib/classes/qn.js';
  const qn = new Qn();
  qn.addBody('body without marks');
  qn.part('part', {marks: 13});
  qn.subpart('subpart', {marks: 4});

  import Question from '$lib/components/Question.svelte';
</script>

<Question qn={qn} />
<div>65ch</div>

<style>
  div {
    width: 65ch;
  }
</style>

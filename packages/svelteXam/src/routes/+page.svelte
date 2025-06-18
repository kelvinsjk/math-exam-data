<script lang="ts">
  import {Qn} from '$lib/classes/qn.js';
  const qn = new Qn();
  //qn.addBody('body without marks');
  //qn.part('part', {marks: 13});
  qn.subpart(`<p>subpart</p><p>Second</p><p>3
lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptate.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptate.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptate.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptate.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptate.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptate.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptate.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptate.

  </p>`, {marks: 4});

  const q2 = new Qn();
  qn.part('part')

  import Question from '$lib/components/Question.svelte';
  import Exam from '$lib/components/Exam.svelte';
  import StackedQuestion from '$lib/components/StackedQuestion.svelte';
</script>

<StackedQuestion qn={[qn, qn, qn]} ariaNames={['q', 'ans', 'soln']} />
<hr />
<Question qn={qn} />
<div>65ch</div>
<Exam qns={[qn, q2, qn, qn, qn]} />

<style>
  div {
    width: 65ch;
  }
</style>

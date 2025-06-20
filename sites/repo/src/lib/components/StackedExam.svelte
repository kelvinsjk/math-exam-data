<script lang="ts">
  import { djotMathToHTML } from "mathlifier";
  import { StackedExam, type StackedQn, type StackedQns } from "sveltexam";

  let {
    qns,
    columnMajor,
  }: {
    qns: StackedQns | StackedQn[];
    columnMajor?: boolean;
  } = $props();
  const contentHandler = (x: string) => djotMathToHTML(x);
  const ariaNames = ["ans", "soln"];
</script>

<StackedExam {qns} {contentHandler} {ariaNames} {columnMajor} />

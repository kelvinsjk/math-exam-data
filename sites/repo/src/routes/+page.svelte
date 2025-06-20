<script lang="ts">
  import { capitalizeFirstLetter } from "$lib/utils/typesetting";

  const years = Array.from({ length: 18 }, (_, i) => 2007 + i).toReversed();
  const topics = [
    "eqns",
    "fns",
    "graphs",
    "sequences",
    "differentiation",
    "maclaurin",
    "integration",
    "de",
    "complex",
    "vectors1",
    "vectors2",
    "regression",
  ];
</script>

<h1>Mathlify Admin</h1>

<div class="container">
  <div>
    <h2>Yearly</h2>
    {#each years as year}
      <ul>
        <li><a href={`/yearly/${year - 2000}/p1`}>{year} Paper 1</a></li>
        <li><a href={`/yearly/${year - 2000}/p2`}>{year} Paper 2</a></li>
      </ul>
    {/each}
  </div>
  <div>
    <h2>Topical</h2>
    {#each topics as topic}
      <ul>
        <li>
          <a href={`/topical/${topic}`}>{capitalizeFirstLetter(topic)}</a>
        </li>
      </ul>
    {/each}
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>

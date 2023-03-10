<script lang="ts">
  import { onMount } from 'svelte';
	import type { GameType } from '../../global-types';

  let games: GameType[] = [];
  async function getGames() {
    const res = await fetch(`https://zneib-sub-watcher-api.deno.dev/api/games`)
    const data = await res.json();
    games = data;
    console.log(games);
  }

  onMount(() => {
    getGames();
  })
</script>

<h1>Games Page</h1>
<p>Team stuff goes here</p>
<!-- <ul>
  {#each data?.games?.data as game}
    <li>{game.data.name}</li>
  {/each}
</ul> -->

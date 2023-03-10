<script lang="ts">
	import type { GameType } from '../../global-types';
  import type { PageData } from './$types';

  let games: GameType[] = [];
  export let data: PageData;
  console.log(data.games.data)
</script>

<h1>Games Page</h1>
<ul>
  {#each data?.games?.data as game}
    <li>{game.data.name}</li>
  {/each}
</ul>

<script lang="ts">
  import globalStore from "../global-store";
  import Collapse from "./Collapse.svelte";
  import Helper from "./Helper.svelte";
  import Player from "./Player.svelte";
  
  let activePlayers: string[];
  let isActiveOpen: false;
  let playTimeLimit: string;
  let maxActivePlayers: number;
  globalStore.subscribe(({activePlayers: people, isActiveOpen, timeLimit, activePlayerLimit}) => {
    activePlayers = people;
    isActiveOpen = isActiveOpen;
    playTimeLimit = timeLimit;
    maxActivePlayers = activePlayerLimit;
  });

  let helperFeaturesTwo = [
    "Players will start their time as soon as they're added to the list.",
    "Players will reach their max playing time as set by you in Options.",
    "Players who reach their max playing time will turn red and their time will end.",
    "Players can be sent back to the inactive list by clicking on their name.",
    "All players can be sent back to the inactive list by clicking on the Remove All Players button.",
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ]
</script>

<!-- <article>
  {#if activePlayers?.length > 0}
    <Collapse onChange={value => isActiveOpen = value} />
  {/if}
  <h2>Active Players</h2>
  <Helper text="active" title="Active Players Features" features={helperFeaturesTwo} />
  {#if activePlayers?.length > 0 && isActiveOpen}
    <div class="labels">
      <span>Name</span>
      <span>({playTimeLimit}) MM:SS</span>
    </div>
  {/if}
  <div class:collapsed={!isActiveOpen}>
    {#if activePlayers.length > 0}
      {#each activePlayers as player, index}
        <Player index={index} name={player} removeActivePlayer={removeActivePlayer} playTimeLimit={playTimeLimit} />
      {/each}
    {/if}
  </div>
  {#if maxActivePlayers - activePlayers?.length !== 0}
    <p class="limit-message">
      <span>{maxActivePlayers - activePlayers?.length}</span> spots open
    </p>
  {/if}
  {#if activePlayers?.length > 1 && isActiveOpen}
    <button class="remove-all" on:click={removeAllActivePlayers}>Remove All Players</button>
  {/if}
  {#if activePlayers?.length === 0}
    <p class="message-text">No Players Selected</p>
  {/if}
</article> -->
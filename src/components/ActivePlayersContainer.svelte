<script lang="ts">
  import { afterUpdate, onDestroy } from 'svelte';
  import { playerStore, activePlayerStore } from "../global-store";
  import Collapse from "./Collapse.svelte";
  import Helper from "./Helper.svelte";
  import Player from "./Player.svelte";

  let helperFeaturesTwo = [
    "Players will start their time as soon as they're added to the list.",
    "Players will reach their max playing time as set by you in Options.",
    "Players who reach their max playing time will turn red and their time will end.",
    "Players can be sent back to the inactive list by clicking on their name.",
    "All players can be sent back to the inactive list by clicking on the Remove All Players button.",
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ]
  
  let activePlayerData: string[] = [];
  const activePlayerSubscription = activePlayerStore.subscribe((data) => {
    activePlayerData = data;
  });

  afterUpdate(() => {
    console.log(activePlayerData);
  })

  onDestroy(() => {
    activePlayerSubscription();
  });

  const removeActivePlayerFn = (player: string) => {
    const currentActivePlayers = activePlayerData.filter((name: string) => name !== player);
    activePlayerStore.update(() => [...currentActivePlayers]);
    playerStore.update((data) => [...data, player])
  }
</script>

<article>
  <h2>Active Players</h2>
  <Helper text="active" title="Active Players Features" features={helperFeaturesTwo} />
  {#if activePlayerData.length > 0}
    {#each activePlayerData as player, index}
      <Player index={index} name={player} removeActivePlayer={() => removeActivePlayerFn(player)} playTimeLimit="05:00" />
    {/each}
  {/if}
</article>

<!-- <article>
  {#if playerData.activePlayers?.length > 0}
    <Collapse onChange={value => playerData.isActiveOpen = value} />
  {/if}
  <h2>Active Players</h2>
  <Helper text="active" title="Active Players Features" features={helperFeaturesTwo} />
  {#if playerData.activePlayers?.length > 0 && playerData.isActiveOpen}
    <div class="labels">
      <span>Name</span>
      <span>({playerData.playTimeLimit}) MM:SS</span>
    </div>
  {/if}
  <div class:collapsed={!playerData.isActiveOpen}>
    {#if playerData.activePlayers.length > 0}
      {#each playerData.activePlayers as player, index}
        <Player index={index} name={player} removeActivePlayer={() => console.log('Remove player...')} playTimeLimit={playerData.playTimeLimit} />
      {/each}
    {/if}
  </div>
  {#if playerData.maxActivePlayers - playerData.activePlayers?.length !== 0}
    <p class="limit-message">
      <span>{playerData.maxActivePlayers - playerData.activePlayers?.length}</span> spots open
    </p>
  {/if}
  {#if playerData.activePlayers?.length > 1 && playerData.isActiveOpen}
    <button class="remove-all" on:click={() => playerData.removeAllActivePlayers}>Remove All Players</button>
  {/if}
  {#if $globalStore.activePlayers?.length === 0}
    <p class="message-text">No Players Selected</p>
  {/if}
</article> -->

<style>
  article {
    position: relative;
    padding: 15px 15px 30px;
    margin: 25px;
    max-width: 500px;
    border-radius: 5px;
    flex: 1;
  }
  h2 {
    margin-top: 0;
    text-align: center;
  }
  div.collapsed {
    display: none;
  }
  p.limit-message {
    text-align: center; 
    font-size: 12px; 
    margin: 2px auto
  }
  p.limit-message > span {
    font-weight: bold;
  }
  h2 {
    color: var(--grey-nine);
  }
  p.message-text {
    font-size: 12px;
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    p.limit-message {
      color: var(--grey-nine);
    }
  }
</style>
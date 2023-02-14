<script lang="ts">
  import { onDestroy } from 'svelte';
  import { playerStore, activePlayerStore, optionsStore } from "../global-store";
	import type { OptionsType } from '../global-types';
  import Collapse from "./Collapse.svelte";
  import Helper from "./Helper.svelte";
  import Player from "./Player.svelte";

  let isOpen = true;

  let helperFeaturesTwo = [
    "Players will start their time as soon as they're added to the list.",
    "Players will reach their max playing time as set by you in Options.",
    "Players who reach their max playing time will turn red and their time will end.",
    "Players can be sent back to the inactive list by clicking on their name.",
    "All players can be sent back to the inactive list by clicking on the Remove All Players button.",
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ]
  
  let playerData: string[] = [];
  const playerStoreSub = playerStore.subscribe((data) => {
    playerData = data;
  });

  let activePlayerData: string[] = [];
  const activePlayerStoreSub = activePlayerStore.subscribe((data) => {
    activePlayerData = data;
  });

  let optionsData: OptionsType;
  const optionsStoreSub = optionsStore.subscribe((data) => {
    optionsData = data;
  });

  const removeActivePlayerFn = (player: string) => {
    const currentActivePlayers = activePlayerData.filter((name: string) => name !== player);
    activePlayerStore.update(() => [...currentActivePlayers]);
    playerStore.update((data) => [...data, player]);

    // Keep localStorage in sync
    localStorage.setItem('activePlayers', JSON.stringify(currentActivePlayers));
    localStorage.setItem('players', JSON.stringify(playerData));
  }

  const removeAllActivePlayersFn = () => {
    playerStore.update(() => [...playerData, ...activePlayerData].flat())
    activePlayerStore.update(() => []);

    // Keep localStorage in sync.
    localStorage.removeItem('activePlayers');
    localStorage.setItem('players', JSON.stringify(playerData));
  }

  onDestroy(() => {
    playerStoreSub();
    activePlayerStoreSub();
    optionsStoreSub();
  });

</script>

<article>
  {#if activePlayerData?.length > 0}
    <Collapse bind:isOpen />
  {/if}
  <h2>Active Players</h2>
  <Helper text="active" title="Active Players Features" features={helperFeaturesTwo} />
  {#if activePlayerData?.length > 0 && optionsData.isActiveOpen}
    <div class="labels">
      <span>Name</span>
      <span>({optionsData.playTimeLimit}) MM:SS</span>
    </div>
  {/if}
  <div class:collapsed={!isOpen}>
    {#if activePlayerData.length > 0}
      {#each activePlayerData as player, index}
        <Player index={index} name={player} removeActivePlayer={() => removeActivePlayerFn(player)} playTimeLimit={optionsData.playTimeLimit} />
      {/each}
    {/if}
  </div>
  {#if optionsData.maxActivePlayers - activePlayerData?.length !== 0}
    <p class="limit-message">
      <span>{optionsData.maxActivePlayers - activePlayerData?.length}</span> spots open
    </p>
  {/if}
  {#if activePlayerData?.length > 1 && optionsData.isActiveOpen}
    <button class="remove-all" on:click={removeAllActivePlayersFn}>Remove All Players</button>
  {/if}
  {#if activePlayerData?.length === 0}
    <p class="message-text">No Players Selected</p>
  {/if}
</article>

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
  button {
    color: black;
    font-weight: normal;
    background-color: #fff;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid #ccc;
    padding: 5px 10px;
    transition: border .2s ease-in;
  }
  button:hover {
    border: 2px solid rgb(129, 129, 129);
  }
  div.labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  div.labels > span:nth-child(1) {
    margin-left: 40px;
  }
  div.labels > span:nth-child(2) {
    margin-right: 10px;
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
  .remove-all {
    width: 150px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -15px;
    margin: auto;
  }
  p.message-text {
    font-size: 12px;
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    h2 {
      color: var(--grey-nine);
    }
    button {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }
    div.labels {
      color: var(--grey-eight);
    }
    p.limit-message {
      color: var(--grey-nine);
    }
    p.message-text {
      color: var(--grey-nine);
    }
  }
</style>
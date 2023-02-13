<script lang="ts">
  import { onDestroy } from 'svelte';
  import { playerStore, activePlayerStore, optionsStore } from "../global-store";
	import type { OptionsType } from '../global-types';
  export let addPlayerDialog: () => void;
  import Collapse from "./Collapse.svelte";
  // import DeleteAll from "./DeleteAll.svelte";
  import Helper from "./Helper.svelte";
  import Person from "./Person.svelte";
	import Player from "./Player.svelte";
  export let showOptionsDialog: () => void;
  export let showDialogElement: (name: string) => void;

  let helperFeaturesOne = [
    'Add new players by clicking on the "Add Player" button.',
    'Configure the max active player limit and play time limits by clicking the Options button.',
    'Clicking on a player name will add them to the "Active Player" list.',
    'Clicking on the "X" will ask you to confirm you want to remove that player.',
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ];

  let playerData: string[] = [];
  const playerStoreSub = playerStore.subscribe((data) => {
    playerData = data;
  });

  let activePlayerData: string[] = [];
  const activePlayerStoreSub = playerStore.subscribe((data) => {
    activePlayerData = data;
  });

  let optionsData: OptionsType;
  const optionsStoreSub = optionsStore.subscribe((data) => {
    optionsData = data;
  })

  const addActivePlayer = (player: string) => {
    activePlayerStore.update((data) => [...data, player]);

    // Remove the player from the inactive player list
    const people: string[] = playerData.filter((name) => name !== player);
    playerStore.update(() => [...people])
  }

  onDestroy(() => {
    playerStoreSub();
    activePlayerStoreSub();
    optionsStoreSub();
  });
</script>

<article>
  <!-- {#if playerData?.length > 0}
    <Collapse onChange={value => optionsData.isInactiveOpen = value} />
    <DeleteAll bind:players bind:activePlayers />
  {/if} -->
  <h2>Inactive Players</h2>
  <Helper text="inactive" title="Inactive Players Features" features={helperFeaturesOne} />
  <div class="person-container">
    {#if playerData.length > 0}
      {#each playerData as person}
        <Person 
          name={person} 
          addActivePlayer={addActivePlayer} 
          showDialogElement={showDialogElement}
        />
      {/each}
    {/if}
  </div>
  <button class="options" on:click={() => showOptionsDialog()}>
    Options
  </button>
  {#if optionsData.maxActivePlayers - activePlayerData?.length <= 0}
    <p class="limit-message">Active Player Limit Reached</p>
  {/if}
  <button class="add" on:click={addPlayerDialog}>
    Add Player
  </button>
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
  p.limit-message {
    text-align: center; 
    font-size: 12px; 
    margin: 2px auto
  }       

  .options {
    width: 100px;
    position: absolute;
    left: 35px;
    bottom: -15px;
  }

  .add {
    width: 100px;
    position: absolute;
    right: 35px;
    bottom: -15px;
    margin: auto;
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

  @media (prefers-color-scheme: dark) {
    h2 {
      color: var(--grey-nine);
    }
    p.limit-message {
      color: var(--grey-nine);
    }
    button {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }
  }
</style>
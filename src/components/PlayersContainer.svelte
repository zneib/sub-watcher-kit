<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { playerStore, activePlayerStore, optionsStore } from "../global-store";
	import type { OptionsType, PlayerType } from '../global-types';
  import Collapse from "./Collapse.svelte";
  // import DeleteAll from "./DeleteAll.svelte";
  import Helper from "./Helper.svelte";
  import Person from "./Person.svelte";

  let isOpen = true;

  let helperFeaturesOne = [
    'Add new players by clicking on the "Add Player" button.',
    'Configure the max active player limit and play time limits by clicking the Options button.',
    'Clicking on a player name will add them to the "Active Player" list.',
    'Clicking on the "X" will ask you to confirm you want to remove that player.',
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ];

  let optionsDialog: HTMLDialogElement;
  let addPlayerDialog: HTMLDialogElement;
  onMount(() => {
    optionsDialog = document.getElementById('optionsDialog') as HTMLDialogElement;
    addPlayerDialog = document.getElementById('addPlayerDialog') as HTMLDialogElement;
  })

  let playerData: PlayerType[] = [];
  const playerStoreSub = playerStore.subscribe((data) => {
    playerData = data;
  });

  let activePlayerData: PlayerType[] = [];
  const activePlayerStoreSub = activePlayerStore.subscribe((data) => {
    activePlayerData = data;
  });

  let optionsData: OptionsType;
  const optionsStoreSub = optionsStore.subscribe((data) => {
    optionsData = data;
  })

  const addActivePlayer = (player: PlayerType) => {
    activePlayerStore.update((data) => [...data, player]);

    // Remove the player from the inactive player list
    const people: PlayerType[] = playerData.filter(({playerName}) => playerName !== player.playerName);
    playerStore.update(() => [...people])

    localStorage.setItem('activePlayers', JSON.stringify(activePlayerData));
    localStorage.setItem('players', JSON.stringify(people));
  }

  const handleOptionsClick = () => {
    optionsStore.update((data) => { 
      return {...data, showOptionsDialog: true }
    });
  }

  onDestroy(() => {
    playerStoreSub();
    activePlayerStoreSub();
    optionsStoreSub();
  });
</script>

<article>
  {#if playerData?.length > 0}
    <Collapse bind:isOpen />
    <!-- <DeleteAll bind:players bind:activePlayers /> -->
  {/if}
  <h2>Inactive Players</h2>
  <Helper text="inactive" title="Inactive Players Features" features={helperFeaturesOne} />
  <div class:collapsed={!isOpen} class="person-container">
    {#if playerData.length > 0}
      {#each playerData as person}
        <Person 
          person={person} 
          addActivePlayer={addActivePlayer}
        />
      {/each}
    {/if}
  </div>
  <button class="options" on:click={handleOptionsClick}>
    Options
  </button>
  {#if optionsData.maxActivePlayers - activePlayerData?.length <= 0}
    <p class="limit-message">Active Player Limit Reached</p>
  {/if}
  <button class="add" on:click={() => addPlayerDialog.showModal()}>
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
  div.person-container {
    max-height: 220px;
    overflow-y: auto;
    padding-right: 5px;
  }
  div.collapsed {
    display: none;
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

  @media (max-width: 768px) {
    article {
      width: 90%;
      margin-top: 25px;
    }
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
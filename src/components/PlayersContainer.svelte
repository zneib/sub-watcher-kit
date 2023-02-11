<script lang="ts">
  import { afterUpdate, onDestroy } from 'svelte';
  import { playerStore, activePlayerStore } from "../global-store";
  import Collapse from "./Collapse.svelte";
  // import DeleteAll from "./DeleteAll.svelte";
  import Helper from "./Helper.svelte";
  import Person from "./Person.svelte";
	import Player from "./Player.svelte";

  let helperFeaturesOne = [
    'Add new players by clicking on the "Add Player" button.',
    'Configure the max active player limit and play time limits by clicking the Options button.',
    'Clicking on a player name will add them to the "Active Player" list.',
    'Clicking on the "X" will ask you to confirm you want to remove that player.',
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ];

  let playerData: string[] = [];
  const unsubscribe = playerStore.subscribe((data) => {
    playerData = data;
  });

  afterUpdate(() => {
    console.log(playerData);
  })

  const addActivePlayer = (player: string) => {
    activePlayerStore.update((data) => [...data, player]);
  }

  onDestroy(unsubscribe);
  
</script>

<article>
  <!-- {#if playerData.players?.length > 0}
    <Collapse onChange={value => $globalStore.isInactiveOpen = value} />
    <DeleteAll bind:players bind:activePlayers />
  {/if} -->
  <h2>Inactive Players</h2>
  <Helper text="inactive" title="Inactive Players Features" features={helperFeaturesOne} />
  <div class="person-container">
    <button on:click={() => addActivePlayer('Chris')} on:keyup={() => addActivePlayer('Chris')}>Chris</button>
    <button on:click={() => addActivePlayer('Bill')} on:keyup={() => addActivePlayer('Bill')}>Bill</button>
    <button on:click={() => addActivePlayer('Natalie')} on:keyup={() => addActivePlayer('Natalie')}>Natalie</button>
    <!-- {#if $globalStore.players.length > 0}
      {#each $globalStore.players as person}
        <Person 
          name={person} 
          addActivePlayer={addActivePlayer} 
          showDialogElement={showDialogElement} 
          maxActivePlayers={$globalStore.maxActivePlayers} 
          activePlayers={activePlayers?.length}
          limitMessageShowing={showMaxLimitMessage}
        />
      {/each}
    {/if} -->
  </div>
  <!-- <button class="options" on:click={() => optionsDialog.showModal()}>
    Options
  </button> -->
  <!-- {#if showMaxLimitMessage}
    <p class="limit-message">Active Player Limit Reached</p>
  {/if} -->
  <!-- <button class="add" on:click={() => addPlayerDialog.showModal()}>
    Add Player
  </button> -->
</article>

<style>

</style>
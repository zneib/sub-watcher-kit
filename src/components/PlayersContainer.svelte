<script lang="ts">
  import globalStore from "../global-store";
  import Collapse from "./Collapse.svelte";
  // import DeleteAll from "./DeleteAll.svelte";
  import Helper from "./Helper.svelte";
  import Person from "./Person.svelte";

  let helperFeaturesOne = [
    'Add new players by clicking on the "Add Player" button.',
    'Configure the max active player limit and play time limits by clicking the Options button.',
    'Clicking on a player name will add them to the "Active Player" list.',
    'Clicking on the "X" will ask you to confirm you want to remove that player.',
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ]
  
   globalStore.subscribe(() => {});
</script>

<article>
  {#if $globalStore.players?.length > 0}
    <Collapse onChange={value => $globalStore.isInactiveOpen = value} />
    <!-- <DeleteAll bind:players bind:activePlayers /> -->
  {/if}
  <h2>Inactive Players</h2>
  <Helper text="inactive" title="Inactive Players Features" features={helperFeaturesOne} />
  <div class:collapsed={!$globalStore.isInactiveOpen} class="person-container">
    {#if $globalStore.players.length > 0}
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
    {/if}
  </div>
  <button class="options" on:click={() => optionsDialog.showModal()}>
    Options
  </button>
  {#if showMaxLimitMessage}
    <p class="limit-message">Active Player Limit Reached</p>
  {/if}
  <button class="add" on:click={() => addPlayerDialog.showModal()}>
    Add Player
  </button>
</article>
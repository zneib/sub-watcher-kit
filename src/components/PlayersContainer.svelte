<script lang="ts">
  import globalStore from "../global-store";
  import Collapse from "./Collapse.svelte";
  import Helper from "./Helper.svelte";
  import Person from "./Person.svelte";
  
  let players: string[];
  globalStore.subscribe(({players: people}) => {
    players = people;
  })
</script>

<!-- <article>
  {#if players?.length > 0}
    <Collapse onChange={value => isInactiveOpen = value} />
    <DeleteAll bind:players bind:activePlayers />
  {/if}
  <h2>Inactive Players</h2>
  <Helper text="inactive" title="Inactive Players Features" features={helperFeaturesOne} />
  <div class:collapsed={!isInactiveOpen} class="person-container">
    {#if players.length > 0}
      {#each players as person}
        <Person 
          name={person} 
          addActivePlayer={addActivePlayer} 
          showDialogElement={showDialogElement} 
          maxActivePlayers={maxActivePlayers} 
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
</article> -->
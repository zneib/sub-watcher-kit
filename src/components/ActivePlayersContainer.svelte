<script lang="ts">
  import globalStore from "../global-store";
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
  
  globalStore.subscribe(() => {});
  console.log($globalStore.activePlayers);

  const removeActivePlayerFn = (player: string) => {
    const currentActivePlayers = $globalStore.activePlayers.filter((name: string) => name !== player);
    const people = [...$globalStore.players, player];
    localStorage.setItem('activePlayers', JSON.stringify(currentActivePlayers));
    localStorage.setItem('people', JSON.stringify(people));
    globalStore.update((data) => {
      return {
        ...data,
        players: people,
        activePlayers: currentActivePlayers
      }
    })
  }

  // const removeAllActivePlayers = () => {
  //   people = [people, ...activePlayers].flat();
  //   activePlayers = [];
  //   localStorage.removeItem('activePlayers');
  //   localStorage.setItem('people', JSON.stringify(people));
  // }
</script>

<article>
  {#if $globalStore.activePlayers?.length > 0}
    <Collapse onChange={value => $globalStore.isActiveOpen = value} />
  {/if}
  <h2>Active Players</h2>
  <Helper text="active" title="Active Players Features" features={helperFeaturesTwo} />
  {#if $globalStore.activePlayers?.length > 0 && $globalStore.isActiveOpen}
    <div class="labels">
      <span>Name</span>
      <span>({$globalStore.playTimeLimit}) MM:SS</span>
    </div>
  {/if}
  <div class:collapsed={!$globalStore.isActiveOpen}>
    {#if $globalStore.activePlayers.length > 0}
      {#each $globalStore.activePlayers as player, index}
        <Player index={index} name={player} removeActivePlayer={() => removeActivePlayerFn} playTimeLimit={$globalStore.playTimeLimit} />
      {/each}
    {/if}
  </div>
  {#if $globalStore.maxActivePlayers - $globalStore.activePlayers?.length !== 0}
    <p class="limit-message">
      <span>{$globalStore.maxActivePlayers - $globalStore.activePlayers?.length}</span> spots open
    </p>
  {/if}
  {#if $globalStore.activePlayers?.length > 1 && $globalStore.isActiveOpen}
    <!-- <button class="remove-all" on:click={() => $globalStore.removeAllActivePlayers}>Remove All Players</button> -->
  {/if}
  {#if $globalStore.activePlayers?.length === 0}
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
  p.limit-message {
    text-align: center; 
    font-size: 12px; 
    margin: 2px auto
  }
  p.limit-message > span {
    font-weight: bold;
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
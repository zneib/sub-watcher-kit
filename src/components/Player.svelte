<script lang="ts">
	import type { PlayerType } from "../global-types";
	import Stat from "./Stat.svelte";
  export let player: PlayerType;
  export let selectedPlayer: PlayerType;
  export let removeActivePlayer: (player: PlayerType) => void;
  export let updateActivePlayer: (player: PlayerType) => void;

  $: isActivated = player.id === selectedPlayer.id;
</script>

<button class="name" class:isActivated on:click={() => updateActivePlayer(player)}>
  {#if !isActivated}
    <span class="index">{player.playerNumber}</span>
  {:else}
  <button class="bench" on:click={() => removeActivePlayer(player)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>    
  </button>
  {/if}
  <div class="nameAndNumber">
    <span class="name">{player.playerName}</span>
  </div>
  <div class="stats">
    <Stat player={player} isActivated={isActivated} text="points" total={player.points ?? 0}/>
    <Stat player={player} isActivated={isActivated} text="assists" total={player.assists ?? 0}/>
    <Stat player={player} isActivated={isActivated} text="fouls" total={player.fouls ?? 0}/>
    <Stat player={player} isActivated={isActivated} text="blocks"/>
  </div>
</button>

<style>
  div {
    height: 45px;
  }
  button.name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    margin: 10px 0px 10px 30px;
    padding: 5px 10px;
    transition: box-shadow ease-in .2s;
    position: relative;
    width: 95%;
  }
  div.nameAndNumber {
    display: flex;
    place-items: center;
    width: 20%;
  }
  div.stats {
    width: 75%;
    display: flex;
    justify-content: space-evenly;
  }
  button.name:hover {
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.2);
    cursor: pointer;
  }
  button.isActivated {
    border: 2px solid #ccc;
  }
  button.isActivated:hover {
    box-shadow: none;
  }
  span.index {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    font-size: 12px;
    font-style: italic;
    border-radius: 5px;
    padding: 5px 10px;
    top: 0;
    bottom: 0;
    left: -35px;
    margin: auto;
  }
  button.bench {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    /* padding: 5px 10px; */
    top: 0;
    bottom: 0;
    left: -40px;
    /* margin: auto; */
    background: transparent;
    color: #fff;
    border: none;
  }

  @media (prefers-color-scheme: dark) {
    button.name {
      color: var(--grey-nine);
      background-color: var(--grey-four);
    }
  }
</style>
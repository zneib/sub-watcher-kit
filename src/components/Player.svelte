<script lang="ts">
  import { afterUpdate } from "svelte";
	import type { PlayerType } from "../global-types";
	import Stat from "./Stat.svelte";
  export let player: PlayerType;
  export let selectedPlayer: PlayerType;
  export let removeActivePlayer: (name: string) => void;
  export let playTimeLimit: string;
  export let updateActivePlayer: (player: PlayerType) => void;
  let seconds: number = 0;
  let minutes: number = 0;
  let timesUp: boolean = false;

  $: isActivated = player.id === selectedPlayer.id;

  const timerTracker = setInterval(() => {
    if (seconds === 59) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds += 1;
    }
  }, 1000);

  $: timer = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  afterUpdate(() => {
    if (+timer.replace(':', '') > +playTimeLimit.replace(':', '')) {
      clearInterval(timerTracker);
      timesUp = true;
    }
    // Prevent the timer from going forever.
    if (timer === playTimeLimit) {
      clearInterval(timerTracker);
      timesUp = true;
    }
  });
</script>

<div class:danger={timesUp} class="name" class:isActivated on:click={() => updateActivePlayer(player)} on:keyup={() => console.log('Player')}>
  <div class="nameAndNumber">
    {#if !isActivated}
      <span class:danger={timesUp} class="index">{player.playerNumber}</span>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="bench" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" on:click={removeActivePlayer(player.playerName)} on:keyup={removeActivePlayer(player.playerName)}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>    
    {/if}
    <span class="name">{player.playerName}</span>
  </div>
  <div class="stats">
    <Stat player={player} isActivated={isActivated} text="points" total={player.points ?? 0}/>
    <Stat player={player} isActivated={isActivated} text="assists" total={player.assists ?? 0}/>
    <Stat player={player} isActivated={isActivated} text="fouls" total={player.fouls ?? 0}/>
  </div>
  <span class="timer">{timer}</span>
</div>

<style>
  div {
    height: 45px;
  }
  div.name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    margin: 10px 0px 10px 30px;
    padding: 5px 10px;
    transition: box-shadow ease-in .2s;
    position: relative;
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
  span.timer {
    width: 5%;
  }
  div.name:hover {
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.2);
    cursor: pointer;
  }
  div.isActivated {
    border: 2px solid #ccc;
  }
  div.isActivated:hover {
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
  svg.bench {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    padding: 5px 10px;
    top: 0;
    bottom: 0;
    left: -40px;
    margin: auto;
  }

  div.danger {
    border: 2px solid var(--danger)
  }

  span.danger {
    color: var(--danger);
  }

  @media (prefers-color-scheme: dark) {
    div.name {
      color: var(--grey-nine);
      background-color: var(--grey-four);
    }
  }
</style>
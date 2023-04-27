<script lang="ts">
  import { onDestroy } from 'svelte';
  import { playerStore, activePlayerStore, optionsStore } from "../global-store";
	import type { PlayerType } from '../global-types';
  import Collapse from "./Collapse.svelte";
  import Helper from "./Helper.svelte";
  import Player from "./Player.svelte";

  let selectedPlayer: PlayerType = { id: 0, playerNumber: 0, playerName: '', points: 0, assists: 0, fouls: 0};

  let isOpen = true;

  let helperFeaturesTwo = [
    "Players will start their time as soon as they're added to the list.",
    "Players will reach their max playing time as set by you in Options.",
    "Players who reach their max playing time will turn red and their time will end.",
    "Players can be sent back to the inactive list by clicking on their name.",
    "All players can be sent back to the inactive list by clicking on the Remove All Players button.",
    'Collapse and expland the card by clicking on the top left plus and minus buttons.'
  ]
  
  let playerData: PlayerType[] = [];
  const playerStoreSub = playerStore.subscribe((data) => {
    playerData = data;
  });

  let activePlayerData: PlayerType[] = [];
  const activePlayerStoreSub = activePlayerStore.subscribe((data) => {
    activePlayerData = data;
  });

  const convertToSeconds = (time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);

    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
  }

  const convertToTime = (seconds: number) => {
    let mm: number | string = Math.floor(seconds / 60);
    let ss: number | string = seconds - (mm * 60);

    mm = mm < 10 ? '0' + mm : mm.toString();
    ss = ss < 10 ? '0' + ss : ss.toString();

    return `${mm}:${ss}`;
  }

  const removeActivePlayerFn = (player: PlayerType, time: string) => {
    console.log(activePlayerData);
    // Keep track of the time the player was active
    const timeInSeconds = convertToSeconds(time);
    const playerIndex = activePlayerData.findIndex((person) => person.id === player.id);
    console.log(playerIndex)
    if (playerIndex !== -1) {
      activePlayerData[playerIndex] = { 
        ...player,
        time: timeInSeconds
      }
      activePlayerStore.update(() => {
        return [...activePlayerData];
      })
      localStorage.setItem('players', JSON.stringify(activePlayerData));
    }
    const currentActivePlayers = activePlayerData.filter(({playerName}) => playerName !== player.playerName);
    activePlayerStore.update(() => [...currentActivePlayers]);
    playerStore.update((data) => [...data, player]);

    // Keep localStorage in sync
    localStorage.setItem('activePlayers', JSON.stringify(currentActivePlayers));
    localStorage.setItem('players', JSON.stringify(playerData));

    // Set the active player to null state
    selectedPlayer = { id: 0, playerNumber: 0, playerName: '', points: 0};
  }

  // const addActivePlayer = (player: PlayerType) => {
  //   activePlayerStore.update((data) => [...data, player]);

  //   // Remove the player from the inactive player list
  //   const people: PlayerType[] = playerData.filter(({playerName}) => playerName !== player.playerName);
  //   playerStore.update(() => [...people])

  //   localStorage.setItem('activePlayers', JSON.stringify(activePlayerData));
  //   localStorage.setItem('players', JSON.stringify(people));
  // }

  const removeAllActivePlayersFn = () => {
    playerStore.update(() => [...playerData, ...activePlayerData].flat())
    activePlayerStore.update(() => []);

    // Keep localStorage in sync.
    localStorage.removeItem('activePlayers');
    localStorage.setItem('players', JSON.stringify(playerData));
  }

  const updateActivePlayer = (player: PlayerType) => {
    selectedPlayer = player;
  }

  onDestroy(() => {
    playerStoreSub();
    activePlayerStoreSub();
  });
</script>

<article>
  {#if activePlayerData?.length > 0}
    <Collapse bind:isOpen />
  {/if}
  <button class="addPlayer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
    </svg>
    Add Player
  </button>
  <h2>Active Players</h2>
  <Helper text="active" title="Active Players Features" features={helperFeaturesTwo} />
  {#if activePlayerData?.length > 0 && $optionsStore.isActiveOpen}
    <div class="labels">
      <span>Name</span>
      <span>({$optionsStore.playTimeLimit}) MM:SS</span>
    </div>
  {/if}
  <div class:collapsed={!isOpen}>
    {#if activePlayerData.length > 0}
      {#each activePlayerData as player}
        <Player player={player} selectedPlayer={selectedPlayer} removeActivePlayer={removeActivePlayerFn} playTimeLimit={$optionsStore.playTimeLimit} updateActivePlayer={updateActivePlayer} />
      {/each}
    {/if}
  </div>
  {#if $optionsStore.maxActivePlayers - activePlayerData?.length !== 0}
    <p class="limit-message">
      <span>{$optionsStore.maxActivePlayers - activePlayerData?.length}</span> spots open
    </p>
  {/if}
  {#if activePlayerData?.length > 1 && $optionsStore.isActiveOpen}
    <button class="remove-all" on:click={removeAllActivePlayersFn}>Remove All Players</button>
  {/if}
  {#if activePlayerData?.length === 0}
    <p class="message-text">No Players Selected</p>
  {/if}
  <!-- <button class="add" on:click={() => addPlayerDialog.showModal()}>
    Add Player
  </button> -->
</article>

<style>
  article {
    position: relative;
    padding: 15px 15px 30px;
    margin: 10px 0 10px 10px;
    border-radius: 5px;
    flex: 2;
  }
  button.addPlayer {
    position: absolute;
    left: 50px;
    top: 10px;
    display: flex;
  }
  svg {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  svg:hover {
    cursor: pointer;
  }
  h2 {
    margin-top: 0;
    text-align: center;
  }
  div.collapsed {
    display: none;
  }
  .add {
    width: 100px;
    position: absolute;
    right: 0;
    left: 0;
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

  @media (max-width: 768px) {
    article {
      width: 95%;
      margin-top: 25px;
    }
  }

  @media (prefers-color-scheme: dark) {
    svg {
      fill: var(--grey-nine);
    }
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
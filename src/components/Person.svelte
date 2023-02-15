<script lang="ts">
  import { onDestroy } from 'svelte';
  import { playerStore, activePlayerStore, optionsStore } from '../global-store';
  import type { OptionsType, PlayerType } from '../global-types';
  export let person: PlayerType;
  export let addActivePlayer: (player: PlayerType) => void;
  export let showDialogElement: (name: string) => void;
  let showConfirmation = false;

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
  });

  const handleClick = (player: PlayerType) => {
    if (optionsData.maxActivePlayers - activePlayerData.length >= 0) {
      addActivePlayer(player);
    } else {
      return;
    }
  }

  onDestroy(() => {
    playerStoreSub();
    activePlayerStoreSub();
    optionsStoreSub();
  });
</script>

<div>
  <span>{person.playerNumber}</span>
  <button disabled={optionsData.maxActivePlayers - activePlayerData?.length <= 0} class="wrapper" on:click={() => handleClick(person)}>
    {person.playerName}
    {#if !showConfirmation}
      <svg xmlns="http://www.w3.org/2000/svg" on:click={(e) => {showDialogElement(person.playerName); e.stopPropagation()}} width="15px" height="15px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {/if}
  </button>
</div>

<style>
  button.wrapper {
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 5px;
    border: none;
    width: 100%;
    font-size: 16px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    margin: 5px 0px;
    padding: 5px 10px;
    transition: box-shadow ease-in .2s;
    cursor: pointer;
  }
  button.wrapper:hover {
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.2);
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  div {
    display: flex;
    place-items: center;
  }

  span {
    font-size: 11px;
    font-style: italic;
    margin-right: 10px;
  }

  svg {
    cursor: pointer;
  }

  @media (prefers-color-scheme: dark) {
    button.wrapper {
      color: var(--grey-nine);
      background-color: var(--grey-four);
    }
    span {
      color: var(--grey-nine);
    }
  }
</style>
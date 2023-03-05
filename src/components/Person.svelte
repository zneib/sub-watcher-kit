<script lang="ts">
  import { onDestroy } from 'svelte';
  import { playerStore, activePlayerStore, optionsStore } from '../global-store';
  import type { OptionsType, PlayerType } from '../global-types';
  export let person: PlayerType;
  export let addActivePlayer: (player: PlayerType) => void;
  let isActivated = false;

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

  const activatePlayer = (player: PlayerType) => {
    if (optionsData.maxActivePlayers - activePlayerData.length >= 0) {
      addActivePlayer(player);
      isActivated = false;
    } else {
      return;
    }
  }

  const handleEditPlayer = (player: PlayerType) => {
    optionsStore.update((data) => { 
      return { ...data, playerToEdit: player, showEditDialog: true }
    })
  }

  const handleDeletePlayer = (player: PlayerType) => {
    optionsStore.update((data) => {
      return { ...data, playerToEdit: player, showDeleteDialog: true}
    })
  }

  onDestroy(() => {
    playerStoreSub();
    activePlayerStoreSub();
    optionsStoreSub();
  });
</script>

<div>
  {#if !isActivated}
    <span>{person.playerNumber}</span>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" on:click|stopPropagation={() => handleDeletePlayer(person)} on:keyup|stopPropagation={(e) => handleDeletePlayer(person)} width="20px" height="20px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  {/if}
  <button disabled={optionsData.maxActivePlayers - activePlayerData?.length <= 0} class="wrapper" class:isActivated on:click={() => isActivated = !isActivated}>
    {person.playerName}
    <div>
      {#if isActivated}
        <svg xmlns="http://www.w3.org/2000/svg" on:click|stopPropagation={() => handleEditPlayer(person)} on:keyup|stopPropagation={(e) => handleEditPlayer(person)} width="12px" height="12px" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>
      {/if}
    </div>
  </button>
  {#if isActivated}
    <svg xmlns="http://www.w3.org/2000/svg" on:click|stopPropagation={() => activatePlayer(person)} on:keyup|stopPropagation={(e) => activatePlayer(person)} width="25px" height="25px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  {/if}
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
    margin: 5px 5px 5px 0px;
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
  div > svg:nth-child(1) {
    margin-right: 5px;
  }

  span {
    font-size: 11px;
    font-style: italic;
    margin-right: 10px;
    width: 3%;
  }

  svg {
    cursor: pointer;
  }

  button.isActivated {
    height: 45px;
    border: 2px solid #ccc;
  }
  button.isActivated:hover {
    box-shadow: none;
  }

  @media (prefers-color-scheme: dark) {
    button.wrapper {
      color: var(--grey-nine);
      background-color: var(--grey-four);
    }
    span {
      color: var(--grey-nine);
    }
    svg {
      color: var(--grey-nine);
    }
  }
</style>
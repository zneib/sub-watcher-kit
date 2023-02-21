<script lang="ts">
  import { onDestroy } from 'svelte';
	import { dataset_dev } from 'svelte/internal';
  import { playerStore, activePlayerStore, optionsStore } from '../global-store';
  import type { OptionsType, PlayerType } from '../global-types';
  export let person: PlayerType;
  export let addActivePlayer: (player: PlayerType) => void;
  export let showDialogElement: (name: string) => void;
  export let showEditDialogElement: (name: string) => void;
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

  const handleEditPlayer = (player: PlayerType) => {
    optionsStore.update((data) => { 
      return { ...data, playerToEdit: player, showEditDialog: true }
    })
  }

  const handlePointerEvent = (event: PointerEvent) => {
    switch(event.pointerType) {
      case 'mouse':
        console.log('You used a mouse');
        break;
      case 'touch':
        console.log('You used a phone or tablet');
        break;
      default:
        console.log('Not sure what you are using');
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
  <button disabled={optionsData.maxActivePlayers - activePlayerData?.length <= 0} class="wrapper" on:click={() => handleClick(person)} on:pointerdown={handlePointerEvent}>
    {person.playerName}
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" on:click|stopPropagation={(e) => handleEditPlayer(person)} fill="none" width="12px" height="12px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
      {#if !showConfirmation}
        <svg xmlns="http://www.w3.org/2000/svg" on:click|stopPropagation={(e) => showDialogElement(person.playerName)} width="15px" height="15px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      {/if}
    </div>
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
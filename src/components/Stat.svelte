<script lang="ts">
  import { onDestroy } from 'svelte';
  import { activePlayerStore } from '../global-store';
	import type { PlayerType } from '../global-types';
  export let player: PlayerType;
  export let text: string;
  export let isActivated: boolean = false;
  export let total = 0;

  const handlePlus = () => {
    total = total + 1;
    updatePlayer();
  }

  const handleMinus = () => {
    if (total === 0) {
      return;
    } else {
      total = total - 1
      updatePlayer();
    }
  }

  let activePlayerData: PlayerType[] = [];
  const activePlayerStoreSub = activePlayerStore.subscribe((data) => {
    activePlayerData = data;
  });

  const updatePlayer = () => {
    const playerIndex = activePlayerData.findIndex((person) => person.id === player.id);
    if (playerIndex !== -1) {
      activePlayerData[playerIndex] = { 
        ...player,
        [text]: total 
      }
      activePlayerStore.update(() => {
        return [...activePlayerData];
      })
      localStorage.setItem('players', JSON.stringify(activePlayerData));
    }
  }

  onDestroy(() => {
    activePlayerStoreSub();
  });
</script>

<div class="stat">
  <p class="total">{total}</p>
  <p>{text.toUpperCase()}</p>
  {#if isActivated}
    <button class="minusSign" on:click={handleMinus}>
      <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
      </svg>  
    </button>  
    <button class="plusSign" on:click={handlePlus}>
      <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
      </svg> 
    </button>
  {/if}
</div>

<style>
  div {
    height: 45px;
  }
  div.stat {
    display: inline-block;
    place-items: center;
    font-size: 9px;
    margin: 5px 20px 0 20px;
    text-align: center;
    position: relative;
  }
  div.stat > p {
    margin: 0;
  }
  div.stat > p.total {
    font-size: 18px;
  }
  button.minusSign {
    color: black;
    background: transparent;
    border: none;
    position: absolute;
    top: -20px;
    bottom: 0;
    left: -20px;
    margin: auto 0;
  }
  button.plusSign {
    color: black;
    background: transparent;
    border: none;
    position: absolute;
    top: -20px;
    bottom: 0;
    right: -20px;
    margin: auto 0;
  }
  @media (prefers-color-scheme: dark) {
    svg {
      color: var(--grey-nine);
    }
  }
</style>
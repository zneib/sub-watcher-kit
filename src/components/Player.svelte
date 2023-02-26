<script lang="ts">
  import { afterUpdate } from "svelte";
  export let number: number;
  export let name: string;
  export let removeActivePlayer: (name: string) => void;
  export let playTimeLimit: string;
  let isActivated = false;
  let seconds: number = 0;
  let minutes: number = 0;
  let timesUp: boolean = false;

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

<div class:danger={timesUp} class="name" class:isActivated on:click={() => isActivated = !isActivated} on:keyup={() => console.log('Player')}>
  <div class="nameAndNumber">
    {#if !isActivated}
      <span class:danger={timesUp} class="index">{number}</span>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="bench" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" on:click={removeActivePlayer(name)} on:keyup={removeActivePlayer(name)}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>    
    {/if}
    <span class="name">{name}</span>
  </div>
  <div class="stats">
    <div class="track">
      <p class="total">0</p>
      <p>PTS</p>
      {#if isActivated}
        <svg class="minusSign" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
        </svg>      
        <svg class="plusSign" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg> 
      {/if}
    </div>
    <div class="track">
      <p class="total">0</p>
      <p>ASSISTS</p>
      {#if isActivated}
        <svg class="minusSign" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
        </svg>      
        <svg class="plusSign" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      {/if} 
    </div>
    <div class="track">
      <p class="total">0</p>
      <p>FOULS</p>
      {#if isActivated}
        <svg class="minusSign" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
        </svg>      
        <svg class="plusSign" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg> 
      {/if}
    </div>
    <div class="track">
      <p class="total">0</p>
      <p>BLOCKS</p>
      {#if isActivated}
        <svg class="minusSign" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
        </svg>      
        <svg class="plusSign" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg> 
      {/if}
    </div>
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
  div.track {
    display: inline-block;
    place-items: center;
    font-size: 9px;
    margin: 8px 20px 0 20px;
    text-align: center;
    position: relative;
  }
  div.track > p {
    margin: 0;
  }
  div.track > p.total {
    font-size: 18px;
  }
  svg.minusSign {
    position: absolute;
    top: -20px;
    bottom: 0;
    left: -20px;
    margin: auto 0;
  }
  svg.plusSign {
    position: absolute;
    top: -20px;
    bottom: 0;
    right: -20px;
    margin: auto 0;
  }
  div:hover {
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.2);
    cursor: pointer;
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
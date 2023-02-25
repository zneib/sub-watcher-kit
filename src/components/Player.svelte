<script lang="ts">
  import { afterUpdate } from "svelte";
  export let number: number;
  export let name: string;
  export let removeActivePlayer: (name: string) => void;
  export let playTimeLimit: string;
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

<div class:danger={timesUp} class="name" on:click={removeActivePlayer(name)} on:keyup={() => console.log('Player')}>
  <div class="nameAndNumber">
    <span class:danger={timesUp} class="index">{number}</span>
    <span class="name">{name}</span>
  </div>
  <div class="stats">
    <div class="track">
      <p class="total">0</p>
      <p>PTS</p>
    </div>
    <div class="track">
      <p class="total">0</p>
      <p>ASSISTS</p>
    </div>
    <div class="track">
      <p class="total">0</p>
      <p>FOULS</p>
    </div>
    <div class="track">
      <p class="total">0</p>
      <p>BLOCKS</p>
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
  }
  div.track > p {
    margin: 0;
  }
  div.track > p.total {
    font-size: 18px;
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
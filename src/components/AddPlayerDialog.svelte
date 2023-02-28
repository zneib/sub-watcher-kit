<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { playerStore } from "../global-store";
	import type { PlayerType } from '../global-types';
  import { handleClickOutside } from '../helpers';

  let addPlayerDialog: HTMLDialogElement;
  onMount(() => {
    addPlayerDialog = document.getElementById('addPlayerDialog') as HTMLDialogElement;
  });

  let playerName: string;
  let playerNumber: number;


  let playerData: PlayerType[] = [];
  const unsubscribe = playerStore.subscribe((data) => {
    playerData = data;
  });

  const closeDialog = () => {
    addPlayerDialog.close()
  }

  // Come back and fix the lazy any type here...
  const addPlayer = (e: any) => {
    playerStore.update((data) => [...data, { id: playerData.length + 1, playerName, playerNumber }]);
    e.target?.reset();
    localStorage.setItem('players', JSON.stringify(playerData));
  }

  onDestroy(unsubscribe);
</script>

<dialog id="addPlayerDialog" on:click={(e) => handleClickOutside(e, addPlayerDialog)}>
  <div class="wrapper">
    <form on:submit|preventDefault={addPlayer}>
      <h3>Add Another Player</h3>
      <div>
        <label for="firstName">Name</label>
        <input type="text" name="firstName" bind:value={playerName}>
      </div>
      <div>
        <label for="playerNumber">Number</label>
        <input type="tel" name="playerNumber" bind:value={playerNumber} minlength="1" maxlength="2">
      </div>
      <div class="button-wrapper">
        <button type="submit" disabled={!playerName && !playerNumber}>Add</button>
        <button value="cancel" on:click|stopPropagation|preventDefault={closeDialog}>Close</button>
      </div>
    </form>
  </div>
</dialog>

<style>
  dialog {
    border: 2px solid rgb(175, 175, 175);
    border-radius: 5px;
    padding: 0;
    min-width: 300px;
    max-width: 350px;
  }

  dialog::backdrop {
    background-color: rgba(0,0,0,0.2);
  }

  dialog > div.wrapper {
    padding: 16px;
  }

  form {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
  }

  label {
    font-size: 12px;
  }

  input {
    width: 100%;
    margin-top: 2px;
    margin-bottom: 15px;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 16px;
  }

  h3 {
    margin-top: 0;
    text-align: center;
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

  button[type=submit]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .button-wrapper {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  @media (prefers-color-scheme: dark) {

    dialog {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }

    dialog::backdrop {
      background-color: rgba(0,0,0,0.4);
    }

    h3 {
      color: var(--grey-nine);
    }

    button {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }
    form {
      background-color: var(--grey-four);
    }

    label {
      color: var(--grey-nine);
    }

    input {
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-bottom: 15px;
      padding: 5px 10px;
      width: 100%;
    }
  }
</style>
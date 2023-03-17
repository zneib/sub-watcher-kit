<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
	import { playerStore, appStateStore } from '../global-store';
	import type { AppStateType, PlayerType } from '../global-types';
  import { handleClickOutside } from '../helpers';

  let editPlayerDialog: HTMLDialogElement;
  onMount(() => {
    editPlayerDialog = document.getElementById('editPlayerDialog') as HTMLDialogElement;
  });

  let appStateData: AppStateType;
  let playerId: number | undefined;
  let playerName: string | undefined;
  let playerNumber: number | undefined;
  let playerPoints: number | undefined;
  let playerAssists: number | undefined;
  const appStateStoreSub = appStateStore.subscribe((data) => {
    appStateData = data;
    if (appStateData.showEditDialog && !editPlayerDialog.open) {
      editPlayerDialog.showModal();
    }
    playerId = appStateData.playerToEdit?.id;
    playerName = appStateData.playerToEdit?.playerName;
    playerNumber = appStateData.playerToEdit?.playerNumber;
    playerPoints = appStateData.playerToEdit?.points ?? 0;
    playerAssists = appStateData.playerToEdit?.assists ?? 0;
  });

  let playerData: PlayerType[] = [];
  const playerStoreSub = playerStore.subscribe((data) => {
    playerData = data;
  });

  const closeDialog = () => {
    editPlayerDialog.close()
  }

  const updatePlayer = () => {
    const playerIndex = playerData.findIndex((person) => person.id === playerId);
    if (playerIndex !== -1) {
      playerData[playerIndex] = { id: playerId, playerName, playerNumber, points: playerPoints }
      playerStore.update(() => {
        return [...playerData];
      })
      localStorage.setItem('players', JSON.stringify(playerData));
    }
    editPlayerDialog.close();
  }

  onDestroy(() => {
    playerStoreSub();
    appStateStoreSub();
  });
</script>

<dialog id="editPlayerDialog" on:click={(e) => handleClickOutside(e, editPlayerDialog)} on:keyup={() => console.log('Save Team Dialog')}>
  <div class="wrapper">
    <form on:submit|preventDefault={updatePlayer}>
      <h3>Edit Player</h3>
      <div>
        <label for="firstName">Name</label>
        <input type="text" name="firstName" bind:value={playerName}>
      </div>
      <div>
        <label for="playerNumber">Number</label>
        <input type="number" name="playerNumber" bind:value={playerNumber} minlength="1" maxlength="2">
      </div>
      <div>
        <label for="playerPoints">Points</label>
        <input type="number" name="playerPoints" bind:value={playerPoints}>
      </div>
      <div>
        <label for="playerAssists">Assists</label>
        <input type="number" name="playerAssists" bind:value={playerAssists}>
      </div>
      <div class="button-wrapper">
        <button type="submit">Update</button>
        <button value="cancel" on:click={closeDialog}>Close</button>
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
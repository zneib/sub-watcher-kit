<script lang="ts">
  import { onMount } from 'svelte';
  import { playerStore, activePlayerStore } from "../global-store";
  import { handleClickOutside } from '../helpers';

  let newGameDialog: HTMLDialogElement;
  onMount(() => {
    newGameDialog = document.getElementById('newGameDialog') as HTMLDialogElement;
  });

  const closeDialog = () => {
    newGameDialog.close()
  }

  const handleNewGame = () => {
    localStorage.clear();
    newGameDialog.close();
    playerStore.update(() => []);
    activePlayerStore.update(() => []);
  }
</script>

<button class="saveGame" on:click={() => newGameDialog.showModal()}>
  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>  
  <span>New Game</span>
</button>
<dialog id="newGameDialog" on:click={(e) => handleClickOutside(e, newGameDialog)} on:keyup={() => console.log('Save Game Dialog')}>
  <div class="wrapper">
    <form on:submit|preventDefault={handleNewGame}>
      <h3>New Game</h3>
      <p>All current game data will be lost if not saved</p>
      <div class="button-wrapper">
        <button type="submit">Continue</button>
        <button value="cancel" on:click={closeDialog}>Close</button>
      </div>
    </form>
  </div>
</dialog>

<style>
  button {
    margin: 0 5px;
  }
  dialog {
    border: 2px solid rgb(175, 175, 175);
    border-radius: 5px;
    padding: 0;
    min-width: 300px;
    max-width: 400px;
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
    display: flex;
    align-items: center;
  }
  button:hover {
    border: 2px solid rgb(129, 129, 129);
  }
  button > span {
    margin-left: 5px;
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
  }
</style>
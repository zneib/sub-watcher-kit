<script lang="ts">
  import { onMount } from 'svelte';
	import type { GameType } from '../global-types';
  import { handleClickOutside } from '../helpers';
  let gameName: string = '';
  let hasError = false;

  let saveGameDialog: HTMLDialogElement;
  onMount(() => {
    saveGameDialog = document.getElementById('saveGameDialog') as HTMLDialogElement;
  });

  const closeDialog = () => {
    saveGameDialog.close()
  }

  const postNewGame = async (gameData: GameType) => {
    await fetch(`https://zneib-sub-watcher-api.deno.dev/api/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameData)
    })
  }

  const saveGame = () => {
    const players = JSON.parse(localStorage.getItem('players') || '[]');
    const activePlayers = JSON.parse(localStorage.getItem('activePlayers') || '[]');
    const game: GameType = {
      name: gameName,
      players: [...players, ...activePlayers],
      date: new Date().toString()
    };
    if (Object.keys(game).length > 0) {
      postNewGame(game);
      // localStorage.setItem(`${gameName}-game`, JSON.stringify(game));
      saveGameDialog.close();
    } else {
      hasError = true;
    }
  }

  const getGameDetails = () => {
    // If the game has already been saved before. Inform the user that they can overwrite the existing game. Or they can edit the game details in the games page.
  }
</script>

<button class="saveGame" on:click={() => saveGameDialog.showModal()}>
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
  </svg>   
  <span>Save Game</span>
</button>
<dialog id="saveGameDialog" on:click={(e) => handleClickOutside(e, saveGameDialog)} on:keyup={() => console.log('Save Game Dialog')}>
  <div class="wrapper">
    <form on:submit|preventDefault={saveGame}>
      <h3>Save Game</h3>
      <div>
        <label for="gameName">Game Name</label>
        <input bind:value={gameName} type="text" name="gameName">
      </div>
      {#if hasError}
        <p class="error">Game name cannot be blank.</p>
      {/if}
      <div class="button-wrapper">
        <button type="submit">Save</button>
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

  .error {
    font-size: 10px;
    color: var(--danger);
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
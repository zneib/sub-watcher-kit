<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { browser } from '$app/environment';
  import { handleClickOutside } from '../helpers';
  export let people;
  export let activePlayers;

  let teams: Array<string | null> = [];
  let teamToLoad: string | null = '';

  let loadTeamDialog: HTMLDialogElement;
  onMount(() => {
    loadTeamDialog = document.getElementById('loadTeamDialog') as HTMLDialogElement;
    if (browser) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)?.includes('-team')) {
          teams = [...teams, localStorage.key(i)];
        }
      }
    }
  });

  const closeDialog = () => {
    loadTeamDialog.close()
  }

  const loadTeam = () => {
    if (browser) {
      const savedPlayers: string[] = browser && JSON.parse(localStorage.getItem(`${teamToLoad}`) || '[]');
      people = [...savedPlayers];
      activePlayers = [];
      localStorage.setItem('activePlayers', '[]');
      localStorage.setItem('people', JSON.stringify(savedPlayers));
      loadTeamDialog.close();
    }
  }
</script>

<dialog id="loadTeamDialog" on:click={(e) => handleClickOutside(e, loadTeamDialog)} on:keyup={() => console.log('Do something')}>
  <div class="wrapper">
    <form on:submit|preventDefault={loadTeam}>
      <h3>Load Team</h3>
      <div>
        <label for="teamName">Team Name</label>
        {#each teams as team}
          <button class="wrapper" on:click|preventDefault={() => teamToLoad = team}>{team?.slice(0, -5)}</button>
        {/each}
      </div>
      <div class="button-wrapper">
        <button type="submit">Load</button>
        <button value="cancel" on:click={closeDialog}>Cancel</button>
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

  h3 {
    margin-top: 0;
    text-align: center;
  }

  button.wrapper {
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 5px;
    border: 2px solid transparent;
    width: 100%;
    font-size: 16px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    margin: 10px 0px;
    padding: 5px 10px;
    transition: box-shadow ease-in .2s;
    cursor: pointer;
  }
  button.wrapper:hover {
    border: 2px solid transparent;
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.2);
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
    button.wrapper {
      color: var(--grey-two);
      background-color: var(--grey-eight);
    }

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
  }
</style>
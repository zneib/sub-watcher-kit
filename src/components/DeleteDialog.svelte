<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { appStateStore, playerStore } from '../global-store';
	import type { AppStateType, PlayerType } from '../global-types';
  import { handleClickOutside } from '../helpers';

  let deleteDialog: HTMLDialogElement;
  onMount(() => {
    deleteDialog = document.getElementById('deleteDialog') as HTMLDialogElement;
  });

  let playerData: PlayerType[] = [];
  const playerStoreSub = playerStore.subscribe((data) => {
    playerData = data;
  });

  let appStateData: AppStateType;
  const appStateStoreSub = appStateStore.subscribe((data) => {
    appStateData = data;
    if (appStateData.showDeleteDialog) {
      deleteDialog.showModal();
    }
  })

  const deletePerson = () => {
    const people: PlayerType[] = playerData.filter(({id}) => id !== appStateData?.playerToEdit?.id);
    playerStore.update(() => [...people])
    localStorage.setItem('players', JSON.stringify(people));
    deleteDialog.close();
  }

  const closeDialog = () => {
    deleteDialog.close();
  }

  onDestroy(() => {
    playerStoreSub();
    appStateStoreSub();
  });
</script>

<dialog id="deleteDialog" on:click={(e) => handleClickOutside(e, deleteDialog)}>
  <div class="wrapper">
    <form method="dialog">
      <p>Remove <span style="font-weight: bold">{appStateData?.playerToEdit?.playerName}</span> as a player?</p>
    </form>
    <div class="button-wrapper">
      <button value="cancel" on:click={closeDialog}>Cancel</button>
      <button type="submit" value="default" on:click={deletePerson}>Confirm</button>
    </div>
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
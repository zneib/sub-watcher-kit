<script lang="ts">
  import { onMount } from 'svelte';
  import { handleClickOutside } from '../helpers';
  let player: string = '';
  let hasError = false;

  let editPlayerDialog: HTMLDialogElement;
  onMount(() => {
    editPlayerDialog = document.getElementById('editPlayerDialog') as HTMLDialogElement;
  });

  const closeDialog = () => {
    editPlayerDialog.close()
  }

  const savePlayer = () => {
    console.log('Do some stuff')
  }
</script>

<dialog id="editPlayerDialog" on:click={(e) => handleClickOutside(e, editPlayerDialog)} on:keyup={() => console.log('Save Team Dialog')}>
  <div class="wrapper">
    <form on:submit|preventDefault={savePlayer}>
      <h3>Save Team</h3>
      <div>
        <label for="playerName">Name</label>
        <input bind:value={player} type="text" name="teamName">
      </div>
      {#if hasError}
        <p class="error">Team name cannot be blank.</p>
      {/if}
      <div class="button-wrapper">
        <button type="submit">Save</button>
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
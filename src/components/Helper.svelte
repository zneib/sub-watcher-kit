<script lang="ts">
  import { onMount } from 'svelte';
  import { handleClickOutside } from '../helpers';
  export let text: string;
  export let title: string;
  export let features: string[];

  let helperDialog: HTMLDialogElement;
  onMount(() => {
    helperDialog = document.getElementById(`${text}Dialog`) as HTMLDialogElement;
  });

  const closeDialog = () => {
    helperDialog.close()
  }
</script>


<dialog id={`${text}Dialog`}>
  <div class="wrapper">
    <h2>{title}</h2>
    <form method="dialog">
      <ul>
        {#each features as feature}
          <li>{feature}</li>
        {/each}
      </ul>
    </form>
    <div class="button-wrapper">
      <button value="cancel" on:click={closeDialog}>Close</button>
    </div>
  </div>
</dialog>
<svg xmlns="http://www.w3.org/2000/svg"
  on:click={() => helperDialog.showModal()} 
  on:keyup={() => helperDialog.showModal()}
  width="20px"
  height="20px"
  class="h-5 w-5" 
  viewBox="0 0 20 20" 
  fill="currentColor"
>
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
</svg>

<style>
  dialog {
    padding: 0;
  }
  div.wrapper {
    padding: 16px;
  }
  button {
    color: black;
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
  svg {
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 15px;
  }
  @media (prefers-color-scheme: dark) {
    svg {
      color: var(--grey-nine);
    }

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
  }
</style>
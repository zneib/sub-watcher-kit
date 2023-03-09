<script lang="ts">
  import { onMount } from 'svelte';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { page } from '$app/stores';
  import { teamStore } from '../global-store';
  import pinPals from '$lib/assets/pin-pals.jpg';

  import AddPlayerDialog from '../components/AddPlayerDialog.svelte';
  import DeleteDialog from '../components/DeleteDialog.svelte';
  import OptionsDialog from '../components/OptionsDialog.svelte';
	import PlayersContainer from '../components/PlayersContainer.svelte';
  import ActivePlayersContainer from '../components/ActivePlayersContainer.svelte';
	import EditPlayerDialog from '../components/EditPlayerDialog.svelte';
	import SaveGameDialog from '../components/SaveGameDialog.svelte';
	import NewGameDialog from '../components/NewGameDialog.svelte';

  async function getTeamInfo() {
    const res = await fetch(`https://zneib-sub-watcher-api.deno.dev/api/getTeams`);
    const data = await res.json();
    console.log(data);
  }

  let saveTeamDialog: HTMLDialogElement;
  let loadTeamDialog: HTMLDialogElement;
  onMount(() => {
    saveTeamDialog = document.getElementById('saveTeamDialog') as HTMLDialogElement;
    loadTeamDialog = document.getElementById('loadTeamDialog') as HTMLDialogElement;

    getTeamInfo();
  })
</script>

<header>
  <div>
    <img src={pinPals} alt="Avatar">
    <h1>{$teamStore.teamName}</h1>
  </div>
  <!-- <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
    </svg>
    <p>LOAD TEAM</p>
  </div> -->
  <div>
    <div class="headerItem">
      <a href="/stats">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
        <p>STATS</p>
      </a>   
    </div>
    <div class="headerItem">
      <a href="/games">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
        </svg>
        <p>GAMES</p>
      </a>  
    </div>
    <div class="auth-area">
      {#if $page.data.session}
        {#if $page.data.session.user?.image}
          <div style="display: flex">
            <img class="avatar" src={$page.data.session.user.image} alt="User Avatar">
            <span class="signedInText">
              <small>Signed in as</small><br />
              <strong>{$page.data.session.user?.name ?? "User"}</strong>
            </span>
          </div>
        {/if}
          <button on:click={() => signOut()} class="sign-out-btn">Sign out</button>
        {:else}
          <span class="notSignedInText">You are not signed in</span>
          <button class="notSignedInBtn" on:click={() => signIn("github")}>Sign In with GitHub</button>
      {/if}
    </div>
  </div>
</header>
<hr>
<SaveGameDialog />
<NewGameDialog />
<main>
  <DeleteDialog />
  <AddPlayerDialog />
  <OptionsDialog />
  <EditPlayerDialog />
  <PlayersContainer />
  <ActivePlayersContainer />
</main>

<style>
  :global(:root) {
    --danger: #d64545;
    --grey-one: #1F2933;
    --grey-two: #323F4B;
    --grey-three: #3E4C59;
    --grey-four: #52606D;
    --grey-five: #616E7C;
    --grey-six: #7B8794;
    --grey-seven: #9AA5B1;
    --grey-eight: #CBD2D9;
    --grey-nine: #E4E7EB;
    --grey-ten: #F5F7FA;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    padding: 5px 15px;
  }

  header {
    display: flex;
    justify-content: space-between;
  }

  header > div {
    display: flex;
    place-items: center;
  }

  header > div > img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
  header > div > h1 {
    display: inline-block;
    margin-bottom: 0;
    margin-left: 10px;
  }

  .auth-area {
    display: flex;
    flex-direction: column;
  }

  .avatar {
    width: 40px;
    border-radius: 50%;
  }

  .sign-out-btn {
    width: 100%;
  }

  .notSignedInBtn {
    margin-top: 15px;
  }

  .headerItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-right: 40px;
    text-align: center;
    cursor: pointer;
  }
  .headerItem > a > svg {
    margin-bottom: 5px;
  }
  .headerItem > a > p {
    margin: 0;
  }
  .headerItem > a {
    all: unset;
    padding: 10px;
    border-radius: 5px;
  }
  .headerItem > a:hover {
    background: rgba(0,0,0,0.1);
  }

  button.saveGame {
    display: flex;
    align-items: center;
  }

  button.saveGame > span {
    margin-left: 5px;
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

  main {
    display: flex;
    align-items: baseline;
  }

  @media (max-width: 768px) {
    main {
      flex-direction: column;
    }
  }

  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: var(--grey-one);
    }
    :global(article) {
      background-color: var(--grey-three);
    }

    :global(p.message-text) {
      color: var(--grey-nine);
    }

    header > div > h1 {
      color: var(--grey-nine);
    }

    .signedInText {
      color: var(--grey-nine);
    }

    .notSignedInText {
      color: var(--grey-nine);
    }

    button {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }
    .headerItem {
      color: var(--grey-nine);
    }
  }
  @media (prefers-color-scheme: light) {
    :global(article) {
      background-color: #eee;
    }
  }
</style>

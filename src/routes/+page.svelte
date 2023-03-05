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
</header>
<hr>
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
    --grey-one: #102A43;
    --grey-two: #243B53;
    --grey-three: #334E68;
    --grey-four: #486581;
    --grey-five: #627D98;
    --grey-six: #829AB1;
    --grey-seven: #9FB3C8;
    --grey-eight: #BCCCDC;
    --grey-nine: #D9E2EC;
    --grey-ten: #F0F4F8;
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
  }
  @media (prefers-color-scheme: light) {
    :global(article) {
      background-color: #eee;
    }
  }
</style>

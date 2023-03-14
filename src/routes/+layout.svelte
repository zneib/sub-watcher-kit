<script lang="ts">
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { page } from '$app/stores';
  import { teamStore } from '../global-store';
  import pinPals from '$lib/assets/pin-pals.jpg';

  console.log($page.route.id);
</script>

<header>
  <div>
    <img src={pinPals} alt="Avatar">
    <h1>{$teamStore.teamName}</h1>
  </div>
  <div>
    <div class="headerItem" class:active={$page.route.id === "/"}>
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>             
        <p>ACTIVE GAME</p>
      </a>   
    </div>
    {#if $page.data.session}
      <div class="headerItem" class:active={$page.route.id === "/teams"}>
        <a href="/teams">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>        
          <p>TEAMS</p>
        </a>   
      </div>
      <div class="headerItem" class:active={$page.route.id === "/stats"}>
        <a href="/stats">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          <p>STATS</p>
        </a>   
      </div>
      <div class="headerItem" class:active={$page.route.id === "/games"}>
        <a href="/games">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
          </svg>
          <p>PAST GAMES</p>
        </a>  
      </div>
    {/if}
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
<slot></slot>

<style>
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
  .active {
    color: #27ab83;
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

  @media (prefers-color-scheme: dark) {
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
    .active {
      color: #27ab83;
    }
  }
</style>
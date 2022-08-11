<script lang="ts">
  export let people;
  export let activePlayers;
  const deleteAllPlayers = () => {
    people = [];
    activePlayers = [];
  }
</script>

<svg on:click={deleteAllPlayers} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

<style>
  svg {
    cursor: pointer;
    position: absolute;
    top: 15px;
    left: 45px;
    width: 20px;
    height: 20px;
  }
  @media (prefers-color-scheme: dark) {
    svg {
      color: var(--grey-nine);
    }
  }
</style>
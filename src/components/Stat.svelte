<script lang="ts">
  export let text: string;
  export let isActivated: boolean = false;
  console.log(isActivated);
  let total = 0;

  const handlePlus = () => {
    total = total + 1;
  }

  const handleMinus = () => {
    total = total - 1
  }
</script>

<div class="track">
  <p class="total">{total}</p>
  <p>{text.toUpperCase()}</p>
  {#if isActivated}
    <button class="minusSign" on:click={handleMinus}>
      <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
      </svg>  
    </button>  
    <button class="plusSign" on:click={handlePlus}>
      <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
      </svg> 
    </button>
  {/if}
</div>

<style>
  div {
    height: 45px;
  }
  div.track {
    display: inline-block;
    place-items: center;
    font-size: 9px;
    margin: 8px 20px 0 20px;
    text-align: center;
    position: relative;
  }
  div.track > p {
    margin: 0;
  }
  div.track > p.total {
    font-size: 18px;
  }
  button.minusSign {
    background: transparent;
    border: none;
    position: absolute;
    top: -20px;
    bottom: 0;
    left: -20px;
    margin: auto 0;
  }
  button.plusSign {
    background: transparent;
    border: none;
    position: absolute;
    top: -20px;
    bottom: 0;
    right: -20px;
    margin: auto 0;
  }
</style>
<script lang="ts">
  export let text: string;
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
</div>
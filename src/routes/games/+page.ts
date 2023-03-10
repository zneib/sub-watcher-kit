async function getGames() {
  const res = await fetch(`https://zneib-sub-watcher-api.deno.dev/api/games`)
  const data = await res.json();
  return data;
}

export const load = async () => {
  return {
    games: await getGames()
  }
}
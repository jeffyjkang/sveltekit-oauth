<script context='module' lang='ts'>
  export async function load({session}) {
    return {
      props: {
        user: session.user
      }
    }
  }
</script>

<script lang='ts'>
  export let user;
</script>

<h1>SvelteKit OAuth</h1>
{#if user}
  <h2>Welcome {user}</h2>
  <a href='/logout'>
    <button>Logout</button>
  </a>
{:else}
  <a href='/login'>
    <button>Login using Github</button>
  </a>
{/if}


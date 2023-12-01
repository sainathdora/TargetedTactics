<script>
	import '../app.css';
    import NavBar from '$lib/Components/NavBar.svelte';
    import Footer from '$lib/Components/Footer.svelte';
</script>

<NavBar/>
<slot />

<Footer/>
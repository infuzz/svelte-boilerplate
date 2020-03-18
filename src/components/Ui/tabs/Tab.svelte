<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

    registerTab(tab);
    
</script>

<li class:is-active="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<a>
		<slot></slot>
	</a>	
</li>

<style>
	.tabs li a{
		border-bottom-width: 2px;
	}
</style>
<template>
	<div id="app">
		<nav>
			<a v-link="'home'">Home</a>
			<a v-link="'add'">Add</a>		
		</nav>
		<div class="container" id="troutMap">
			<router-view></router-view>
		</div>
	</div>
</template>


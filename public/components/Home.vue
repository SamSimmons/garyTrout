<template>
	<div class="home-wrapper">
	<h1>home</h1>
		<h2>{{ $parent.trout | json }}</h2>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		data: function() {
			return {
				trout: {
					name: 'trouter',
					sizer: '2.2kg'
				}
			}		
		}
	}
</script>


  	
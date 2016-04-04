<template>
<div class="modal-wrapper">
	<button v-on:click="setShow">show?</button>
	<div class="modal-mask" v-show="showModal">
		<div class="add-modal">
			<h1>Add Trout</h1>
			<h3>Size: </h3>
			<p>{{ size }}</p>
			<input v-model="size">
			<h3>Date:</h3>
			<p>{{ date }}</p>
			<input v-model="date">
			<h3>Lure: </h3>
			<p>{{ lure }}</p>
			<input v-model="lure">
			<h3>Comment: </h3>
			<textarea v-model="comment"></textarea>

			<div class="exit" v-on:click="setShow">X</div>
		</div>
	</div>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .9s ease;
}
.add-modal {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;	
}

.exit {
	font-size: 18px;
	padding: 5px;
	border: 3px  seagreen solid;
	border-radius: 3px;
	display: inline-block;
	font-weight: bolder;
	cursor: pointer;
}

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>

<script>
	export default {
		name: 'Add',
		data: {
			show: false
		},		
		methods: {
			logThis: function() {
				console.log(this)
			},
			setShow: function() {
				this.showModal = !this.showModal
				console.log(this)
			}
		},
		data: () => {
			return {
				size: "",
				date: "dd/mm/yy",
				lure: "",
				comment: "",
				showModal: false
			}
		}
	}
</script>

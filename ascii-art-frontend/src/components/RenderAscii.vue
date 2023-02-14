<template>
	<div class="ascii-art">
		<h2 class="ascii-art__header">{{ `${percentage}%` }}</h2>
		<pre class="ascii-art__line" v-for="line in asciiArt" :key="line">
			{{ line }}
		</pre
		>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'RenderAscii',
	props: {
		asciiArt: { required: true, type: Array },
		percentage: { required: true, type: Number },
	},
})
</script>

<style lang="scss">
@import '../assets/variables.scss';
.ascii-art {
	margin: auto;
	width: 75%;
	height: 100%;
	text-align: left;
	white-space: pre;
	&__header {
		text-align: center;
		color: $primary-color;
		font-weight: bold;
		font-size: $unit-8;
	}
	&__line {
		margin: 0;
		font-size: $html-font-size;
		height: auto;
		font-weight: bold;
		color: $secondary-color;
	}
}
</style>

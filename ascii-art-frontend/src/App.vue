<template>
	<div class="app">
		<header class="app__header">
			<h2 v-text="text.header" />
		</header>
		<body class="app__body">
			<FileUploadForm
				v-bind="{ allowMultipleFiles, allowedFileTypes, isUploading }"
				@onUploadFile="uploadFile"
			/>
			<RenderAscii
				v-if="asciiArt.length > 0"
				v-bind="{ asciiArt, percentage }"
			/>
		</body>
		<footer class="app__footer" v-text="text.footer" />
	</div>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue'

import { apiPostForm } from './api'
import FileUploadForm from './components/FileUploadForm.vue'
import RenderAscii from './components/RenderAscii.vue'
import type { UploadFileParams } from './types'
import {
	HTTPS,
	WSS,
	WS,
	DOUBLE_SLASH,
	TXT_FORMAT,
	MAX_NUMBER_OF_ATTEMPTS,
	INTERVAL_TIME,
	WS_ROUTE,
	COLON_SEPARATOR,
	Statuses,
	START_PRINTING,
} from './constants'

export default {
	name: 'App',
	components: {
		FileUploadForm,
		RenderAscii,
	},
	setup() {
		const socket = ref<null | WebSocket>(null)
		const message = ref<string | null>(null)
		const isUploadSuccess = ref<boolean>(false)
		const isUploading = ref<boolean>(false)
		const asciiArt = ref<string[]>([])
		const percentagePrinted = ref<number | null>(null)

		// ASCII:

		const updateAsciiArtAndPercentage = (line: string, percentage: number) => {
			asciiArt.value.push(line)
			percentagePrinted.value = percentage
		}

		const resetAsciiArtAndPercentage = () => {
			asciiArt.value = []
			percentagePrinted.value = null
		}

		// WEBSOCKET:

		const waitForOpenConnection = async () => {
			if (socket.value === null) return
			return new Promise<void>((resolve, reject) => {
				let currentAttempt = 0
				const interval = setInterval(() => {
					if (socket.value === null) return
					if (currentAttempt > MAX_NUMBER_OF_ATTEMPTS - 1) {
						clearInterval(interval)
						reject(new Error('Maximum number of attempts exceeded.'))
					} else if (socket.value.readyState === socket.value.OPEN) {
						clearInterval(interval)
						resolve()
					}
					currentAttempt += 1
				}, INTERVAL_TIME)
			})
		}

		const endWebSocketConnection = () => {
			if (socket.value !== null) {
				socket.value.close()
				socket.value = null
				isUploadSuccess.value = false
			}
		}

		const sendMessage = async (message: string) => {
			if (socket.value === null) return
			if (socket.value.readyState !== socket.value.OPEN) {
				try {
					await waitForOpenConnection()
					socket.value.send(message)
				} catch (err) {
					// eslint-disable-next-line
					console.error(err)
				}
			} else {
				socket.value.send(message)
			}
		}

		const startWebSocket = async () => {
			if (socket.value !== null) endWebSocketConnection()
			const socketProtocol = window.location.protocol === HTTPS ? WSS : WS
			const port = process.env.VUE_APP_SERVER_PORT
			const echoSocketUrl =
				socketProtocol +
				DOUBLE_SLASH +
				window.location.hostname +
				COLON_SEPARATOR +
				port +
				WS_ROUTE
			socket.value = await new WebSocket(echoSocketUrl)
			socket.value.onopen = () => {
				const message = JSON.stringify({ message: START_PRINTING })
				sendMessage(message)
			}
		}

		const onSocketMessage = () => {
			if (socket.value === null) return
			socket.value.onmessage = (event) => {
				const { data } = event
				if (!data) throw Error('Error receiving messaged on websocket!')
				const { status, line, percentage } = JSON.parse(data)
				if (status === Statuses.IN_PROGRESS)
					updateAsciiArtAndPercentage(line, percentage)
				if (status === Statuses.FINISHED) {
					endWebSocketConnection()
					updateAsciiArtAndPercentage(line, percentage)
				}
			}
		}

		watch(isUploadSuccess, async (value) => {
			if (value === false) return
			await startWebSocket()
			onSocketMessage()
		})

		return {
			allowMultipleFiles: false,
			allowedFileTypes: TXT_FORMAT,
			asciiArt,
			isUploading,
			isUploadSuccess,
			message,
			percentage: computed(() => Math.round(percentagePrinted.value ?? 0)),

			text: {
				header: 'Welcome to ASCII Websockets',
				footer: 'Created by: Julio Gonzalez',
			},
			uploadFile: async (data: UploadFileParams) => {
				endWebSocketConnection()
				resetAsciiArtAndPercentage()
				const url = '/uploads'
				const urlAndParams = Object.create({
					params: data,
					url,
				})
				try {
					const response = await apiPostForm(urlAndParams)
					if (response.status === 201) {
						isUploadSuccess.value = true
					}
				} catch (error) {
					// eslint-disable-next-line
					console.error(error)
					throw Error('Uploading a file has failed.')
				}
			},
		}
	},
}
</script>

<style lang="scss">
@import './assets/variables.scss';
html,
body {
	margin: 0;
	height: 100%;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	background-color: $background-color;
	color: $font-color;

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}

	head {
		height: 0;
	}
}
#app {
	height: 100%;
}
.app {
	display: grid;
	grid-template-rows: auto 1fr auto;
	height: 100vh;
	max-height: 100vh;
	&__header {
		color: $secondary-color;
		font-family: $header-font-family;
		font-size: $unit-10;
	}
	&__body {
		font-family: $body-font-family;
		overflow: auto;
	}
	&__footer {
		text-align: right;
		font-family: $footer-font-family;
		margin-bottom: $unit-8;
		margin-right: 2rem;
	}
}
</style>

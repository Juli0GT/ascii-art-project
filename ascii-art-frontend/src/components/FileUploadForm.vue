<template>
	<div
		data-test="file-upload-form"
		@dragleave.prevent="fileDragHover = false"
		@dragover.prevent="fileDragHover = true"
		@drop.prevent="onAddFiles"
	>
		<div :class="classes">
			<div class="upload-file-form__content">
				<p
					v-text="text.dragInstruction"
					class="upload-file-form__content__text"
				/>

				<p
					v-text="text.inputInstruction"
					class="upload-file-form__content__text"
				/>
				<div class="upload-file-form__content__input-fields">
					<input
						ref="uploadInputRef"
						:accept="allowedFileTypes"
						class="upload-file-form__content__input-fields__input-invisible"
						data-test="file-upload-form-file-input"
						:multiple="allowMultipleFiles"
						type="file"
						@change="onAddFiles"
					/>
					<div class="upload-file-form__content__input-fields__miliseconds">
						<input
							type="number"
							v-model="miliseconds"
							min="0"
							class="upload-file-form__content__input-fields__miliseconds__input"
						/>
						<span v-text="text.msLabel" />
					</div>
					<button
						class="upload-file-form__content__input-fields__button"
						v-text="'UPLOAD & PRINT'"
						@click="uploadInputRef.click()"
						:disabled="isUploading"
					/>
				</div>
			</div>
			<div class="upload-file-form__footer">
				<p
					class="upload-file-form__footer__text"
					v-text="text.supportedFormats"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { fileToText } from '../utils'
import type {
	DataTransfer,
	Files,
	FileText,
	Target,
	UploadInput,
} from '../types'

export default defineComponent({
	name: 'FileUploadForm',
	props: {
		allowMultipleFiles: { default: false, type: Boolean },
		allowedFileTypes: { default: null, type: String },
		isUploading: { required: true, type: Boolean },
	},
	setup(_, { emit }) {
		const fileDragHover = ref<boolean>(false)
		const miliseconds = ref<number>(300)

		return {
			classes: computed(() => ({
				'upload-file-form': true,
				'upload-file-form--is-active': fileDragHover.value,
			})),
			fileDragHover,
			onAddFiles: ({
				dataTransfer,
				target,
			}: {
				dataTransfer: DataTransfer
				target: Target
			}) => {
				const { files }: { files: Files } = dataTransfer ? dataTransfer : target
				if (files !== null && files.length > 0) {
					fileToText(files[0], (text: FileText) => {
						emit('onUploadFile', {
							file: text,
							miliseconds: miliseconds.value ?? 0,
						})
					})
				}
				target.value = ''
				fileDragHover.value = false
			},
			miliseconds,
			text: {
				dragInstruction:
					'Drag here to upload and print your ASCII art. Or click the button',
				inputInstruction:
					'Update the miliseconds value below, to change the timeout between printed lines',
				msLabel: 'ms',
				supportedFormats: 'Only **.txt** files are supported',
			},
			uploadInputRef: ref<UploadInput>(null),
		}
	},
})
</script>

<style lang="scss">
@import '../assets/variables.scss';
.upload-file-form {
	display: grid;
	place-items: center;
	margin: $unit-8;
	color: $secondary-font-color;
	border: $unit-h dashed $primary-color;
	border-radius: $unit-2;
	padding-top: $unit-4;
	padding-bottom: $unit-h;
	padding-left: $unit-2;

	&__content {
		margin: $unit-2;
		font-size: $font-size-lg;
		text-align: center;
		color: $font-color;

		&__text {
			height: $unit-7;
			font-size: $unit-4;
		}
		&__input-fields {
			color: $secondary-font-color;
			display: flex;
			flex-direction: column;
			align-content: space-between;
			place-items: center;

			&__button {
				margin-top: $unit-8;
				padding: 0.6em 2em;
				border: none;
				outline: none;
				color: $secondary-color;
				background: #111;
				cursor: pointer;
				position: relative;
				z-index: 0;
				border-radius: 10px;
				user-select: none;
				-webkit-user-select: none;
				touch-action: manipulation;
				font-family: $footer-font-family;
				width: 60%;
				font-weight: bold;
			}

			&__button:before {
				content: '';
				background: linear-gradient(
					45deg,
					#ff0000,
					#ff7300,
					#fffb00,
					#ff00c8,
					#ff0000
				);
				position: absolute;
				top: -2px;
				left: -2px;
				background-size: 400%;
				z-index: -1;
				filter: blur(5px);
				-webkit-filter: blur(5px);
				width: calc(100% + 4px);
				height: calc(100% + 4px);
				animation: glowing-button-85 20s linear infinite;
				transition: opacity 0.3s ease-in-out;
				border-radius: 10px;
			}

			@keyframes glowing-button-85 {
				0% {
					background-position: 0 0;
				}
				50% {
					background-position: 400% 0;
				}
				100% {
					background-position: 0 0;
				}
			}

			&__button:after {
				z-index: -1;
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				background: #222;
				left: 0;
				top: 0;
				border-radius: 10px;
			}

			&__input-invisible {
				display: none;
			}

			&__miliseconds {
				display: flex;
				display: block;
				font-size: $unit-8;
				flex-direction: row;
				align-content: center;
				&__input {
					outline: none;
					border: none;
					color: $secondary-font-color;
					font-family: $body-font-family;
					border-bottom: $secondary-font-color $unit-1 solid;
					background: $background-color;
					text-align: right;
					font-size: $unit-8;
					width: $unit-100;
					margin-right: $unit-2;
				}
			}
		}
	}

	&__footer {
		font-family: $cjk-ko-font-family;
		display: flex;
		align-items: center;
		justify-content: space-between;
		justify-items: center;
		width: 100%;
		font-size: $unit-4;
	}

	&--is-active {
		border: $unit-1 dashed $primary-color;
	}
}
</style>

import axios from 'axios'

import { PostFormPayload } from './types'
import { HTTP, COLON_SEPARATOR, Methods } from './constants'
import type { Url } from './types'

export const apiPostForm = ({ params, url }: PostFormPayload) => {
	const formData = new FormData()
	const baseUrl =
		HTTP +
		process.env.VUE_APP_SERVER_HOST +
		COLON_SEPARATOR +
		process.env.VUE_APP_SERVER_PORT
	Object.entries(params).forEach(([key, value]) =>
		formData.set(key, String(value)),
	)
	return axios({
		method: Methods.POST,
		url: baseUrl + url,
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}

export const apiGetForm = (url: Url) => {
	const baseUrl =
		HTTP +
		process.env.VUE_APP_SERVER_HOST +
		COLON_SEPARATOR +
		process.env.VUE_APP_SERVER_PORT
	return axios({
		method: Methods.GET,
		url: baseUrl + url,
		headers: {
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Credentials': 'true',
		},
	})
}

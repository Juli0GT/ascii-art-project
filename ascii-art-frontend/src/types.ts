type Params = Record<string, unknown>

export type Url = string

export type PostFormPayload = {
	params: Params
	url: Url
}

export type UploadFileParams = {
	file: string
	miliseconds: number
}

export type DataTransfer = DragEvent['dataTransfer']
export type Target = HTMLInputElement & EventTarget
export type Files = FileList | null
export type UploadInput = HTMLInputElement | null
export type FileText = FileReader['result']

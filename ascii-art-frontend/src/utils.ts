export const fileToText = (
	file: File,
	callback: (data: FileReader['result']) => void,
) => {
	const reader = new FileReader()
	reader.readAsText(file)
	return (reader.onload = () => {
		callback(reader.result)
	})
}

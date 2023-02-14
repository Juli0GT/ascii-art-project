const path = require('path')

const hq = require('alias-hq')

module.exports = () => {
	return {
		resolve: {
			modules: ['node_modules', path.resolve(__dirname, 'src/')],
			alias: {
				...hq.get('webpack'),
			},
		},
	}
}

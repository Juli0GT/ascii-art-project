const configureWebpack = require('./webpack.config')

module.exports = () => {
	const devServerPort = process.env.VUE_APP_SERVER_PORT || 8081
	const platformHost = process.env.PLATFORM_HOSTNAME || 'ascii.art'

	return {
		runtimeCompiler: true,
		css: {
			extract: {
				ignoreOrder: true,
			},
		},
		devServer: {
			allowedHosts: [platformHost],
			host: '0.0.0.0',
			proxy: {
				'^/api': {
					target: `http://localhost:${devServerPort}`,
					changeOrigin: true,
				},
			},
		},
		configureWebpack,
		transpileDependencies: [],
	}
}

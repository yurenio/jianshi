module.exports = {
	lintOnSave: true,
	configureWebpack: {
		// 解决引入的vue问题
		resolve: {
			alias: {
				"vue$": 'vue/dist/vue.common.js'
			}
		}
	}
}
module.exports = {
	devServer: {
		port: 8081,
		proxy: {
			'/api': 'http://localhost:8880'
		}
	}
};

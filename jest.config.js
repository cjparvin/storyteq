/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {	
	clearMocks: true,	
	testEnvironment: 'jsdom',
	moduleNameMapper: {	
		'\\.(scss|less)$': 'identity-obj-proxy',
	}
};

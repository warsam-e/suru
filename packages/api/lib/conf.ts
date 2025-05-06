import swagger from '@elysiajs/swagger';

export const SWAGGER_CONF = swagger({
	documentation: {
		info: {
			title: 'Suru API',
			description: 'This is the API documentation for the Suru API.',
			version: '1.0.0',
			contact: {
				name: 'Warsame Egeh',
				url: 'https://warsame.me',
			},
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
			schemas: {},
		},
	},
	scalarConfig: {
		layout: 'classic',
		defaultHttpClient: {
			targetKey: 'javascript',
			clientKey: 'fetch',
		},
	},
	scalarVersion: '1.25.9',
	path: '/docs',
	exclude: ['/', /^\/docs.*/],
	excludeStaticFile: false,
});

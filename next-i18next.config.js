const path = require('path');

module.exports = {
	i18n: {
		defaultLocale: 'en-US',
		locales: ['en-US', 'hy', 'ru'],
	},
	localePath: path.resolve('./public/locales'),
	localeStructure: '{{lng}}/{{ns}}',
	localeSubpaths: {
		'en-US': 'en',
		'hy': 'hy',
		'ru': 'ru',
	},
};

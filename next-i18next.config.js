const path = require('path');

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'hy', 'ru'],
	},
	localePath: path.resolve('./public/locales'),
	localeStructure: '{{lng}}/{{ns}}',
	localeSubpaths: {
		'en': 'en',
		'hy': 'hy',
		'ru': 'ru',
	},
};

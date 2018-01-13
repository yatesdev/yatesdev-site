const config = {
  head: {
    titleTemplate: 'YatesDev',
    meta: [
      { charset: 'utf-8'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel:'stylesheet', href: 'https://fonts.googleapis.com/css?family=Fredoka+One' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic' },
    ],
  },
  css: [
      '~/assets/fonts/icomoon/style.css'
  ],
}
	
module.exports = config;

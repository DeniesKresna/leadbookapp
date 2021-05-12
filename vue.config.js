const fs = require('fs')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/famous'
    : '/',
  outputDir: 'famous',
  devServer: {
    disableHostCheck: true,
    
    https: {
          key: fs.readFileSync('./certs/rumah/key.pem'),
          cert: fs.readFileSync('./certs/rumah/cert.pem'),
        },
    
    port: 3000,
    //public: "cobadenies.loca.lt",
    //host: "localhost"
    //office
    public: 'https://10.100.100.128:3000/'
    
    //home
    //public: 'https://192.168.100.28:3000/'
    //public: 'https://cobadenies.loca.lt/'

    //dilo
    //public: 'https://192.168.100.58:3000/'
    //public: 'https://cobadenies.loca.lt/'
  },
}
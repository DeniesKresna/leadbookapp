const fs = require('fs')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: 'application',
  devServer: {
    disableHostCheck: true,
    
    https: {
          key: fs.readFileSync('./certs/kantor/key.pem'),
          cert: fs.readFileSync('./certs/kantor/cert.pem'),
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
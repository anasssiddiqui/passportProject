let base_path = __dirname;
base_path = base_path.replace('config', '');

module.exports = {
  'database': {
    host: 'localhost',
    user: 'root',
    password: 'pawan',
    database:'ordersup'
  },
  //'upload_path': base_path + 'public/',
   'url_path': 'http://localhost:3000',
  //'url_path': 'http://202.164.42.227:3000',
  //'image_url': 'http://202.164.42.227/klickfor/public/images/',
  'mail_auth' : {
    service: 'gmail',
    auth: {
      user: 'test978056@gmail.com',
      pass: 'cqlsys123'
    }
  }
}
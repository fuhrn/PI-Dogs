//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const {
  conn
} = require('./src/db.js');
const {
  API_KEY,
  TEMPERAMENTS_IN_DB
} = process.env;
const {
  getTemperaments
} = require('./src/routes/controllers/temperamentController');
const {
  get
} = require('./src/routes/index.js');


// Syncing all the models at once.
conn.sync({
  force: false
}).then(() => {
  
  // cargamos la Bd con los nombres de los temperamentos
  getTemperaments()

  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3000'); // eslint-disable-line no-console
  });
});
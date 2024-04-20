
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Конфиги по умолчанию
 */
const defaultConfig = {
  api: {
    port: 3201
  },
  mongodb: {
    login: 'tais',
    // реальные значения в git не слать!
    password: 'Pass321',
    //TODO попробовать назвать кластер с маленькой буквы и проверить, как изменится строка подключения и попробовать передать данные туда
    clusterName: 'Cluster0',
    databaseName: 'win'
  },
  auth: {
    secret: "secret-key"
  },
  files: {
    publicDir: 'public',
    path: path.join(__dirname, '..', 'public', 'files')
  }
}
/**
 * Конфиги в зависимсоти от режима запуска
 */
let conf = {
  dev: defaultConfig,
  prod: defaultConfig
}

export default (mode) => conf[mode];
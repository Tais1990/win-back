
/**
 * Конфиги по умолчанию
 */
const defaultConfig = {
  api: {
    port: 8000
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
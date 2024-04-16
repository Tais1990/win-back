
const defaultConfig = {
  api: {
    port: 8000
  },
  mongodb: {
    login: 'tais',
    // реальные значения в git не слать!
    password: 'Pass321',
    clusterName: 'Cluster0',
    databaseName: 'win'
  }
}

let conf = {
  dev: defaultConfig,
  prod: defaultConfig
}

export default (mode) => conf[mode];
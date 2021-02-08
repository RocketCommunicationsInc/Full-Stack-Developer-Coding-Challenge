import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://wpace:VSzgUXyO5YtPs2hv@ppp-cluster-develop.m43cx.mongodb.net/rocket_coding_challenge?retryWrites=true&w=majority',
  host: 'ppp-cluster-develop-shard-00-00.m43cx.mongodb.net',
  port: 27017,
  user: 'wpace',
  password: 'VSzgUXyO5YtPs2hv',
  database: 'rocket_coding_challenge',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

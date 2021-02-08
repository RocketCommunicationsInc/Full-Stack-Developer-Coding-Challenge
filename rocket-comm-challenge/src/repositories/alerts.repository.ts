import {DefaultCrudRepository} from '@loopback/repository';
import {Alerts, AlertsRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AlertsRepository extends DefaultCrudRepository<
  Alerts,
  typeof Alerts.prototype.errorId,
  AlertsRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Alerts, dataSource);
  }
}

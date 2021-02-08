import {DefaultCrudRepository} from '@loopback/repository';
import {SatelliteContacts, SatelliteContactsRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SatelliteContactsRepository extends DefaultCrudRepository<
  SatelliteContacts,
  typeof SatelliteContacts.prototype.contactId,
  SatelliteContactsRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(SatelliteContacts, dataSource);
  }
}

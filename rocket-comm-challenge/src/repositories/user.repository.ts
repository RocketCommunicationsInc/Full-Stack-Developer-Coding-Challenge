import {DefaultCrudRepository} from '@loopback/repository';
import {Users, UserRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Users, dataSource);
  }
}

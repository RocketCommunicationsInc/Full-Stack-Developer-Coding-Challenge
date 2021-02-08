import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {SatelliteContacts} from '../models';
import {SatelliteContactsRepository} from '../repositories';

export class SatelliteContactsController {
  constructor(
    @repository(SatelliteContactsRepository)
    public satelliteContactsRepository : SatelliteContactsRepository,
  ) {}

  @post('/satellite_contacts', {
    responses: {
      '200': {
        description: 'SatelliteContacts model instance',
        content: {'application/json': {schema: getModelSchemaRef(SatelliteContacts)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SatelliteContacts, {
            title: 'NewSatelliteContacts',
            exclude: ['contactId'],
          }),
        },
      },
    })
    satelliteContacts: Omit<SatelliteContacts, 'contactId'>,
  ): Promise<SatelliteContacts> {
    return this.satelliteContactsRepository.create(satelliteContacts);
  }

  @get('/satellite_contacts/count', {
    responses: {
      '200': {
        description: 'SatelliteContacts model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SatelliteContacts) where?: Where<SatelliteContacts>,
  ): Promise<Count> {
    return this.satelliteContactsRepository.count(where);
  }

  @get('/satellite_contacts', {
    responses: {
      '200': {
        description: 'Array of SatelliteContacts model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SatelliteContacts, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SatelliteContacts) filter?: Filter<SatelliteContacts>,
  ): Promise<SatelliteContacts[]> {
    return this.satelliteContactsRepository.find(filter);
  }

  @patch('/satellite_contacts', {
    responses: {
      '200': {
        description: 'SatelliteContacts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SatelliteContacts, {partial: true}),
        },
      },
    })
    satelliteContacts: SatelliteContacts,
    @param.where(SatelliteContacts) where?: Where<SatelliteContacts>,
  ): Promise<Count> {
    return this.satelliteContactsRepository.updateAll(satelliteContacts, where);
  }

  @get('/satellite_contacts/{id}', {
    responses: {
      '200': {
        description: 'SatelliteContacts model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SatelliteContacts, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SatelliteContacts, {exclude: 'where'}) filter?: FilterExcludingWhere<SatelliteContacts>
  ): Promise<SatelliteContacts> {
    return this.satelliteContactsRepository.findById(id, filter);
  }

  @patch('/satellite_contacts/{id}', {
    responses: {
      '204': {
        description: 'SatelliteContacts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SatelliteContacts, {partial: true}),
        },
      },
    })
    satelliteContacts: SatelliteContacts,
  ): Promise<void> {
    await this.satelliteContactsRepository.updateById(id, satelliteContacts);
  }

  @put('/satellite_contacts/{id}', {
    responses: {
      '204': {
        description: 'SatelliteContacts PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() satelliteContacts: SatelliteContacts,
  ): Promise<void> {
    await this.satelliteContactsRepository.replaceById(id, satelliteContacts);
  }

  @del('/satellite_contacts/{id}', {
    responses: {
      '204': {
        description: 'SatelliteContacts DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.satelliteContactsRepository.deleteById(id);
  }
}

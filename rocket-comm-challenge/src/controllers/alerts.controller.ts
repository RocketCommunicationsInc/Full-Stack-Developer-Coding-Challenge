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
import {Alerts} from '../models';
import {AlertsRepository} from '../repositories';

export class AlertsController {
  constructor(
    @repository(AlertsRepository)
    public alertsRepository : AlertsRepository,
  ) {}

  @post('/alerts', {
    responses: {
      '200': {
        description: 'Alerts model instance',
        content: {'application/json': {schema: getModelSchemaRef(Alerts)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alerts, {
            title: 'NewAlerts',
            exclude: ['errorId'],
          }),
        },
      },
    })
    alerts: Omit<Alerts, 'errorId'>,
  ): Promise<Alerts> {
    return this.alertsRepository.create(alerts);
  }

  @get('/alerts/count', {
    responses: {
      '200': {
        description: 'Alerts model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Alerts) where?: Where<Alerts>,
  ): Promise<Count> {
    return this.alertsRepository.count(where);
  }

  @get('/alerts', {
    responses: {
      '200': {
        description: 'Array of Alerts model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Alerts, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Alerts) filter?: Filter<Alerts>,
  ): Promise<Alerts[]> {
    return this.alertsRepository.find(filter);
  }

  @patch('/alerts', {
    responses: {
      '200': {
        description: 'Alerts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alerts, {partial: true}),
        },
      },
    })
    alerts: Alerts,
    @param.where(Alerts) where?: Where<Alerts>,
  ): Promise<Count> {
    return this.alertsRepository.updateAll(alerts, where);
  }

  @get('/alerts/{id}', {
    responses: {
      '200': {
        description: 'Alerts model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Alerts, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Alerts, {exclude: 'where'}) filter?: FilterExcludingWhere<Alerts>
  ): Promise<Alerts> {
    return this.alertsRepository.findById(id, filter);
  }

  @patch('/alerts/{id}', {
    responses: {
      '204': {
        description: 'Alerts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alerts, {partial: true}),
        },
      },
    })
    alerts: Alerts,
  ): Promise<void> {
    await this.alertsRepository.updateById(id, alerts);
  }

  @put('/alerts/{id}', {
    responses: {
      '204': {
        description: 'Alerts PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() alerts: Alerts,
  ): Promise<void> {
    await this.alertsRepository.replaceById(id, alerts);
  }

  @del('/alerts/{id}', {
    responses: {
      '204': {
        description: 'Alerts DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.alertsRepository.deleteById(id);
  }
}

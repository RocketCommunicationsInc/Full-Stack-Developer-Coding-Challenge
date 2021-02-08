import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {collection: 'alerts'}
  }
})
export class Alerts extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  errorId?: string;

  @property({
    type: 'string',
    required: true,
  })
  errorSeverity: string;

  @property({
    type: 'string',
    required: true,
  })
  errorCategory: string;

  @property({
    type: 'string',
    required: true,
  })
  errorMessage: string;

  @property({
    type: 'string',
    required: true,
  })
  longMessage: string;

  @property({
    type: 'number',
    required: true,
  })
  errorTime: number;

  @property({
    type: 'boolean',
    default: false,
  })
  selected?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  new?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  expanded?: boolean;


  constructor(data?: Partial<Alerts>) {
    super(data);
  }
}

export interface AlertsRelations {
  // describe navigational properties here
}

export type AlertsWithRelations = Alerts & AlertsRelations;

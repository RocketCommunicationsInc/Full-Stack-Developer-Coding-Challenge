import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {collection: 'satellite_contacts'}
  }
})
export class SatelliteContacts extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  contactId?: string;

  @property({
    type: 'string',
    required: true,
  })
  contactStatus: string;

  @property({
    type: 'number',
    required: true,
  })
  contactName: number;

  @property({
    type: 'string',
    required: true,
  })
  contactGround: string;

  @property({
    type: 'string',
    required: true,
  })
  contactSatellite: string;

  @property({
    type: 'string',
    required: true,
  })
  contactEquipment: string;

  @property({
    type: 'string',
    required: true,
  })
  contactState: string;

  @property({
    type: 'string',
    required: true,
  })
  contactStep: string;

  @property({
    type: 'string',
  })
  contactDetail?: string;

  @property({
    type: 'number',
    required: true,
  })
  contactBeginTimestamp: number;

  @property({
    type: 'number',
    required: true,
  })
  contactEndTimestamp: number;

  @property({
    type: 'number',
    required: true,
  })
  contactLatitude: number;

  @property({
    type: 'number',
    required: true,
  })
  contactLongitude: number;

  @property({
    type: 'number',
    required: true,
  })
  contactAzimuth: number;

  @property({
    type: 'number',
    required: true,
  })
  contactElevation: number;

  @property({
    type: 'string',
  })
  contactResolution?: string;

  @property({
    type: 'string',
  })
  contactResolutionStatus?: string;


  constructor(data?: Partial<SatelliteContacts>) {
    super(data);
  }
}

export interface SatelliteContactsRelations {
  // describe navigational properties here
}

export type SatelliteContactsWithRelations = SatelliteContacts & SatelliteContactsRelations;

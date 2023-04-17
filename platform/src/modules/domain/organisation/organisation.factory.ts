import { Organisation } from './organisation';

export class OrganisationFactory {
  static create(name: string): Organisation {
    return new Organisation(name);
  }
}

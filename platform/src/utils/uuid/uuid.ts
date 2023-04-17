import { v4 } from 'uuid';
import { UUID } from '../../types/uuid.type';

export const uuid: () => UUID = v4;

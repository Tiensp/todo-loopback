import {Entity, model, property, hasMany} from '@loopback/repository';
import {Todo} from './todo.model';
import {ProjectUser} from './project-user.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  phoneNumber?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'boolean',
    default: true,
  })
  isActive?: boolean;

  @property({
    type: 'date',
  })
  lastSignInAt?: string;

  @hasMany(() => Todo, {keyTo: 'assignedTo'})
  todoInUser: Todo[];

  @hasMany(() => ProjectUser)
  projectUserInUser: ProjectUser[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

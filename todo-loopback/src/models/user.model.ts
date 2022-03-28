import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProjectUser} from './project-user.model';
import {Todo} from './todo.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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
  })
  isActive?: boolean;

  @property({
    type: 'date',
  })
  lastSignInAt?: string;

  @hasMany(() => ProjectUser)
  projectUsers: ProjectUser[];

  @hasMany(() => Todo, {keyTo: 'assignedTo'})
  todos: Todo[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

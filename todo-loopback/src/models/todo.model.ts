import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Project} from './project.model';
import {User} from './user.model';

@model()
export class Todo extends Entity {
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
  createdBy: string;

  @property({
    type: 'string',
  })
  parentId?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isCompleted?: boolean;

  @belongsTo(() => Project)
  projectId: string;

  @belongsTo(() => User, {name: 'userAssignedTo'})
  assignedTo: string;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;

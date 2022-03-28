import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Project} from './project.model';
import {User} from './user.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'number',
    required: true,
  })
  createdBy: number;

  @property({
    type: 'number',
  })
  parentId?: number;

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
  })
  isCompleted?: boolean;

  @belongsTo(() => Project)
  projectId: number;

  @belongsTo(() => User, {name: 'todos'})
  assignedTo: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;

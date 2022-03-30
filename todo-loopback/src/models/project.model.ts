import {Entity, model, property, hasMany} from '@loopback/repository';
import {Todo} from './todo.model';
import {ProjectUser} from './project-user.model';

@model()
export class Project extends Entity {
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
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
    default: false
  })
  isCompleted?: boolean;

  @hasMany(() => Todo)
  todoInProject: Todo[];

  @hasMany(() => ProjectUser)
  projectUserInProject: ProjectUser[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;

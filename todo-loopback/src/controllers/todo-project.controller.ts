import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Todo,
  Project,
} from '../models';
import {TodoRepository} from '../repositories';

export class TodoProjectController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) { }

  @get('/todos/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to Todo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async getProject(
    @param.path.number('id') id: typeof Todo.prototype.id,
  ): Promise<Project> {
    return this.todoRepository.project(id);
  }
}

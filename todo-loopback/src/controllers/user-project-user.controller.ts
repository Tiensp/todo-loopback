import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  ProjectUser,
} from '../models';
import {UserRepository} from '../repositories';

@authenticate('jwt')
export class UserProjectUserController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/project-users', {
    responses: {
      '200': {
        description: 'Array of User has many ProjectUser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProjectUser)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProjectUser>,
  ): Promise<ProjectUser[]> {
    return this.userRepository.projectUserInUser(id).find(filter);
  }

  @post('/users/{id}/project-users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProjectUser)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectUser, {
            title: 'NewProjectUserInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) projectUser: Omit<ProjectUser, 'id'>,
  ): Promise<ProjectUser> {
    return this.userRepository.projectUserInUser(id).create(projectUser);
  }

  @patch('/users/{id}/project-users', {
    responses: {
      '200': {
        description: 'User.ProjectUser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectUser, {partial: true}),
        },
      },
    })
    projectUser: Partial<ProjectUser>,
    @param.query.object('where', getWhereSchemaFor(ProjectUser)) where?: Where<ProjectUser>,
  ): Promise<Count> {
    return this.userRepository.projectUserInUser(id).patch(projectUser, where);
  }

  @del('/users/{id}/project-users', {
    responses: {
      '200': {
        description: 'User.ProjectUser DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProjectUser)) where?: Where<ProjectUser>,
  ): Promise<Count> {
    return this.userRepository.projectUserInUser(id).delete(where);
  }
}

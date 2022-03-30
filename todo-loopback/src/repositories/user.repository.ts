import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import { type } from 'os';
import {DbDataSource} from '../datasources';
import {User, UserRelations, Todo, ProjectUser} from '../models';
import {TodoRepository} from './todo.repository';
import {ProjectUserRepository} from './project-user.repository';

export type Credentials = {
  email: string;
  password: string;
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly todoInUser: HasManyRepositoryFactory<Todo, typeof User.prototype.id>;

  public readonly projectUserInUser: HasManyRepositoryFactory<ProjectUser, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>, @repository.getter('ProjectUserRepository') protected projectUserRepositoryGetter: Getter<ProjectUserRepository>,
  ) {
    super(User, dataSource);
    this.projectUserInUser = this.createHasManyRepositoryFactoryFor('projectUserInUser', projectUserRepositoryGetter,);
    this.registerInclusionResolver('projectUserInUser', this.projectUserInUser.inclusionResolver);
    this.todoInUser = this.createHasManyRepositoryFactoryFor('todoInUser', todoRepositoryGetter,);
    this.registerInclusionResolver('todoInUser', this.todoInUser.inclusionResolver);
  }
}

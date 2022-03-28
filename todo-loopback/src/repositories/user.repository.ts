import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ProjectUser, Todo, User, UserRelations} from '../models';
import {ProjectUserRepository} from './project-user.repository';
import {TodoRepository} from './todo.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly projectUsers: HasManyRepositoryFactory<
    ProjectUser,
    typeof User.prototype.id
  >;

  public readonly todos: HasManyRepositoryFactory<
    Todo,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ProjectUserRepository')
    protected projectUserRepositoryGetter: Getter<ProjectUserRepository>,
    @repository.getter('TodoRepository')
    protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(User, dataSource);
    this.todos = this.createHasManyRepositoryFactoryFor(
      'todos',
      todoRepositoryGetter,
    );
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
    this.projectUsers = this.createHasManyRepositoryFactoryFor(
      'projectUsers',
      projectUserRepositoryGetter,
    );
    this.registerInclusionResolver(
      'projectUsers',
      this.projectUsers.inclusionResolver,
    );
  }
}

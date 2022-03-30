import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Project, ProjectRelations, Todo, ProjectUser} from '../models';
import {TodoRepository} from './todo.repository';
import {ProjectUserRepository} from './project-user.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {

  public readonly todoInProject: HasManyRepositoryFactory<Todo, typeof Project.prototype.id>;

  public readonly projectUserInProject: HasManyRepositoryFactory<ProjectUser, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>, @repository.getter('ProjectUserRepository') protected projectUserRepositoryGetter: Getter<ProjectUserRepository>,
  ) {
    super(Project, dataSource);
    this.projectUserInProject = this.createHasManyRepositoryFactoryFor('projectUserInProject', projectUserRepositoryGetter,);
    this.registerInclusionResolver('projectUserInProject', this.projectUserInProject.inclusionResolver);
    this.todoInProject = this.createHasManyRepositoryFactoryFor('todoInProject', todoRepositoryGetter,);
    this.registerInclusionResolver('todoInProject', this.todoInProject.inclusionResolver);
  }
}

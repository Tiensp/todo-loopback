import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ProjectUser, ProjectUserRelations, Project, User} from '../models';
import {ProjectRepository} from './project.repository';
import {UserRepository} from './user.repository';

export class ProjectUserRepository extends DefaultCrudRepository<
  ProjectUser,
  typeof ProjectUser.prototype.id,
  ProjectUserRelations
> {

  public readonly projectBelongsTo: BelongsToAccessor<Project, typeof ProjectUser.prototype.id>;

  public readonly userBelongsTo: BelongsToAccessor<User, typeof ProjectUser.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(ProjectUser, dataSource);
    this.userBelongsTo = this.createBelongsToAccessorFor('userBelongsTo', userRepositoryGetter,);
    this.registerInclusionResolver('userBelongsTo', this.userBelongsTo.inclusionResolver);
    this.projectBelongsTo = this.createBelongsToAccessorFor('projectBelongsTo', projectRepositoryGetter,);
    this.registerInclusionResolver('projectBelongsTo', this.projectBelongsTo.inclusionResolver);
  }
}

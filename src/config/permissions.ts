import { UserRole } from "../components/users/data/interfaces/IUser";

export enum Permission {
  VIEW_USERS = 'view_users',
  VIEW_USER = 'view_user',
  CREATE_USER = 'create_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',
  SEARCH_USERS = 'search_users',
  CREATE_EDUCATION = 'create_education',
  VIEW_USER_EDUCATIONS = 'view_user_educations',
  VIEW_EDUCATION = 'view_education',
  UPDATE_EDUCATION = 'update_education',
  DELETE_EDUCATION = 'delete_education',
  AUTOCOMPLETE_SCHOOL = 'autocomplete_school'
}

export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.User]: [
    Permission.VIEW_USER,
    Permission.CREATE_EDUCATION,
    Permission.VIEW_USER_EDUCATIONS,
    Permission.VIEW_EDUCATION,
    Permission.UPDATE_EDUCATION,
    Permission.DELETE_EDUCATION,
    Permission.AUTOCOMPLETE_SCHOOL
  ],
  [UserRole.Admin]: [
    Permission.VIEW_USERS,
    Permission.VIEW_USER,
    Permission.CREATE_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.SEARCH_USERS,
    Permission.CREATE_EDUCATION,
    Permission.VIEW_USER_EDUCATIONS,
    Permission.VIEW_EDUCATION,
    Permission.UPDATE_EDUCATION,
    Permission.DELETE_EDUCATION,
    Permission.AUTOCOMPLETE_SCHOOL
  ],
};

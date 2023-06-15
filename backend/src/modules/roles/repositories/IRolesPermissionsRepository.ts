export interface IRolesPermissionsRepository {
  create(roleId: string, permissionIds: string[]): Promise<void>;
  deleteByPermissionIds(permissionIds: string[]): Promise<void>;
}

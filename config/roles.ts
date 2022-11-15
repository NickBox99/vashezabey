import { Database } from "~/types";
import IUserRole = Database.IUserRole;

const UserRoleDescription = new Map<number, string>([
  [IUserRole.developer, "Разработчик"],
  [IUserRole.adminPlus, "Администратор+"],
  [IUserRole.admin, "Администратор"],
  [IUserRole.employee, "Сотрудник"],
  [IUserRole.user, "Клиент"]
])

export { UserRoleDescription }

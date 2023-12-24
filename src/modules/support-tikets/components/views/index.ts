import CategorySelect from './CategorySelect.vue';
import CategoryCreate from './CategoryCreate.vue';
import CategoryLog from './CategoryLog.vue';
import CategoryEdit from './CategoryEdit.vue';
import CategoryManagers from './CategoryManagers.vue';
import CategoryList from './CategoryList.vue';

import { SectionNames } from '../../stores/workModels';

export const views: Record<SectionNames, any> = {
  select: CategorySelect,
  create: CategoryCreate,
  log: CategoryLog,
  edit: CategoryEdit,
  manager: CategoryManagers,
  list: CategoryList,
};

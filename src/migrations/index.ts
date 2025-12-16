import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251215_162220_Add_custom_collections__games__levels__opponents__players__posts__rosters__years from './20251215_162220_Add_custom_collections__games__levels__opponents__players__posts__rosters__years';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251215_162220_Add_custom_collections__games__levels__opponents__players__posts__rosters__years.up,
    down: migration_20251215_162220_Add_custom_collections__games__levels__opponents__players__posts__rosters__years.down,
    name: '20251215_162220_Add_custom_collections__games__levels__opponents__players__posts__rosters__years'
  },
];

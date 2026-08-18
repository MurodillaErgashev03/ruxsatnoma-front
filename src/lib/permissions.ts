/**
 * Access rules from TZ appendix 4 (tz/08-roles-permissions.md).
 *
 * The matrix is declared once here and answered through `hasRight`, so a screen
 * never has to re-derive a role from a label. Ad-hoc `userRole.includes(...)`
 * checks scattered across pages are what let the management role slip through
 * with editor rights it never had.
 *
 * Every right additionally applies within the user's own territory and
 * organisation (the ABAC note under the matrix); that scoping is a backend
 * concern and is not modelled here.
 */

export type RoleCode =
  | 'sys_admin'
  | 'central_admin'
  | 'management'
  | 'executor_staff'
  | 'gis_specialist'
  | 'executor_head'
  | 'inspector'
  | 'accountant'
  | 'applicant'
  | 'prosecutor';

/** Objects of the matrix, in the order they appear in the TZ. */
export type PermissionObject =
  | 'application'
  | 'calculation'
  | 'gis_contour'
  | 'usage_norm'
  | 'permit'
  | 'payment'
  | 'refund'
  | 'inspection_act'
  | 'violation_case'
  | 'report'
  | 'dashboard'
  | 'users_roles'
  | 'classifiers'
  | 'audit_log'
  | 'system_settings'
  | 'backups'
  | 'archive';

/** К — view, Я — create, Ў — edit, Т — approve/sign, Ч — delete, Э — export. */
export type Right = 'view' | 'create' | 'edit' | 'approve' | 'delete' | 'export';

/**
 * Display names that also identify a role, for callers holding a label rather
 * than a code. Checked in ROLE_MATCH_ORDER so a broad alias cannot swallow a
 * narrower one.
 */
const ROLE_ALIASES: Record<RoleCode, string[]> = {
  sys_admin: ['sys_admin', 'Tizim administrator'],
  central_admin: ['central_admin', 'Markaziy apparat', 'Markaziy', 'Центральный'],
  management: ['management', 'Rahbariyat', 'Руководство', 'Direktor oʻrinbosari'],
  executor_head: ['executor_head', 'Ijrochi tashkilot rahbari'],
  executor_staff: ['executor_staff', 'Ijrochi tashkilot xodimi'],
  gis_specialist: ['gis_specialist', 'GIS', 'meʼyoriy mutaxassis'],
  inspector: ['inspector', 'Inspektor'],
  accountant: ['accountant', 'Buxgalter'],
  prosecutor: ['prosecutor', 'Prokuror'],
  applicant: ['applicant', 'Ariza beruvchi'],
};

const ROLE_MATCH_ORDER: RoleCode[] = [
  'sys_admin',
  'central_admin',
  'management',
  'executor_head',
  'executor_staff',
  'gis_specialist',
  'inspector',
  'accountant',
  'prosecutor',
];

/** Applicant is the fallback: it is the only role granted by self-registration. */
export const resolveRole = (roleCode?: string, roleLabel?: string): RoleCode => {
  const key = roleCode || roleLabel || '';
  const exact = ROLE_MATCH_ORDER.find((r) => r === key);
  if (exact) return exact;
  const byAlias = ROLE_MATCH_ORDER.find((r) =>
    ROLE_ALIASES[r].some((alias) => key.includes(alias) || roleLabel?.includes(alias))
  );
  return byAlias ?? 'applicant';
};

const V: Right[] = ['view'];
const VE: Right[] = ['view', 'export'];
const NONE: Right[] = [];

/** TZ appendix 4, transcribed row by row. */
const MATRIX: Record<PermissionObject, Record<RoleCode, Right[]>> = {
  application: {
    sys_admin: V, central_admin: VE, management: VE,
    executor_staff: ['view', 'create', 'edit'], gis_specialist: V,
    executor_head: ['view', 'approve'], inspector: V, accountant: V,
    applicant: ['view', 'create', 'edit'], prosecutor: VE,
  },
  calculation: {
    sys_admin: V, central_admin: VE, management: VE,
    executor_staff: V, gis_specialist: ['view', 'create', 'edit'],
    executor_head: ['view', 'approve'], inspector: V, accountant: V,
    applicant: V, prosecutor: VE,
  },
  gis_contour: {
    sys_admin: V, central_admin: V, management: V,
    executor_staff: V, gis_specialist: ['view', 'create', 'edit'],
    executor_head: ['view', 'approve'], inspector: V, accountant: NONE,
    applicant: V, prosecutor: VE,
  },
  usage_norm: {
    sys_admin: V, central_admin: V, management: V,
    executor_staff: V, gis_specialist: ['view', 'create', 'edit'],
    executor_head: ['view', 'approve'], inspector: V, accountant: NONE,
    applicant: V, prosecutor: VE,
  },
  permit: {
    sys_admin: V, central_admin: VE, management: VE,
    executor_staff: ['view', 'create'], gis_specialist: NONE,
    executor_head: ['view', 'approve'], inspector: V, accountant: V,
    applicant: VE, prosecutor: VE,
  },
  payment: {
    sys_admin: V, central_admin: VE, management: VE,
    executor_staff: V, gis_specialist: NONE,
    executor_head: ['view', 'approve'], inspector: NONE,
    accountant: ['view', 'create', 'edit'], applicant: V, prosecutor: VE,
  },
  refund: {
    sys_admin: V, central_admin: VE, management: VE,
    executor_staff: V, gis_specialist: NONE,
    executor_head: ['view', 'approve'], inspector: NONE,
    accountant: ['view', 'create', 'edit'], applicant: ['view', 'create'], prosecutor: VE,
  },
  inspection_act: {
    sys_admin: V, central_admin: VE, management: VE,
    executor_staff: V, gis_specialist: NONE,
    executor_head: ['view', 'approve'], inspector: ['view', 'create', 'approve'],
    accountant: NONE, applicant: V, prosecutor: VE,
  },
  violation_case: {
    sys_admin: V, central_admin: VE, management: VE,
    executor_staff: V, gis_specialist: NONE,
    executor_head: ['view', 'approve'], inspector: ['view', 'create'],
    accountant: NONE, applicant: V, prosecutor: VE,
  },
  report: {
    sys_admin: V,
    central_admin: ['view', 'create', 'edit', 'approve', 'export'],
    management: VE,
    executor_staff: ['view', 'create', 'edit'], gis_specialist: V,
    executor_head: ['view', 'approve'], inspector: NONE,
    accountant: ['view', 'create'], applicant: NONE, prosecutor: VE,
  },
  dashboard: {
    sys_admin: V, central_admin: VE, management: VE,
    executor_staff: V, gis_specialist: V, executor_head: V,
    inspector: V, accountant: V, applicant: NONE, prosecutor: VE,
  },
  // Organisation and subdivision management is administered together with users.
  users_roles: {
    sys_admin: ['view', 'create', 'edit', 'delete'],
    central_admin: V, management: V,
    executor_staff: NONE, gis_specialist: NONE, executor_head: V,
    inspector: NONE, accountant: NONE, applicant: NONE, prosecutor: V,
  },
  classifiers: {
    sys_admin: ['view', 'create', 'edit'],
    central_admin: V, management: V,
    executor_staff: V, gis_specialist: V, executor_head: V,
    inspector: V, accountant: V, applicant: NONE, prosecutor: V,
  },
  audit_log: {
    sys_admin: V, central_admin: V, management: V,
    executor_staff: NONE, gis_specialist: NONE, executor_head: V,
    inspector: NONE, accountant: NONE, applicant: NONE, prosecutor: VE,
  },
  system_settings: {
    sys_admin: ['view', 'create', 'edit'],
    central_admin: NONE, management: NONE, executor_staff: NONE,
    gis_specialist: NONE, executor_head: NONE, inspector: NONE,
    accountant: NONE, applicant: NONE, prosecutor: NONE,
  },
  backups: {
    sys_admin: ['view', 'create', 'edit', 'delete'],
    central_admin: NONE, management: NONE, executor_staff: NONE,
    gis_specialist: NONE, executor_head: NONE, inspector: NONE,
    accountant: NONE, applicant: NONE, prosecutor: NONE,
  },
  archive: {
    sys_admin: V, central_admin: VE, management: VE,
    executor_staff: V, gis_specialist: V, executor_head: V,
    inspector: V, accountant: V, applicant: V, prosecutor: VE,
  },
};

/**
 * Whether the role behind `userRole` holds `right` on `object`.
 * `userRole` may be a role code or a display label.
 */
export const hasRight = (
  userRole: string | undefined,
  object: PermissionObject,
  right: Right
): boolean => MATRIX[object][resolveRole(userRole)].includes(right);

/** All rights the role holds on an object — handy for rendering a rights badge. */
export const rightsFor = (userRole: string | undefined, object: PermissionObject): Right[] =>
  MATRIX[object][resolveRole(userRole)];

/** The audit-log entry the prosecutor's read-only portal is built around. */
export const isReadOnlyRole = (userRole: string | undefined): boolean => {
  const role = resolveRole(userRole);
  return role === 'prosecutor' || role === 'management' || role === 'central_admin';
};

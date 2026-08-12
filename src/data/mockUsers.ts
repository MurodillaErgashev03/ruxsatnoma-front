export interface MockUser {
  id: string;
  role: string;
  roleNameUz: string;
  roleNameRu: string;
  jshshir: string;
  password: string;
  fullName: string;
  organization: string;
  position: string;
  defaultPage: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'usr-001',
    role: 'sys_admin',
    roleNameUz: 'Tizim administrator',
    roleNameRu: 'Системный администратор',
    jshshir: '11111111111111',
    password: 'Admin123!',
    fullName: 'Ergashov Sardor Anvarovich',
    organization: '"Oʻzmon texno" DUK',
    position: 'Bosh administrator',
    defaultPage: 'admin_settings',
  },
  {
    id: 'usr-002',
    role: 'central_admin',
    roleNameUz: 'Markaziy apparat xodimi',
    roleNameRu: 'Сотрудник центрального аппарата',
    jshshir: '22222222222222',
    password: 'Central123!',
    fullName: 'Karimov Jamshid Botirovich',
    organization: 'Oʻrmon xoʻjaligi agentligi',
    position: 'Boʻlim boshligʻi',
    defaultPage: 'leskhoz_inbox',
  },
  {
    id: 'usr-003',
    role: 'management',
    roleNameUz: 'Rahbariyat',
    roleNameRu: 'Руководство',
    jshshir: '33333333333333',
    password: 'Director123!',
    fullName: 'Tashpulatova Nodira Rustamovna',
    organization: 'Oʻrmon xoʻjaligi agentligi',
    position: 'Direktor oʻrinbosari',
    defaultPage: 'manager_decision',
  },
  {
    id: 'usr-004',
    role: 'executor_staff',
    roleNameUz: 'Ijrochi tashkilot xodimi',
    roleNameRu: 'Сотрудник организации-исполнителя',
    jshshir: '44444444444444',
    password: 'Staff123!',
    fullName: 'Rahimov Jasur Umidovich',
    organization: 'Boʻstonliq davlat oʻrmon xoʻjaligi',
    position: 'Katta mutaxassis',
    defaultPage: 'leskhoz_inbox',
  },
  {
    id: 'usr-005',
    role: 'gis_specialist',
    roleNameUz: 'GIS / me\'yoriy mutaxassis',
    roleNameRu: 'GIS/нормативный специалист',
    jshshir: '55555555555555',
    password: 'Gis123!',
    fullName: 'Yusupov Bobur Maratovich',
    organization: 'Oʻrmon loyiha instituti',
    position: 'GIS mutaxassisi',
    defaultPage: 'gis_editor',
  },
  {
    id: 'usr-006',
    role: 'executor_head',
    roleNameUz: 'Ijrochi tashkilot rahbari',
    roleNameRu: 'Руководитель организации-исполнителя',
    jshshir: '66666666666666',
    password: 'Head123!',
    fullName: 'Mirzayev Dilshod Akramovich',
    organization: 'Boʻstonliq DЎX',
    position: 'Direktor (Vakolatli shaxs)',
    defaultPage: 'manager_decision',
  },
  {
    id: 'usr-007',
    role: 'inspector',
    roleNameUz: 'Inspektor',
    roleNameRu: 'Инспектор',
    jshshir: '77777777777777',
    password: 'Inspect123!',
    fullName: 'Abdullayev Alisher Nabiyevich',
    organization: 'Toshkent v. Boʻstonliq tumani',
    position: 'Tuman inspektori',
    defaultPage: 'field_tasks',
  },
  {
    id: 'usr-008',
    role: 'accountant',
    roleNameUz: 'Buxgalter',
    roleNameRu: 'Бухгалтер',
    jshshir: '88888888888888',
    password: 'Buhg123!',
    fullName: 'Umarova Malika Saidovna',
    organization: 'Moliya-hisob boʻlimi',
    position: 'Bosh buxgalter',
    defaultPage: 'accountant_reconciliation',
  },
  {
    id: 'usr-009',
    role: 'applicant',
    roleNameUz: 'Jismoniy va yuridik shaxs (Ariza beruvchi)',
    roleNameRu: 'Физическое и юридическое лицо',
    jshshir: '30491823410019',
    password: 'User123!',
    fullName: 'Saidov Otabek Shavkatovich',
    organization: '"Burchmulla Agro" MCHJ',
    position: 'Ariza beruvchi',
    defaultPage: 'applicant_dashboard',
  },
  {
    id: 'usr-010',
    role: 'prosecutor',
    roleNameUz: 'Prokuror (Faqat oʻqish / Read-Only)',
    roleNameRu: 'Прокурор (Read-Only)',
    jshshir: '99999999999999',
    password: 'Prokuror123!',
    fullName: 'Xalilov Utkir Xasanovich',
    organization: 'Bosh Prokuratura',
    position: '11-tarmoq prokurori',
    defaultPage: 'prosecutor_portal',
  },
];

export function authenticateUser(loginInput: string, passwordInput: string): { success: boolean; user?: MockUser; error?: string } {
  const cleanLogin = loginInput.trim();
  const cleanPassword = passwordInput.trim();

  if (!cleanLogin || !cleanPassword) {
    return { success: false, error: 'JSHSHIR/STIR va parol kiritilishi shart!' };
  }

  const foundUser = MOCK_USERS.find(
    (u) => (u.jshshir === cleanLogin || u.id === cleanLogin) && u.password === cleanPassword
  );

  if (!foundUser) {
    return { success: false, error: 'JSHSHIR/STIR yoki parol xato! Tizimga kirish rad etildi.' };
  }

  return { success: true, user: foundUser };
}

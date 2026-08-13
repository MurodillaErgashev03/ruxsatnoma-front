/**
 * Catalogue of system functions a role is built from (TZ 4.2.1.2).
 * Shared by the roles page and by the per-user grant of an individual function
 * that is not attached to any role (TZ 4.2.1.1).
 */
export interface SystemFunction {
  code: string;
  label: string;
  group: string;
}

export const SYSTEM_FUNCTIONS: SystemFunction[] = [
  // Applications and workflow
  { code: 'application.view', label: 'Arizalarni koʻrish', group: 'Arizalar va workflow' },
  { code: 'application.create', label: 'Ariza yaratish va topshirish', group: 'Arizalar va workflow' },
  { code: 'application.edit', label: 'Arizani tahrirlash', group: 'Arizalar va workflow' },
  { code: 'application.assign', label: 'Arizani ijrochiga biriktirish', group: 'Arizalar va workflow' },
  { code: 'application.decide', label: 'Ariza boʻyicha qaror qabul qilish', group: 'Arizalar va workflow' },
  { code: 'application.extend', label: 'Arizani uzaytirish va klonlash', group: 'Arizalar va workflow' },
  // Norms and calculation
  { code: 'norm.view', label: 'Meʼyor va tariflarni koʻrish', group: 'Meʼyor, limit va tarif' },
  { code: 'norm.edit', label: 'Meʼyor, limit va tarifni kiritish', group: 'Meʼyor, limit va tarif' },
  { code: 'norm.approve', label: 'Meʼyor versiyasini tasdiqlash', group: 'Meʼyor, limit va tarif' },
  // GIS
  { code: 'gis.view', label: 'GIS konturlarini koʻrish', group: 'GIS' },
  { code: 'gis.edit', label: 'GIS konturini kiritish va versiyalash', group: 'GIS' },
  { code: 'gis.import', label: 'GIS qatlamlarini import qilish', group: 'GIS' },
  // Permits and signing
  { code: 'permit.view', label: 'Ruxsatnomalarni koʻrish', group: 'Ruxsatnoma va ERI' },
  { code: 'permit.issue', label: 'Ruxsatnomani rasmiylashtirish', group: 'Ruxsatnoma va ERI' },
  { code: 'permit.sign', label: 'Ruxsatnomani ERI bilan imzolash', group: 'Ruxsatnoma va ERI' },
  { code: 'permit.suspend', label: 'Ruxsatnomani toʻxtatish va bekor qilish', group: 'Ruxsatnoma va ERI' },
  { code: 'permit.duplicate', label: 'Ruxsatnoma dublikatini berish', group: 'Ruxsatnoma va ERI' },
  // Payments
  { code: 'payment.view', label: 'Toʻlov va taqsimotni koʻrish', group: 'Moliya' },
  { code: 'payment.reconcile', label: 'Bank koʻchirmalari solishtirmasi', group: 'Moliya' },
  { code: 'payment.refund', label: 'Toʻlovni qaytarish (refund)', group: 'Moliya' },
  // Inspection
  { code: 'inspection.task', label: 'Dala topshiriqlarini koʻrish', group: 'Inspeksiya' },
  { code: 'inspection.act', label: 'Tekshiruv dalolatnomasini tuzish', group: 'Inspeksiya' },
  { code: 'inspection.violation', label: 'Huquqbuzarlik ishini ochish', group: 'Inspeksiya' },
  // Reports and analytics
  { code: 'report.view', label: 'Hisobotlarni koʻrish', group: 'Hisobot va tahlil' },
  { code: 'report.fill', label: 'Hisobot formasini toʻldirish', group: 'Hisobot va tahlil' },
  { code: 'report.manage', label: 'Hisobot shakli va muddatini belgilash', group: 'Hisobot va tahlil' },
  { code: 'report.accept', label: 'Hisobotni qabul qilish va qaytarish', group: 'Hisobot va tahlil' },
  { code: 'dashboard.view', label: 'Dashboard va analitikani koʻrish', group: 'Hisobot va tahlil' },
  { code: 'export.data', label: 'Maʼlumotlarni eksport qilish', group: 'Hisobot va tahlil' },
  // Administration
  { code: 'admin.users', label: 'Foydalanuvchilarni boshqarish', group: 'Maʼmurlash' },
  { code: 'admin.roles', label: 'Rollarni boshqarish', group: 'Maʼmurlash' },
  { code: 'admin.orgs', label: 'Tashkilotlar ierarxiyasini boshqarish', group: 'Maʼmurlash' },
  { code: 'admin.classifiers', label: 'Klassifikatorlarni boshqarish', group: 'Maʼmurlash' },
  { code: 'admin.settings', label: 'Tizim sozlamalarini oʻzgartirish', group: 'Maʼmurlash' },
  { code: 'admin.backup', label: 'Zahiraviy nusxalash va tiklash', group: 'Maʼmurlash' },
  { code: 'admin.audit', label: 'Audit jurnalini koʻrish', group: 'Maʼmurlash' },
  { code: 'admin.announcements', label: 'Eʼlon va xabarnomalarni boshqarish', group: 'Maʼmurlash' },
  { code: 'archive.view', label: 'Arxivni koʻrish', group: 'Maʼmurlash' },
];

/** Groups the catalogue by its `group` field, preserving declaration order. */
export const groupSystemFunctions = (): Record<string, SystemFunction[]> => {
  const groups: Record<string, SystemFunction[]> = {};
  SYSTEM_FUNCTIONS.forEach((fn) => {
    if (!groups[fn.group]) groups[fn.group] = [];
    groups[fn.group].push(fn);
  });
  return groups;
};

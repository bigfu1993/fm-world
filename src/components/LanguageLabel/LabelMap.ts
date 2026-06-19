import type { LanguageCode } from '@/types/system'

export const labelMap = {
  language: { zh: '中文', en: 'English', ja: '日本語', ko: '한국어', th: 'ภาษาไทย' },

  // names of each language, translated into every language (used to label per-language form rows)
  langZh: { zh: '中文', en: 'Chinese', ja: '中国語', ko: '중국어', th: 'ภาษาจีน' },
  langEn: { zh: '英文', en: 'English', ja: '英語', ko: '영어', th: 'ภาษาอังกฤษ' },
  langJa: { zh: '日文', en: 'Japanese', ja: '日本語', ko: '일본어', th: 'ภาษาญี่ปุ่น' },
  langKo: { zh: '韩文', en: 'Korean', ja: '韓国語', ko: '한국어', th: 'ภาษาเกาหลี' },
  langTh: { zh: '泰文', en: 'Thai', ja: 'タイ語', ko: '태국어', th: 'ภาษาไทย' },
  dashboard: { zh: '首页', en: 'Dashboard', ja: 'ダッシュボード', ko: '대시보드', th: 'แดชบอร์ด' },
  logout: { zh: '退出登录', en: 'Log out', ja: 'ログアウト', ko: '로그아웃', th: 'ออกจากระบบ' },

  // system management nav
  systemManagement: { zh: '系统管理', en: 'System Management', ja: 'システム管理', ko: '시스템 관리', th: 'การจัดการระบบ' },
  adminUserManagement: { zh: '账号管理', en: 'Account Management', ja: 'アカウント管理', ko: '계정 관리', th: 'การจัดการบัญชี' },
  roleManagement: { zh: '角色管理', en: 'Role Management', ja: 'ロール管理', ko: '역할 관리', th: 'การจัดการบทบาท' },

  // shared field labels
  username: { zh: '用户名', en: 'Username', ja: 'ユーザー名', ko: '사용자 이름', th: 'ชื่อผู้ใช้' },
  displayName: { zh: '姓名', en: 'Name', ja: '氏名', ko: '이름', th: 'ชื่อ' },
  email: { zh: '邮箱', en: 'Email', ja: 'メール', ko: '이메일', th: 'อีเมล' },
  role: { zh: '角色', en: 'Role', ja: 'ロール', ko: '역할', th: 'บทบาท' },
  languageField: { zh: '语言', en: 'Language', ja: '言語', ko: '언어', th: 'ภาษา' },
  status: { zh: '状态', en: 'Status', ja: '状態', ko: '상태', th: 'สถานะ' },
  enabled: { zh: '启用', en: 'Enabled', ja: '有効', ko: '사용 함', th: 'เปิดใช้งาน' },
  disabled: { zh: '禁用', en: 'Disabled', ja: '無効', ko: '사용 안 함', th: 'ปิดใช้งาน' },
  createdAt: { zh: '创建时间', en: 'Created At', ja: '作成日時', ko: '생성 시간', th: 'เวลาสร้าง' },
  actions: { zh: '操作', en: 'Actions', ja: '操作', ko: '작업', th: 'การดำเนินการ' },
  edit: { zh: '编辑', en: 'Edit', ja: '編集', ko: '편집', th: 'แก้ไข' },
  delete: { zh: '删除', en: 'Delete', ja: '削除', ko: '삭제', th: 'ลบ' },
  search: { zh: '搜索', en: 'Search', ja: '検索', ko: '검색', th: 'ค้นหา' },
  defaultTag: { zh: '默认', en: 'Default', ja: 'デフォルト', ko: '기본', th: 'ค่าเริ่มต้น' },
  operationFailed: { zh: '操作失败', en: 'Operation failed', ja: '操作に失敗しました', ko: '작업에 실패했습니다', th: 'การดำเนินการล้มเหลว' },

  // admin user page
  resetPassword: { zh: '重置密码', en: 'Reset Password', ja: 'パスワード再設定', ko: '비밀번호 재설정', th: 'รีเซ็ตรหัสผ่าน' },
  confirmDeleteAccount: { zh: '确认删除该账号？', en: 'Are you sure to delete this account?', ja: 'このアカウントを削除しますか？', ko: '이 계정을 삭제하시겠습니까?', th: 'ยืนยันการลบบัญชีนี้หรือไม่?' },
  searchByUsername: { zh: '按用户名搜索', en: 'Search by username', ja: 'ユーザー名で検索', ko: '사용자 이름으로 검색', th: 'ค้นหาตามชื่อผู้ใช้' },
  createAccount: { zh: '新建账号', en: 'New Account', ja: '新規アカウント', ko: '신규 계정', th: 'สร้างบัญชีใหม่' },
  editAccount: { zh: '编辑账号', en: 'Edit Account', ja: 'アカウント編集', ko: '계정 편집', th: 'แก้ไขบัญชี' },
  pleaseInputUsername: { zh: '请输入用户名', en: 'Please input username', ja: 'ユーザー名を入力してください', ko: '사용자 이름을 입력하세요', th: 'กรุณากรอกชื่อผู้ใช้' },
  pleaseInputDisplayName: { zh: '请输入姓名', en: 'Please input name', ja: '氏名を入力してください', ko: '이름을 입력하세요', th: 'กรุณากรอกชื่อ' },
  pleaseInputEmail: { zh: '请输入正确的邮箱', en: 'Please input a valid email', ja: '正しいメールアドレスを入力してください', ko: '올바른 이메일을 입력하세요', th: 'กรุณากรอกอีเมลที่ถูกต้อง' },
  pleaseSelectRole: { zh: '请选择角色', en: 'Please select role', ja: 'ロールを選択してください', ko: '역할을 선택하세요', th: 'กรุณาเลือกบทบาท' },
  pleaseSelectLanguage: { zh: '请选择至少一种语言', en: 'Please select at least one language', ja: '言語を1つ以上選択してください', ko: '언어를 하나 이상 선택하세요', th: 'กรุณาเลือกภาษาอย่างน้อยหนึ่งภาษา' },
  selectLanguagePlaceholder: { zh: '请选择语言', en: 'Please select language', ja: '言語を選択してください', ko: '언어를 선택하세요', th: 'กรุณาเลือกภาษา' },
  languageOrderHint: {
    zh: '按选择顺序排列，第一个语言将作为该账号登录后的默认展示语言',
    en: 'Listed in selection order; the first language is the default display language after login',
    ja: '選択した順に表示されます。最初の言語がログイン後のデフォルト表示言語になります',
    ko: '선택한 순서대로 표시됩니다. 첫 번째 언어가 로그인 후 기본 표시 언어가 됩니다',
    th: 'เรียงตามลำดับที่เลือก ภาษาแรกจะเป็นภาษาที่แสดงเริ่มต้นหลังจากเข้าสู่ระบบ',
  },
  initialPassword: { zh: '初始密码', en: 'Initial Password', ja: '初期パスワード', ko: '초기 비밀번호', th: 'รหัสผ่านเริ่มต้น' },
  defaultPasswordHint: { zh: '留空则默认 123456', en: 'Leave blank to default to 123456', ja: '空欄の場合は初期値123456になります', ko: '비워두면 기본값 123456이 됩니다', th: 'เว้นว่างไว้เพื่อใช้ค่าเริ่มต้น 123456' },
  newPassword: { zh: '新密码', en: 'New Password', ja: '新しいパスワード', ko: '새 비밀번호', th: 'รหัสผ่านใหม่' },
  passwordMinLengthHint: { zh: '密码至少6位', en: 'Password must be at least 6 characters', ja: 'パスワードは6文字以上', ko: '비밀번호는 6자 이상이어야 합니다', th: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' },
  accountUpdated: { zh: '账号已更新', en: 'Account updated', ja: 'アカウントを更新しました', ko: '계정이 업데이트되었습니다', th: 'อัปเดตบัญชีแล้ว' },
  accountCreated: { zh: '账号已创建', en: 'Account created', ja: 'アカウントを作成しました', ko: '계정이 생성되었습니다', th: 'สร้างบัญชีแล้ว' },
  accountDeleted: { zh: '账号已删除', en: 'Account deleted', ja: 'アカウントを削除しました', ko: '계정이 삭제되었습니다', th: 'ลบบัญชีแล้ว' },
  passwordResetSuccess: { zh: '密码已重置', en: 'Password reset', ja: 'パスワードを再設定しました', ko: '비밀번호가 재설정되었습니다', th: 'รีเซ็ตรหัสผ่านแล้ว' },

  // role page
  roleName: { zh: '角色名称', en: 'Role Name', ja: 'ロール名', ko: '역할 이름', th: 'ชื่อบทบาท' },
  roleCode: { zh: '角色编码', en: 'Role Code', ja: 'ロールコード', ko: '역할 코드', th: 'รหัสบทบาท' },
  description: { zh: '描述', en: 'Description', ja: '説明', ko: '설명', th: 'คำอธิบาย' },
  permission: { zh: '权限', en: 'Permission', ja: '権限', ko: '권한', th: 'สิทธิ์' },
  newRole: { zh: '新建角色', en: 'New Role', ja: '新規ロール', ko: '신규 역할', th: 'สร้างบทบาทใหม่' },
  editRole: { zh: '编辑角色', en: 'Edit Role', ja: 'ロール編集', ko: '역할 편집', th: 'แก้ไขบทบาท' },
  pleaseInputRoleName: { zh: '请输入角色名称', en: 'Please input role name', ja: 'ロール名を入力してください', ko: '역할 이름을 입력하세요', th: 'กรุณากรอกชื่อบทบาท' },
  pleaseInputRoleCode: { zh: '请输入角色编码', en: 'Please input role code', ja: 'ロールコードを入力してください', ko: '역할 코드를 입력하세요', th: 'กรุณากรอกรหัสบทบาท' },
  confirmDeleteRole: { zh: '确认删除该角色？', en: 'Are you sure to delete this role?', ja: 'このロールを削除しますか？', ko: '이 역할을 삭제하시겠습니까?', th: 'ยืนยันการลบบทบาทนี้หรือไม่?' },
  roleUpdated: { zh: '角色已更新', en: 'Role updated', ja: 'ロールを更新しました', ko: '역할이 업데이트되었습니다', th: 'อัปเดตบทบาทแล้ว' },
  roleCreated: { zh: '角色已创建', en: 'Role created', ja: 'ロールを作成しました', ko: '역할이 생성되었습니다', th: 'สร้างบทบาทแล้ว' },
  roleDeleted: { zh: '角色已删除', en: 'Role deleted', ja: 'ロールを削除しました', ko: '역할이 삭제되었습니다', th: 'ลบบทบาทแล้ว' },

  // master data nav
  masterData: { zh: '基础数据', en: 'Master Data', ja: '基礎データ', ko: '기초 데이터', th: 'ข้อมูลพื้นฐาน' },
  countryManagement: { zh: '国家管理', en: 'Country Management', ja: '国管理', ko: '국가 관리', th: 'การจัดการประเทศ' },
  cityManagement: { zh: '城市管理', en: 'City Management', ja: '都市管理', ko: '도시 관리', th: 'การจัดการเมือง' },

  // country & city pages
  country: { zh: '国家', en: 'Country', ja: '国', ko: '국가', th: 'ประเทศ' },
  city: { zh: '城市', en: 'City', ja: '都市', ko: '도시', th: 'เมือง' },
  countryCode: { zh: '国家代码', en: 'Country Code', ja: '国コード', ko: '국가 코드', th: 'รหัสประเทศ' },
  countryName: { zh: '国家名称', en: 'Country Name', ja: '国名', ko: '국가 이름', th: 'ชื่อประเทศ' },
  cityName: { zh: '城市名称', en: 'City Name', ja: '都市名', ko: '도시 이름', th: 'ชื่อเมือง' },
  newCountry: { zh: '新建国家', en: 'New Country', ja: '新規国', ko: '신규 국가', th: 'สร้างประเทศใหม่' },
  editCountry: { zh: '编辑国家', en: 'Edit Country', ja: '国編集', ko: '국가 편집', th: 'แก้ไขประเทศ' },
  newCity: { zh: '新建城市', en: 'New City', ja: '新規都市', ko: '신규 도시', th: 'สร้างเมืองใหม่' },
  editCity: { zh: '编辑城市', en: 'Edit City', ja: '都市編集', ko: '도시 편집', th: 'แก้ไขเมือง' },
  pleaseInputCountryCode: { zh: '请输入国家代码', en: 'Please input country code', ja: '国コードを入力してください', ko: '국가 코드를 입력하세요', th: 'กรุณากรอกรหัสประเทศ' },
  pleaseInputCountryName: { zh: '请输入国家名称', en: 'Please input country name', ja: '国名を入力してください', ko: '국가 이름을 입력하세요', th: 'กรุณากรอกชื่อประเทศ' },
  pleaseInputCityName: { zh: '请输入城市名称', en: 'Please input city name', ja: '都市名を入力してください', ko: '도시 이름을 입력하세요', th: 'กรุณากรอกชื่อเมือง' },
  pleaseSelectCountry: { zh: '请选择国家', en: 'Please select country', ja: '国を選択してください', ko: '국가를 선택하세요', th: 'กรุณาเลือกประเทศ' },
  filterByCountry: { zh: '按国家筛选', en: 'Filter by country', ja: '国で絞り込み', ko: '국가로 필터링', th: 'กรองตามประเทศ' },
  confirmDeleteCountry: { zh: '确认删除该国家？', en: 'Are you sure to delete this country?', ja: 'この国を削除しますか？', ko: '이 국가를 삭제하시겠습니까?', th: 'ยืนยันการลบประเทศนี้หรือไม่?' },
  confirmDeleteCity: { zh: '确认删除该城市？', en: 'Are you sure to delete this city?', ja: 'この都市を削除しますか？', ko: '이 도시를 삭제하시겠습니까?', th: 'ยืนยันการลบเมืองนี้หรือไม่?' },
  countryCreated: { zh: '国家已创建', en: 'Country created', ja: '国を作成しました', ko: '국가가 생성되었습니다', th: 'สร้างประเทศแล้ว' },
  countryUpdated: { zh: '国家已更新', en: 'Country updated', ja: '国を更新しました', ko: '국가가 업데이트되었습니다', th: 'อัปเดตประเทศแล้ว' },
  countryDeleted: { zh: '国家已删除', en: 'Country deleted', ja: '国を削除しました', ko: '국가가 삭제되었습니다', th: 'ลบประเทศแล้ว' },
  cityCreated: { zh: '城市已创建', en: 'City created', ja: '都市を作成しました', ko: '도시가 생성되었습니다', th: 'สร้างเมืองแล้ว' },
  cityUpdated: { zh: '城市已更新', en: 'City updated', ja: '都市を更新しました', ko: '도시가 업데이트되었습니다', th: 'อัปเดตเมืองแล้ว' },
  cityDeleted: { zh: '城市已删除', en: 'City deleted', ja: '都市を削除しました', ko: '도시가 삭제되었습니다', th: 'ลบเมืองแล้ว' },
} satisfies Record<string, Record<LanguageCode, string>>

export type LabelKey = keyof typeof labelMap

export function getLabel(key: LabelKey, lang: LanguageCode = 'zh'): string {
  return labelMap[key][lang]
}

export const LANGUAGE_NAME_KEYS: Record<LanguageCode, LabelKey> = {
  zh: 'langZh',
  en: 'langEn',
  ja: 'langJa',
  ko: 'langKo',
  th: 'langTh',
}

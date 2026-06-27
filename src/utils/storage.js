// Local Storage Wrapper for managing apps and settings

export const STORAGE_KEYS = {
  APPS: 'portal_apps',
  SETTINGS: 'portal_settings',
  GATEWAY_PASSED: 'portal_gateway_passed',
  ADMIN_AUTH: 'portal_admin_auth',
};

// Default initial data
export const defaultApps = [
  { id: '1', title: '클래스팅', description: '학급 알림장 및 게시판', url: 'https://www.classting.com', isVisible: true },
  { id: '2', title: '구글 클래스룸', description: '과제 제출 및 온라인 학습', url: 'https://classroom.google.com', isVisible: true },
];

export const defaultSettings = {
  usageContext: 'class', // 'teacher', 'class', 'home'
};

export function getApps() {
  const apps = localStorage.getItem(STORAGE_KEYS.APPS);
  return apps ? JSON.parse(apps) : defaultApps;
}

export function saveApps(apps) {
  localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(apps));
}

export function getSettings() {
  const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return settings ? JSON.parse(settings) : defaultSettings;
}

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function checkGatewayPassed() {
  return sessionStorage.getItem(STORAGE_KEYS.GATEWAY_PASSED) === 'true';
}

export function setGatewayPassed() {
  sessionStorage.setItem(STORAGE_KEYS.GATEWAY_PASSED, 'true');
}

export function loginAdmin(password) {
  // Hardcoded for testing: 'admin1234'
  if (password === 'admin1234') {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    return true;
  }
  return false;
}

export function logoutAdmin() {
  sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

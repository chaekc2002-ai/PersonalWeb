import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApps, saveApps, getSettings, saveSettings, isAdminLoggedIn, logoutAdmin } from '../../utils/storage';
import { LogOut, Plus, Trash2, Save, Download, AlertTriangle } from 'lucide-react';
import './Admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [settings, setSettings] = useState({ usageContext: 'class' });

  // New App Form State
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    setApps(getApps());
    setSettings(getSettings());
  }, [navigate]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const handleAddApp = (e) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    let formattedUrl = newUrl;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'http://' + formattedUrl;
    }

    const newApp = {
      id: Date.now().toString(),
      title: newTitle,
      url: formattedUrl,
      description: newDesc,
      isVisible: true
    };

    const updatedApps = [...apps, newApp];
    setApps(updatedApps);
    saveApps(updatedApps);

    setNewTitle('');
    setNewUrl('');
    setNewDesc('');
  };

  const handleDeleteApp = (id) => {
    if (window.confirm('정말 이 웹앱을 삭제하시겠습니까?')) {
      const updatedApps = apps.filter(app => app.id !== id);
      setApps(updatedApps);
      saveApps(updatedApps);
    }
  };

  const handleToggleVisible = (id) => {
    const updatedApps = apps.map(app => 
      app.id === id ? { ...app, isVisible: !app.isVisible } : app
    );
    setApps(updatedApps);
    saveApps(updatedApps);
  };

  const handleSettingChange = (e) => {
    const newSettings = { ...settings, usageContext: e.target.value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify({ apps, settings }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portal_data_export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    if (window.confirm('모든 데이터를 초기화하시겠습니까? 복구할 수 없습니다.')) {
      setApps([]);
      saveApps([]);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-inner">
          <h1>관리자 대시보드</h1>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={18} /> 로그아웃
          </button>
        </div>
      </header>

      <main className="admin-main">
        {/* Settings Section */}
        <section className="admin-section">
          <h2>심의 대응 환경 설정</h2>
          <div className="settings-card">
            <p className="settings-desc">본 포털의 주 사용 목적을 선택하세요. 메인 화면의 안내 문구가 변경됩니다.</p>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="usageContext" 
                  value="teacher" 
                  checked={settings.usageContext === 'teacher'}
                  onChange={handleSettingChange}
                />
                교사 단독 행정/업무용
              </label>
              <label>
                <input 
                  type="radio" 
                  name="usageContext" 
                  value="class" 
                  checked={settings.usageContext === 'class'}
                  onChange={handleSettingChange}
                />
                정규 수업 학생 함께 사용
              </label>
              <label>
                <input 
                  type="radio" 
                  name="usageContext" 
                  value="home" 
                  checked={settings.usageContext === 'home'}
                  onChange={handleSettingChange}
                />
                가정/과제 학생 접속 허용
              </label>
            </div>
          </div>
        </section>

        {/* Data Management Section */}
        <section className="admin-section">
          <h2>데이터 관리</h2>
          <div className="data-management-card">
            <p>로컬 스토리지에 저장된 데이터를 백업하거나 초기화할 수 있습니다.</p>
            <div className="action-buttons">
              <button onClick={handleExportData} className="btn-secondary">
                <Download size={16} /> 데이터 내보내기 (JSON)
              </button>
              <button onClick={handleResetData} className="btn-danger">
                <AlertTriangle size={16} /> 모든 앱 초기화
              </button>
            </div>
          </div>
        </section>

        {/* App List Management Section */}
        <section className="admin-section">
          <h2>웹앱 목록 관리</h2>
          
          <form className="add-app-form" onSubmit={handleAddApp}>
            <h3>새 웹앱 추가</h3>
            <div className="form-row">
              <input 
                type="text" 
                placeholder="웹앱 이름 (예: 클래스팅)" 
                value={newTitle} 
                onChange={e => setNewTitle(e.target.value)}
                required
              />
              <input 
                type="text" 
                placeholder="URL (예: https://classting.com)" 
                value={newUrl} 
                onChange={e => setNewUrl(e.target.value)}
                required
              />
            </div>
            <input 
              type="text" 
              placeholder="설명 (선택사항)" 
              value={newDesc} 
              onChange={e => setNewDesc(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              <Plus size={18} /> 추가하기
            </button>
          </form>

          <div className="app-list">
            {apps.length === 0 ? (
              <p className="no-apps">등록된 앱이 없습니다.</p>
            ) : (
              apps.map(app => (
                <div key={app.id} className={`admin-app-item ${!app.isVisible ? 'disabled' : ''}`}>
                  <div className="app-info">
                    <h4>{app.title}</h4>
                    <a href={app.url} target="_blank" rel="noopener noreferrer">{app.url}</a>
                    <p>{app.description}</p>
                  </div>
                  <div className="app-actions">
                    <button 
                      onClick={() => handleToggleVisible(app.id)}
                      className="btn-toggle"
                    >
                      {app.isVisible ? '숨기기' : '보이기'}
                    </button>
                    <button 
                      onClick={() => handleDeleteApp(app.id)}
                      className="btn-icon btn-delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

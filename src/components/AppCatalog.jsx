import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApps, getSettings, checkGatewayPassed } from '../utils/storage';
import { ExternalLink, ArrowRight } from 'lucide-react';
import './AppCatalog.css';
import Footer from './Footer';

export default function AppCatalog() {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // Check if user passed the gateway
    if (!checkGatewayPassed()) {
      navigate('/');
      return;
    }

    const allApps = getApps();
    setApps(allApps.filter(app => app.isVisible));
    setSettings(getSettings());
  }, [navigate]);

  const getNoticeMessage = () => {
    switch(settings.usageContext) {
      case 'teacher':
        return '이 포털은 교사 단독 행정/업무용으로 운영됩니다.';
      case 'class':
        return '본 포털은 교사의 지도하에 정규 수업 용도로만 사용됩니다.';
      case 'home':
        return '이 포털은 학생들의 가정/과제 학습을 위해 제공됩니다.';
      default:
        return '본 포털은 교육용으로 제공됩니다.';
    }
  };

  return (
    <div className="catalog-container">
      {/* 장식용 구름 배경 */}
      <div className="cloud-bg cloud-1"></div>
      <div className="cloud-bg cloud-2"></div>
      <div className="cloud-bg cloud-3"></div>

      <header className="catalog-header">
        <div className="header-content">
          <h1>학급용 웹앱 통합 포털</h1>
          <p className="notice-badge">{getNoticeMessage()}</p>
        </div>
      </header>

      <main className="catalog-main">
        {apps.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h2>현재 등록된 웹앱이 없습니다.</h2>
            <p>선생님께서 곧 유용한 학습 도구들을 추가해주실 예정입니다.</p>
          </div>
        ) : (
          <div className="app-grid">
            {apps.map(app => (
              <a 
                key={app.id} 
                href={app.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="app-card"
              >
                <div className="app-card-content">
                  <div className="app-icon-wrapper">
                    <ExternalLink className="app-icon-svg" />
                  </div>
                  <h3 className="app-title">{app.title}</h3>
                  <p className="app-description">{app.description}</p>
                </div>
                <div className="app-card-footer">
                  <span>앱 열기</span>
                  <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

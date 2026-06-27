import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin, isAdminLoggedIn } from '../../utils/storage';
import { Lock } from 'lucide-react';
import './Admin.css';

export default function AdminAuth() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminLoggedIn()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-card">
        <div className="auth-icon-wrapper">
          <Lock size={32} color="#1e293b" />
        </div>
        <h2>관리자 로그인</h2>
        <p>선생님 전용 관리자 페이지입니다.</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="password"
              placeholder="비밀번호 입력 (기본: admin1234)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? 'error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          <button type="submit" className="auth-button">로그인</button>
        </form>
        
        <button onClick={() => navigate('/')} className="back-button">
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}

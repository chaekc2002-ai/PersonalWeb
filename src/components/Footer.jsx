import React, { useState } from 'react';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '../assets/policies';
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type) => {
    setModalContent(type === 'privacy' ? PRIVACY_POLICY : TERMS_OF_SERVICE);
  };

  const closeModal = () => setModalContent(null);

  return (
    <>
      <footer className="portal-footer">
        <div className="footer-content">
          <div className="footer-links">
            <button onClick={() => openModal('privacy')} className="footer-link">개인정보 처리방침</button>
            <span className="divider">|</span>
            <button onClick={() => openModal('terms')} className="footer-link">이용약관</button>
            <span className="divider">|</span>
            <span className="footer-text">담당자: 홍길동 선생님 (문의: teacher@school.edu)</span>
          </div>
          <div className="footer-info">
            <p>OO초등학교 | 시행일: 2026.06.27 | 최근 변경일: 2026.06.27</p>
          </div>
        </div>
      </footer>

      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            <div className="modal-body">
              <ReactMarkdown>{modalContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

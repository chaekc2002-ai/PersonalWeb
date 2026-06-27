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

  // TODO: 실제 선생님 정보로 업데이트 필요
  const teacherName = "채관철";

  return (
    <>
      <footer className="portal-footer">
        <div className="footer-content">
          <div className="footer-links">
            <button onClick={() => openModal('terms')} className="footer-link">이용약관</button>
            <span className="divider">|</span>
            <button onClick={() => openModal('privacy')} className="footer-link">개인정보처리방침</button>
            <span className="divider">|</span>
            <span className="footer-text">정보관리책임자: {teacherName}</span>
          </div>
          <div className="footer-info">
            <p>&copy; 2026 {teacherName}. All rights reserved.</p>
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setGatewayPassed } from '../utils/storage';
import { CheckCircle, Shield, Brain, Eye, UserCheck, MessageSquare } from 'lucide-react';
import './Gateway.css';

const guides = [
  {
    icon: <CheckCircle className="icon" color="#f97316" />,
    title: "활용 목적",
    desc: "생성형 AI를 쓰기 전, '왜' 쓰는지 말할 수 있어야 해요."
  },
  {
    icon: <UserCheck className="icon" color="#f97316" />,
    title: "주도적 학습",
    desc: "생성형 AI에게 물어보기 전, 내 생각을 먼저 말해요."
  },
  {
    icon: <Eye className="icon" color="#f97316" />,
    title: "비판적 검증",
    desc: "생성형 AI가 틀릴 수 있다는 점을 알아요."
  },
  {
    icon: <Brain className="icon" color="#f97316" />,
    title: "사고의 확장",
    desc: "생성형 AI와 함께 상상하며 내 생각을 더 크게 키워요."
  },
  {
    icon: <Shield className="icon" color="#3b82f6" />,
    title: "안전과 관계",
    desc: "나의 정보와 비밀을 말하지 않아요."
  },
  {
    icon: <MessageSquare className="icon" color="#eab308" />,
    title: "투명성·윤리",
    desc: "생성형 AI의 도움을 받았다면 숨기지 않고 정직하게 이야기해요."
  }
];

export default function Gateway() {
  const navigate = useNavigate();

  const handleAgree = () => {
    setGatewayPassed();
    navigate('/apps');
  };

  return (
    <div className="gateway-container">
      <div className="gateway-card">
        <h1 className="gateway-title">AI 활용 윤리 핵심 가이드</h1>
        <p className="gateway-subtitle">본 활동에 참여하기 전, 아래의 가이드를 꼭 읽고 다짐해 주세요.</p>
        
        <div className="guides-grid">
          {guides.map((guide, idx) => (
            <div key={idx} className="guide-item">
              <div className="guide-icon">{guide.icon}</div>
              <div className="guide-text">
                <h3>{guide.title}</h3>
                <p>{guide.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="agree-button" onClick={handleAgree}>
          나는 윤리 핵심가이드를 빠짐없이 읽고 이를 실천하겠습니다.
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Button, Progress, Spin, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 纯前端化：直接导入本地数据
import questionsData from '../data/questions.json';
import rappersData from '../data/rappers.json';

const { Title, Text } = Typography;

export default function Test() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState({
    career: 0, emotion: 0, authenticity: 0, greed: 0, brotherhood: 0
  });
  const [scoreHistory, setScoreHistory] = useState([{
    career: 0, emotion: 0, authenticity: 0, greed: 0, brotherhood: 0
  }]);
  const navigate = useNavigate();

  useEffect(() => {
    // 模拟加载效果，实际直接从导入的数据获取
    setTimeout(() => {
      setQuestions(questionsData);
      setIsLoading(false);
    }, 500);
  }, []);

  // 匹配逻辑适配（搬运自 backend/routes/api.js）
  const calculateResult = (finalScores) => {
    const MAX_SCORES = {
        career: 83,
        emotion: 91,
        authenticity: 110,
        greed: 106,
        brotherhood: 79
    };

    const normalize = (score, max) => {
        if (score <= 0) return 5;
        const baseline = max * 0.8;
        const val = (score / baseline) * 100;
        return Math.max(1, Math.min(100, val));
    };

    const userProfile = {
        career: normalize(finalScores.career || 0, MAX_SCORES.career),
        emotion: normalize(finalScores.emotion || 0, MAX_SCORES.emotion),
        authenticity: normalize(finalScores.authenticity || 0, MAX_SCORES.authenticity),
        greed: normalize(finalScores.greed || 0, MAX_SCORES.greed),
        brotherhood: normalize(finalScores.brotherhood || 0, MAX_SCORES.brotherhood)
    };

    let bestMatch = null;
    let minDistance = Infinity;

    rappersData.forEach(rapper => {
        let distance = 0;
        const eScores = rapper.expected_scores;
        const dimensions = ['career', 'emotion', 'authenticity', 'greed', 'brotherhood'];
        
        dimensions.forEach(dim => {
            const uVal = userProfile[dim];
            const rVal = eScores[dim] || 50;
            distance += Math.pow(uVal - rVal, 2);
        });

        if (distance < minDistance) {
            minDistance = distance;
            bestMatch = rapper;
        }
    });

    const maxPossibleDistance = 50000;
    let matchPctNum = (1 - Math.sqrt(minDistance / maxPossibleDistance)) * 100;
    
    if (matchPctNum > 99) matchPctNum = 99.2;
    if (matchPctNum < 85) {
        matchPctNum = 85 + Math.random() * 10;
    }

    return {
        rapper: bestMatch,
        matchPercentage: matchPctNum.toFixed(1)
    };
  };

  const handleOptionClick = (optionScores) => {
    const newScores = { ...scores };
    Object.keys(optionScores).forEach(key => {
      newScores[key] = (newScores[key] || 0) + optionScores[key];
    });
    setScores(newScores);
    setScoreHistory([...scoreHistory, newScores]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 测试结束，计算结果并跳转
      const result = calculateResult(newScores);
      navigate('/result', { state: result });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevScores = scoreHistory[currentIndex - 1];
      setScores(prevScores);
      setScoreHistory(scoreHistory.slice(0, -1));
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading || questions.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', padding: '0 4px' }}>
          <Text style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '1px' }}>
            STEP {currentIndex + 1} / {questions.length}
          </Text>
          <Text style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {Math.round(progressPercent)}%
          </Text>
        </div>
        <Progress 
          percent={progressPercent} 
          showInfo={false} 
          strokeColor="var(--text-primary)" 
          trailColor="rgba(255,255,255,0.05)"
          strokeWidth={4}
          style={{ margin: 0 }}
        />
      </div>
      
      <div style={{ flex: 1, position: 'relative' }}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glass-card"
            style={{ width: '100%' }}
          >
            <Title level={4} style={{ 
              marginBottom: '2rem', 
              fontWeight: 600, 
              lineHeight: 1.4,
              fontSize: '1.25rem',
              color: 'var(--text-primary)'
            }}>
              {currentQ.text}
            </Title>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {currentQ.options.map((opt, idx) => (
                <motion.div 
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    block 
                    onClick={() => handleOptionClick(opt.scores)}
                    style={{
                      height: 'auto',
                      minHeight: '62px',
                      padding: '16px 20px',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                      fontSize: '0.95rem',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    className="option-btn"
                  >
                    {opt.text}
                  </Button>
                </motion.div>
              ))}
            </div>
            
            {currentIndex > 0 && (
              <Button 
                type="text" 
                onClick={handleBack}
                style={{ 
                  marginTop: '1.5rem', 
                  width: '100%', 
                  fontSize: '0.85rem', 
                  color: 'rgba(255,255,255,0.4)',
                  fontWeight: 400
                }}
              >
                ← 返回上一题
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* 注入特定的 Hover 样式 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .option-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.2) !important;
          color: #fff !important;
        }
      `}} />
    </div>
  );
}

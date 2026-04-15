import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Typography, Tag, message, Divider } from 'antd';
import { ShareAltOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state;

  if (!resultData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '30vh', padding: '0 20px' }}>
        <Paragraph style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>没有找到结果数据，请重新测试。</Paragraph>
        <Button 
          type="primary" 
          onClick={() => navigate('/')}
          style={{ height: '50px', borderRadius: '12px' }}
        >
          返回首页
        </Button>
      </div>
    );
  }

  const { rapper, matchPercentage } = resultData;

  const handleShare = () => {
    message.success('已复制测试结果链接，快去分享给朋友吧！');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ textAlign: 'center', marginTop: '2vh', marginBottom: '3vh' }}>
        <Text style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-secondary)', 
          textTransform: 'uppercase', 
          letterSpacing: '2px',
          fontWeight: 400
        }}>
          你的内在人格最契合的是
        </Text>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4vh' }}
      >
        <Title level={1} style={{ 
          margin: 0, 
          fontSize: '4.5rem', 
          fontWeight: 800, 
          letterSpacing: '-2px', 
          color: 'var(--text-primary)',
          lineHeight: 1
        }}>
          {rapper.name}
        </Title>
        <div style={{ 
          marginTop: '1.5rem',
          display: 'inline-block',
          padding: '4px 16px',
          borderRadius: '30px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Text style={{ 
            color: 'var(--text-primary)', 
            fontSize: '1rem', 
            fontWeight: 600,
            letterSpacing: '1px'
          }}>
            匹配度 {Number(matchPercentage).toFixed(1)}%
          </Text>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="glass-card"
        style={{ flex: 1, marginBottom: '4vh' }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          {rapper.traits && rapper.traits.map(t => (
            <Tag 
              key={t} 
              bordered={false} 
              style={{ 
                marginBottom: '8px', 
                padding: '4px 14px', 
                fontSize: '0.8rem', 
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              #{t}
            </Tag>
          ))}
        </div>

        <Divider style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '1.5rem 0' }} />

        <Paragraph style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.05rem', 
          lineHeight: 1.8,
          fontWeight: 300,
          textAlign: 'justify'
        }}>
          {rapper.description}
        </Paragraph>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        style={{ display: 'flex', gap: '1rem', paddingBottom: '4vh' }}
      >
        <Button 
          type="primary" 
          icon={<ShareAltOutlined />} 
          block 
          onClick={handleShare}
          style={{ height: '56px', borderRadius: '14px', fontSize: '1rem' }}
        >
          分享结果
        </Button>
        <Button 
          icon={<ReloadOutlined />} 
          block 
          onClick={() => navigate('/')}
          style={{ 
            height: '56px', 
            borderRadius: '14px', 
            fontSize: '1rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-secondary)'
          }}
          className="result-secondary-btn"
        >
          再测一次
        </Button>
      </motion.div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .result-secondary-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.2) !important;
          color: #fff !important;
        }
      `}} />
    </motion.div>
  );
}

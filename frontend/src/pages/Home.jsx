import { Button, Typography } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Title level={1} style={{ 
            fontSize: '4.2rem', 
            fontWeight: 800, 
            lineHeight: 0.9,
            marginBottom: '2rem', 
            color: 'var(--text-primary)', 
            letterSpacing: '-3px',
            textTransform: 'uppercase'
          }}>
            说唱歌手<br/>
            <span style={{ color: 'var(--text-secondary)', fontSize: '3.8rem' }}>匹配测试</span>
          </Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Paragraph style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.6,
            maxWidth: '300px',
            fontWeight: 300,
            letterSpacing: '0.2px'
          }}>
            在金钱、兄弟、真实与事业之间，你会作何选择？<br/><br/>
            探索你潜意识里契合哪位中国说唱歌手。
          </Paragraph>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ paddingBottom: '6vh' }}
      >
        <Button 
          type="primary" 
          block
          onClick={() => navigate('/test')}
          style={{ 
            height: '64px', 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '2px'
          }}
        >
          开始匹配
        </Button>
        <div style={{ 
          marginTop: '2rem', 
          fontSize: '0.75rem', 
          color: 'rgba(255,255,255,0.3)', 
          textAlign: 'center',
          fontWeight: 300,
          letterSpacing: '1px'
        }}>
          此测试纯属娱乐，仅供参考
        </div>
      </motion.div>
    </motion.div>
  );
}

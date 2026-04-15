import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SoundOutlined, MutedOutlined } from '@ant-design/icons';
import Home from './pages/Home';
import Test from './pages/Test';
import Result from './pages/Result';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // 初始化音量至30%
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
    // 监听用户单次交互用以自动播放音乐 (由于浏览器安全策略，必须有交互才能播放)
    const handleInteraction = () => {
      if(audioRef.current && !hasInteracted.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          hasInteracted.current = true;
        }).catch(err => {
          console.log("Audio play failed, user didn't interact properly.", err);
        });
        
        // 移除所有监听器
        ['click', 'mousedown', 'keydown', 'touchstart'].forEach(event => {
          document.removeEventListener(event, handleInteraction);
        });
      }
    };

    ['click', 'mousedown', 'keydown', 'touchstart'].forEach(event => {
      document.addEventListener(event, handleInteraction);
    });

    return () => {
      ['click', 'mousedown', 'keydown', 'touchstart'].forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Router>
      <div className="page-container">
        {/* 背景音乐组件 */}
        <audio 
          ref={audioRef} 
          loop 
          src="/bgm.mp3" 
        />
        
        <div className="audio-ctrl" onClick={toggleAudio}>
          {isPlaying ? <SoundOutlined style={{fontSize:'20px'}}/> : <MutedOutlined style={{fontSize:'20px'}}/>}
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const getQuestions = () => JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions.json'), 'utf8'));
const getRappers = () => JSON.parse(fs.readFileSync(path.join(__dirname, '../data/rappers.json'), 'utf8'));

// GET 获取所有题目
router.get('/questions', (req, res) => {
    // 实际项目中可以随机打乱，这里直接返回
    res.json({ success: true, data: getQuestions() });
});

// POST 提交分数并匹配说唱歌手
router.get('/stats', (req, res) => {
    res.json({ success: true, msg: "Stats API dummy" });
});

router.post('/match', (req, res) => {
    const { scores } = req.body;
    
    if (!scores) {
        return res.status(400).json({ success: false, message: "Missing scores" });
    }

    // 各维度的理论最高分（根据 questions.json 更新后的真实分值）
    const MAX_SCORES = {
        career: 83,
        emotion: 91,
        authenticity: 110,
        greed: 106,
        brotherhood: 79
    };

    // 1. 将用户得分归一化到 1-100 的区间
    const normalize = (score, max) => {
        if (score <= 0) return 5; // 给一个基础分
        const baseline = max * 0.8; // 达到理论最大值的 80% 即视为 100 分水平
        const val = (score / baseline) * 100;
        return Math.max(1, Math.min(100, val));
    };

    const userProfile = {
        career: normalize(scores.career || 0, MAX_SCORES.career),
        emotion: normalize(scores.emotion || 0, MAX_SCORES.emotion),
        authenticity: normalize(scores.authenticity || 0, MAX_SCORES.authenticity),
        greed: normalize(scores.greed || 0, MAX_SCORES.greed),
        brotherhood: normalize(scores.brotherhood || 0, MAX_SCORES.brotherhood)
    };

    let bestMatch = null;
    let minDistance = Infinity;

    const rappers = getRappers();
    rappers.forEach(rapper => {
        let distance = 0;
        const eScores = rapper.expected_scores;
        const dimensions = ['career', 'emotion', 'authenticity', 'greed', 'brotherhood'];
        
        dimensions.forEach(dim => {
            const uVal = userProfile[dim];
            const rVal = eScores[dim] || 50; // 默认中性值
            distance += Math.pow(uVal - rVal, 2);
        });

        if (distance < minDistance) {
            minDistance = distance;
            bestMatch = rapper;
        }
    });

    // 理论最大距离 (5个维度都差 100) = 5 * 100^2 = 50000
    const maxPossibleDistance = 50000;
    
    // 计算百分比数字 (使用平方根让高匹配度更易达成)
    let matchPctNum = (1 - Math.sqrt(minDistance / maxPossibleDistance)) * 100;
    
    // 逻辑修复：数值判断保底逻辑
    if (matchPctNum > 99) matchPctNum = 99.2;
    if (matchPctNum < 85) {
        // 既然用户想要高分感，我们将保底分段设在 85-95%
        matchPctNum = 85 + Math.random() * 10;
    }

    const matchPercentage = matchPctNum.toFixed(1);

    res.json({
        success: true,
        data: {
            rapper: bestMatch,
            matchPercentage: matchPercentage
        }
    });
});

module.exports = router;

import React, { useState, useEffect } from 'react';
import { Card, InputNumber, Button, message, Typography, Space } from 'antd';

const { Title, Text } = Typography;

const Bai1: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [guess, setGuess] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const initGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setHistory([]);
    setGameOver(false);
    setGuess(null);
  };

  useEffect(() => { initGame(); }, []);

  const handleGuess = () => {
    if (guess === null) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guess === randomNumber) {
      message.success('Chúc mừng! Bạn đã đoán đúng!');
      setGameOver(true);
    } else if (newAttempts >= 10) {
      message.error(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
      setGameOver(true);
    } else {
      const msg = guess < randomNumber ? 'Bạn đoán quá thấp!' : 'Bạn đoán quá cao!';
      message.warning(msg);
      setHistory([...history, `Lần ${newAttempts}: ${guess} (${msg})`]);
    }
  };

  return (
    <Card title="Trò chơi đoán số (1-100)">
      <Space direction="vertical" style={{ width: '100%' }} align="center">
        <Title level={4}>Số lượt đã đoán: {attempts}/10</Title>
        <InputNumber
          min={1} max={100}
          value={guess}
          onChange={(val: number | null) => setGuess(val)}
          disabled={gameOver}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={handleGuess} disabled={gameOver || guess === null}>
          Đoán thử
        </Button>
        {gameOver && <Button onClick={initGame}>Chơi lại</Button>}
        <div style={{ marginTop: 20 }}>
          <Text strong>Lịch sử đoán:</Text>
          {history.map((item: string, index: number) => (
            <div key={index}><Text>{item}</Text></div>
          ))}
        </div>
      </Space>
    </Card>
  );
};

export default Bai1;
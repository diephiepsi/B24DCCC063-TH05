import React, { useState } from 'react';


type Move = 'kéo' | 'búa' | 'bao';
type Result = 'thắng' | 'thua' | 'hòa' | null;

interface HistoryItem {
	id: number;
	player: Move;
	computer: Move;
	result: Result;
}

const RockPaperScissors = () => {
	const [playerScore, setPlayerScore] = useState(0);
	const [computerScore, setComputerScore] = useState(0);
	const [result, setResult] = useState<Result>(null);
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [computerChoice, setComputerChoice] = useState<Move | null>(null);

	const moves: Move[] = ['kéo', 'búa', 'bao'];

	const moveEmojis = {
		kéo: '✌️',
		búa: '✊',
		bao: '✋',
	};

	const getRandomMove = (): Move => {
		const randomIndex = Math.floor(Math.random() * moves.length);
		return moves[randomIndex];3
	};

	const determineWinner = (player: Move, computer: Move): Result => {
		if (player === computer) return 'hòa';

		if (
			(player === 'kéo' && computer === 'bao') ||
			(player === 'búa' && computer === 'kéo') ||
			(player === 'bao' && computer === 'búa')
		) {
			return 'thắng';
		}
		return 'thua';
	};

	const handleMove = (playerMove: Move) => {
		const computerMove = getRandomMove();
		setComputerChoice(computerMove);

		const gameResult = determineWinner(playerMove, computerMove);
		setResult(gameResult);

		if (gameResult === 'thắng') {
			setPlayerScore((prev) => prev + 1);
		} else if (gameResult === 'thua') {
			setComputerScore((prev) => prev + 1);
		}

		const newHistoryItem: HistoryItem = {
			id: Date.now(),
			player: playerMove,
			computer: computerMove,
			result: gameResult,
		};

		setHistory((prev) => [newHistoryItem, ...prev].slice(0, 5));
	};

	const resetGame = () => {
		setPlayerScore(0);
		setComputerScore(0);
		setResult(null);
		setHistory([]);
		setComputerChoice(null);
	};

	const styles = {
		container: {
			fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			background: 'linear-gradient(145deg, #667eea 0%, #764ba2 100%)',
			minHeight: '100vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '20px',
			margin: '-8px',
		},
		gameCard: {
			background: 'rgba(255, 255, 255, 0.95)',
			backdropFilter: 'blur(10px)',
			borderRadius: '40px',
			padding: '30px',
			width: '100%',
			maxWidth: '500px',
			boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
			animation: 'slideUp 0.5s ease',
		},
		title: {
			textAlign: 'center' as const,
			fontSize: '2.2rem',
			fontWeight: 700,
			color: '#4a5568',
			marginBottom: '30px',
			textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
		},
		scoreBoard: {
			display: 'flex',
			justifyContent: 'space-around',
			marginBottom: '40px',
			gap: '20px',
		},
		scoreCard: {
			background: 'white',
			padding: '20px 40px',
			borderRadius: '30px',
			boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
			textAlign: 'center' as const,
			flex: 1,
			transition: 'transform 0.2s',
			cursor: 'pointer',
		},
scoreLabel: {
			display: 'block',
			fontSize: '1rem',
			color: '#718096',
			marginBottom: '8px',
			fontWeight: 500,
		},
		scoreValue: {
			display: 'block',
			fontSize: '2.5rem',
			fontWeight: 800,
			color: '#4a5568',
			lineHeight: 1,
		},
		choicesShowcase: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: '30px',
			padding: '20px',
			background: '#f7fafc',
			borderRadius: '30px',
		},
		choiceDisplay: {
			textAlign: 'center' as const,
			flex: 1,
		},
		choiceEmoji: {
			fontSize: '4rem',
			marginBottom: '8px',
			filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
		},
		choiceLabel: {
			fontSize: '0.9rem',
			color: '#718096',
			fontWeight: 500,
		},
		vs: {
			fontSize: '1.5rem',
			fontWeight: 800,
			color: '#a0aec0',
			padding: '0 15px',
		},
		currentResult: {
			textAlign: 'center' as const,
			fontSize: '1.5rem',
			fontWeight: 700,
			padding: '15px',
			borderRadius: '30px',
			marginBottom: '30px',
			animation: 'popIn 0.3s ease',
		},
		resultWin: {
			background: '#c6f6d5',
			color: '#22543d',
		},
		resultLose: {
			background: '#fed7d7',
			color: '#742a2a',
		},
		resultDraw: {
			background: '#e9d8fd',
			color: '#44337a',
		},
		movesGrid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: '15px',
			marginBottom: '25px',
		},
		moveBtn: {
			background: 'white',
			border: 'none',
			padding: '20px 10px',
			borderRadius: '30px',
			cursor: 'pointer',
			boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
			transition: 'all 0.2s',
			display: 'flex',
			flexDirection: 'column' as const,
			alignItems: 'center',
			gap: '8px',
		},
		moveKéo: { background: '#fef3c7' },
		moveBúa: { background: '#fee2e2' },
		moveBao: { background: '#c7e6fe' },
		moveEmoji: {
			fontSize: '2.5rem',
		},
		moveName: {
			fontSize: '1rem',
			fontWeight: 600,
			color: '#4a5568',
		},
		resetBtn: {
			width: '100%',
			background: '#4a5568',
			color: 'white',
			border: 'none',
			padding: '15px',
			borderRadius: '30px',
			fontSize: '1.1rem',
			fontWeight: 600,
			cursor: 'pointer',
			transition: 'background 0.2s',
			marginBottom: '30px',
		},
		historySection: {
			background: '#f7fafc',
			borderRadius: '30px',
			padding: '20px',
		},
		historyTitle: {
			color: '#4a5568',
			fontSize: '1.2rem',
			marginBottom: '15px',
			textAlign: 'center' as const,
		},
		historyList: {
			display: 'flex',
			flexDirection: 'column' as const,
			gap: '10px',
		},
		historyItem: {
			background: 'white',
			padding: '12px 15px',
			borderRadius: '20px',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			fontSize: '1rem',
			boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
			transition: 'transform 0.2s',
		},
		historyWin: { borderLeft: '5px solid #48bb78' },
		historyLose: { borderLeft: '5px solid #f56565' },
		historyDraw: { borderLeft: '5px solid #9f7aea' },
		historyResult: {
fontSize: '1.2rem',
		},
	};

	return (
		<div style={styles.container}>
			<style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .score-card-hover:hover {
          transform: translateY(-5px) !important;
        }
        .move-btn-hover:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2) !important;
        }
        .move-btn-hover:active {
          transform: translateY(0) !important;
        }
        .reset-btn-hover:hover {
          background: #2d3748 !important;
        }
        .history-item-hover:hover {
          transform: translateX(5px) !important;
        }
      `}</style>

			<div style={styles.gameCard}>
				<h1 style={styles.title}>✊ Oẳn Tù Tì ✋</h1>

				{/* Điểm số */}
				<div style={styles.scoreBoard}>
					<div style={styles.scoreCard} className='score-card-hover'>
						<span style={styles.scoreLabel}>Bạn</span>
						<span style={styles.scoreValue}>{playerScore}</span>
					</div>
					<div style={styles.scoreCard} className='score-card-hover'>
						<span style={styles.scoreLabel}>Máy</span>
						<span style={styles.scoreValue}>{computerScore}</span>
					</div>
				</div>

				{/* Hiển thị lựa chọn */}
				<div style={styles.choicesShowcase}>
					<div style={styles.choiceDisplay}>
						<div style={styles.choiceEmoji}>{history[0] ? moveEmojis[history[0].player] : '🤔'}</div>
						<div style={styles.choiceLabel}>Bạn</div>
					</div>

					<div style={styles.vs}>VS</div>

					<div style={styles.choiceDisplay}>
						<div style={styles.choiceEmoji}>{computerChoice ? moveEmojis[computerChoice] : '💻'}</div>
						<div style={styles.choiceLabel}>Máy</div>
					</div>
				</div>

				{/* Kết quả hiện tại */}
				{result && (
					<div
						style={{
							...styles.currentResult,
							...(result === 'thắng' ? styles.resultWin : result === 'thua' ? styles.resultLose : styles.resultDraw),
						}}
					>
						{result === 'thắng' && '🎉 Bạn thắng!'}
						{result === 'thua' && '😢 Bạn thua!'}
						{result === 'hòa' && '🤝 Hòa nhau!'}
					</div>
				)}

				{/* Nút chọn nước đi */}
				<div style={styles.movesGrid}>
					{moves.map((move) => (
						<button
							key={move}
							style={{
								...styles.moveBtn,
								...(move === 'kéo' ? styles.moveKéo : move === 'búa' ? styles.moveBúa : styles.moveBao),
							}}
							className='move-btn-hover'
							onClick={() => handleMove(move)}
						>
							<span style={styles.moveEmoji}>{moveEmojis[move]}</span>
							<span style={styles.moveName}>{move}</span>
						</button>
					))}
				</div>
{/* Nút reset */}
				<button style={styles.resetBtn} className='reset-btn-hover' onClick={resetGame}>
					🔄 Chơi lại
				</button>

				{/* Lịch sử */}
				{history.length > 0 && (
					<div style={styles.historySection}>
						<h3 style={styles.historyTitle}>Lịch sử</h3>
						<div style={styles.historyList}>
							{history.map((item) => (
								<div
									key={item.id}
									style={{
										...styles.historyItem,
										...(item.result === 'thắng'
											? styles.historyWin
											: item.result === 'thua'
											? styles.historyLose
											: styles.historyDraw),
									}}
									className='history-item-hover'
								>
									<span>Bạn: {moveEmojis[item.player]}</span>
									<span>Máy: {moveEmojis[item.computer]}</span>
									<span style={styles.historyResult}>
										{item.result === 'thắng' && '🏆'}
										{item.result === 'thua' && '💔'}
										{item.result === 'hòa' && '🤝'}
									</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default RockPaperScissors;
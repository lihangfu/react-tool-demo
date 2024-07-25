'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Plus, Minus } from 'lucide-react';

interface DiceIconProps {
  value: number;
  isRolling: boolean;
}

const DiceIcon: React.FC<DiceIconProps> = ({ value, isRolling }) => {
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const DiceComponent = icons[value - 1];
  return (
    <div className={`transition-transform duration-500 ${isRolling ? 'animate-spin' : ''}`}>
      <DiceComponent size={48} />
    </div>
  );
};

const DiceApp = () => {
  const [dice, setDice] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      setDice(dice.map(() => Math.floor(Math.random() * 6) + 1));
      setIsRolling(false);
    }, 1000);
  };

  const addDie = () => {
    setDice([...dice, 1]);
  };

  const removeDie = () => {
    if (dice.length > 1) {
      setDice(dice.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">小曹棋牌室</h1>
      <div className="flex space-x-4 mb-8">
        {dice.map((value, index) => (
          <DiceIcon key={index} value={value} isRolling={isRolling} />
        ))}
      </div>
      <div className="flex space-x-4 mb-8">
        <Button onClick={rollDice} className="bg-blue-500 hover:bg-blue-600 text-white" disabled={isRolling}>
          {isRolling ? '正在投掷...' : '投掷骰子'}
        </Button>
        <Button onClick={addDie} className="bg-green-500 hover:bg-green-600 text-white" disabled={isRolling}>
          <Plus size={24} />
        </Button>
        <Button onClick={removeDie} className="bg-red-500 hover:bg-red-600 text-white" disabled={isRolling || dice.length === 1}>
          <Minus size={24} />
        </Button>
      </div>
      <p className="text-lg">总点数: {dice.reduce((sum, value) => sum + value, 0)}</p>
    </div>
  );
};

export default DiceApp;
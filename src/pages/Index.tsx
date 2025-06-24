
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

const Index = () => {
  const [tournamentName, setTournamentName] = useState('BLAST.TV AUSTIN MAJOR 2025');
  const [playerName, setPlayerName] = useState('ZYWOO');
  const [rating, setRating] = useState('1.42');
  const [playerImageUrl, setPlayerImageUrl] = useState('/lovable-uploads/7f3d6639-a4d9-4f74-b6a1-7f595931e07e.png');
  
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        width: 1280,
        height: 720,
        scale: 1,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `mvp-${playerName.toLowerCase()}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success('MVP карточка скачана!');
    } catch (error) {
      toast.error('Ошибка при скачивании изображения');
      console.error('Download error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Генератор MVP Карточек
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings Panel */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Настройки</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tournament">Название турнира</Label>
                <Input
                  id="tournament"
                  value={tournamentName}
                  onChange={(e) => setTournamentName(e.target.value)}
                  placeholder="BLAST.TV AUSTIN MAJOR 2025"
                />
              </div>
              
              <div>
                <Label htmlFor="player">Никнейм игрока</Label>
                <Input
                  id="player"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="ZYWOO"
                />
              </div>
              
              <div>
                <Label htmlFor="rating">Рейтинг</Label>
                <Input
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="1.42"
                />
              </div>
              
              <div>
                <Label htmlFor="image">Ссылка на фото игрока</Label>
                <Input
                  id="image"
                  value={playerImageUrl}
                  onChange={(e) => setPlayerImageUrl(e.target.value)}
                  placeholder="Вставьте ссылку на фото с HLTV"
                />
              </div>
              
              <Button onClick={downloadImage} className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Скачать MVP карточку (1280x720)
              </Button>
            </div>
          </Card>

          {/* Preview */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Предварительный просмотр</h2>
            <div className="relative">
              <div 
                ref={cardRef}
                className="w-full aspect-video bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden"
                style={{ width: '640px', height: '360px' }}
              >
                {/* Background MVP Text */}
                <div className="absolute inset-0 flex items-center justify-end pr-8">
                  <div className="text-white/10 font-black text-[120px] leading-none tracking-wider select-none">
                    MVP<br/>MVP<br/>MVP
                  </div>
                </div>

                {/* HLTV Logo */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white px-3 py-1 rounded flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 rounded"></div>
                    <span className="font-bold text-gray-800 text-sm">HLTV</span>
                  </div>
                </div>

                {/* Close button */}
                <div className="absolute top-6 right-6">
                  <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                    <span className="text-white text-xs">×</span>
                  </div>
                </div>

                {/* Player Image - moved to left side */}
                <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
                  <img 
                    src={playerImageUrl} 
                    alt="Player"
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop';
                    }}
                  />
                </div>

                {/* Content - moved to left side */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-left">
                  <div className="text-white font-black text-4xl mb-2 tracking-wider">
                    MVP OF
                  </div>
                  <div className="text-white font-bold text-lg mb-1 opacity-90 tracking-wide">
                    {tournamentName}
                  </div>
                  <div className="text-white/60 font-bold text-sm mb-6 tracking-wide">
                    {tournamentName}
                  </div>
                  
                  <div className="text-white font-black text-6xl mb-2 tracking-wider">
                    {rating}
                  </div>
                  <div className="text-cyan-400 font-bold text-lg mb-6 tracking-wider">
                    RATING
                  </div>
                  
                  <div className="text-white font-black text-5xl tracking-wider">
                    {playerName}
                  </div>
                </div>

                {/* Gradient Overlay - reversed direction */}
                <div className="absolute inset-0 bg-gradient-to-l from-slate-900/80 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

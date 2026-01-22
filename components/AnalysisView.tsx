
import React, { useState, useRef } from 'react';
import { FoodAnalysis, FoodAnalysisEntry } from '../types';
import { Icons } from '../constants';
import { analyzeFood } from '../geminiService';

interface AnalysisViewProps {
  history: FoodAnalysisEntry[];
  onAnalysisResult: (result: FoodAnalysis) => void;
  onClearHistory: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ history, onAnalysisResult, onClearHistory }) => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText && !selectedImage) return;

    setIsAnalyzing(true);
    try {
      const base64Data = selectedImage?.split(',')[1];
      const result = await analyzeFood(inputText, base64Data);
      onAnalysisResult(result);
      setInputText('');
      setSelectedImage(null);
      setExpandedId(null);
    } catch (error) {
      console.error("Error analyzing food:", error);
      alert("Hubo un error analizando la comida. Por favor intenta de nuevo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  const AnalysisCard: React.FC<{ 
    analysis: FoodAnalysis, 
    timestamp?: number, 
    id?: string,
    isExpanded?: boolean,
    onToggle?: () => void
  }> = ({ analysis, timestamp, id, isExpanded, onToggle }) => (
    <div className={`bg-white border ${isExpanded ? 'border-orange-300 shadow-md' : 'border-slate-200'} rounded-2xl overflow-hidden transition-all duration-300`}>
      <div 
        className={`p-5 cursor-pointer hover:bg-orange-50/50 transition-colors ${isExpanded ? 'bg-orange-50/80' : ''}`}
        onClick={onToggle}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {timestamp && <span className="text-[10px] font-black text-orange-600 uppercase block mb-1">{formatDate(timestamp)}</span>}
            <span className="text-xs font-black text-green-700 uppercase tracking-wider block mb-0.5">Resumen del Plato</span>
            <h3 className={`font-black text-slate-900 leading-tight transition-all ${isExpanded ? 'text-lg' : 'text-base line-clamp-1'}`}>
              {analysis.summary}
            </h3>
          </div>
          <div className="text-right ml-4">
            <div className="text-xl font-black text-orange-700 leading-none">{analysis.calories}</div>
            <div className="text-[10px] font-black text-slate-500 uppercase">kcal</div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 pt-0 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-100 rounded-xl p-3 text-center border border-blue-200">
              <div className="text-lg font-black text-blue-900">{analysis.macros.protein}g</div>
              <div className="text-[10px] font-black text-blue-700 uppercase">Proteína</div>
            </div>
            <div className="bg-orange-100 rounded-xl p-3 text-center border border-orange-200">
              <div className="text-lg font-black text-orange-900">{analysis.macros.carbs}g</div>
              <div className="text-[10px] font-black text-orange-700 uppercase">Carbos</div>
            </div>
            <div className="bg-yellow-100 rounded-xl p-3 text-center border border-yellow-200">
              <div className="text-lg font-black text-yellow-900">{analysis.macros.fats}g</div>
              <div className="text-[10px] font-black text-yellow-700 uppercase">Grasas</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Feedback Nutricional
              </h4>
              <ul className="space-y-1.5 pl-1">
                {analysis.feedback.map((item, i) => (
                  <li key={i} className="text-xs text-slate-900 font-medium pl-3.5 relative">
                    <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Sugerencias de Mejora
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.suggestions.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white text-slate-900 text-xs rounded-full font-bold border border-orange-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-500 text-center font-bold italic">
            * Los valores son estimaciones aproximadas.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 pb-4">
      <div className="bg-orange-100 border border-orange-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-slate-900 mb-1">Analiza tu comida</h2>
          <p className="text-slate-800 text-sm font-medium">Sube una foto o describe tu plato para obtener un análisis nutricional.</p>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10 text-orange-600">
          <Icons.Camera />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {selectedImage && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            <img src={selectedImage} alt="Comida seleccionada" className="w-full h-full object-cover" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-1 bg-slate-900 text-white rounded-full hover:bg-black"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-4 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors flex flex-col items-center justify-center gap-1 min-w-[75px] border border-orange-200"
          >
            <Icons.Camera />
            <span className="text-[10px] font-black uppercase tracking-tighter">Foto</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe tu plato..."
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all h-full resize-none text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || (!inputText && !selectedImage)}
          className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
            isAnalyzing || (!inputText && !selectedImage) 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-orange-600 hover:bg-orange-700 shadow-orange-100 active:scale-[0.98]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analizando...</span>
            </>
          ) : (
            <span>Analizar Plato</span>
          )}
        </button>
      </div>

      {history.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Historial de Análisis
            </h3>
            <button 
              onClick={onClearHistory}
              className="text-[10px] font-black text-slate-500 hover:text-red-600 uppercase tracking-tighter transition-colors"
            >
              Borrar Todo
            </button>
          </div>
          
          <div className="space-y-3">
            {history.map((entry, idx) => (
              <AnalysisCard 
                key={entry.id}
                analysis={entry.data}
                timestamp={entry.timestamp}
                id={entry.id}
                isExpanded={expandedId === entry.id || (idx === 0 && !expandedId)}
                onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              />
            ))}
          </div>
        </div>
      )}

      {history.length === 0 && !isAnalyzing && (
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-4xl border border-orange-200">
            🍽️
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black text-slate-900">No hay análisis recientes</p>
            <p className="text-xs text-slate-600 font-medium max-w-[200px]">Tus platos aparecerán aquí.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisView;

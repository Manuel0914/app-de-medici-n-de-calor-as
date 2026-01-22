
import React, { useState } from 'react';
import { UserProfile, MealPlan, ShoppingList } from '../types';
import { Icons } from '../constants';
import { generateMealPlan, generateShoppingList } from '../geminiService';

interface MealPlanViewProps {
  profile: UserProfile;
  mealPlan: MealPlan | null;
  shoppingList: ShoppingList | null;
  onMealPlanGenerated: (plan: MealPlan) => void;
  onShoppingListGenerated: (list: ShoppingList) => void;
}

const MealPlanView: React.FC<MealPlanViewProps> = ({ 
  profile, 
  mealPlan, 
  shoppingList, 
  onMealPlanGenerated, 
  onShoppingListGenerated 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [view, setView] = useState<'plan' | 'shopping'>('plan');

  const handleGenerate = async (type: 'minimum_effort' | 'varied') => {
    setIsGenerating(true);
    try {
      const plan = await generateMealPlan(profile, type);
      onMealPlanGenerated(plan);
      const list = await generateShoppingList(plan);
      onShoppingListGenerated(list);
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("Error al generar el plan. Intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-100 border border-indigo-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 mb-1">Plan Semanal</h2>
        <p className="text-slate-800 text-sm font-medium">Menús optimizados para tus objetivos.</p>
      </div>

      {!mealPlan ? (
        <div className="space-y-4">
          <p className="text-slate-900 font-bold text-center px-4">
            Elige el tipo de planificación:
          </p>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => handleGenerate('minimum_effort')}
              disabled={isGenerating}
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-green-500 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">⚡</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-green-100 flex items-center justify-center transition-colors">
                  <Icons.ChevronRight />
                </div>
              </div>
              <h3 className="font-black text-slate-900">Mínimo Esfuerzo</h3>
              <p className="text-sm text-slate-700 font-medium">Recetas que se repiten para ahorrar tiempo. Ideal si cocinas poco.</p>
            </button>

            <button
              onClick={() => handleGenerate('varied')}
              disabled={isGenerating}
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🍱</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                  <Icons.ChevronRight />
                </div>
              </div>
              <h3 className="font-black text-slate-900">Variado & Saludable</h3>
              <p className="text-sm text-slate-700 font-medium">Platos distintos cada día para mayor riqueza nutricional.</p>
            </button>
          </div>
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-900 font-black">Diseñando tu menú personalizado...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
            <button 
              onClick={() => setView('plan')}
              className={`flex-1 py-2 rounded-lg text-sm font-black transition-all flex items-center justify-center gap-2 ${view === 'plan' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
            >
              <Icons.Utensils /> Menú
            </button>
            <button 
              onClick={() => setView('shopping')}
              className={`flex-1 py-2 rounded-lg text-sm font-black transition-all flex items-center justify-center gap-2 ${view === 'shopping' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
            >
              <Icons.ShoppingCart /> Compra
            </button>
          </div>

          {view === 'plan' ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
              {mealPlan.days.map((day, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <h3 className="font-black text-indigo-700 text-lg uppercase tracking-tight border-b border-indigo-100 pb-1">{day.day}</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Desayuno', meal: day.breakfast },
                      { label: 'Comida', meal: day.lunch },
                      { label: 'Cena', meal: day.dinner }
                    ].map((m, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-12 text-[10px] font-black text-slate-400 uppercase mt-1">{m.label}</div>
                        <div className="flex-1">
                          <div className="font-black text-slate-900 text-sm">{m.meal.name}</div>
                          <div className="text-xs text-slate-700 font-medium">{m.meal.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button 
                onClick={() => onMealPlanGenerated(null as any)}
                className="w-full py-4 text-slate-900 text-sm font-black hover:text-indigo-600 underline"
              >
                Generar un nuevo plan
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              {shoppingList?.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest pl-2 border-l-4 border-indigo-600">
                    {section.category}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {section.items.map((item, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-black text-slate-900 text-sm">{item.item}</span>
                          <span className="text-[10px] font-black bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700">{item.quantity}</span>
                        </div>
                        {item.healthyVersion && (
                          <div className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                            <Icons.Check /> <span>Mejor opción: {item.healthyVersion}</span>
                          </div>
                        )}
                        {item.alternative && (
                          <div className="text-[10px] text-indigo-700 font-bold flex items-center gap-1">
                            <Icons.Plus /> <span>Ahorro: {item.alternative}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MealPlanView;

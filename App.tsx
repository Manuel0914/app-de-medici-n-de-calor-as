
import React, { useState, useEffect } from 'react';
import { AppTab, UserProfile, FoodAnalysis, FoodAnalysisEntry, MealPlan, ShoppingList } from './types';
import { Icons } from './constants';
import ProfileView from './components/ProfileView';
import AnalysisView from './components/AnalysisView';
import MealPlanView from './components/MealPlanView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.PROFILE);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<FoodAnalysisEntry[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('nutri_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setActiveTab(AppTab.ANALYSIS);
    }
    
    const savedHistory = localStorage.getItem('nutri_history');
    if (savedHistory) {
      setAnalysisHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleProfileSave = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('nutri_profile', JSON.stringify(newProfile));
    setActiveTab(AppTab.ANALYSIS);
  };

  const handleAnalysisResult = (result: FoodAnalysis) => {
    const newEntry: FoodAnalysisEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      data: result
    };
    const updatedHistory = [newEntry, ...analysisHistory].slice(0, 20); // Keep last 20
    setAnalysisHistory(updatedHistory);
    localStorage.setItem('nutri_history', JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
      setAnalysisHistory([]);
      localStorage.removeItem('nutri_history');
    }
  };

  const NavItem = ({ tab, icon: Icon, label }: { tab: AppTab, icon: React.FC, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ${
        activeTab === tab ? 'text-orange-700 scale-110' : 'text-slate-500 hover:text-slate-800'
      }`}
    >
      <Icon />
      <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-transparent relative">
      <div className="flex flex-col flex-1 bg-[#fffaf0] shadow-2xl relative border-x border-slate-200">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-orange-200 p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-lg">🥗</span>
            <span className="tracking-tight">Nutri<span className="text-orange-600">AI</span></span>
          </h1>
          {profile && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-tighter">En Línea</span>
            </div>
          )}
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto pb-24 p-4">
          {!profile && activeTab !== AppTab.PROFILE ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 mt-10">
              <div className="w-24 h-24 bg-orange-100 border border-orange-200 rounded-full flex items-center justify-center text-5xl mb-6 animate-bounce">👋</div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">¡Bienvenido!</h2>
              <p className="text-slate-800 mb-8 text-sm font-semibold">Configura tu perfil para empezar a mejorar tu alimentación hoy mismo.</p>
              <button
                onClick={() => setActiveTab(AppTab.PROFILE)}
                className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-100 hover:bg-orange-700 active:scale-95 transition-all"
              >
                Completar Perfil
              </button>
            </div>
          ) : (
            <div className="max-w-full overflow-x-hidden">
              {activeTab === AppTab.PROFILE && (
                <ProfileView profile={profile} onSave={handleProfileSave} />
              )}
              {activeTab === AppTab.ANALYSIS && (
                <AnalysisView 
                  history={analysisHistory} 
                  onAnalysisResult={handleAnalysisResult}
                  onClearHistory={handleClearHistory}
                />
              )}
              {activeTab === AppTab.MEAL_PLAN && profile && (
                <MealPlanView 
                  profile={profile}
                  mealPlan={mealPlan}
                  shoppingList={shoppingList}
                  onMealPlanGenerated={(mp) => setMealPlan(mp)}
                  onShoppingListGenerated={(sl) => setShoppingList(sl)}
                />
              )}
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-orange-200 px-4 py-3 flex justify-around items-center z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] rounded-t-3xl">
          <NavItem tab={AppTab.PROFILE} icon={Icons.User} label="Perfil" />
          <NavItem tab={AppTab.ANALYSIS} icon={Icons.Camera} label="Analizar" />
          <NavItem tab={AppTab.MEAL_PLAN} icon={Icons.Calendar} label="Menú" />
        </nav>
      </div>
    </div>
  );
};

export default App;

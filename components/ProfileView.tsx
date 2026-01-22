
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Icons } from '../constants';

interface ProfileViewProps {
  profile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(profile || {
    age: '',
    weight: '',
    height: '',
    goal: 'maintain',
    activity: 'moderate',
    preferences: '',
    budget: 'medium',
    time: 'medium'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-100 border border-green-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 mb-1">Tu Perfil</h2>
        <p className="text-slate-700 text-sm font-medium">Personalizamos tu experiencia basándonos en tus datos.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-800">Edad</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Años"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-800">Peso (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Kg"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-800">Altura (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Cm"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-800">Objetivo</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          >
            <option value="lose_fat">Perder grasa</option>
            <option value="maintain">Mantener peso</option>
            <option value="gain_muscle">Ganar músculo</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-800">Nivel de Actividad</label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          >
            <option value="sedentary">Sedentario (Poco ejercicio)</option>
            <option value="moderate">Moderado (1-3 días/sem)</option>
            <option value="active">Activo (3-5 días/sem)</option>
            <option value="very_active">Muy activo (Deportista)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-800">Preferencias o Alergias</label>
          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Ej: Vegetariano, alérgico a las nueces..."
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-800">Presupuesto</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            >
              <option value="low">Económico</option>
              <option value="medium">Medio</option>
              <option value="high">Flexible</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-800">Tiempo Cocina</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            >
              <option value="low">Poco (Rápido)</option>
              <option value="medium">Medio</option>
              <option value="high">Mucho</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-green-600 text-white font-black rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Icons.Check />
          Guardar Perfil
        </button>
      </form>

      <div className="p-4 bg-amber-100 border border-amber-200 rounded-xl flex gap-3 shadow-sm">
        <span className="text-xl">⚠️</span>
        <p className="text-xs text-slate-900 font-semibold leading-relaxed">
          Esta aplicación utiliza Inteligencia Artificial para ofrecer recomendaciones orientativas. 
          No sustituye el consejo de un nutricionista titulado.
        </p>
      </div>
    </div>
  );
};

export default ProfileView;

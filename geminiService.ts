
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "./constants";
import { UserProfile } from "./types";

// Always initialize GoogleGenAI with named parameter apiKey from process.env.API_KEY
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const analyzeFood = async (input: string, imageBase64?: string) => {
  const ai = getAI();
  const contents = imageBase64 ? 
    { 
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
        { text: input || "Analiza esta comida" }
      ] 
    } : 
    { parts: [{ text: input }] };

  // Use gemini-3-pro-preview for complex reasoning task of nutritional analysis
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          macros: {
            type: Type.OBJECT,
            properties: {
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fats: { type: Type.NUMBER },
            },
            required: ["protein", "carbs", "fats"]
          },
          feedback: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["summary", "calories", "macros", "feedback", "suggestions"]
      }
    }
  });

  // Directly access the .text property of GenerateContentResponse
  return JSON.parse(response.text || '{}');
};

export const generateMealPlan = async (profile: UserProfile, type: 'minimum_effort' | 'varied') => {
  const ai = getAI();
  const prompt = `
    Genera un menú semanal de tipo "${type}" para un usuario con este perfil:
    - Edad: ${profile.age} años
    - Peso: ${profile.weight} kg, Altura: ${profile.height} cm
    - Objetivo: ${profile.goal}
    - Nivel actividad: ${profile.activity}
    - Preferencias/Restricciones: ${profile.preferences}
    - Presupuesto: ${profile.budget}, Tiempo disponible: ${profile.time}
  `;

  // Use gemini-3-pro-preview for complex reasoning task of designing a meal plan
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                breakfast: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }
                },
                lunch: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }
                },
                dinner: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }
                },
                snacks: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }
                },
              }
            }
          }
        },
        required: ["type", "days"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateShoppingList = async (mealPlan: any) => {
  const ai = getAI();
  const prompt = `Genera una lista de la compra optimizada basada en este plan de comidas: ${JSON.stringify(mealPlan)}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      item: { type: Type.STRING },
                      quantity: { type: Type.STRING },
                      category: { type: Type.STRING },
                      alternative: { type: Type.STRING },
                      healthyVersion: { type: Type.STRING },
                    }
                  }
                }
              }
            }
          }
        },
        required: ["sections"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

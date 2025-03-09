import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseMutateFunction } from "@tanstack/react-query";

interface RecipeFormElementProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, Recipe, unknown>;
  defaultInputData?: Recipe;
}

export type RecipeFormFields = {
  name: string;
  ingredients: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  instructions: string[];
};

export type Recipe = {
  name: string;
  ingredients: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  instructions: string[];
};

const ingredientOptions = ["Salt", "Sugar", "Flour", "Eggs", "Milk", "Butter", "Cheese", "Chicken", "Beef", "Fish", "Garlic", "Onion", "Pepper", "Olive Oil"];

const RecipeForm: React.FC<RecipeFormElementProps> = (props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RecipeFormFields>();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(props.defaultInputData?.ingredients || []);
  const [instructions, setInstructions] = useState<string[]>(props.defaultInputData?.instructions || []);

  useEffect(() => {
    if (props.defaultInputData) {
      setValue("name", props.defaultInputData.name);
      setValue("prepTimeMinutes", props.defaultInputData.prepTimeMinutes);
      setValue("cookTimeMinutes", props.defaultInputData.cookTimeMinutes);
      setValue("servings", props.defaultInputData.servings);
      setValue("difficulty", props.defaultInputData.difficulty);
      setValue("cuisine", props.defaultInputData.cuisine);
    }
  }, [props.defaultInputData, setValue]);

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<RecipeFormFields> = (data) => {
    if (props.isEdit && !confirm("Are you sure you want to update the recipe?")) {
      return;
    }
    props.mutateFn({ ...data, ingredients: selectedIngredients, instructions });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 flex items-center justify-center p-6">
      <form 
        className="w-full max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 backdrop-blur-sm bg-opacity-90 transform transition-all hover:shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
          {props.isEdit ? "Edit Your Recipe" : "Create a New Recipe"}
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium mb-2" htmlFor="name">
              Recipe Name
            </label>
            <input 
              className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-gray-50 text-gray-700 transition-all duration-300" 
              type="text" 
              id="name" 
              {...register('name', { required: "Name is required." })} 
            />
            {errors.name && <p className="text-rose-500 text-sm mt-1 italic">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-gray-600 font-medium mb-2">Ingredients</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-52 overflow-y-auto p-3 bg-gradient-to-br from-gray-50 to-amber-50 rounded-xl border border-gray-200">
              {ingredientOptions.map((ingredient) => (
                <label key={ingredient} className="flex items-center space-x-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedIngredients.includes(ingredient)} 
                    onChange={() => handleIngredientChange(ingredient)} 
                    className="w-5 h-5 text-amber-500 border-gray-300 rounded focus:ring-amber-400 transition-all group-hover:scale-110" 
                  />
                  <span className="text-gray-700 text-sm group-hover:text-amber-600 transition-colors">{ingredient}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-600 font-medium mb-2">Instructions</label>
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-center space-x-3 mt-3">
                <input 
                  className="flex-1 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-gray-50 text-gray-700 transition-all duration-300" 
                  type="text" 
                  value={instruction} 
                  onChange={(e) => handleInstructionChange(index, e.target.value)} 
                  placeholder={`Step ${index + 1}`} 
                />
                <button 
                  type="button" 
                  className="bg-rose-500 hover:bg-rose-600 text-white p-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-110" 
                  onClick={() => removeInstruction(index)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button 
              type="button" 
              className="mt-4 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105" 
              onClick={addInstruction}
            >
              + Add Step
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-600 font-medium mb-2" htmlFor="prepTimeMinutes">
                Prep Time (mins)
              </label>
              <input 
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-gray-50 text-gray-700 transition-all duration-300" 
                type="number" 
                id="prepTimeMinutes" 
                {...register('prepTimeMinutes', { required: "Required." })} 
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2" htmlFor="cookTimeMinutes">
                Cook Time (mins)
              </label>
              <input 
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-gray-50 text-gray-700 transition-all duration-300" 
                type="number" 
                id="cookTimeMinutes" 
                {...register('cookTimeMinutes', { required: "Required." })} 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-600 font-medium mb-2" htmlFor="difficulty">
              Difficulty
            </label>
            <select 
              className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-gray-50 text-gray-700 transition-all duration-300" 
              id="difficulty" 
              {...register('difficulty', { required: "Required." })}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="w-full mt-8 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {props.isEdit ? "Save Changes" : "Add Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
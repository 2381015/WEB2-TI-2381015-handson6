import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ProductFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, ProductFormInput, unknown>;
  defaultInputData?: ProductFormInput;
}

export type ProductFormInput = {
  title: string;
  description: string;
  price: number;
  category: string;
  discountPercentage: number;
};

const ProductForm: React.FC<ProductFormProps> = ({ isEdit, mutateFn, defaultInputData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProductFormInput>();

  useEffect(() => {
    if (defaultInputData) {
      setValue("title", defaultInputData.title);
      setValue("description", defaultInputData.description);
      setValue("discountPercentage", defaultInputData.discountPercentage);
      setValue("category", defaultInputData.category);
      setValue("price", defaultInputData.price);
    }
  }, [defaultInputData]);

  const onSubmit: SubmitHandler<ProductFormInput> = (data) => {
    if (isEdit && !confirm("Are you sure you want to update the product data?")) {
      return;
    }
    mutateFn(data);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product title"
            {...register("title", { required: true })}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Title is required.</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            rows={4}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product description"
            {...register("description", { required: true })}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">Description is required.</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter price"
            {...register("price", { required: true })}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">Price is required.</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
            {...register("category", { required: true })}
          >
            <option value="beauty">Beauty</option>
            <option value="fragrance">Fragrance</option>
            <option value="furniture">Furniture</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">Category is required.</p>}
        </div>

        {/* Discount Percentage */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Discount (%)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition ${
              errors.discountPercentage ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter discount percentage"
            {...register("discountPercentage", { required: true })}
          />
          {errors.discountPercentage && (
            <p className="text-red-500 text-sm mt-1">Discount is required.</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              isEdit
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isEdit ? "Save Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

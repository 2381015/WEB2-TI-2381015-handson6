import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseMutateFunction } from "@tanstack/react-query";

interface CommentFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, CommentInput, unknown>;
  defaultInputData?: CommentInput;
}

export type CommentInput = {
  body: string;
  userId: number;
};

const CommentForm: React.FC<CommentFormProps> = ({ isEdit, mutateFn, defaultInputData }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CommentInput>();

  useEffect(() => {
    if (defaultInputData) {
      setValue("body", defaultInputData.body);
      setValue("userId", defaultInputData.userId);
    }
  }, [defaultInputData, setValue]);

  const onSubmit: SubmitHandler<CommentInput> = (data) => {
    if (isEdit && !confirm("Are you sure you want to update the comment?")) {
      return;
    }
    mutateFn(data);
  };

  return (
    <form
      className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-gradient-to-br from-purple-400 to-pink-500 py-6 px-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-4 animate-pulse">
          {isEdit ? "Edit Comment" : "Add New Comment"}
        </h2>
        <p className="text-white text-opacity-80 text-center">
          Share your thoughts and ideas!
        </p>
      </div>

      <div className="p-8 space-y-6">
        {/* User ID Input */}
        <div>
          <label className="block text-gray-700 font-semibold text-lg mb-2" htmlFor="userId">
            User ID
          </label>
          <input
            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
            type="number"
            id="userId"
            {...register("userId", { required: "User ID is required." })}
          />
          {errors.userId && (
            <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>
          )}
        </div>

        {/* Comment Body Input */}
        <div>
          <label className="block text-gray-700 font-semibold text-lg mb-2" htmlFor="body">
            Comment
          </label>
          <textarea
            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
            id="body"
            rows={5}
            {...register("body", { required: "Comment cannot be empty." })}
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          {isEdit ? "Save Changes" : "Add Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQueryClient } from "@tanstack/react-query";

type FormData = {
  name: string;
  description: string;
  price: string;
  userId: string;
  image: string;
};

interface UnsplashResponse {
  results: {
    urls: {
      full: string;
    };
  }[];
}

const ProductForm: React.FC = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = api.products.create.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries(["products"]);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { user } = useUser();

  const onSubmit = async (data: FormData) => {
    let image = "";
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=1&per_page=1&client_id=KJlz_5jJSMvujdF8M6dRPQRgDjj1mzfpK5hNCHlAGo8&query=${data.name}`
    );
    if (res.ok) {
      const responseData: UnsplashResponse = await res.json();
      image = responseData.results[0]?.urls.full || "";
    }
    const updatedData: FormData = {
      ...data,
      image: image,
      userId: user?.sub || "",
    };

    mutate(updatedData);
  };
  if (isLoading) return <div>loading...</div>;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md text-black"
    >
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="mb-2 block">
          Price
        </label>
        <input
          type="number"
          id="price"
          {...register("price", { required: "Price is required" })}
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;

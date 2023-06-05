import { api } from "@/utils/api";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type ProductCardProps = {
  id: string;
  name: string;
  price: string;
  image: string;
  seller: string;
  description?: string | null;
};

const ProductCard = ({
  id,
  name,
  price,
  image,
  seller,
  description,
}: ProductCardProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = api.products.deleteProduct.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries(["products"]);
    },
  });
  const { user } = useUser();
  const router = useRouter();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4">
        <img
          src={image}
          alt={name}
          className=" h-80 w-full rounded-md object-cover"
        />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{name}</h3>
      <p className="mb-2 text-gray-600">{description}</p>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-gray-700">{seller}</span>
        <span className="font-semibold text-green-600">{price}</span>
      </div>
      <div className="flex justify-between">
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Add to Cart
        </button>
        {router.query.profile === user?.sub && (
          <button
            onClick={() => mutate({ id })}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

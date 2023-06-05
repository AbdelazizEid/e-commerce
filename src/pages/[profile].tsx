import { CreateProductModal } from "@/components/create-product-modal";
import ProductCard from "@/components/product-card";
import { api } from "@/utils/api";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const { profile } = router.query;
  const { user } = useUser();

  const { data } = api.products.getProductsByUserId.useQuery(
    {
      userId: user?.sub ?? " ",
    },
    {
      enabled: !!user?.sub,
    }
  );

  return (
    <div>
      <main className=" bg-white p-4 text-black">
        <div className="flex justify-between">
          <h1>Browse {profile} Products</h1>

          {router.query.profile === user?.sub && <CreateProductModal />}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {data?.map((product) => (
            <ProductCard
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              seller={product.userId}
              key={product.id}
              description={product.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Profile;

// Component Each Product Details

import ProductDetail from "../../../../components/products/ProductDetail";
export default async function page({ params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!data) {
    throw new Error("Data Fetch Failed");
  }

  return (
    <div className=" mt-32 sm:mt-32">
      <Header />
      <ProductDetail data={data} />
    </div>
  );
}

// Import Files
import ProductDetail from "../../../../components/products/ProductDetail";

// Kids Component Each Product Details
export default async function page({ params }) {
  const { id } = await params; // to get Id

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!data) {
    throw new Error("Data Fetch Failed");
  }

  return (
    <div className="mt-32">
      <ProductDetail data={data} />
    </div>
  );
}

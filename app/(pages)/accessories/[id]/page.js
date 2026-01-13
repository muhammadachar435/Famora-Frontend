// Component Each Product Details
import ProductDetail from "../../../../components/products/ProductDetail";

// Component Detail Asseccories
export default async function page({ params }) {
  const { id } = await params; // to Get ID
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!data) {
    throw new Error("Data Fetch Failed");
  }

  // UI/UX Design
  return (
    <div className=" mt-32 ">
      <ProductDetail data={data} />
    </div>
  );
}

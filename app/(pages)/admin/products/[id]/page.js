// // Component: Each Product Details
// export default async function page({ params }) {
//   const { id } = params;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/${id}`, {
//     cache: "no-store",
//   });

//   const data = await res.json();
//   if (!data) throw new Error("Data Fetch Failed");

//   // Use first image for displayName
//   const displayName =
//     data.images && data.images.length > 0 ? data.images[0].split("-").slice(1).join("-") : "No Image";

//   return (
//     <div className="p-4 space-y-2">
//       {/* Display all images */}
//       {data.images && data.images.length > 0 ? (
//         <div className="flex gap-2">
//           {data.images.map((img, index) => (
//             <img
//               key={index}
//               src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${img}`}
//               alt={`Product Image ${index + 1}`}
//               className="w-24 h-24 object-cover rounded"
//             />
//           ))}
//         </div>
//       ) : (
//         <p>No Images Available</p>
//       )}

//       <p>Display Name: {displayName}</p>
//       <p>ID: {data._id}</p>
//       <p>Price: Rs. {data.price}</p>
//       <p>Description: {data.description}</p>

//       {data.specifications && (
//         <>
//           <p>Material: {data.specifications.material}</p>
//           <p>Fit: {data.specifications.fit}</p>
//           <p>Care: {data.specifications.care}</p>
//         </>
//       )}

//       <p>Colors: {data.colors ? data.colors.join(", ") : "N/A"}</p>
//       <p>Sizes: {data.sizes ? data.sizes.join(", ") : "N/A"}</p>
//     </div>
//   );
// }

// export default async function page({ params }) {
//   const { id } = params;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("Fetch error:", text);
//     throw new Error(`Failed to fetch product: ${res.status}`);
//   }

//   const data = await res.json();

//   const displayName =
//     data.images && data.images.length > 0 ? data.images[0].split("-").slice(1).join("-") : "No Image";

//   return (
//     <div className="p-4 space-y-2">
//       {data.images && data.images.length > 0 ? (
//         <div className="flex gap-2">
//           {data.images.map((img, index) => (
//             <img
//               key={index}
//               src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${img}`}
//               alt={`Product Image ${index + 1}`}
//               className="w-24 h-24 object-cover rounded"
//             />
//           ))}
//         </div>
//       ) : (
//         <p>No Images Available</p>
//       )}

//       <p>Display Name: {displayName}</p>
//       <p>ID: {data._id}</p>
//       <p>Price: Rs. {data.price}</p>
//       <p>Description: {data.description}</p>

//       {data.specifications && (
//         <>
//           <p>Material: {data.specifications.material}</p>
//           <p>Fit: {data.specifications.fit}</p>
//           <p>Care: {data.specifications.care}</p>
//         </>
//       )}

//       <p>Colors: {data.colors ? data.colors.join(", ") : "N/A"}</p>
//       <p>Sizes: {data.sizes ? data.sizes.join(", ") : "N/A"}</p>
//     </div>
//   );
// }

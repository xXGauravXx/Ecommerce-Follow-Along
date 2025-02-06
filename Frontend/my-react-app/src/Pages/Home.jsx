import { useEffect, useState } from "react";
import Product from "../Components/products.jsx";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/v2/product/get-products') // Fix URL
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error fetching products: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data.product || []); // Ensure we access `product` correctly
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center pt-6 pb-5 text-white mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center pt-6 pb-5 text-red-500 mt-10">Error: {error}</div>;
    }

    return (
        <div className="w-full min-h-screen bg-neutral-700">
            <h1 className="text-3xl font-bold text-gray-800">Product Gallery</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                {products.map(product => (
                    <Product key={product._id} {...product} />
                ))}
            </div>
        </div>
    );
}

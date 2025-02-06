import  {useEffect, useState} from "react";
import Product from "../Components/products";
export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); //for loading state
    const [error, setError] = useState(null); // for error handling
    const email = "abcd@gmail.com";
    useEffect(() => {
        fetch(`http://localhost:8000/api/v2/product/my-products?email=${email}`).then((res) => {
            if(!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
            .then((data) => {
                console.log("Api response", data);
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:",err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if(loading) {
        return <div className="text-center text-white mt-10">Loading products...</div>
    }

    if(error) {
        return <div className="text-center text-red-500 mt-10">Error:
            {error}</div>
    }

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-12">
            <h1 className="text-3xl text-center text-white py-6"><strong>Product Gallery</strong></h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                {products.map((product) => (
                    <Product key={product._id} {...product}/>
                ))}
            </div>
        </div>
    );

}
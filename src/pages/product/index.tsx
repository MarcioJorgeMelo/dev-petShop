import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductProps } from "../home";

import { api } from "../../services/api";
import { CartContext } from "../../contexts/CartContext";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";

export function Product() {
    const { addItemCart } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState<ProductProps>();

    const navigate = useNavigate();

    useEffect(() => {
        async function getProduto() {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        }

        getProduto();
    }, [])

    function handleAddCartItem(item: ProductProps) {
        addItemCart(item);
        toast.success("Novo item no seu carrinho!");
        navigate("/cart");
    }

    return (
        <div>
        <main className="w-full max-w-7xl mx-auto px-4 my-6">
            {product && (
                <section className="w-full">
                    <div className="flex flex-col lg:flex-row">
                        <img
                            src={product?.cover}
                            alt={product?.description}
                            className='flex-1 w-full max-h-72 object-contain'
                        />
                        <div className='flex-1'>
                            <p className='font-bold text-2xl mt-4 mb-2'>{product?.title}</p>
                            <p className='my-4'>{product?.description}</p>
                            <strong className='text-zinc-700/90 text-xl'>
                                {product?.price.toLocaleString("pt-BR", {
                                    style:"currency",
                                    currency: "BRL"
                                })}
                            </strong>
                            <button onClick={() => product && handleAddCartItem(product)} className='bg-orange-main rounded p-1 ml-2'>
                                <BsCartPlus size={24} color='#121212' />
                            </button>
                        </div>
                    </div>

            </section>
            )}
      </main>
        </div>
    )
}
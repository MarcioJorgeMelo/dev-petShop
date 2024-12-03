import { BsCartPlus } from 'react-icons/bs'
import { useState, useEffect, useContext } from 'react'

import { api } from '../../services/api'
import { CartContext } from '../../contexts/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export interface ProductProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}

export function Home() {
    const { addItemCart } = useContext(CartContext)
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        async function getProducts() {
            const response = await api.get("/products");
            setProducts(response.data);
        }

        getProducts();
    }, [])

    function handleAddCartItem(item: ProductProps) {
        addItemCart(item);
        toast.success("Novo item em seu carrinho!");
    }

    return (
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto">
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
                    {products.map((item, index) => (
                        <section className="w-full" key={index}>
                        <Link to={`product/${item.id}`}>
                            <img
                            src={item.cover}
                            alt={item.description}
                            className='w-full rounded-lg max-h-70 mb-2'
                            />
                        </Link>
                        <p className='font-medium mt-1 mb-2'>{item.title} </p>

                        <div className='flex gap-3 items-center'>
                            <strong className='text-zinc-700/90'>
                            {item.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })} 
                            </strong>
                            <button className='bg-yellow-300 p-1 rounded' onClick={() => handleAddCartItem(item)}>
                                <BsCartPlus size={20} color='#000'/>
                            </button>
                        </div>
                    </section>
                    ))}
                </div>
            </main>
        </div>
    )
}
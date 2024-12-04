import { AiOutlineDown } from 'react-icons/ai'
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
            <header className='w-full bg-white'>
                <nav className='w-full max-w-6xl p-4 mx-auto flex items-center justify-start gap-4'>
                    <div className='flex items-center justify-center gap-2 text-lg cursor-pointer hover:border-b-2 border-purple-800'>
                        Em promoção
                    </div>

                    <div className='flex items-center justify-center gap-2 text-lg cursor-pointer hover:border-b-2 border-purple-800'>
                        Cachorro
                        <AiOutlineDown size={16} color='#000' />
                    </div>
                </nav>
            </header>

            <main className="w-full max-w-7xl px-4 mx-auto flex flex-col justify-start items-center gap-10 mt-10">
                <h1 className="font-bold text-4xl text-purple-main">Produtos que seu pet vai amar!</h1>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
                    {products.map((item, index) => (
                        <section className="w-full bg-white p-4 flex flex-col justify-center gap-2 rounded-3xl" key={index}>
                            <Link to={`product/${item.id}`}>
                                <img
                                src={item.cover}
                                alt={item.description}
                                className='w-full rounded-lg max-h-70'
                                />
                            </Link>
                            <p className='font-medium mt-1 mb-2'>{item.title}</p>

                            <strong className='text-purple-main'>
                                {item.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })} 
                            </strong>
                            <button className='bg-orange-100 p-1 flex items-center justify-center h-12 text-orange-main font-bold rounded-xl' onClick={() => handleAddCartItem(item)}>
                                Adicionar
                            </button>
                    </section>
                    ))}
                </div>
            </main>
        </div>
    )
}
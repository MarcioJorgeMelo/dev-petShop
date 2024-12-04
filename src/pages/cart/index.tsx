import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from '../../contexts/CartContext'

export function Cart() {
    const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-4xl text-center my-8 text-purple-main">Meu carrinho de compras</h1>

            {cart.length === 0 && (
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-medium'>Ops, seu carrinho está vazio...</p>
                    <Link to={"/"} className='bg-yellow-300 my-3 p-1 px-3 text-black font-medium rounded'>
                        Acessar os produtos
                    </Link>
                </div>
            )}

            {cart.map((item, index) => (
                <section key={index} className="flex items-center justify-between border-b-2 border-gray-300 bg-white rounded-2xl p-2 mb-2">
                <Link to={`/product/${item.id}`}>
                    <img
                    src={item.cover}
                    alt={item.description}
                    className='w-28'
                    />
                </Link>

                <strong>Preço: {item.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}</strong>

                <div className="flex items-center justify-center gap-3">
                    <button className="bg-orange-main px-2 rounded text-white font-medium flex items-center justify-center" onClick={() => removeItemCart(item)}>
                        -
                    </button>
                    {item.amount}
                    <button className="bg-orange-main px-2 rounded text-white font-medium flex items-center justify-center" onClick={() => addItemCart(item)}>
                        +
                    </button>
                </div>

                <strong className="float-right">
                    SubTotal: {item.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </strong>
            </section>
            ))}

            {cart.length !== 0 && <p className="font-bold mt-4">Total: {total}</p>}
        </div>
    )
}
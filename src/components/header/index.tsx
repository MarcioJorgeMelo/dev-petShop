import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

export function Header() {
    const { cartAmount } = useContext(CartContext);

    return (
        <header className='w-full px-1 bg-yellow-400'>
            <nav className='flex items-center justify-between h-14 w-full max-w-7xl px-5 mx-auto'>
                <Link to={"/"} className='font-bold text-2xl'>
                    Pet´s Dev
                </Link>

                <Link to={"/cart"} className='relative'>
                    <FiShoppingCart size={24} color='#121212'/>
                    {cartAmount > 0 && (
                        <span className='absolute -right-3 -top-3 px-2.5 bg-black rounded-full w-6 h-6 flex items-center justify-center text-white text-xs'>
                            {cartAmount}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    )
}
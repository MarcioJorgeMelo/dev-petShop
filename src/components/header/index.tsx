import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdPets } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

export function Header() {
    const { cartAmount } = useContext(CartContext);

    return (
        <header className='w-full bg-white border-b-2 border-slate-200'>
            <nav className='flex items-center justify-between h-20 w-full max-w-7xl px-5 mx-auto'>
                <Link to={"/"} className='bg-orange-main p-2 rounded-2xl font-bold text-3xl text-white flex items-center justify-center gap-3'>
                    Pet´s Dev
                    <MdPets size={36} color='#FFF' />
                </Link>

                <Link to={"/cart"} className='relative'>
                    <AiOutlineShoppingCart size={32} color='#121212'/>
                    {cartAmount > 0 && (
                        <span className='absolute -right-3 -top-3 px-2.5 bg-orange-main rounded-full w-6 h-6 flex items-center justify-center text-black text-xs'>
                            {cartAmount}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    )
}
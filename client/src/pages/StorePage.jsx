import { Link } from 'react-router-dom'
import spotify from '../images/spotify-premium-Account.png'
import steam from '../images/steam-USD.png'
import youtube from '../images/youtube-premium.jpg'
function StorePage() {
  const products = [
    {
      name: 'Spotify Premium',
      description:
        'Enjoy ad-free music streaming with Spotify Premium. Available for 1 year.',
      price: 20,
      image: spotify, // Replace with the actual image path
    },
    {
      name: 'Steam Gift Code',
      description: 'Purchase games and software on Steam with a gift code.',
      price: 600,
      image: steam, // Replace with the actual image path
    },
    {
      name: 'YouTube Premium',
      description: 'Watch YouTube videos without ads and enjoy other benefits.',
      price: 60,
      image: youtube, // Replace with the actual image path
    },

    // Add more products as needed
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-blue-500 to-purple-600 p-4">
      <div className="max-w-screen-xl p-4 ">
        <h1 className="text-4x l font-bold text-white mb-8 text-center">
          Virtual Shop - Store
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-green-600 text-lg font-bold">
                  Price: {product.price} ৳
                </p>
                <Link
                  to={'/order'}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full  transition duration-150 ease-in-out"
                >
                  Order Now !
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StorePage

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProductStart, fetchProductSuccess, fetchProductFailure } from '../features/productSlice';
import { addItemToCart } from '../features/cartSlice';
import { toast } from 'react-toastify';

interface Tag {
  id: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

interface ProductVariant {
  id: string;
  price: number;
  size: string;
  sku: string;
  color: string;
  quantity: number;
  category: string;
  discount: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

interface ProductImage {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  productVariants: ProductVariant[];
  productImages: ProductImage[];
}

const ProductImages = ({ productId }: { productId: string }) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadImages = () => {
      const imagePaths = [];
      const totalImages = 4; 

      for (let i = 1; i <= totalImages; i++) {
        imagePaths.push(`/productImages/${productId}/image${i}.png`);
      }

      console.log('Images loaded:', imagePaths);
      setImages(imagePaths);
    };

    try {
      loadImages();
    } catch (error) {
      console.error('Error loading images:', error);
      setError(true);
    }
  }, [productId]);

  return (
    <>
      {error ? (
        <p>Error loading images. Please try again later.</p>
      ) : images.length > 0 ? (
        <div className="product-images-container">
          <div className="thumbnail-images">
            {images.slice(1).map((image, index) => (
              <img key={index} className='thumbnail-image' src={image} alt={`Thumbnail ${index + 1}`} />
            ))}
          </div>
          <div className="main-image">
            <img className='product-image' src={images[0]} alt={`Main product image`} />
          </div>
        </div>
      ) : (
        <p>No images found!</p>
      )}
    </>
  );
};

const ProductVariantsPrice = ({ variants }: { variants: Product['productVariants'] }) => {
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      {variants.map(variant => (
        <p key={variant.id} className='price'>Rp {formatPrice(variant.price)}</p>
      ))}
    </>
  );
};

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state: RootState) => state.product);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(fetchProductStart());
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data: Product = await response.json();
        dispatch(fetchProductSuccess(data));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(fetchProductFailure('Failed to fetch product'));
      }
    };

    fetchProduct();
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      const selectedVariant = product.productVariants[0]; 
      const item = {
        id: product.id, 
        name: product.name,
        price: selectedVariant.price, 
        quantity: quantity,
      };
      console.log('Adding item to cart:', item);
      dispatch(addItemToCart(item));
      toast.success(`${product.name} added with success!`);
    }
  };

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found!</div>;

  return (
    <>
      <div className='main-product'>
        <div className="product-details">
          <div className="product-images">
            {product.productImages.length > 0 && (
              <div className="thumbnail-image">
                <ProductImages productId={product.id} />
              </div>
            )}
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <ProductVariantsPrice variants={product.productVariants} />
            <p className='review'><img src="../src/assets/star-icon.png" alt="Reviews" /> | 10 Customers Review</p>
            <p>{product.description}</p>
            <div className="product-options">
              <label>Size:</label>
              <select>
                {product.productVariants.map((variant) => (
                  <option key={variant.id} value={variant.size}>{variant.size}</option>
                ))}
              </select>
              <label>Color:</label>
              <select>
                {product.productVariants.map((variant) => (
                  <option key={variant.id} value={variant.color}>{variant.color}</option>
                ))}
              </select>
              <label>Quantity:</label>
              <input 
                type="number" 
                min="1" 
                max={product.productVariants[0].quantity} 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
              />
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <div className="product-meta">
              <p><span>SKU:</span> {product.productVariants[0].sku}</p>
              <p><span>Category:</span> {product.productVariants[0].category}</p>
              <p><span>Tags:</span> {product.tags.map(tag => tag.tags).join(', ')}</p>
              <p>Share: 
                <a href="#"><img src="../src/assets/facebook-icon.png" alt="Facebook" /></a>
                <a href="#"><img src="../src/assets/linkedin-icon.png" alt="Linkedin" /></a>
                <a href="#"><img src="../src/assets/twitter-icon.png" alt="Twitter" /></a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='related-products'>
        <h1>Related Products</h1>
      </div>
    </>
  );
};

export default Product;

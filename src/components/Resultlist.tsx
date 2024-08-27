import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


interface Product {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: {
    id: string;
    tags: string;
    createdAt: string;
    updatedAt: string;
    productId: string;
  }[];
  productVariants: {
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
  }[];
  productImages: {
    id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    productId: string;
  }[];
}

const ProductImages = ({ productId }: { productId: string }) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadImages = () => {
      const imagePaths = [];
      const totalImages = 1; 

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
        images.map((image) => (
            <img className='product-image' src={image} alt={``} />
        ))
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
        <p key={variant.id} className='product-price'>Rp {formatPrice(variant.price)}</p>
      ))}
    </>
  );
};

const ProductVariantsDiscount = ({ variants }: { variants: Product['productVariants'] }) => (
  <>
    {variants.map(variant => (
      variant.discount !== 0 && (
      <div className='condition' key={variant.id}>
        <p className='product-condition'>{variant.discount}</p>
      </div>
      )
    ))}
  </>
);

const ResultList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 8;

  useEffect(() => {
    fetch(`http://localhost:3000/products?page=${currentPage}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(true);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
    
    <section className="image-content-section">
        <div className="image">
          <img src="../src/assets/Rectangle_1.png" alt="" />
          <div className="shop-navigation">
            <h3>Shop</h3>
            <p><span>Home {'>'} </span> Shop</p>
          </div>
        </div>
      </section>
      
      <section className="filter-content-section">
        <div className="left">
          <div className="filter-bar">
            <button id="filter-button" className="filter-icon">
              <img src="../src/assets/system-uicons_filtering.png" alt="Filter Button" />
            </button>
            <div className="filter-menu">
              <button>Default</button>
              <button>A-Z</button>
              <button>Z-A</button>
              <button>Higher to Lower</button>
              <button>Lower to Higher</button>
            </div>
          </div>
          <div className="results-info">Showing 1 - 8 of 20 results</div>
        </div>
        <div className="right">
          <p>Show <input id="items-per-page-input" type="number" placeholder="8" /></p>
        </div>    
      </section>
      
      {error ? (
        <p>Error loading products. Please try again later.</p>
      ) : products.length > 0 ? (
        
        <div className="main-content-list">
          <ul className="product-list">
            {products.map((product) => (
              <li className='product-item' key={product.id}>
                <ProductVariantsDiscount variants={product.productVariants} />
                <ProductImages productId={product.id} />
                <div className='product-info'>
                  <h3>{product.name}</h3>
                  <div className='product-description'>
                    {product.description.substring(0,30)}...
                  </div>
                  <div className='price'>
                    <ProductVariantsPrice variants={product.productVariants} />
                    <div className='product-discount'></div>
                  </div>
                  <div className="overlay" id="product-overlay">
                    <div className="product-link">
                      <div className="product-details">
                        <Link to={`/products/${product.id}`}>See Details</Link>
                      </div>
                      <div className="product-buttons">
                        <a href="#"><img src="../src/assets/share-icon.png" alt="Share Button" /></a> 
                        <a href="#"><img src="../src/assets/compare-icon.png" alt="Compare Button" /></a> 
                        <a href="#"><img src="../src/assets/like-icon.png" alt="Like Button" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Product not found!</p>
      )}
      <section className="pagination">
        <div className="pagination-container"> 
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </section>
    </>
  );
};

export default ResultList;
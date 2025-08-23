import { FC, useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from "react";

// Error Boundary for Model3D to catch crashes safely
class Model3DErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Model3D Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import productsData from "../data/products.json";
import { SpatialDiv, enableDebugTool, Model } from "@webspatial/react-sdk";
import { SpatialHelper } from "@webspatial/core-sdk";

// Enable WebSpatial functionality
enableDebugTool();

const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const spatialAreaRef = useRef<HTMLDivElement>(null);

  // Create simplified 3D spatial area using core SDK
  useEffect(() => {
    const setupSimpleSpatial3D = async () => {
      if (!spatialAreaRef.current) return;
      
      try {
        // Add delay to ensure WebSpatial is fully initialized
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if WebSpatial is supported
        const { Spatial } = await import("@webspatial/core-sdk");
        const spatial = new Spatial();
        if (!spatial.isSupported()) {
          spatialAreaRef.current.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6b7280; font-size: 14px;">WebSpatial not supported in this environment</div>';
          return;
        }

        // Get SpatialHelper instance
        const helper = SpatialHelper.instance;
        if (!helper) {
          spatialAreaRef.current.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6b7280; font-size: 14px;">Initializing WebSpatial...</div>';
          return;
        }

        // Create a simple 3D shape entity
        const sphereEntity = await helper.shape.createShapeEntity('sphere');
        sphereEntity.transform.position.z = 0.1;
        sphereEntity.transform.scale.x = 0.4;
        sphereEntity.transform.scale.y = 0.4; 
        sphereEntity.transform.scale.z = 0.4;
        await sphereEntity.updateTransform();

        // Attach to DOM element
        const result = await helper.dom.attachSpatialView(spatialAreaRef.current);
        await sphereEntity.setParent(result.entity);

        // Add success indicator
        spatialAreaRef.current.style.background = 'linear-gradient(45deg, #3b82f6, #8b5cf6)';
        console.log('Simple 3D spatial area created successfully!');
        
      } catch (error) {
        console.error('Error setting up simple 3D spatial area:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        spatialAreaRef.current.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ef4444; font-size: 14px;">Error: ${errorMessage}</div>`;
      }
    };

    setupSimpleSpatial3D(); 
  }, []);

  useEffect(() => {
    // 在实际应用中，这里可能会从 API 获取数据
    setProducts(productsData as Product[]);
  }, []);

  // 获取所有唯一的分类
  const categories = [
    "All",
    ...new Set(products.map(product => product.category)),
  ];

  // 根据分类和搜索词过滤商品
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "All" ||
      product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div enable-xr className="py-8">
      <h1 className="list-title text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
        Our Products
      </h1>

      {/* 搜索框 */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="list-window flex flex-col md:flex-row gap-6">
        {/* 左侧分类菜单 */}
        <div enable-xr className="list-meun w-full md:w-64 shrink-0">
          <div
            enable-xr
            className="list-meun-bg bg-white rounded-lg shadow-md p-4"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Categories
            </h2>
            <ul className="space-y-2">
              <li>
                <button
                  enable-xr
                  style={
                    import.meta.env.XR_ENV === "avp"
                      ? selectedCategory === ""
                        ? {
                            "--xr-background-material": "thin",
                          }
                        : {
                            "--xr-background-material": "thick",
                          }
                      : {}
                  }
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    import.meta.env.XR_ENV === "avp"
                      ? selectedCategory === ""
                        ? "text-gray-100"
                        : "text-gray-900"
                      : selectedCategory === ""
                        ? "bg-indigo-100 text-indigo-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory("")}
                >
                  All Categories
                </button>
              </li>
              {categories.map(
                (category, index) =>
                  category !== "All" && (
                    <li key={index}>
                      <button
                        enable-xr
                        style={
                          import.meta.env.XR_ENV === "avp"
                            ? selectedCategory === category
                              ? {
                                  "--xr-background-material": "thin",
                                }
                              : {
                                  "--xr-background-material": "thick",
                                }
                            : {}
                        }
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          import.meta.env.XR_ENV === "avp"
                            ? selectedCategory === category
                              ? "text-gray-100"
                              : "text-gray-900"
                            : selectedCategory === category
                              ? "bg-indigo-100 text-indigo-700 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>

        {/* 商品网格 */}
        <div className="flex-1">
                  {/* Simple 3D Test */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">3D Model Test</h3>
          
          {/* Method 1: Using SpatialDiv with Model3D (Proper Implementation) */}
          <SpatialDiv
            spatialStyle={{ 
              position: { z: 100 },
              visible: true 
            }}
            style={{ 
              width: '400px', 
              height: '300px',
              background: 'linear-gradient(45deg, #1f2937, #374151)',
              border: '2px solid #10b981',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Toyota AE86 GLB Model - WebSpatial + Apple Vision Pro */}
            <Model3DErrorBoundary
              fallback={
                <div style={{
                  width: '150px', 
                  height: '150px',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  flexDirection: 'column',
                  boxShadow: '0 8px 16px rgba(239, 68, 68, 0.4)',
                  border: '3px solid rgba(255,255,255,0.2)',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}>
                  <div style={{fontSize: '24px'}}>⚠️</div>
                  <div style={{fontSize: '11px', fontWeight: 'bold', textAlign: 'center'}}>
                    Model<br/>Error
                  </div>
                </div>
              }
            >
              <Model
                contentMode="fit"
                resizable={true}
                onLoad={(event) => {
                  console.log('WebSpatial Model loaded successfully!', event);
                }}
                style={{
                  width: '150px',
                  height: '150px',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <source 
                  src="/assets/models/1983-toyota-sprinter-trueno-gt-apex-ae86/source/ae86.glb" 
                  type="model/gltf-binary" 
                />
                {/* Fallback content if model fails to load */}
                <div style={{
                  width: '150px', 
                  height: '150px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  flexDirection: 'column',
                  boxShadow: '0 8px 16px rgba(16, 185, 129, 0.4)',
                  border: '3px solid rgba(255,255,255,0.2)'
                }}>
                  <div style={{fontSize: '32px'}}>🚗</div>
                  <div style={{fontSize: '12px', fontWeight: 'bold'}}>Loading AE86...</div>
                </div>
              </Model>
            </Model3DErrorBoundary>

            {/* Beautiful Chess Pieces Display (CSS Only) */}
            <div style={{ 
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{
                width: '40px', 
                height: '40px',
                background: '#ef4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}>♔</div>
              <div style={{
                width: '40px', 
                height: '40px',
                background: '#f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}>♕</div>
              <div style={{
                width: '40px', 
                height: '40px',
                background: '#06b6d4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}>♘</div>
            </div>

            {/* Title overlay */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#10b981',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.7)',
              padding: '4px 12px',
              borderRadius: '6px'
            }}>
              ✨ Toyota AE86 + Chess Pieces
            </div>
          </SpatialDiv>

          {/* Method 2: Simplified 3D spatial area using core SDK */}
          <div 
            ref={spatialAreaRef}
            style={{ 
              width: '300px', 
              height: '200px',
              background: '#f0f9ff',
              border: '2px solid #8b5cf6',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '14px',
              textAlign: 'center'
            }}
          >
            <div>Initializing 3D sphere...</div>
          </div>
        </div>
          
          <div
            enable-xr-monitor
            className={"auto-fill-grid" + " gap-4 sm:gap-6"}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 sm:py-12">
                <p className="text-lg sm:text-xl text-gray-600">
                  No products found matching your criteria.
                </p>
                <button
                  className="mt-4 btn-primary"
                  onClick={() => {
                    setSelectedCategory("");
                    setSearchTerm("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

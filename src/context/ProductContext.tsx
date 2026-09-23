"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS_DATA, Product } from "@/data/products";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ambil data dari localStorage saat pertama kali dimuat
  useEffect(() => {
    const savedProducts = localStorage.getItem("suka_nicky_products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts(PRODUCTS_DATA);
      }
    } else {
      setProducts(PRODUCTS_DATA);
      localStorage.setItem(
        "suka_nicky_products",
        JSON.stringify(PRODUCTS_DATA),
      );
    }
    setIsLoaded(true);
  }, []);

  // Simpan perubahan ke localStorage
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("suka_nicky_products", JSON.stringify(newProducts));
  };

  const addProduct = (newProdData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...newProdData,
      id: `sn-${Date.now()}`,
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}

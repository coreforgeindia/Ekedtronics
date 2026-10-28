'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { CartItem, ClientAddress, Order, Product } from './types'
import { initialProducts } from './products'

export interface AuthUser {
  name: string
  email: string
  phone?: string
}

interface StoreContextType {
  products: Product[]
  cart: CartItem[]
  wishlist: string[]
  orders: Order[]
  cartOpen: boolean
  quickViewProduct: Product | null
  deliveryLocation: { city: string; pincode: string }
  authUser: AuthUser | null
  authModalOpen: boolean
  setCartOpen: (open: boolean) => void
  setQuickViewProduct: (product: Product | null) => void
  setAuthModalOpen: (open: boolean) => void
  loginUser: (user: AuthUser) => void
  logoutUser: () => void
  dismissAuthPrompt: () => void
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  setDeliveryLocation: (location: { city: string; pincode: string }) => void
  placeOrder: (customer: ClientAddress, paymentMethod: 'UPI / QR' | 'Credit / Debit Card' | 'Net Banking', transactionId: string) => Order
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void
  addProduct: (product: Omit<Product, 'id'>) => Product
  updateProduct: (product: Product) => void
  deleteProduct: (productId: string) => void
  cartSubtotal: number
  cartTax: number
  cartDiscount: number
  cartTotal: number
  cartCount: number
}

const defaultOrders: Order[] = [
  {
    id: '#EK-10482',
    invoiceNumber: 'INV-2024-0010482',
    date: 'Today, 10:42 AM',
    createdAt: Date.now() - 1000 * 60 * 30,
    customer: {
      fullName: 'Aarav Mehta',
      email: 'aarav.mehta@gmail.com',
      phone: '+91 98201 54321',
      whatsapp: '+91 98201 54321',
      street: 'Flat 402, Sea Green Heights, Worli Sea Face',
      landmark: 'Near Worli Dairy',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018'
    },
    items: [
      { product: initialProducts[0], quantity: 1 }
    ],
    subtotal: 93219,
    tax: 16780,
    discount: 0,
    shipping: 0,
    totalAmount: 109999,
    paymentMethod: 'UPI / QR',
    transactionId: 'UPI-982140182914',
    paymentStatus: 'Paid',
    orderStatus: 'Processing'
  },
  {
    id: '#EK-10481',
    invoiceNumber: 'INV-2024-0010481',
    date: 'Today, 09:18 AM',
    createdAt: Date.now() - 1000 * 60 * 120,
    customer: {
      fullName: 'Ishita Shah',
      email: 'ishita.shah@outlook.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      street: '12, Sunrise Bungalows, Satellite Road',
      landmark: 'Opp. ISRO Colony',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015'
    },
    items: [
      { product: initialProducts[1], quantity: 1 }
    ],
    subtotal: 105923,
    tax: 19067,
    discount: 0,
    shipping: 0,
    totalAmount: 124990,
    paymentMethod: 'Credit / Debit Card',
    transactionId: 'TXN-CC-8472910384',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped'
  },
  {
    id: '#EK-10480',
    invoiceNumber: 'INV-2024-0010480',
    date: 'Yesterday, 06:34 PM',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    customer: {
      fullName: 'Rohan Kapoor',
      email: 'rohan.kapoor@techcorp.in',
      phone: '+91 97112 34567',
      whatsapp: '+91 97112 34567',
      street: 'Penthouse 14B, DLF Phase 5',
      landmark: 'Club Drive',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002'
    },
    items: [
      { product: initialProducts[2], quantity: 1 }
    ],
    subtotal: 22872,
    tax: 4118,
    discount: 0,
    shipping: 0,
    totalAmount: 26990,
    paymentMethod: 'UPI / QR',
    transactionId: 'UPI-773194028501',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered'
  },
  {
    id: '#EK-10479',
    invoiceNumber: 'INV-2024-0010479',
    date: 'Yesterday, 04:12 PM',
    createdAt: Date.now() - 1000 * 60 * 60 * 28,
    customer: {
      fullName: 'Nisha Iyer',
      email: 'nisha.iyer@gmail.com',
      phone: '+91 94440 12345',
      whatsapp: '+91 94440 12345',
      street: '8, Kasturi Ranga Road, Alwarpet',
      landmark: 'Near Poes Garden',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600018'
    },
    items: [
      { product: initialProducts[3], quantity: 1 }
    ],
    subtotal: 101686,
    tax: 18304,
    discount: 0,
    shipping: 0,
    totalAmount: 119990,
    paymentMethod: 'Net Banking',
    transactionId: 'HDFC-NB-92847291',
    paymentStatus: 'Paid',
    orderStatus: 'Processing'
  },
  {
    id: '#EK-10478',
    invoiceNumber: 'INV-2024-0010478',
    date: 'Yesterday, 01:27 PM',
    createdAt: Date.now() - 1000 * 60 * 60 * 32,
    customer: {
      fullName: 'Kabir Singh',
      email: 'kabir.singh@gmail.com',
      phone: '+91 98111 88990',
      whatsapp: '+91 98111 88990',
      street: '45, Defence Colony, Ring Road',
      landmark: 'Near Flyover',
      city: 'New Delhi',
      state: 'Delhi NCR',
      pincode: '110024'
    },
    items: [
      { product: initialProducts[4], quantity: 1 }
    ],
    subtotal: 101610,
    tax: 18290,
    discount: 0,
    shipping: 0,
    totalAmount: 119900,
    paymentMethod: 'UPI / QR',
    transactionId: 'UPI-332910482711',
    paymentStatus: 'Paid',
    orderStatus: 'Cancelled'
  }
]

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [orders, setOrders] = useState<Order[]>(defaultOrders)
  const [cartOpen, setCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [deliveryLocation, setDeliveryLocationState] = useState({ city: 'Bangalore', pincode: '560100' })
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load state from localStorage on client
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ek_cart')
      if (savedCart) setCart(JSON.parse(savedCart))
      
      const savedWishlist = localStorage.getItem('ek_wishlist')
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist))

      const savedOrders = localStorage.getItem('ek_orders')
      if (savedOrders) setOrders(JSON.parse(savedOrders))

      const savedProducts = localStorage.getItem('ek_products')
      if (savedProducts) setProducts(JSON.parse(savedProducts))

      const savedLocation = localStorage.getItem('ek_location')
      if (savedLocation) setDeliveryLocationState(JSON.parse(savedLocation))

      const savedUser = localStorage.getItem('ek_auth_user')
      if (savedUser) {
        setAuthUser(JSON.parse(savedUser))
      } else {
        // If not logged in and not dismissed in this session, show login/signup prompt
        const dismissed = sessionStorage.getItem('ek_auth_dismissed')
        if (!dismissed) {
          // Trigger initial login/signup prompt smoothly after 600ms
          setTimeout(() => {
            setAuthModalOpen(true)
          }, 600)
        }
      }
    } catch (e) {
      console.error('Failed to load store from localStorage', e)
    }
    setIsHydrated(true)
  }, [])

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('ek_cart', JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('ek_wishlist', JSON.stringify(wishlist))
    } catch (e) {
      console.error(e)
    }
  }, [wishlist, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('ek_orders', JSON.stringify(orders))
    } catch (e) {
      console.error(e)
    }
  }, [orders, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('ek_products', JSON.stringify(products))
    } catch (e) {
      console.error(e)
    }
  }, [products, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('ek_location', JSON.stringify(deliveryLocation))
    } catch (e) {
      console.error(e)
    }
  }, [deliveryLocation, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    try {
      if (authUser) {
        localStorage.setItem('ek_auth_user', JSON.stringify(authUser))
      } else {
        localStorage.removeItem('ek_auth_user')
      }
    } catch (e) {
      console.error(e)
    }
  }, [authUser, isHydrated])

  const loginUser = (user: AuthUser) => {
    setAuthUser(user)
    setAuthModalOpen(false)
  }

  const logoutUser = () => {
    setAuthUser(null)
  }

  const dismissAuthPrompt = () => {
    try {
      sessionStorage.setItem('ek_auth_dismissed', 'true')
    } catch (e) {}
    setAuthModalOpen(false)
  }

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const isInWishlist = (productId: string) => wishlist.includes(productId)

  const setDeliveryLocation = (location: { city: string; pincode: string }) => {
    setDeliveryLocationState(location)
  }

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const cartTax = Math.round((cartSubtotal * 0.18) / 1.18)
  const cartDiscount = cartSubtotal > 50000 ? 2000 : cartSubtotal > 20000 ? 1000 : 0
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount)
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  const placeOrder = (
    customer: ClientAddress,
    paymentMethod: 'UPI / QR' | 'Credit / Debit Card' | 'Net Banking',
    transactionId: string
  ): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const newOrder: Order = {
      id: `#EK-${randomSuffix}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${randomSuffix}`,
      date: 'Just now',
      createdAt: Date.now(),
      customer,
      items: [...cart],
      subtotal: cartSubtotal - cartTax,
      tax: cartTax,
      discount: cartDiscount,
      shipping: 0,
      totalAmount: cartTotal,
      paymentMethod,
      transactionId,
      paymentStatus: 'Paid',
      orderStatus: 'Processing'
    }

    setOrders((prev) => [newOrder, ...prev])
    clearCart()
    return newOrder
  }

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, orderStatus: status } : order))
    )
  }

  const addProduct = (newProdData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`
    }
    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
  }

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        cartOpen,
        quickViewProduct,
        deliveryLocation,
        authUser,
        authModalOpen,
        setCartOpen,
        setQuickViewProduct,
        setAuthModalOpen,
        loginUser,
        logoutUser,
        dismissAuthPrompt,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setDeliveryLocation,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        cartSubtotal,
        cartTax,
        cartDiscount,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

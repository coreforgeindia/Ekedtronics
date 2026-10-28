export interface Product {
  id: string
  name: string
  brand: string
  category: 'Smartphones' | 'Laptops' | 'Televisions' | 'Audio' | 'Cameras' | 'Appliances' | 'Gaming' | 'Smart Home'
  price: number
  originalPrice: number
  discount: string
  rating: number
  reviewsCount: number
  image: string
  tag?: 'Bestseller' | 'New' | 'Hot deal' | 'Top rated' | 'Limited stock'
  description: string
  features: string[]
  inStock: boolean
  stockCount: number
  sku: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ClientAddress {
  fullName: string
  email: string
  phone: string
  whatsapp: string
  street: string
  landmark?: string
  city: string
  state: string
  pincode: string
}

export interface Order {
  id: string
  invoiceNumber: string
  date: string
  createdAt: number
  customer: ClientAddress
  items: CartItem[]
  subtotal: number
  tax: number
  discount: number
  shipping: number
  totalAmount: number
  paymentMethod: 'UPI / QR' | 'Credit / Debit Card' | 'Net Banking'
  transactionId: string
  paymentStatus: 'Paid'
  orderStatus: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'
}

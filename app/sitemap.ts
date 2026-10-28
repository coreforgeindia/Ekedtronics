import { MetadataRoute } from 'next'
import { initialProducts } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ekedtronics.com'
  const currentDate = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const categories = [
    'Smartphones',
    'Laptops',
    'Televisions',
    'Audio',
    'Cameras',
    'Appliances',
    'Gaming',
    'Smart Home',
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/products?category=${encodeURIComponent(cat)}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages]
}

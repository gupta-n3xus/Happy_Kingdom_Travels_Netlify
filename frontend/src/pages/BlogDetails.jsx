import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, User, ArrowLeft, Share2, Facebook, Twitter, Tag, ArrowRight } from 'lucide-react'
import DOMPurify from 'dompurify'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import LoadingState from '../components/LoadingState'
import PackageCard from '../components/PackageCard'
import blogService from '../services/blogService'
import packageService from '../services/packageService'
import { formatDate } from '../utils/helpers'

const BlogDetails = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPackages, setRelatedPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await blogService.getPostBySlug(slug)
      setPost(data.post)

      if (data.post?.relatedPackages?.length > 0) {
        const pkgData = await packageService.getAllPackages()
        const related = (pkgData.packages || []).filter((p) =>
          data.post.relatedPackages.includes(p._id)
        )
        setRelatedPackages(related)
      }
    } catch (err) {
      setError(err.message || 'Failed to load article')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-warmWhite">
        <LoadingState message="Loading article..." />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-warmWhite flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Article Not Found</h2>
          <p className="text-muted mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/travel-guide"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
          >
            Browse Travel Guide
          </Link>
        </div>
      </div>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      <SEO
        title={`${post.title} | Bhutan Travel Guide`}
        description={post.excerpt || post.description || post.title}
        keywords={post.tags?.join(', ') || 'Bhutan travel, Bhutan guide'}
        image={post.image || post.featuredImage}
      />

      <article className="bg-warmWhite">
        <header className="relative h-96 bg-gradient-to-r from-primary to-secondary">
          <img
            src={post.image || post.featuredImage || '/images/paro-hero.jpg'}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="relative h-full flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <Breadcrumbs
                items={[
                  { label: 'Travel Guide', path: '/travel-guide' },
                  { label: post.title },
                ]}
              />
              <div className="flex items-center text-white/80 text-sm mb-4">
                <Clock className="w-4 h-4 mr-2" />
                {formatDate(post.createdAt || post.publishedAt)}
                {post.author && (
                  <>
                    <span className="mx-3">·</span>
                    <User className="w-4 h-4 mr-2" />
                    {post.author}
                  </>
                )}
                {post.category && (
                  <>
                    <span className="mx-3">·</span>
                    <Tag className="w-4 h-4 mr-2" />
                    {post.category}
                  </>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                {post.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />

            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-muted font-medium">Share this article</p>
                <div className="flex gap-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: post.title, url: shareUrl })
                      } else {
                        navigator.clipboard.writeText(shareUrl)
                      }
                    }}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label="Share"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {relatedPackages.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                Related Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPackages.map((pkg) => (
                  <PackageCard key={pkg._id} pkg={pkg} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/travel-guide"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Travel Guide
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}

export default BlogDetails

import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: 200
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    metaTitle: String,
    metaDescription: String,
    excerpt: {
      type: String,
      maxlength: 300
    },
    featuredImage: String,
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: 'Bhutan Travel Team'
    },
    category: {
      type: String,
      trim: true
    },
    tags: [String],
    publishedAt: {
      type: Date,
      default: Date.now
    },
    published: {
      type: Boolean,
      default: false
    },
    relatedPackages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package'
    }]
  },
  { timestamps: true }
);

blogPostSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
  next();
});

blogPostSchema.index({ title: 'text', content: 'text' });
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ category: 1, published: 1 });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;

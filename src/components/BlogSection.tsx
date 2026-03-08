import { Calendar, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";

const posts = [
  {
    title: "Building Scalable React Apps with Modern Patterns",
    excerpt: "Explore advanced React patterns like compound components, render props, and custom hooks that make your codebase scalable and maintainable.",
    date: "Feb 28, 2026",
    category: "React",
    image: blog1,
    readTime: "8 min read",
  },
  {
    title: "The Art of UI/UX: Designing for Delight",
    excerpt: "How to create interfaces that not only look beautiful but feel intuitive — bridging the gap between design thinking and frontend engineering.",
    date: "Feb 15, 2026",
    category: "Design",
    image: blog2,
    readTime: "6 min read",
  },
  {
    title: "Cloud-Native Development: From Docker to Production",
    excerpt: "A practical guide to containerizing your applications, setting up CI/CD pipelines, and deploying to the cloud with confidence.",
    date: "Jan 30, 2026",
    category: "DevOps",
    image: blog3,
    readTime: "10 min read",
  },
  {
    title: "Web Performance Optimization: A Complete Guide",
    excerpt: "Learn how to achieve perfect Lighthouse scores by optimizing Core Web Vitals, lazy loading assets, and implementing efficient caching strategies.",
    date: "Jan 12, 2026",
    category: "Performance",
    image: blog4,
    readTime: "7 min read",
  },
];

const BlogSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="blog" className="relative py-16 md:py-24">
      <div className="glow-orb w-[350px] h-[350px] bg-secondary bottom-[10%] right-[-5%] animate-float-delayed animate-glow-pulse" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Latest <span className="gradient-text">Blog</span> Posts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development, design, and technology.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {posts.map((post, i) => (
            <article
              key={post.title}
              className="glass rounded-2xl overflow-hidden gradient-border group hover:shadow-glass-strong transition-all duration-500 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full gradient-bg text-primary-foreground">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold mb-2 text-foreground leading-snug line-clamp-2 group-hover:gradient-text transition-all duration-300">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  Read More
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

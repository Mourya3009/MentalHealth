import React from 'react';

const Support = () => {
  const supportResources = {
    videos: [
      {
        title: 'Motivation',
        url: 'https://www.youtube.com/embed/Tuw8hxrFBH8?si=NIlSm69n628d-oF5',
        description: 'Get motivated and inspired'
      },
      {
        title: 'Life Changing Video',
        url: 'https://www.youtube.com/embed/hcvmq-hcDIE?si=ZGyp7M6doWLoF9Ve',
        description: 'Transform your perspective on life'
      },
      {
        title: '5-Minute Positivity Boost',
        url: 'https://www.youtube.com/embed/C5L8Z3qA1DA?si=79ocrUBITfY2S1s-',
        description: 'Quick positivity and energy boost'
      }
    ],
    blogs: [
      {
        title: '10 Ways to Feel Better Right Now',
        url: 'https://buffer.com/resources/be-happy-today/',
        description: 'Practical tips for immediate mood improvement'
      },
      {
        title: 'Self-Care for Mental Wellness',
        url: 'https://www.mentalhealth.org.uk/explore-mental-health/blogs/importance-self-care',
        description: 'Understanding the importance of self-care'
      }
    ],
    movies: [
      {
        title: 'Inside Out (2015)',
        url: 'https://www.imdb.com/title/tt2096673/',
        description: 'Animated film about emotions and mental health'
      },
      {
        title: 'The Intern (2015)',
        url: 'https://www.imdb.com/title/tt2361509/',
        description: 'Heartwarming story about friendship and purpose'
      },
      {
        title: 'The Perks of Being a Wallflower (2012)',
        url: 'https://www.imdb.com/title/tt1659337/',
        description: 'Coming-of-age story dealing with mental health'
      }
    ]
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            💖 You're Not
            <span className="block gradient-text">Alone</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto italic">
            "Even the darkest night will end and the sun will rise." – Victor Hugo
          </p>
        </div>

        {/* Relaxing & Motivational Videos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
            <span>🎥</span>
            <span>Relaxing & Motivational Videos</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportResources.videos.map((video, index) => (
              <div key={index} className="card group hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-4">{video.title}</h3>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-slate-400 text-sm">{video.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uplifting Blogs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
            <span>📖</span>
            <span>Uplifting Blogs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportResources.blogs.map((blog, index) => (
              <div key={index} className="card group hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-3">{blog.title}</h3>
                <p className="text-slate-400 mb-4">{blog.description}</p>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  <span>Read Blog</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Feel-Good Movies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
            <span>🎬</span>
            <span>Feel-Good Movies</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportResources.movies.map((movie, index) => (
              <div key={index} className="card group hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-3">{movie.title}</h3>
                <p className="text-slate-400 mb-4">{movie.description}</p>
                <a
                  href={movie.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  <span>View on IMDb</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Mental Health Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
            <span>🆘</span>
            <span>Mental Health Resources</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Crisis Support</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-slate-300">National Suicide Prevention Lifeline: 988</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-slate-300">Crisis Text Line: Text HOME to 741741</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-slate-300">Emergency: 911</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Professional Help</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-300">Find a therapist near you</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-300">School counselor services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-300">Online therapy platforms</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Quote */}
        <div className="text-center">
          <div className="card max-w-2xl mx-auto">
            <p className="text-2xl text-slate-300 italic">
              💌 Remember: You matter. You are loved. You are enough.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
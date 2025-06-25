const Article = () => {
    return (
        <section id="article" className="max-w-screen-xl mx-auto mt-6 px-4 md:px-8 py-12 bg-gray-900 rounded-lg shadow-sm">
            
            <article className="mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center">
                    Welcome to Rua Web Store – The Future of E-Commerce
                </h2>
                <p className="text-base md:text-lg text-white leading-relaxed mb-4">
                    Rua Web Store is an AI-powered e-commerce solution designed to revolutionize the way businesses and dropshippers manage their online stores.
                    By integrating advanced automation, AI-driven marketing tools, and streamlined e-commerce management, we empower sellers to optimize their
                    storefronts and boost conversions effortlessly.
                </p>
                <p className="text-base md:text-lg text-white leading-relaxed">
                    Our platform offers AI-generated product descriptions, SEO optimization, ad automation, and powerful customer engagement tools to maximize
                    revenue and market reach. Whether you`re running a dropshipping business, selling unique products, or building a brand, Rua Web Store adapts
                    to your needs.
                </p>
            </article>

            <article className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                    Meet the Founder: Youssef Aarabi
                </h2>
                <p className="text-base md:text-lg text-white leading-relaxed mb-4">
                    I am Youssef Aarabi, a passionate full-stack web developer and digital marketing strategist with a deep expertise in building scalable
                    e-commerce solutions. With a background in Economics and Management from Université Ibn Zohr d`Agadir, I’ve combined my technical skills with
                    strategic marketing insights to create Rua Web Store—a platform tailored for smart businesses.
                </p>
                <p className="text-base md:text-lg text-white leading-relaxed">
                    My proficiency in Next.js, TypeScript, MERN stack, and digital marketing automation allows me to build dynamic, performance-optimized applications.
                    Beyond technology, I focus on user experience, scalability, and AI integration to bring the future of commerce to life.
                </p>
            </article>

            <div className="text-center bg-gray-800 py-10 px-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold text-white">Join the Revolution</h3>
                <p className="mt-4 text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto">
                    Rua Web Store is more than a platform—it’s a game-changing solution for businesses that want to scale smartly.
                    Whether you`re an entrepreneur, dropshipper, or brand owner, we provide the tools to make your success seamless.
                </p>
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300">
                    Get Started Today
                </button>
            </div>
        </section>
    );
};

export default Article;

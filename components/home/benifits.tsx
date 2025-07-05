

export default function Benefits() {
  return (
    <section className="py-12 px-6 max-w-screen-xl mx-auto text-center">
      <h3 className="text-3xl font-bold mb-8">Why Shop with Us?</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {["AI Automation", "SEO Optimized", "Fast Shipping", "Secure Checkout"].map((benefit) => (
          <div key={benefit} className="bg-gray-200 rounded-lg p-6 hover:bg-gray-300 cursor-pointer">
            <h4 className="text-xl font-semibold">{benefit}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

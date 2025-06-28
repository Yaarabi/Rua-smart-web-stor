
export default function Newsletter() {
  return (
    <section className="py-12 px-6 bg-gray-800 text-white text-center">
      <h3 className="text-3xl font-bold mb-4">Join Our Newsletter</h3>
      <p className="mb-6">Get exclusive updates and special offers straight to your inbox.</p>
      <form className="flex justify-center space-x-4">
        <input type="email" placeholder="Enter your email" className="p-2 rounded-lg text-gray-900" />
        <button type="submit" className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg">Subscribe</button>
      </form>
    </section>
  );
}

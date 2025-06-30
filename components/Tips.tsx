const ProductContentTips = () => {
    return (
        <section className="max-w-3xl mx-auto mt-12 px-4">
            <h3 className="text-3xl font-bold mb-8 text-center text-white">
                📋 Tips for Writing Effective Product Content
            </h3>

            <ul className="space-y-6 text-gray-300">
                {[
                    "Start with a clear and benefit-driven product title—avoid jargon and emphasize the value.",
                    "Use bullet points to highlight features, technical specs, and what makes the product unique.",
                    "Tell a short story or describe a scenario where the product solves a real customer problem.",
                    "Include sensory and emotional language to help users visualize the product experience.",
                    "Ensure all content is scannable—use headings, subheadings, and concise paragraphs.",
                    "Optimize for SEO by including relevant keywords naturally within the title and description.",
                    "Mention dimensions, materials, and warranty or return policy if applicable—build trust.",
                    "Always include a strong call to action that encourages users to purchase or learn more.",
                ].map((tip, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition"
                    >
                        <span className="text-green-400 text-xl mt-1">✅</span>
                        <span className="leading-relaxed">{tip}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ProductContentTips;

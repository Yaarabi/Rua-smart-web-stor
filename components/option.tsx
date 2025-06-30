import ProductContentTips from "./Tips";

interface Props {
    forWhat: string;
    action1: () => void;
    action2: () => void;
}

const Option = ({ forWhat, action1, action2 }: Props) => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-10">
            
            <h2 className="text-3xl font-bold mb-8 text-center">
                How do you want to create this product? <span className="text-indigo-500">{forWhat}</span>
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
                <button
                    onClick={action1}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow"
                >
                    Generate Manually
                </button>
                <button
                    onClick={action2}
                    className="px-8 py-3 bg-gray-200 text-gray-900 rounded-2xl hover:bg-gray-300 transition-transform transform hover:scale-105 shadow"
                >
                    Generate by AI
                </button>
            </div>

            <div className="max-w-3xl w-full">
                <ProductContentTips />
            </div>
        </div>
    );
};

export default Option;

import ProductContentTips from "./Tips";

interface Props {
    forWhat: string;
    action1: () => void;
    action2: () => void;
}

const Option = ({ forWhat, action1, action2 }: Props) => {
    return (
        <div className="mt-10 md:w-4/5 p-6 bg-white rounded-2xl shadow-lg m-auto">
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                How do you want to create this product? <span className="text-indigo-600">{forWhat}</span>
            </h2>

            <div className="flex justify-center space-x-6 mb-6">
                <button
                    onClick={action1}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    Manually
                </button>
                <button
                    onClick={action2}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                    By AI
                </button>
            </div>

            <ProductContentTips />
        </div>
    );
};

export default Option;

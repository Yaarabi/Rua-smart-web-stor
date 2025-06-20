    
interface Props {
    forWhat: string;
    action1: () => void;
    action2: () => void;
}
    
const Option = ({ forWhat, action1, action2 }: Props) => {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            How do you want to create this product? {forWhat}
        </h2>
        <div className="flex justify-center space-x-4">
            <button onClick={ action1 } className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            Manually
            </button>
            <button onClick={ action2 } className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            By AI
            </button>
        </div>
        </div>
    );
};

export default Option;

import Link from "next/link";
import { HiOutlineInbox, HiOutlineMail } from "react-icons/hi";

const actions = [
    { icon: HiOutlineInbox, label: "My Boite", href: "" },         
    { icon: HiOutlineMail, label: "Sent Email", href: "/dashboard/connecte/action" },   
];

const Page = () => {
    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-900 text-white px-4 py-12">
        {actions.map(({ icon: Icon, label, href }) => (
            <Link
            href={href}
            key={label}
            className="flex w-full max-w-md items-center justify-center space-x-4 rounded-lg bg-indigo-700/30 px-6 py-4 text-xl font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95 select-none cursor-pointer"
            aria-label={label}
            >
            <Icon className="text-3xl text-indigo-400" />
            <span className="w-[100px]">{label}</span>
            </Link>
        ))}
        </section>
    );
};

export default Page;

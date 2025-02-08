type ButtonProps = {
    title: string;
}

export default function Button({ title }: ButtonProps) {
    return (
        <button className="text-yellow-500 font-bold border-2 border-yellow-500 py-2 px-10 rounded-full hover:opacity-70 " type="submit">
            {title}
        </button>
    );
}

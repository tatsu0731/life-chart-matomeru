import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between py-4 px-8">
            <Link href={"/"}>
                <h1 className="text-yellow-500 text-2xl font-bold">Life-chart matomeru</h1>
            </Link>
            <ul className="flex gap-4">
                <li>わろた</li>
                <li>わろた</li>
                <li>わろた</li>
            </ul>
        </header>
    );
}

import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between py-4 px-8">
            <Link href={"/"}>
                <h1 className="text-yellow-500 text-2xl font-bold">Life-chart matomeru</h1>
            </Link>
            <ul className="flex gap-4">
                <Link href={"https://github.com/tatsu0731/life-chart-matomeru"}>
                    <li>GitHub</li>
                </Link>
            </ul>
        </header>
    );
}

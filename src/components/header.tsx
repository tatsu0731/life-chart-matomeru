import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between py-4 px-8 font-bold">
            <Link href={"/"}>
                <h1 className="text-yellow-500 text-2xl">Life-chart matomeru</h1>
            </Link>
            <ul className="flex gap-8 text-gray-600">
                <li>作成方法</li>
                <Link href={"https://github.com/tatsu0731/life-chart-matomeru"}>
                    <li>GitHub</li>
                </Link>
            </ul>
        </header>
    );
}

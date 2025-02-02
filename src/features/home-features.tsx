import Button from "@/components/button";
import Link from "next/link";

export default function HomeFeature() {
    return (
        <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">■ 人生曲線とは？</h2>
                <p>これまでの自分の人生を数値として表すことで客観的に振り返ることを狙っています。過去を振り返ることで、自分を分析し将来の判断に活かせると思われます</p>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">■ 使い方</h2>
                <p>1. 人生曲線を作成する</p>
                <p>2. 人生曲線を見る</p>
                <p>3. 人生曲線を編集する</p>
            </div>
            <div className="flex flex-col gap-4">
                <p>それでは早速使ってみましょう！</p>
                <Link href={"/input"}>
                    <Button title="人生曲線を作成する" />
                </Link>
            </div>
        </section>
    );
}

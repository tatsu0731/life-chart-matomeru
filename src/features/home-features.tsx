import Button from "@/components/button";
import Link from "next/link";

export default function HomeFeature() {
    return (
        <section className="flex flex-col gap-12 w-2/3 text-gray-600 mt-12">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">人生曲線とは？</h2>
                <p>これまでの自分の人生を数値として表すことで客観的に振り返ることを狙っています。過去を振り返ることで、自分を分析し将来の判断に活かせると思われます</p>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">人生曲線を作成するメリットは？</h2>
                <p>人生曲線を作成することで、過去を振り返り、現在の自分を理解し、未来に向けてより良い選択ができるようになります。<br />自己理解が深まるだけでなく、目標設定やキャリア設計にも活かせるため、一度作成してみると大きな発見があるかもしれません。</p>
                <p>主に以下のメリットがあるとされています。</p>
                <div className="rounded-xl py-4 leading-8 border-4 border-yellow-300">
                    <ol className="text-lg list-decimal ml-12">
                        <li>自己理解が深まる</li>
                        <li>未来の目標設定に役立つ</li>
                        <li>自分の成長を実感できる</li>
                        <li>キャリアデザインや転職活動に活かせる</li>
                        <li>人生のパターンを把握し、今後の選択に活かせる</li>
                        <li>人生のバランスを見直すきっかけになる</li>
                    </ol>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <p>それでは早速使ってみましょう！</p>
                <div className="flex justify-center mb-8">
                <Link href={"/input"}>
                    <Button title="人生曲線を作成する" />
                </Link>
                </div>
            </div>
        </section>
    );
}

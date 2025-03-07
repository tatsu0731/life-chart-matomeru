"use client";
import { DashDate, FullDate } from "@/utils/date";
import html2canvas from "html2canvas";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";

// ✅ `chartData` の型定義
interface ChartData {
    name: number; // X 軸の値 (年齢)
    value: number; // Y 軸の評価値
    description: string; // 出来事
}

// ✅ `CustomTooltip` の props の型定義
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="border-2 border-yellow-500 bg-white p-2 rounded-lg opacity-70 shadow-md">
                {payload.map((data, index) => (
                    <div key={index}>
                        <p className="font-bold text-yellow-500">{`■ ${data.payload.age}歳`}</p>
                        <p className="font-bold text-gray-700">{`評価: ${data.value}`}</p>
                        <p>{`出来事：${data.payload.description}`}</p>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// `next/dynamic` を使用して LineChart をクライアントでのみレンダリング
const LineChartComponent: React.FC = () => {
    // ✅ `chartData` の型を `useState` に適用
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") { // クライアントサイドのみ実行
            const items = localStorage.getItem("items");
            if (items) {
                const parsedItems = JSON.parse(items).items;

                // `data` の形式に変換
                const formattedData: ChartData[] = parsedItems.map((item: { value: string; description: string }, index: number) => ({
                    age: index + 1,  // X 軸には番号 (1, 2, 3...)
                    value: Number(item.value),   // Y 軸に数値 (value)
                    description: item.description, /// 出来事
                }));

                setChartData(formattedData);
            }
        }
    }, []);

    const captureRef = useRef(null);

    const takeScreenshot = async () => {
        if (!captureRef.current) return;

        const canvas = await html2canvas(captureRef.current);
        const image = canvas.toDataURL("image/png");

        // ダウンロード用リンクを作成
        const link = document.createElement("a");
        link.href = image;
        link.download = `人生曲線${dateForPng}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const dateForPng = DashDate();
    const date = FullDate();

    return (
        <div className="w-[1000px] h-[400px] m-24" ref={captureRef}>
            <div className="flex justify-start">
                <p className="m-4 text-yellow-500 font-bold">{date}の人生曲線</p>
            </div>
            <ResponsiveContainer width="100%" height="100%" className=" bg-gray-100 py-12 rounded-xl">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#eab308" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-end">
                <button className="text-yellow-500 text-sm font-bold border-2 border-yellow-500 py-2 px-10 rounded-full hover:opacity-70 m-4" onClick={takeScreenshot}>
                    グラフのスクショを撮る
                </button>
            </div>
        </div>
    );
};

// `ssr: false` を指定し、サーバー側でのレンダリングを無効化
const DynamicLineChart = dynamic(() => Promise.resolve(LineChartComponent), { ssr: false });

const Example: React.FC = () => {
    return (
        <div>
            <DynamicLineChart />
        </div>
    );
};

export default Example;
"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
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
                        <p className="font-bold text-yellow-500">{`■ ${data.payload.name}歳`}</p>
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
                    name: index + 1,  // X 軸には番号 (1, 2, 3...)
                    value: Number(item.value),   // Y 軸に数値 (value)
                    description: item.description, /// 出来事
                }));

                setChartData(formattedData);
            }
        }
    }, []);

    return (
        <div className="w-[1000px] h-[400px] m-24">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#eab308" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
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
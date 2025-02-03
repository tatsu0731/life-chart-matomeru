"use client";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";

export default function ViewFeature() {
    const [value, setValue] = useState<{ items: { value: number; description: string }[] } | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") { // クライアントサイドのみ実行
            const items = localStorage.getItem("items");
            if (items) {
                setValue(JSON.parse(items));
            }
        }
    }, []);

    if (!value) return <div>Loading...</div>; // データが取得されるまで Loading 表示

    // `xAxis` のデータを作成
    const arr = Array.from({ length: value.items.length }, (_, i) => i + 1);

    return (
        <div>
            <LineChart
                xAxis={[{ data: arr }]}
                series={[
                    {
                        data: value.items.map(item => item.value),
                    },
                ]}
                width={1000}
                height={500}
            />
        </div>
    );
}
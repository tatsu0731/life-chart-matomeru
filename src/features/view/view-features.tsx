"use client";

import { LineChart } from "@mui/x-charts";

// TODO: dataの配列のデカさ分だけ配列の長さを生成してxAxisに入れる
// TODO: ここら辺もっとスマートに書ける気がする

export default function ViewFeature() {
    const items = localStorage.getItem("items");
    const value = items ? JSON.parse(items) : null;
    console.log(value?.items[1].description);
    console.log(value.items.length);

    const arr = [...Array(value.items.length).keys()].map(i => i + 1);

    interface Item {
        value: number;
        description: string;
    }

    const descriptionList = value?.items.map((item: Item) => item.value) || [];
    console.log(descriptionList);

    return (
        <div>
            <LineChart
                xAxis={[{ data: arr }]}
                series={[
                    {
                        data: descriptionList,
                    },
                ]}
                width={1000}
                height={500}
            />
        </div>
    );
}

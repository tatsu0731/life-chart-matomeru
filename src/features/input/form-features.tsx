"use client";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    items: z.array(z.object({ value: z.string(), description: z.string() })),
});

type FormData = z.infer<typeof schema>;

const initialValue = {value: "", description: ""};

export default function FormFeature() {

    const { register, handleSubmit, control } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            items: [initialValue]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    const onSubmit = (data: FormData) => {
        console.log("登録できてねーぞ");
        console.log(data.items);;;
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-8 py-8 w-96">
            <div className="flex flex-col gap-4 h-96 overflow-scroll">
            {fields.map((field, index) => {
                const checkDelete = fields.length !== 1
                return (
                    <div key={field.id}>
                        <div className="border-2 border-yellow-300 py-4 px-4 rounded-lg">
                            <div className="flex justify-between">
                                <div className="text-xl">■ {index + 1}歳</div>
                                {checkDelete && <p onClick={() => remove(index)} className="text-red-400">削除</p>}
                            </div>
                            <label htmlFor={`items.${index}.value`}>
                                評価
                                <select id={`items.${index}.value`}
                                defaultValue={field.value}
                                    {...register(
                                        `items.${index}.value`
                                    )}
                                className="border-2 py-1 px-2 rounded-md"
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </label>
                            <label htmlFor={`items.${index}.description`}>
                                出来事
                                <input
                                    defaultValue={field.description}
                                    id={`items.${index}.description`}
                                    {...register(
                                        `items.${index}.description`
                                    )}
                                className="border-2 py-1 px-2 rounded-md"></input>
                            </label>
                        </div>
                        {fields.length - 1 === index &&
                        <div className="flex justify-center mt-4">
                            <p onClick={() => append(initialValue)} className="font-bold py-2 px-12 bg-yellow-400 rounded-full text-white hover:opacity-70">追加</p>
                        </div>
                        }
                    </div>
                )
            })}
            </div>
            <div className="flex justify-center py-8">
                <Button title="登録" />
            </div>
        </form>
    );
}

"use client";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
    items: z.array(z.object({ value: z.string().min(1, {message: "必須項目です"}), description: z.string().min(1, {message: "必須項目です"}) })),
});

type FormData = z.infer<typeof schema>;

const initialValue = {value: "", description: ""};

export default function FormFeature() {

    const { register, handleSubmit, control } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            items: Array(18).fill(initialValue)
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    const onSubmit = async (data: FormData) => {
        await toa();
        localStorage.setItem('items', JSON.stringify(data));
        redirect('/view');
    };

    const toa = () => {
        return toast.success("登録完了しました")
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-8 py-8 w-2/3">
            <div className="flex flex-col gap-4">
            {fields.map((field, index) => {
                return (
                    <div key={field.id}>
                        <div className="border-2 border-yellow-300 py-4 px-4 rounded-lg flex flex-col gap-4">
                            <div className="flex justify-between">
                                <div className="text-xs text-yellow-500">■ {index + 1}歳</div>
                                {fields.length - 1 === index && <p onClick={() => remove(index)} className="text-red-400 cursor-pointer">削除</p>}
                            </div>
                            <label htmlFor={`items.${index}.value`} className="text-sm text-gray-600 font-bold flex flex-col">
                                評価
                                <select id={`items.${index}.value`}
                                required
                                defaultValue={field.value}
                                    {...register(
                                        `items.${index}.value`
                                    )}
                                className="border-2 py-1 px-2 rounded-md w-14 bg-gray-100 font-normal">
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </label>
                            <label htmlFor={`items.${index}.description`} className="text-sm text-gray-600 font-bold flex flex-col">
                                出来事
                                <input
                                    placeholder="出来事を記入してください"
                                    required
                                    defaultValue={field.description}
                                    id={`items.${index}.description`}
                                    {...register(
                                        `items.${index}.description`
                                    )}
                                className="border-2 py-1 px-2 rounded-md bg-gray-100 font-normal"></input>
                            </label>
                        </div>
                        {fields.length - 1 === index &&
                        <div className="flex justify-center mt-4">
                            <p onClick={() => append(initialValue)} className="font-bold py-2 px-12 bg-yellow-400 rounded-full text-white shadow-md hover:opacity-70">追加</p>
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

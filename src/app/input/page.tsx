import DescriptionFeature from "@/features/input/description-features";
import FormFeature from "@/features/input/form-features";

export default function Input() {
    return (
        <section className="flex flex-col justify-center">
            <div className="flex justify-center">
                <DescriptionFeature />
            </div>
            <div className="flex justify-center ">
                <FormFeature />
            </div>
        </section>
    );
}

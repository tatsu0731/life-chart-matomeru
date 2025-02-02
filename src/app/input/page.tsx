import DescriptionFeature from "@/features/input/description-features";
import FormFeature from "@/features/input/form-features";

export default function Input() {
    return (
        <section className="flex flex-col justify-center">
            <div>
                <DescriptionFeature />
            </div>
            <div>
                <FormFeature />
            </div>
        </section>
    );
}

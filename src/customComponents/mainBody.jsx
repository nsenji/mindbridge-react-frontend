import FormField from "./formField"

export default function MainBody() {
    return (
        <section className="">
            <div className="bg-white  border border-dark-blue mt-9 mb-9 flex flex-col items-center justify-center rounded-md  w-[40%]  min-w-[600px] mx-auto">
                <p className="text-dark-blue font-bold text-3xl pt-12 pb-12">
                    Log in to account
                </p>
                <FormField/>
            </div>
        </section>
    )
}
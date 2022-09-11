const Title = (props: { id: string }) => {
    return (
        <div className="flex mx-auto w-9/12 mobile:pt-12 tablet:pt-24 border-b dark:border-zinc-500">
            <p className="font-bold text-3xl">
                {props.id}
            </p>
        </div>
    )
};

export default Title;

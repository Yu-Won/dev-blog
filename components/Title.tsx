const Title = (props: { id: string }) => {
  return (
    <div className="flex mx-auto w-9/12 mobile:pt-12 tablet:pt-24 border-b dark:border-zinc-500">
      <span className="font-bold text-3xl py-2">{props.id}</span>
    </div>
  );
};

export default Title;

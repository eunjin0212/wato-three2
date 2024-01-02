const PostCard = ({ item, className, textColor }) => {
  const { disease_name, description, tags } = item;

  return (
    <div
      className={`${className} max-w-[364px] p-4 flex flex-col gap-y-2.5 rounded-lg`}
    >
      <h1 className={`text-xl font-semibold`} style={{ color: textColor }}>
        {disease_name}
      </h1>
      <p className="font-light">{description}</p>
      <div className="m-w-[250px] top-[110px] flex flex-wrap gap-x-2 gap-y-2">
        {tags.map((item) => {
          return (
            <span
              className="border border-lowborder bg-white text-sm px-3 py-2 rounded-[8px] font-semibold"
              key={item}
              style={{ color: textColor }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PostCard

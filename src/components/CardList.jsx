import { Card } from "./Card";

export const CardList = ({ items }) => {
  // const high = [
  //   {
  //     disease_name: 'Gas Gangrene',
  //     emergency_nature: 50,
  //     relevance: 30,
  //   },
  //   {
  //     disease_name: 'Pheochromocytoma',
  //     emergency_nature: 80,
  //     relevance: 70,
  //   },
  //   {
  //     disease_name: 'Somatostatinoma Syndrome',
  //     emergency_nature: 40,
  //     relevance: 20,
  //   },
  //   {
  //     disease_name: 'Somatostatinoma Syndrome',
  //     emergency_nature: 40,
  //     relevance: 20,
  //   },
  // ];
  // console.log(items);
  const high = items.filter((item) => item.emergency_nature > 60);

  const medium = items.filter(
    (item) => item.emergency_nature >= 35 && item.emergency_nature < 59
  );
  // console.log(medium);
  // const medium = [
  //   {
  //     disease_name: 'Gas Gangrene',
  //     emergency_nature: 50,
  //     relevance: 30,
  //   },
  //   {
  //     disease_name: 'Pheochromocytoma',
  //     emergency_nature: 80,
  //     relevance: 70,
  //   },
  //   {
  //     disease_name: 'Somatostatinoma Syndrome',
  //     emergency_nature: 40,
  //     relevance: 20,
  //   },
  // ];
  const low = items.filter((item) => item.emergency_nature < 35);
  console.log(low);
  // const low = [
  //   {
  //     disease_name: 'Gas Gangrene',
  //     emergency_nature: 50,
  //     relevance: 30,
  //   },
  //   {
  //     disease_name: 'Pheochromocytoma',
  //     emergency_nature: 80,
  //     relevance: 70,
  //   },
  //   {
  //     disease_name: 'Somatostatinoma Syndrome',
  //     emergency_nature: 40,
  //     relevance: 20,
  //   },
  // ];
  // console.log(low);
  return (
    <div className="pl-[58px] pt-[75px] font-display max-w-[1000px] h-screen">
      <h1 className="font-display text-[52px] font-semibold pb-[70px]">
        Diagnosis
      </h1>
      <h2 className="text-3xl font-regular pb-7">High Severity</h2>
      <div className="flex flex-wrap gap-[22px] pb-9">
        {high.length > 0 ? (
          high.map((item, index) => (
            <Card
              className="bg-high border-highBorder border-[1.5px]"
              item={item}
              key={index}
              textColor={"#E64141"}
            />
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
      <h2 className="text-3xl font-medium pb-7">Medium Severity</h2>
      <div className="flex flex-wrap gap-[22px] pb-9">
        {medium.length > 0 ? (
          medium.map((item, index) => (
            <Card
              className="bg-medium border-mediumBorder border-[1.5px]"
              item={item}
              key={index}
              textColor={"#F2841F"}
            />
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
      <h2 className="text-3xl font-medium pb-7">Low Severity</h2>
      <div className="flex flex-wrap gap-[22px] pb-9">
        {low.length > 0 ? (
          low.map((item, index) => (
            <Card
              className="bg-low border-lowBorder border-[1.5px]"
              item={item}
              key={index}
              textColor={"#0061FF"}
            />
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
};

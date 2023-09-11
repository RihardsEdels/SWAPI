import Link from "next/link";
import classes from "./listingCard.module.css";
import { format } from "date-fns";
import Image from "next/image";
import Tags from "../Tags/Tags";
import { Person } from "@/types/types";

interface ListingCardProps {
  characterData: Person;
}

const ListingCard: React.FC<ListingCardProps> = ({ characterData }) => {
  const { id, name, homeworld, birthYear, created, height, species } =
    characterData;

  if (!id) return null;

  const cardDate = created && format(new Date(created), "MMMM do yyyy");

  const statsData = [
    { label: "Birth year:", value: birthYear === "unknown" ? null : birthYear },
    {
      label: "Homeworld:",
      value: homeworld?.name === "unknown" ? null : homeworld?.name,
    },
    { label: "Height:", value: height || "-" },
    { label: "Species:", value: species?.name || "Human" },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.characterInfo}>
        <div className={classes.cardDate}>{cardDate}</div>
        <Link href={`/${id.replace("=", "")}`}>
          <div className={classes.nameContainer}>
            <Image
              className={classes.characterImage}
              width={35}
              height={35}
              alt=""
              src="/sw.png"
            />
            <h2 className={classes.name}>{name}</h2>
          </div>{" "}
        </Link>

        <div className={classes.statsContainer}>
          {statsData.map((s) => (
            <div className={classes.statsItem} key={s.label}>
              <span>{s.label}</span>
              <span>{s.value}</span>
            </div>
          ))}
        </div>

        <Tags tagData={statsData} />
      </div>
    </div>
  );
};

export default ListingCard;

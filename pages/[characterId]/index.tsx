import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import { useRouter } from "next/router";

import classes from "./page.module.css";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";
import { GET_CHARACTER } from "@/graphql/queries/getCharacter";

export default function Character() {
  const router = useRouter();
  const { characterId } = router.query;
  const { data, loading } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  if (loading) return <Loader />;

  const {
    character: {
      name,
      birthYear,
      gender,
      hairColor,
      height,
      homeworld,
      species,
    },
  } = data;

  const statsData = [
    { label: "Birth year:", value: birthYear === "unknown" ? null : birthYear },
    { label: "Gender:", value: gender || "-" },
    { label: "Hair color:", value: hairColor || "-" },
    { label: "Height:", value: height },
  ];

  return (
    <main className="container mx-auto px-5">
      <div className={classes.root}>
        <div className={classes.personDetails}>
          <Image
            className={classes.image}
            alt={name}
            width={600}
            height={600}
            src={`/characters/${characterId}.jpg`}
          />
          <div className={classes.personDetailsContainer}>
            <div className={classes.name}>{name}</div>
            <div>
              <div className={classes.statsContainer}>
                {statsData.map((s) => (
                  <div className={classes.statsItem} key={s.label}>
                    <span>{s.label}</span>
                    <span>{s.value}</span>
                  </div>
                ))}

                <div className={classes.extraInfo}>Homeworld</div>
                <div className={classes.statsItem}>
                  <span>Name:</span>
                  <span>{homeworld?.name || "-"}</span>
                </div>
                <div className={classes.statsItem}>
                  <span>Population:</span>
                  <span>{homeworld?.population || "-"}</span>
                </div>
                <div className={classes.statsItem}>
                  <span>Orbital period:</span>
                  <span>{homeworld?.orbitalPeriod || "-"}</span>
                </div>

                <div className={classes.extraInfo}>Species</div>
                <div className={classes.statsItem}>
                  <span>Name:</span>
                  <span>{species?.name || "Human"}</span>
                </div>
                <div className={classes.statsItem}>
                  <span>Classification:</span>
                  <span>{species?.classification || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

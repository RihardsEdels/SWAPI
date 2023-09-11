import Input from "@/components/Input/Input";
import Listing from "@/components/Listing/Listing";
import { useQuery } from "@apollo/client";
import { mdiClose } from "@mdi/js";
import { gql } from "apollo-server-core";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";

import classes from "./page.module.css";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  const query = gql`
    query getPeople($page: String, $value: String) {
      characters(page: $page, value: $value) {
        total
        characters {
          id
          name
          height
          birthYear
          hairColor
          homeworld {
            name
          }
        }
      }
    }
  `;

  const router = useRouter();
  const { page, search } = router.query;
  const [keyword, setKeyword] = useState<string>(search as string);

  useEffect(() => {
    if (search) {
      setKeyword(search as string);
    }
  }, [search]);

  const { data, loading, refetch } = useQuery(query, {
    variables: { page: page, value: search },
  });

  const [results, setResults] = useState(data?.characters.characters || []);
  const [originalResults, setOriginalResults] = useState(
    data?.characters.characters || []
  );

  useEffect(() => {
    if (data) {
      setResults(data.characters.characters);
      setOriginalResults(data.characters.characters);
    }
  }, [data]);

  if (loading) return <Loader />;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLButtonElement;
    setKeyword(element.value);
  };

  const pagination = Array.from(
    { length: Math.ceil(data?.characters.total / 10) },
    (_, index) => (
      <button
        key={index}
        onClick={() =>
          router.push(`/?page=${index + 1}&search=${search || ""}`)
        }
      >
        {index + 1}
      </button>
    )
  );

  return (
    <main className="container mx-auto px-5">
      <form className={classes.form}>
        <Input
          onChange={handleSearch}
          value={keyword}
          placeholder={"Search name or homeworld"}
          icon={keyword && mdiClose}
          name="search"
          action={() => setKeyword("")}
          classes={{ root: classes.inputRoot, inputRoot: classes.input }}
        />

        <Button disabled={!keyword?.length} type="submit">
          Search
        </Button>
      </form>
      <Listing listingData={data?.characters.characters} />

      <div className="flex flex-wrap gap-1 text-lg">{pagination}</div>
    </main>
  );
}

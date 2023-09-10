import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ params }) {
  const query = gql`
    query getPeople($page: String, $value: String) {
      characters(page: $page, value: $value) {
        total
        characters {
          name
          url
        }
      }
    }
  `;

  const router = useRouter();
  const { page, search } = router.query;
  const [keyword, setKeyword] = useState(search);

  const { data, loading, refetch } = useQuery(query, {
    variables: { page: page, value: search },
  });
  console.log("🚀 ~ file: index.tsx:26 ~ Home ~ data:", data);

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

  if (loading) return "LOADING";

  const handleSearch = (e) => {
    setKeyword(e.target.value);
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
    <main>
      <form>
        <input
          name="search"
          value={keyword}
          onChange={(e) => handleSearch(e)}
          placeholder="Search"
        ></input>
        <button type="submit">submit</button>
      </form>
      {results.map((person) => (
        <Link href={`${person.name}`} key={person.id}>
          {person.name}
        </Link>
      ))}
      <div>{pagination}</div>
    </main>
  );
}

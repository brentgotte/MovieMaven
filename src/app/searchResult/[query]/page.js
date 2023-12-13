import ResultMovie from "@/components/ResultMovie/ResultMovie";

export default function MoviesPage({ params }) {
  return (
    <div className="grid grid-cols00-3">
      {/* <h1>Movies Page {params.query}</h1> */}
      <ResultMovie  query={params.query} />
    </div>
  );
}

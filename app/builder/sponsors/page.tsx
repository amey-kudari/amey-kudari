import Link from "next/link";
import data from "./data.json";

const Page = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-3xl w-full sm:w-1/2 my-2 text-center">
        Total : <strong className="font-semibold">{data.length}</strong>{" "}
        <small>(companies that have offered more than 2 sponsorships)</small>
      </h1>
      <ul className="w-full sm:w-1/2">
        {data.map((company) => (
          <li key={company.employer_name} className="w-full">
            <button className="py-2 w-full bg-slate-500 hover:bg-slate-700 mt-2 cursor-pointer rounded-md relative flex px-1.5">
              <Link
                target="_blank"
                href={`https://h1bgrader.com${company.employer_url}`}
                className="flex-1 pl-6"
              >
                {company.employer_name}
                <small>
                  <strong>({company.count})</strong>
                </small>
              </Link>
              <Link
                target="_blank"
                href={`https://www.google.com/search?q=levels fyi ${company.employer_name}`}
              >
                <span className="px-4 py-1.5 rounded-md bg-slate-700 hover:bg-slate-800">
                  &#36;
                </span>
              </Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

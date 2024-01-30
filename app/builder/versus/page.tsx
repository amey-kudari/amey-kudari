"use client";
import { useEffect, useState } from "react";
import "./page-ticker.css";
import { TickerSelectBox } from "./components/TickerSelectBox";
import { CountrySelect } from "./components/CountrySelect";
import { LuSwords } from "react-icons/lu";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

const StockChart = ({
  chartData,
  label,
}: {
  chartData: number[];
  label: string;
}) => {
  return (
    <LineChart
      width={800}
      height={400}
      data={chartData.map((value, index) => ({ index, value }))} // Add an index for X-axis
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      {/* <Tooltip /> */}
      {/* <Legend /> */}
      <Line type="monotone" dataKey="value" stroke="gray" dot={false} />
    </LineChart>
  );
};

const Page = () => {
  const [country1, setCountry1] = useState("USA");
  const [country2, setCountry2] = useState("USA");

  const [ticker1, setTicker1] = useState("");
  const [ticker2, setTicker2] = useState("");

  const [chartData, setChartData] = useState<number[]>([]);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticker1 && ticker2) {
      const requests = [
        axios.get("/api/ticker?stock=" + ticker1),
        axios.get("/api/ticker?stock=" + ticker2),
      ];
      if (country1 !== country2) {
        requests.push(axios.get("/api/usdinr"));
      }
      setError(false);
      setLoading(true);
      Promise.all(requests)
        .then((res) => {
          const stock1 = res[0].data.reverse();
          const stock2 = res[1].data.reverse();
          if (country1 !== country2) {
            const usdinr = res[2].data.reverse();
            if (country1 === "USA") {
              for (let i = 0; i < stock1.length; i++)
                stock1[i] = stock1[i] * usdinr[i];
            } else {
              for (let i = 0; i < stock2.length; i++)
                stock2[i] = stock2[i] * usdinr[i];
            }
          }
          const tchartData: number[] = [];
          for (let i = 0; i < Math.min(stock1.length, stock2.length); i++) {
            tchartData.push(stock1[i] / stock2[i]);
          }
          setChartData(tchartData.reverse());
        })
        .catch((err) => {
          // console.log("ERROR :/");
          setError(true);
        })
        .finally(() => setLoading(false));
    } else setChartData([]);
  }, [ticker1, ticker2, country1, country2]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col w-full">
      <h1 className="text-slate-600 text-center mb-1">
        Note: this app is as basic as it gets with no timestamps, 5y fixed
        timeframe. BUT ping me you like it and ill add more features!
      </h1>
      <h1 className="text-slate-600 text-center">
        Note: this app basic af but not faulty! USA stocks are adjusted based on
        respective USD/INR exch rates
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 w-full">
        <div className="p-4 col-span-2 flex items-center justify-center flex-col">
          <CountrySelect value={country1} onSelect={setCountry1} />
          <TickerSelectBox
            value={ticker1}
            country={country1}
            onSelect={setTicker1}
          />
        </div>
        <div className="flex items-center justify-center">
          <LuSwords size={32} />
        </div>
        <div className="p-4 col-span-2 flex items-center justify-center flex-col">
          <CountrySelect value={country2} onSelect={setCountry2} />
          <TickerSelectBox
            value={ticker2}
            country={country2}
            onSelect={setTicker2}
          />
        </div>
      </div>
      {error ? (
        <h1 className="text-center">Error loading graph, please try again</h1>
      ) : null}
      {chartData.length && !error && ticker1 && ticker2 ? (
        <div className="flex items-center justify-center flex-col w-full">
          <h1 className="text-lg">
            {ticker1} / {ticker2}!
          </h1>
          <sub className="mb-2">Note: increase indicates {ticker1} winning</sub>
          <div className="w-full overflow-y-auto flex items-center justify-center">
            <StockChart chartData={chartData} label={`${ticker1}/${ticker2}`} />
          </div>
        </div>
      ) : (
        <>{!error ? <h1>Select any 2 stocks to view results!</h1> : null}</>
      )}
      {loading && !error ? (
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#eee"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : null}
    </div>
  );
};
export default Page;

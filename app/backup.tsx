// import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-16 w-full">
      <div className="flex gap-0.5">
        <div className="p-1 sm:p-1.5 flex flex-col	items-end">
          <hr className={`border-white ${styles.customBorder} w-12 sm:w-24`} />
          <hr
            className={`border-white ${styles.customBorder} w-8 sm:w-16 mt-1 sm:mt-2`}
          />
          <hr
            className={`border-white ${styles.customBorder} w-4 sm:w-8 mt-1 sm:mt-2`}
          />
        </div>
        <h1 className="text-1xl sm:text-3xl whitespace-nowrap">AMEY KUDARI</h1>
        <div className="p-1 sm:p-1.5">
          <hr className={`border-white ${styles.customBorder} w-12 sm:w-24`} />
          <hr
            className={`border-white ${styles.customBorder} w-8 sm:w-16 mt-1 sm:mt-2`}
          />
          <hr
            className={`border-white ${styles.customBorder} w-4 sm:w-8 mt-1 sm:mt-2`}
          />
        </div>
      </div>
      <hr className={`w-32 sm:w-64 border-white ${styles.customBorder} mt-0`} />
      <hr className={`w-24 sm:w-48 border-white ${styles.customBorder} mt-1 sm:mt-1.5`} />
      {/* <hr className={`w-16 sm:w-32 border-white ${styles.customBorder} mt-1 sm:mt-1.5`}/> */}

      <Link href="/home">
        <button
          id="target-btn"
          className={`text-1xl sm:text-3xl mt-4 ${styles.styledButton} w-64 h-24 mt-48`}
        >
          Enter
          <span className={styles.styledButtonSpan} />
        </button>
      </Link>
    </main>
  );
}

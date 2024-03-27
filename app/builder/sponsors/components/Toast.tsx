"use client";
import React from "react";
import Image from "next/image";
import styles from "./toast.module.css";

export const Toast = ({ content = {} }) => (
  <div
    style={{
      position: "fixed",
      bottom: "min(1rem, 2vh)",
      zIndex: 1000,
      width: "min(25rem, 80%)",
      right: "min(1rem, 2vh)",
    }}
  >
    <div
      style={{
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        position: "relative",
        borderRadius: "1rem",
        backgroundColor: "rgb(39 39 42)",
      }}
    >
      <Image
        // src="/exclamation.png"
        // src="/information.png"
        src="/checked.png"
        width={20}
        height={20}
        alt="Error Logo"
        style={{
          height: "2rem",
          width: "2rem",
        }}
      />
      <p>
        This is a toast! the toast can be this long, or it can be shorter but
        this is
      </p>
      <button className={styles.styledButton} style={{ padding: '0.5rem', borderRadius: '0.5rem' }} title="hide">
        <Image src="/X.png" width={25} height={25} alt="Remove Popup" style={{filter: "invert(1)"}}/>
      </button>
    </div>
  </div>
);

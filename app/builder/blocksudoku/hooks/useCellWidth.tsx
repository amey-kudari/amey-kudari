import { useEffect, useState } from "react";

export const useCellWidth = () => {
  const [cellWidth, setCellWidth] = useState(0);

  useEffect(() => {
    const calculateCellWidth = () => {
      const totalWidth = window.innerWidth;
      setCellWidth(Math.min(totalWidth * 0.09, 50));
    };

    calculateCellWidth();

    window.addEventListener('resize', calculateCellWidth);

    return () => {
      window.removeEventListener('resize', calculateCellWidth);
    };
  }, []);

  return cellWidth;
};

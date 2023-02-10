export const getMilesFromMeters = (meters) => {
  if (typeof meters === "string") {
    parseInt(meters);
  }
  return Math.ceil(meters / 1609.344);
};

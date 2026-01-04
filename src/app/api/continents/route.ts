import { NextResponse } from "next/server";
import { continents, getCountriesByContinent } from "@/data/recipes";

export async function GET() {
  const data = continents.map((continent) => ({
    ...continent,
    countryCount: continent.countries.length,
  }));

  return NextResponse.json({
    success: true,
    count: data.length,
    data,
  });
}

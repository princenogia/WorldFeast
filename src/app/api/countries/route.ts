import { NextResponse } from "next/server";
import { getAllCountries, getRecipesByCountry } from "@/data/recipes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const continent = searchParams.get("continent");

  let countries = getAllCountries();

  if (continent) {
    countries = countries.filter((c) => c.continent === continent);
  }

  // Add recipe count for each country
  const data = countries.map((country) => ({
    ...country,
    recipeCount: getRecipesByCountry(country.code).length,
  }));

  return NextResponse.json({
    success: true,
    count: data.length,
    data,
  });
}

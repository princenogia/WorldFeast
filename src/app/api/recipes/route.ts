import { NextResponse } from "next/server";
import { recipes, searchRecipes } from "@/data/recipes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const continent = searchParams.get("continent");
  const country = searchParams.get("country");
  const search = searchParams.get("search");
  const limit = searchParams.get("limit");

  let filteredRecipes = [...recipes];

  // Filter by continent
  if (continent) {
    filteredRecipes = filteredRecipes.filter((r) => r.continent === continent);
  }

  // Filter by country code
  if (country) {
    filteredRecipes = filteredRecipes.filter((r) => r.countryCode === country);
  }

  // Search by query
  if (search) {
    filteredRecipes = searchRecipes(search);
  }

  // Limit results
  if (limit) {
    filteredRecipes = filteredRecipes.slice(0, parseInt(limit));
  }

  return NextResponse.json({
    success: true,
    count: filteredRecipes.length,
    data: filteredRecipes,
  });
}
